import React from 'react';
import appcss from '../../App.scss';
import css from './BrandDetail.scss';
import CusPagination from '../Public/CusPagination/CusPagination.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';
import operator from './operator.js'
import axios from 'axios';
import {
	Breadcrumb,
	Pagination,
	Icon,
	Rate,
	message
} from 'antd';
import {
	Link
} from 'react-router';
import {
	FormattedMessage,
	injectIntl,
	intlShape
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
			current: 1,
			total: 0,
			sortType: 0, //排序名称
			orderType: "", //排序方式，倒序，
			cid: 0,
			visible: false,
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {

		axios.get(`/category/get-brand-category.json?supplierId=${this.props.params.id}`).then(re => {
			axios.get(`/brand/get-brand-byid.json?supplierId=${this.props.params.id}`).then(res => {
				this.setState({
						category: re.data.result,
						brand: res.data.result,
					})
					/*console.log(this.state.category[0].categoryId);*/
				this.getProduct();
			})
		})
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
			supplierId: this.state.brand.sid,
			categoryId: this.state.cid,
			pageSize: this.state.pageSize,
			pageNo: this.state.current,
			sortType: this.state.sortType,
			orderType: this.state.orderType
		}
		axios.post('/product/get-brand-product.json', params).then(res => {
			console.log(res.data)
			this.setState({
				products: res.data.result.list,
				total: res.data.result.allRow,
				totalPage: res.data.result.totalPage
			})
			this.brand_detail.scrollIntoView(true);
		})

	}
	handleSort = (name, key) => {
		console.log(name, key)
		this.setState({
			sortType: name,
			orderType: key
		}, () => {
			this.getProduct()
		})
	}
	handleStar = (type, index) => {
		if (sessionStorage.user) {
			let param = {
				objectType: type,
				objectId: type == 1 ? this.state.products[index].productId : this.state.brand.sid,
			}
			axios.post('/api/set-star.json', param).then(res => {
				if (res.data.code == 104) {
					this.setState({
						visible: false
					})
				} else if (res.data.isSucc) {
					message.success(this.formatMessage({
						id: "collect.success"
					}));
					if (type == 1) {
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
				} else if (res.data.code == 122) {
					message.warn(this.formatMessage({
						id: "collect.successed"
					}));
					if (type == 1) {
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
				} else {
					message.error(res.data.message);
				}
			})
		} else {
			this.setState({
				visible: true
			})
		}
	}
	onSelect = (item) => {
		this.setState({
			cid: item,
			current: 1,
		}, () => {
			this.getProduct();
		})

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
						<Link to="/page">
                            <FormattedMessage id="app.home" defaultMessage="首页"/>
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
                		<Rate className={css.rating} allowHalf value={this.state.brand.level} disabled />
                		<span>{this.state.brand.level}</span>
           			</p>
            	</div>
            	<div className={css.info}>
            		<div className={css.title}>
            			<p  className={css.title_Name}>{this.state.brand.supplierName}</p>
            			<p className={css.collect} onClick={this.handleStar.bind(this,2)}>
            				<Icon className={true?css.active:css.icon} type="star" />
            				<FormattedMessage id="product.detail.collect" defaultMessage="收藏"/>
            			</p>
            		</div>
            		<p className={css.brand_intro}><div dangerouslySetInnerHTML={{__html: this.state.brand.introduction}} /></p>
            	</div>
            </div>
            {this.state.category.length>0?<SingleSelect 
            	all 
            	current={this.state.cid}
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
                        values={{total:(this.state.total==0?"0":this.state.total)}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" simple pageSize={this.state.pageSize} total={this.state.total} current={this.state.current} onChange={this.handleChange} />
                </div>
            </div>
            <div className={css.product_list}>
                {this.state.products.map((item,index)=>{
                    return <Product className={css.product} product={item} handleStar={this.handleStar.bind(this,1,index)} addCart/>
                })}
            </div>
            <CusPagination onChange={this.handleChange} total={this.state.total} onShowSizeChange={this.onShowSizeChange} />
			<LoginModal visible={this.state.visible} closeModal={this.handleCancel}/>
		</div>
	}
}
BrandDetail = injectIntl(BrandDetail);
export default BrandDetail;