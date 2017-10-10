/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './BrandList.scss';
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

import Brand from '../Public/Brand/Brand.js';
import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';
import operator from './operator.js';
const TabPane = Tabs.TabPane;

class BrandList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [], //一级分类列表
            brand: [], //供应商列表
            cid: 0, //分类id
            pageSize: 10, //每页商品数
            current: 1, //当前页码
            total: 50, //供应商总数
            sortType: 0, //排序名称
            orderType: "", //排序方式，倒序，
        }
        this.orderBy = {

        }
    }
    componentWillMount() {
        axios.get('/category/get-category.json?pid=0').then(res => {
            /*console.log(res.data)*/
            this.setState({
                category: res.data.result,
            })
        })
        this.getBrand();
    }

    /**
     * 根据分类，排序分页查询供应商数据
     * @return {[type]} [description]
     */
    getBrand = () => {
        let param = {
            productCategoryId: this.state.cid,
            orderType: this.orderBy,
            pageNo: this.state.current,
            pageSize: this.state.pageSize,
            sortType:this.state.sortType
        };
        axios.post('/brand/get-brand.json', param).then(res => {
            if(res.data.isSucc){
                this.setState({
                    brand: res.data.result.list,
                    total: res.data.result.totalPage * res.data.result.pageSize
                })
            }
            
        })
    }
    componentDidMount() {
        //回到顶点
        this.brand_list.scrollIntoView();
    }

    /**
     * 更改每页显示的产品数量
     * @param  {[type]} current  当前页码
     * @param  {[type]} pageSize 每页显示数量
     * @return {[type]}          [description]
     */
    onShowSizeChange = (current, pageSize) => {
        this.state.current = current;
        this.state.pageSize = pageSize;
        this.getBrand();
    }

    /**
     * 根据选择排序获取供应商列表
     * @param  {[type]} name 关键字名称
     * @param  {[type]} key  升、降
     * @return {[type]}      [description]
     */
    handleSort = (key, orderType) => {
        this.setState({
            sortType: key,
            orderType: orderType
        }, () => {
            this.getBrand();
        })
    }

    /**
     * 翻页获取供应商列表
     * @param  {[type]} page     [description]
     * @param  {[type]} pageSize [description]
     * @return {[type]}          [description]
     */
    handleChange = (page, pageSize) => {
        /*console.log(page, pageSize);*/
        this.state.current = page;
        this.state.pageSize = pageSize;
        this.getBrand();
    }

    /**
     * 根据分类查询供应商
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    onSelect = (item) => {
        this.state.cid = item;
        this.getBrand();
    }

    render() {
        return <div ref={(brand_list)=>this.brand_list=brand_list} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>" style={{marginBottom: "10px"}}>
                    <Breadcrumb.Item >
                        <Link to="/main">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="app.brand" defaultMessage="供应商"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            {this.state.category.length>0?<SingleSelect
                all
                key_name = "categoryName"
                key_id = "categoryId"
                data={this.state.category}
                onSelect={this.onSelect.bind(this)}
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />:""}
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
                    <FormattedMessage id="brand.product.sum" defaultMessage="共{total}商品"
                        values={{total:this.state.total}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" simple total={50} onChange={this.handleChange} />
                </div>
            </div>
            <div className={css.brand}>
            {this.state.brand.map((item,index)=>{
                return <Brand brand={item} showStar className={(index+1)%6==0?css.right_item:css.item}/>
            })}
            </div>
            <div className={css.footer}>
                <Pagination 
                showSizeChanger 
                onShowSizeChange={this.onShowSizeChange} 
                defaultCurrent={1} 
                total={this.state.total}
                onChange={this.handleChange}
                />
            </div>
        </div>
    }
}

export default BrandList;