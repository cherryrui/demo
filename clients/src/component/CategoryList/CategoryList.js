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
} from 'antd';
message.config({
    top: '40%',
    duration: 2,
});
import {
    FormattedMessage
} from 'react-intl';
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            categoryList: [],
            select: this.props.params.index?parseInt(this.props.params.index):0,
        }
    }
    componentWillMount() {
        /*console.log(this.props.params)*/
        axios.get('/category/get-first-category.json').then(res => {
            if (res.data.isSucc) {
                this.setState({
                    categoryList: res.data.result,
                }, () => {
                    res.data.result.length > 0 ? this.getCategory() : ""
                })
            } else {
                message.error(res.data.message);
            }
        })
    }
    componentDidMount() {
        this.category_list.scrollIntoView(true);
    }
    handleCategory = (index) => {
        this.setState({
            select: index
        }, () => {
            this.getCategory();
        })
    }

    /**
     * 根据一级分类id，查找其所有的子分类
     * @return {[type]} [description]
     */
    getCategory = () => {
        let cid = this.state.categoryList[this.state.select].categoryId;
        /*console.log(cid)*/
        axios.get(`/category/get-child-category.json?cid=${cid}`).then(res => {
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
                        <FormattedMessage id="app.product.all" defaultMessage=""/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.category_list_title}>
                <FormattedMessage id="app.product.all" defaultMessage=""/>
            </div>
            <div className={css.category_first}>
                {this.state.categoryList.map((item,index)=>{
                    return <p className={index==this.state.select?css.category_first_item_active:css.category_first_item} onClick={this.handleCategory.bind(this,index)}>{item.categoryName}</p>
                })}
            </div>
            <div className={css.category}>
            {this.state.category.map((item,index)=>{
                return <div className={(index+1)%3==0?css.category_item:css.category_item_right}>
                    <div className={css.title} style={{background:`url(${item.imgUrl+"@300w_140h_1e_1c.png"})`}}>{item.categoryName}</div>
                    {item.childProductCategoryList.map(cate=>{
                        return <p className={css.item}>
                        <Link  to={"page/product-list/"+cate.categoryId+"/"+cate.categoryName}>{cate.categoryName}</Link></p>
                    })}
                </div>
            })}
            </div>

        </div>
    }
}
export default CategoryList;