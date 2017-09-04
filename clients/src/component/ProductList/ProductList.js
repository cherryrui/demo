/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './ProductList.scss';
import axios from 'axios';
import {
    Link
} from 'react-router';
import {
    FormattedMessage
} from 'react-intl';
import {
    Breadcrumb,
    Tabs,
    Button,
    Pagination,
    Icon,
    Card,
    Rate
} from 'antd';

import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';
import Product from '../Public/Product/Product.js';


/**
 * 产品列表页面，根据分类，查询产品
 */
class ProductList extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            brand: [], //供应商列表
            category: [], //三级分类料表
            select_brand: [],
            products: [], //产品列表
            select_cid: 0, //选择的三级分类id，0：全部
            select_bid: 0, //选择的供应商id，0：全部
            total: 50,
            current: 1,
            pageSize: 10,
        }
        this.orderBy = {};
        this.info = this.props.params.info;
    }
    componentWillMount() {
        //根据分类获取产品列表
        if (Number(this.props.params.info)) {
            //根据二级分类id或者供应商列表和三级分类列表
            axios.get(`/product/get-conditions.json?cid=${this.props.params.info}`).then(res => {
                this.setState({
                    brand: res.data.brand,
                    category: res.data.category,
                    select_brand: res.data.brand,
                })
            })
        }
        this.getProduct();
    }
    componentDidMount() {
        this.product_list.scrollIntoView();
    }
    getProduct = () => {
        let params = {
            condition: {
                info: this.info,
                cid: this.state.cid,
                bid: this.state.bid,
            },
            page: this.state.current,
            pageSize: this.state.pageSize,
            orderBy: this.orderBy,
        }
        axios.post('/product/search-product.json', params).then(res => {
            this.setState({
                products: res.data.products,
                sum: res.data.sum,
            })
        })

    }

    /**
     * 根据排序条件查询商品
     * @param  {[type]} name 条件参数名称
     * @param  {[type]} key  条件值，1：增序，-1：降序
     * @return {[type]}      [description]
     */
    handleSort = (name, key) => {
        this.orderBy[name] = key;
        this.getProduct();
    }
    handleStar = (index) => {
        let products = this.state.products
        if (products[index].star) {
            products[index].star = false;
        } else {
            products[index].star = true;
        }
        this.setState({
            products: products
        });

    }

    /**
     * 选择分类或者供应商
     * @param  {[type]} name [description]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    onSelect = (name, item) => {
        console.log(name, item, name === "category")
        if (name === "category") {
            this.state.cid = item.id;
            this.state.bid = 0;
            if (item.id != 0) {
                let data = [];
                this.state.brand.map(brand => {
                    if (brand.category_id == item.id) {
                        data.push(brand);
                    }
                })
                console.log(data);
                this.setState({
                    select_brand: data
                })
            } else {
                this.setState({
                    select_brand: this.state.brand
                })
            }
        } else {
            this.state.bid = item.id
        }
        this.getProduct();
    }
    onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
        this.state.current = current;
        this.state.pageSize = pageSize;
        this.getProduct();
    }
    handleChange = (page, pageSize) => {
        console.log(page, pageSize);
        this.state.current = page;
        this.state.pageSize = pageSize;
        this.getProduct();
    }
    render() {
        console.log(this.state.select_brand);
        return <div ref={(product_list)=>this.product_list=product_list} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="cart.product.list" defaultMessage="产品列表"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {Number(this.info)&&this.state.category.length>0?<SingleSelect
                all
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
                data={this.state.category}
                onSelect={this.onSelect.bind(this,"category")}
            />:""}
            {Number(this.info)&&this.state.select_brand.length>0?<SingleSelect
                all
                showImg
                data={this.state.select_brand}
                onSelect={this.onSelect.bind(this,"brand")}
                title={<FormattedMessage id="app.brand" defaultMessage="供应商"/>}
            />:""}
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.item}>Comprehensive</p>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Rating"/>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Sale"/>
                </div>
                <div className={css.right}>
                    <FormattedMessage id="branch.product.sum" defaultMessage="总计"
                        values={{total:this.state.total}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" total={50} simple onChange={this.handleChange} />
                </div>
            </div>
            <div className={css.product_list}>
                {this.state.products.map((item,index)=>{
                    return <Product className={css.product} product={item} handleStar={this.handleStar.bind(this,index)} addCart/>
                })}
            </div>
            <div className={css.footer}>
                <Pagination 
                    showSizeChanger 
                    size="small" 
                    defaultCurrent={1} 
                    total={this.state.sum}
                    onShowSizeChange={this.onShowSizeChange}
                    onChange={this.handleChange} 
                    />
            </div>
        </div>
    }
}
export default ProductList;