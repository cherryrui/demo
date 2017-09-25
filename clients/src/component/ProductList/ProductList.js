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
    FormattedMessage,
    injectIntl,
    intlShape
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
import operator from './operator.js';

/**
 * 产品列表页面，根据分类，查询产品
 */
class ProductList extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            brand: [], //品牌列表
            category: [], //三级分类料表
            select_brand: [],
            products: [], //产品列表
            cid: 0, //选择的三级分类id，0：全部
            bid: 0, //选择的供应商id，0：全部
            total: 50,
            current: 1,
            pageSize: 10,
            sortType: 0, //排序名称
            orderType: "", //排序方式，倒序，
        }
        this.categoryName = "分类名称";
        this.info = this.props.params.info;
        this.formatMessage = this.props.intl.formatMessage;

    }
    componentWillMount() {
        this.getData();
    }
    getData() {
        //根据分类获取产品列表
        if (Number(this.info)) {
            //根据二级分类id或者供应商列表和三级分类列表
            axios.get(`/product/get-category.json?cid=${this.props.params.info}`).then(res => {
                if (res.data.isSucc) {
                    this.setState({
                        category: res.data.result
                    })
                } else {
                    message.error(this.formatMessage({
                        id: "request.fail"
                    }, {
                        reason: res.data.message
                    }));
                }
            })
        }
        this.getBrand();
        this.getProduct();
    }
    componentDidMount() {
        this.product_list.scrollIntoView();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.info != this.info) {
            this.info = nextProps.params.info;
            this.state.bid = 0;
            this.state.cid = 0;
            this.getData();
        }
    }

    /**
     * 搜索品牌
     * @return {[type]} [description]
     */
    getBrand = () => {
        let param = {
            categoryId: this.state.cid ? this.state.cid : Number(this.info) ? this.info : null,
            searchKey: Number(this.info) ? null : this.info,
        }
        axios.post('product/get-brand.json', param).then(res => {
            if (res.data.isSucc) {
                this.setState({
                    brand: res.data.result
                })
            } else {
                message.error(this.formatMessage({
                    id: "request.fail"
                }, {
                    reason: res.data.message
                }));
            }
        })

    }

    /**
     * 搜索产品
     * @return {[type]} [description]
     */
    getProduct = () => {
        let param = {}
        param.orderType = this.state.orderType;
        param.sortType = this.state.sortType;
        param.searchKey = Number(this.info) ? null : this.info;
        param.categoryId = this.state.cid > 0 ? this.state.cid : Number(this.info) ? Number(this.info) : 0;
        param.bandId = this.state.bid;
        param.pageNo = this.state.current - 1;
        param.pageSize = this.state.pageSize;
        axios.post('/product/search-product.json', param).then(res => {
            if (res.data.isSucc) {
                this.setState({
                    products: res.data.result.list,
                    sum: res.data.result.allRow,
                })
            } else {
                message.error(this.formatMessage({
                    id: "request.fail"
                }, {
                    reason: res.data.message
                }));
            }
        })

    }

    /**
     * 根据排序条件查询商品
     * @param  {[type]} name 条件参数名称
     * @param  {[type]} key  条件值，1：增序，-1：降序
     * @return {[type]}      [description]
     */
    handleSort = (key, orderType) => {
        this.setState({
            sortType: key,
            orderType: orderType
        }, () => {
            this.getProduct();
        })
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
    onSelect = (name, key) => {
        console.log(name, key);
        if (name == "cid") {
            this.setState({
                cid: key
            }, () => {
                console.log(this.state.cid)
                this.getProduct();
                this.getBrand();
            })
        } else {
            this.setState({
                bid: key
            }, () => {
                this.getProduct();
            })
        }

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
                    <Breadcrumb.Item>
                        {Number(this.info)?this.categoryName:this.info}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {Number(this.info)&&this.state.category.length>0?<SingleSelect
                all
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
                data={this.state.category}
                current={this.state.cid}
                key_name="categoryName"
                key_id="categoryId"
                onSelect={this.onSelect.bind(this,"cid")}
            />:""}
            {this.state.brand.length>0?<SingleSelect
                all
                showImg
                key_name="imgUrl"
                key_id="bid"
                current={this.state.bid}
                data={this.state.brand}
                onSelect={this.onSelect.bind(this,"bid")}
                title={<FormattedMessage id="app.brand" defaultMessage="供应商"/>}
            />:""}
            {this.state.products.length>0?<div>
                <div className={css.header}>
                    <div className={css.left}>
                        {operator.sort.map(item=>{
                            return item.orderType?<p className={item.key==this.state.sortType?css.item_active:css.item} 
                            onClick={this.handleSort.bind(this,item.key,item.orderType)}>
                                <FormattedMessage id={item.id} defaultMessage={item.default}/>
                            </p>:<Sort className={css.item} 
                                id={item.id} 
                                default={item.default} 
                                is_select={this.state.sortType==item.key?true:false}
                                handleSort={this.handleSort.bind(this,item.key)}/>
                        })}
                    </div>
                    <div className={css.right}>
                        <FormattedMessage id="brand.product.sum" defaultMessage="总计"
                            values={{total:this.state.sum}}
                        />&nbsp;&nbsp;&nbsp;&nbsp;
                        <Pagination size="small" total={this.state.sum} simple onChange={this.handleChange} />
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
                        defaultCurrent={1} 
                        total={this.state.sum}
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.handleChange} 
                        />
                </div>
            </div>
            :<div className={css.product_no}>
                <FormattedMessage id='product.no_product' defaultMessage="暂无搜索到商品"/>
            </div>}
        </div>
    }
}
ProductList = injectIntl(ProductList);
export default ProductList;