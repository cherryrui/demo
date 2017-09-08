/**
 * Created by WF on 2017/9/8.
 */
import React from 'react';
import css from './FavoriteProduct.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import Product from '../Public/Product/Product.js';
import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';

class FavoriteProduct extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			category: [],
			category_id: 0,
			products: [],

		}
	}
	componentWillMount() {
		axios.get('/category/get-favorite-category.json').then(res => {
			this.setState({
				category: res.data.category
			})
		})
		this.getProducts();
	}
	getProducts = () => {
		axios.get(`/product/get-favorite-product.json?cid=${this.stat.category_id}`).then(res => {
			this.setState({
				products: res.data.products
			})
		})
	}

	render() {


		return <div>
			 <div className={basecss.child_title}>
                <FormattedMessage id="mine.person" defaultMessage="分类"/>
            </div>
            {this.state.category.length>0?<SingleSelect
                all
                data={this.state.category}
                onSelect={this.onSelect.bind(this)}
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />:""}
            {this.state.products.map(item=>{
            	return <Product product={item} className={css.like_item} check/>
            })}
		</div>

	}
}
export default FavoriteProduct;