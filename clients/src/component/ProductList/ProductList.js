/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './ProductList.scss';
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
            products: [],
            search: "产品列表",
            total: 50,
        }
    }
    componentWillMount() {
        let products = [{
            id: 1,
            name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 2,
            name: "dsds",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 3,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 4,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 5,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 6,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 3,
            name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 1,
            name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 2,
            name: "dsds",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 3,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 4,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 5,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 6,
            name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
            price: 2132,
            img: '../img/product.jpg'
        }, {
            id: 3,
            name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
            price: 2132,
            img: '../img/product.jpg'
        }, ]
        this.setState({
            products: products
        })
    }
    componentDidMount() {
            this.product_list.scrollIntoView();
        }
        /**
         * 根据排序条件查询商品
         * @param  {[type]} name 条件参数名称
         * @param  {[type]} key  条件值，1：增序，-1：降序
         * @return {[type]}      [description]
         */
    handleSort(name, key) {
        console.log(name, key);
    }
    showTotal = (total) => {
        console.log(119, total);
        return `Total ${total} items`;
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
    render() {
        console.log(this.state.products);
        return <div ref={(product_list)=>this.product_list=product_list} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search:this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <SingleSelect
                more
                showImg
                title={<FormattedMessage id="app.brand" defaultMessage="供应商"/>}
            />
            <SingleSelect more title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />
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
                    <Pagination size="small" total={50} simple showTotal={this.showTotal} />
                </div>
            </div>
            <div className={css.product_list}>
                {this.state.products.map((item,index)=>{
                    return <Product className={css.product} product={item} handleStar={this.handleStar.bind(this,index)} addCart/>
                })}
            </div>
            <div className={css.footer}>
                <Pagination showSizeChanger size="small" onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
            </div>
        </div>
    }
}
export default ProductList;