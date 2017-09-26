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
    Breadcrumb
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
        /**
         * 根据一级分类id，查找其所有的子分类
         * @return {[type]} [description]
         */
    getCategory = () => {
        axios.get(`/category/get-category.json?type=2&cid=${this.cid}`).then(res => {
            this.setState({
                search: res.data.category_name,
                category: res.data.categorys
            })
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
            {this.state.category.map(item=>{
                console.log(item.img);
                return <div className={css.category_item}>
                    <div className={css.title} style={{background:`url(${item.img})`}}>{item.name}</div>
                    {item.items.map(cate=>{
                        return <p className={css.item}><Link to={"page/product-list/"+item.id}>{cate.name}</Link></p>
                    })}
                </div>
            })}
            </div>

        </div>
    }
}
export default CategoryList;