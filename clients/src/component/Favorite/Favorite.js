/**
 * Created by WF on 2017/9/8.
 */
import React from 'react';
import css from './Favorite.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import Product from '../Public/Product/Product.js';
import Brand from '../Public/Brand/Brand.js';
import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import CusPagination from '../Public/CusPagination/CusPagination.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Pagination,
	Tooltip,
	Checkbox,
	Icon,
	message
} from 'antd'

class Favorite extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			category: [],
			cid: 0,
			select_data: [],
			data: [],
			total: 0,
			pageNo: 1,
			pageSize: Number(this.props.params.type) == 1 ? 12 : 15,
			indeterminate: false,
			select_id: -1,
			pageSizeOptions: ["15", "20", "25"]
		}
		this.formatMessage = this.props.intl.formatMessage;
		this.type = Number(this.props.params.type); //1：收藏商品，2：收藏供应商
	}
	componentWillMount() {
		this.initPage();
	}
	componentWillReceiveProps(nextProps) {
		if (Number(nextProps.params.type) !== this.type) {
			this.type = Number(nextProps.params.type);
			this.state.pageSize = this.type == 1 ? 12 : 15;
			this.initPage();
		}
	}
	handleType = () => {
		this.type = this.type == 1 ? 2 : 1;
		this.initPage();
	}
	initPage = () => {
		axios.post('/category/get-favorite-category.json', {
			type: this.type
		}).then(res => {
			if (res.data.isSucc) {
				this.setState({
					category: res.data.result
				})
			} else if (res.data.code == 104) {
				console.log("code == 10400", this.props.handleVisible);
				this.props.handleVisible ? this.props.handleVisible(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
		this.getData();
	}
	getData() {
		let param = {
			categoryId: this.state.cid ? this.state.cid : 0,
			pageSize: this.state.pageSize,
			pageNo: this.state.pageNo,
		}
		let url = "";
		if (this.type == 1) {
			url = '/product/get-favorite-product.json';
		} else {
			url = "/brand/get-favorite-brand.json";
		}
		axios.post(url, param).then(res => {
			if (res.data.isSucc) {
				this.setState({
					data: res.data.result.list,
					total: res.data.result.allRow
				})
			} else if (res.data.code == 104) {
				this.props.handleVisible ? this.props.handleVisible(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
		this.props.goTop();
	}
	onSelect = (key) => {
		this.state.cid = key;
		this.getData();
	}
	handleCheck = (key) => {
		let data = this.state.data;
		let select_data = [];
		data.map(item => {
			if (item.collectId == key.collectId) {
				if (item.checked) {
					item.checked = false;
				} else {
					item.checked = true;
				}
			}
			if (item.checked) {
				select_data.push(item.collectId);
			}
		})
		let indeterminate = false;
		if (select_data.length > 0 && select_data.length < this.state.data.length) {
			indeterminate = true;
		}
		this.setState({
			data: data,
			select_data: select_data,
			indeterminate: indeterminate
		})
	}
	handleDelete = (key) => {
		console.log(key, this.state.select_data);
		let param = {
			collectIds: [],
		};
		if (!isNaN(key)) {
			param.collectIds.push(key);
		} else if (this.state.select_data.length > 0) {
			param.collectIds = this.state.select_data;
		} else {
			message.warning(this.formatMessage({
				id: 'cart.select.product'
			}))
		}
		if (param.collectIds.length > 0) {
			param.collectIds = param.collectIds.join(",");
			axios.post('/user/delete-favorite.json', param).then(res => {
				if (res.data.isSucc) {
					this.state.select_data = [];
					this.getData();
				} else {
					message.error(res.data.message);
				}
			})
		}
	}
	handleChange = (e) => {
		let data = this.state.data;
		let select_data = [];
		data.map(item => {
			if (e.target.checked) {
				item.checked = true;
				select_data.push(item.collectId);
			} else {
				item.checked = false;
			}
		})
		this.setState({
			data: data,
			select_data: select_data,
			indeterminate: false
		})
	}
	handleChangePage = (page, pageSize) => {
		this.state.pageNo = page;
		this.state.pageSize = pageSize;
		this.getData();
	}
	handleFooter = (index) => {
		if (index >= -1 && this.state.select_id != -1) {
			this.setState({
				select_id: index,
			})
		}
	}
	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div>
			 <div className={basecss.child_title}>
			 	<p onClick={this.handleType}>
                	<FormattedMessage id={this.type==1?"mine.favorite.product":"mine.favorite.brand"} 
                	defaultMessage="分类"/>
                </p>
                <p onClick={this.handleType}>
                	<FormattedMessage id={this.type==2?"mine.favorite.product":"mine.favorite.brand"} 
                	defaultMessage="分类"/>
                </p>
            </div>
            {this.state.category.length>0?<div className={css.select_category}>
            	<div className={css.select_title}>
            		<FormattedMessage id="app.category" defaultMessage=""/>
            	</div>
            	<div className={css.select_body}>
            		{this.state.category.map(item=>{
            			return <p className={this.state.cid==item.categoryId?css.select_active:css.select_item} onClick={this.onSelect.bind(this,item.categoryId)}>{item.categoryName}{item.total>0?"("+item.total+")":""}</p>
            		})}
            	</div>
            </div>:""}
            <div className={css.data_list} onMouseLeave={this.handleFooter.bind(this, -1)}>
	            {this.state.data.map((item,index)=>{
	            	return <div onMouseEnter={this.handleFooter.bind(this, index)} className={this.type==1?css.list_product_item:css.list_brand_item}>
	            	{this.type==1?<Product 
	            		product={item} 
	            		className={(index+1)%4==0?css.data_item_right:css.data_item} 
	            		check
	            		onCheck={this.handleCheck}
	            		/>
	            		:<Brand brand={item} 
	            			className={(index+1)%5==0?css.brand_item_right:css.brand_item} 
	            			check
	            			showStar
	            			onCheck={this.handleCheck}
	            		/>}
	            		{this.type==1 && this.state.select_id==index?<div onClick={this.handleDelete.bind(this,item.collectId)} className={(index+1)%4==0?css.footer_right:css.product_footer}>
	            			<Icon type="delete"/>
	            		</div>:this.type==2&&this.state.select_id==index?
	            		<div onClick={this.handleDelete.bind(this,item.collectId)} className={(index+1)%5==0?css.footer_right:css.brand_footer}>
	            			<Icon type="delete"/>
	            		</div>:""}
	            	</div>
	            })}
            </div> 
            <div className={css.footer}>
				<p className={css.left}>
                    <Checkbox onChange={this.handleChange} checked={this.state.select_data.length==this.state.data.length?true:false} indeterminate={this.state.indeterminate}>
                        <FormattedMessage id="order.status.all" defaultMessage="all"/>
                    </Checkbox>
					<Tooltip title={formatMessage({id: 'cart.delete.all'})}>
                        <Icon type="delete" onClick={this.handleDelete} />
                    </Tooltip> 
                </p> 
                <Pagination onChange={this.handleChangePage} 
                	pageSize={this.state.pageSize} 
                	total={this.state.total} />
			</div> 
		</div>
	}
}
export default injectIntl(Favorite);