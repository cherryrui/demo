/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './BranchList.scss';
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
const TabPane = Tabs.TabPane;

class BranchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: [], //一级分类列表
            brand: [], //供应商列表
            cid: 0, //分类id
            pageSize: 10, //每页商品数
            current: 1, //当前页码
            total: 50 //供应商总数
        }
        this.orderBy = {

        }
    }
    componentWillMount() {
        axios.get('/category/get-category.json?type=1').then(res => {
            this.setState({
                category: res.data.categorys,
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
            cid: this.state.cid,
            orderBy: this.orderBy,
            page: this.state.current,
            pageSize: this.state.pageSize,
        }
        axios.post('/brand/get-brand.json', param).then(res => {
            this.setState({
                brand: res.data.brand,
                total: res.data.sum
            })
        })
    }
    componentDidMount() {
        //回到顶点
        this.branch_list.scrollIntoView();
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
    handleSort(name, key) {
        this.orderBy[name] = key;
        this.getBrand();
        console.log(name, key);
    }

    /**
     * 翻页获取供应商列表
     * @param  {[type]} page     [description]
     * @param  {[type]} pageSize [description]
     * @return {[type]}          [description]
     */
    handleChange = (page, pageSize) => {
        console.log(page, pageSize);
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
        this.state.cid = item.id;
        this.getBrand();
    }

    render() {
        return <div ref={(branch_list)=>this.branch_list=branch_list} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
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
                data={this.state.category}
                onSelect={this.onSelect.bind(this)}
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />:""}
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.item}>Comprehensive</p>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Rating"/>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Sale"/>
                </div>
                <div className={css.right}>
                    <FormattedMessage id="branch.product.sum" defaultMessage="共{total}商品"
                        values={{total:this.state.total}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" simple total={50} onChange={this.handleChange} />
                </div>
            </div>
            <div className={css.branch}>
            {this.state.brand.map(item=>{
                return <Brand branch={item} showStar className={css.item}/>
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

export default BranchList;