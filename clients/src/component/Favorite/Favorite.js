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
	Icon

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
			pageSize: 12,
			indeterminate: false,
		}
		this.type = Number(this.props.params.type); //1：收藏商品，2：收藏供应商
	}
	componentWillMount() {
		this.initPage();
	}
	componentWillReceiveProps(nextProps) {
		if (Number(nextProps.params.type) !== this.type) {
			this.type = Number(nextProps.params.type);
			this.initPage();
		}
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
			if (item.id == key) {
				if (item.checked) {
					item.checked = false;
				} else {
					item.checked = true;
				}
			}
			if (item.checked) {
				select_data.push(item.id);
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
	deleteData = () => {
		if (this.state.select_data.length > 0) {
			let url = this.state.type == 1 ? "/product/delete-favorite-products.json" : "/product/delete-favorite-products.json";
			axios.post(url, this.state.select_data).then(res => {
				this.getData();
			})
		} else {
			const {
				intl: {
					formatMessage
				}
			} = this.props;
			message.warning(formatMessage({
				id: 'cart.select.product'
			}))
		}
	}
	handleChange = (e) => {
		let data = this.state.data;
		let select_data = [];
		data.map(item => {
			if (e.target.checked) {
				item.checked = true;
				select_data.push(item.id);
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
		this.state.pageNo = pageNo;
		this.state.pageSize = pageSize;
		this.getData();
	}


	render() {
		console.log(this.state.total);
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div>
			 <div className={basecss.child_title}>
                <FormattedMessage id={this.type==1?"mine.favorite.product":"mine.favorite.brand"} 
                defaultMessage="分类"/>
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
            <div className={css.data_list}>
	            {this.state.data.map((item,index)=>{
	            	return this.type==1?<Product 
	            		product={item} 
	            		className={(index+1)%4==0?css.data_item_right:css.data_item} 
	            		check
	            		onCheck={this.handleCheck}
	            		/>
	            		:<Brand brand={item} 
	            			className={(index+1)%4==0?css.brand_item_right:css.brand_item} 
	            			check
	            			showStar
	            			onCheck={this.handleCheck}
	            		/>
	            })}
            </div>
            <div className={css.footer}>
                <p className={css.left}>
                    <Checkbox onChange={this.handleChange} checked={this.state.select_data.length==this.state.data.length?true:false} indeterminate={this.state.indeterminate}>
                        <FormattedMessage id="order.status.all" defaultMessage="all"/>
                    </Checkbox>
					<Tooltip title={formatMessage({id: 'cart.delete.all'})}>
                        <Icon type="delete" onClick={this.deleteData} />
                    </Tooltip> 
                </p>
                <CusPagination onChange={this.handleChangePage} total={this.state.total} onShowSizeChange={this.handleChangePage} />
        	</div>
		</div>

	}
}
export default injectIntl(Favorite);