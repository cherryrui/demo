/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import css from './CategoryList.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import {
    Link
} from 'react-router';
import {
    Breadcrumb,
    message
} from 'antd'
import {
    FormattedMessage
} from 'react-intl';
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "Tools",
            category: [],

        }
        this.cid = this.props.params.id;
    }
    componentWillMount() {
        this.getCategory();
    }
    componentDidMount() {
        this.category_list.scrollIntoView(true);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.params.id);
        if (this.cid != nextProps.params.id) {
            this.cid = nextProps.params.id
            this.getCategory();
            this.category_list.scrollIntoView(true);
        }
    }


    /**
     * 根据一级分类id，查找其所有的子分类
     * @return {[type]} [description]
     */
    getCategory = () => {
        axios.get(`/category/get-child-category.json?cid=${this.cid}`).then(res => {
            if (res.data.isSucc) {
                this.setState({
                    category: res.data.result
                })
            } else {
                message.error(res.data.message);
            }

        })
    }

    render() {
        return <div ref={(category_list)=>this.category_list=category_list} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.props.params.name}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.category}>
            {this.state.category.map((item,index)=>{
                return <div className={(index+1)%3==0?css.category_item:css.category_item_right}>
                    <div className={css.title} style={{background:`url(${item.imgUrl})`}}>{item.categoryName}</div>
                    {item.childProductCategoryList.map(cate=>{
                        return <p className={css.item}><Link to={"page/product-list/"+cate.categoryId+"/"+cate.categoryName}>{cate.categoryName}</Link></p>
                    })}
                </div>
            })}
            </div>

        </div>
    }
}
export default CategoryList;