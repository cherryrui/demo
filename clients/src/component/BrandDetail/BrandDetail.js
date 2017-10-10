import React from 'react';
import appcss from '../../App.scss';
import css from './BrandDetail.scss';
import CusPagination from '../Public/CusPagination/CusPagination.js';
import operator from './operator.js'
import axios from 'axios';
import {
	Breadcrumb,
	Pagination,
	Icon,
	Rate
} from 'antd';
import {
	Link
} from 'react-router';
import {
	FormattedMessage
} from 'react-intl';

import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';
import Product from '../Public/Product/Product.js';

class BrandDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			search: "avi",
			brand: {},
			category: [],
			products: [],
			pageSize: 12,
			current: 0,
			total: 0,
			sortType: 0, //排序名称
            orderType: "", //排序方式，倒序，
		}
	}
	componentWillMount() {
		
		axios.get(`/category/get-brand-category.json?supplierId=${this.props.params.id}`).then(re =>{
			axios.get(`/brand/get-brand-byid.json?supplierId=${this.props.params.id}`).then(res => {
				
				this.setState({
					category : re.data.result,
					brand : res.data.result
				})
				/*console.log(this.state.category[0].categoryId);*/
				this.getProduct();
			})
		})
		
		/*axios.get(`/category/get-brand-category.json?bid=${this.bid}`).then(res => {
			axios.get(`/brand/get-brand-byid.json?id=${this.bid}`).then(re => {
				this.setState({
					category: : res.data.category,
					brand: re.data.brand,
				})
			})
		})*/
		
	}
	componentDidMount() {
		this.brand_detail.scrollIntoView(true);
	}

	/**
	 * 根据分类查询该供应商的产品
	 * @return {[type]} [description]
	 */
	getProduct = () => {
		/*console.log(this.state.category)*/
		/*let params = {
			condition: {
				cid: this.state.cid,
				bid: this.bid,
			},
			page: this.state.current,
			pageSize: this.state.pageSize,
			orderBy: this.orderBy,
		}*/
		let params = {
			bandId:this.state.brand.sid,
			categoryId:this.state.category[0].categoryId,
			searchKey:this.state.search,
			pageSize:this.state.pageSize,
			pageNo:this.state.current,
			sortType:this.state.sortType,
			orderType:this.state.orderType
		}
		axios.post('/product/search-product.json', params).then(res => {
			/*console.log(res.data)*/
			this.setState({
				products: res.data.result.list,
				total: res.data.sum,
			})
		})

	}
	handleSort = (name, key) => {
		console.log(name, key)
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
	onSelect = (item) => {
		/*console.log(item)*/
		this.state.cid = item;
		this.getProduct();
	}
	handleChange = (page, pageSize) => {
		/*console.log(page, pageSize);*/
		this.state.current = page;
		this.state.pageSize = pageSize;
		this.getProduct();
	}


	render() {

		return <div className={appcss.body} ref={(brand_detail)=>this.brand_detail=brand_detail} >
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
						<Link to="/main">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.state.brand.supplierName}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.brand_info}>
                <div className={css.img}>
            		<img src={this.state.brand.imgUrl}/>
            		<p className={css.star}>
                		<FormattedMessage id="brand.product.rate" defaultMessage="评分"/>:
                		<Rate className={css.rating} allowHalf defaultValue={this.state.brand.level} disabled />
                		<span>{this.state.brand.level}</span>
           			</p>
            	</div>
            	<div className={css.info}>
            		<div className={css.title}>
            			{this.state.brand.supplierName}
            			<p className={css.collect}>
            				<Icon className={true?css.active:css.icon} type="star" />
            				<FormattedMessage id="product.detail.collect" defaultMessage="收藏"/>
            			</p>
            		</div>
            		<p><div dangerouslySetInnerHTML={{__html: this.state.brand.introduction}} /></p>
            	</div>
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
                    <FormattedMessage id="brand.product.sum" defaultMessage="总计"
                        values={{total:this.state.total}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" total={this.state.total} simple onChange={this.handleChange}  />
                </div>
            </div>
            <div className={css.product_list}>
                {this.state.products.map((item,index)=>{
                    return <Product className={css.product} product={item} handleStar={this.handleStar.bind(this,index)} addCart/>
                })}
            </div>
            <CusPagination onChange={this.handleChange} total={this.state.total} onShowSizeChange={this.onShowSizeChange} />
		</div>
	}
}
export default BrandDetail;