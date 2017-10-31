import React from 'react';
import css from './ProductEditeDetail.scss';
import axios from 'axios';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Link
} from 'react-router';
import {
	Breadcrumb
} from 'antd';

class ProductEditeDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			product: {},
		}
	}
	componentWillMount() {

	}
	getProduct() {
		let param = {
			pid: this.props.params.id
		}
		axios.post('/product/get-product-info-byid.json', param).then(res => {
			console.log(res.data);
		})
	}


	render() {
		return <div>
			<p>{this.state.product.productName}</p>
			<p></p>
			<div>
				{this.state.product.imgs.map(item=>{
					return <div>
						<img src={item.url}/>
					</div>
				})}
			</div>

		</div>
	}
}

class Basic extends React.Component {


	render() {
		return <div>
			<div>
				<FormattedMessage id="mine.product.basic" defaultMessage=""/>
				<p>
					<FormattedMessage id="mine.product.edit" defaultMessage=""/>
				</p>
			</div>
		</div>
	}
}
export default injectIntl(ProductEditeDetail);