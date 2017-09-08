import React from 'react';
import appcss from '../../App.scss';
import css from './BrandDetail.scss';
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
			pageSize: 10,
			current: 0,
			total: 0,
		}
	}
	componentWillMount() {
		axios.get(`/category/get-brand-category.json?bid=${this.bid}`).then(res => {
			axios.get(`/brand/get-brand-byid.json?id=${this.bid}`).then(re => {
				this.setState({
					category: res.data.category,
					brand: re.data.brand,
				})
			})
		})
		this.getProduct();
	}
	componentDidMount() {
		this.brand_detail.scrollIntoView(true);
	}

	/**
	 * 根据分类查询该供应商的产品
	 * @return {[type]} [description]
	 */
	getProduct = () => {
		let params = {
			condition: {
				cid: this.state.cid,
				bid: this.bid,
			},
			page: this.state.current,
			pageSize: this.state.pageSize,
			orderBy: this.orderBy,
		}
		axios.post('/product/search-product.json', params).then(res => {
			this.setState({
				products: res.data.products,
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
		this.state.cid = item.id;
		this.getProduct();
	}
	handleChange = (page, pageSize) => {
		console.log(page, pageSize);
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
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search:this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.brand_info}>
                <div className={css.img}>
            		<img src={this.state.brand.img}/>
            		<p className={css.star}>
                		<FormattedMessage id="brand.product.rate" defaultMessage="评分"/>
                		<Rate className={css.rating} allowHalf defaultValue={this.state.brand.rating} disabled />
                		<span>{this.state.brand.rating}</span>
           			</p>
            	</div>
            	<div className={css.info}>
            		<div className={css.title}>
            			{this.state.brand.name}
            			<p className={css.collect}>
            				<Icon className={true?css.active:css.icon} type="star" />
            				<FormattedMessage id="product.detail.collect" defaultMessage="收藏"/>
            			</p>
            		</div>
            		<p>{this.state.brand.descrip}</p>
            	</div>
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
            <div className={css.footer}>
                <Pagination 
                showSizeChanger 
                onChange={this.handleChange} 
                onShowSizeChange={this.onShowSizeChange} 
                defaultCurrent={1} total={this.state.total} />
            </div>
		</div>
	}
}
export default BrandDetail;