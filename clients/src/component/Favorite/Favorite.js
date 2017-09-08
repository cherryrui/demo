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
			category_id: 0,
			select_product: [],
			data: [],
			total: 50,
			current: 1,
			indeterminate: false,
			type: this.props.params.type, //1：收藏商品，2：收藏供应商

		}
	}
	componentWillMount() {
		axios.get('/category/get-favorite-category.json').then(res => {
			this.setState({
				category: res.data.category
			})
		})
		if (this.state.type == 1) {
			this.getProducts();
		} else {
			this.getBrands();
		}

	}
	getProducts = () => {
		axios.get(`/product/get-favorite-product.json?cid=
			${this.state.category_id}&page=${this.state.current}`).then(res => {
			this.setState({
				data: res.data.products,
				total: res.data.total
			})
		})
	}
	getBrands = () => {
		axios.get(`/brand/get-favorite-brand.json?cid=
			${this.state.category_id}&page=${this.state.current}`).then(res => {
			this.setState({
				data: res.data.brand,
				total: res.data.total
			})
		})
	}
	onSelect = (key) => {
		console.log(key);
		this.setState({
			category_id: key
		})
	}
	handleCheck = (key) => {
		let data = this.state.data;
		let select_product = [];
		data.map(item => {
			if (item.id == key) {
				if (item.checked) {
					item.checked = false;
				} else {
					item.checked = true;
				}
			}
			if (item.checked) {
				select_product.push(item.id);
			}
		})
		let indeterminate = false;
		if (select_product.length > 0 && select_product.length < this.state.products.length) {
			indeterminate = true;
		}
		this.setState({
			data: data,
			select_product: select_product,
			indeterminate: indeterminate
		})
	}
	deleteProduct = () => {
		if (this.state.select_product.length > 0) {
			axios.post('/product/delete-favorite-products.json', this.state.select_product).then(res => {

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
		let select_product = [];
		data.map(item => {
			if (e.target.checked) {
				item.checked = true;
				select_product.push(item.id);
			} else {
				item.checked = false;
			}
		})
		this.setState({
			data: data,
			select_product: select_product,
			indeterminate: false
		})
	}


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div>
			 <div className={basecss.child_title}>
                <FormattedMessage id="mine.favorite.product" defaultMessage="分类"/>
            </div>
            {this.state.category.length>0?<SingleSelect
                all
                data={this.state.category}
                onSelect={this.onSelect.bind(this)}
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />:""}
            <div className={css.product_list}>
	            {this.state.data.map(item=>{
	            	return this.state.type==1?<Product 
	            		product={item} 
	            		className={css.product_item} 
	            		check
	            		onCheck={this.handleCheck}
	            		/>
	            		:<Brand brand={item} 
	            			className={css.product_item} 
	            			check
	            			onCheck={this.handleCheck}
	            		/>
	            })}
            </div>
            <div className={css.footer}>
                <p className={css.left}>
                    <Checkbox onChange={this.handleChange} checked={this.state.select_product.length==this.state.data.length?true:false} indeterminate={this.state.indeterminate}>
                        <FormattedMessage id="order.status.all" defaultMessage="all"/>
                    </Checkbox>
					<Tooltip title={formatMessage({id: 'cart.delete.all'})}>
                        <Icon type="delete" onClick={this.deleteProduct} />
                    </Tooltip> 
                </p>
                <Pagination defaultCurrent={1} total={this.state.total} />
            </div>
		</div>

	}
}
export default injectIntl(Favorite);