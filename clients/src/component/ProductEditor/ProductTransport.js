import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import operator from './operator.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Checkbox,
	Input,
	message,
	Button
} from 'antd';
const {
	TextArea
} = Input;

class ProductTransport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transport: {
				explains: [],
				transportationExplain: "",
			}
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	handleChange = (key, e) => {
		let transport = this.state.transport;
		if (e.target.checked) {
			transport.explains.push(key);
		} else {
			transport.explains.map((item, index) => {
				if (item == key) {
					transport.explains.splice(index, 1);
				}
			})
		}
		this.setState({
			transport
		})
	}
	handleText = (e) => {
		this.state.transport.transportationExplain = e.target.value
	}
	handleSave = () => {
		this.state.transport.explains = this.state.transport.explains.join(",");
		this.state.transport.productId = this.props.product.productId;
		axios.post('/product/save-transport.json', this.state.transport).then(res => {
			console.log(res.data);
		})
	}

	render() {
		console.log(this.state.transport);
		return <div className={css.product_transport}>
			<div className={css.product_transport_item}>
				<p className={css.product_transport_item_left}>
					<FormattedMessage id="mine.product.transport" defaultMessage="运输要求"/>：
				</p>
				<div>
					{operator.transport.map(item=>{
						return <Checkbox checked={this.state.transport.explains.indexOf(item.name)>-1?true:false} 
						onChange={this.handleChange.bind(this,item.name)} >{this.formatMessage({id:item.value})}</Checkbox>
					})}
				</div>
			</div>
			<div className={css.product_transport_item}>
				<p className={css.product_transport_item_left}>
					<FormattedMessage id="mine.product.transport" defaultMessage=""/>：
				</p>
				<TextArea  defaultValue={this.state.transport.transportationExplain} style={{width:"465px"}} onChange={this.handleText.bind(this)}  rows={4} />
			</div>
			<div className={css.product_footer}>
				<Button type="primary">
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}


}
ProductTransport = injectIntl(ProductTransport);
export default ProductTransport;