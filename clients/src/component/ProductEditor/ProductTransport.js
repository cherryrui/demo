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
			requires: [],
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	handleChange = (key, e) => {
		let requires = this.state.requires;
		if (e.target.checked) {
			requires.push(key);
		} else {
			requires.map((item, index) => {
				if (item == key) {
					requires.splice(index, 1);
				}
			})
		}
		this.setState({
			requires
		})
	}

	render() {
		return <div className={css.product_transport}>
			<div className={css.product_transport_item}>
				<p className={css.product_transport_item_left}>
					<FormattedMessage id="mine.product.transport" defaultMessage="运输要求"/>：
				</p>
				<div>
					{operator.transport.map(item=>{
						return <Checkbox onChange={this.handleChange.bind(this,item.key)} >{this.formatMessage({id:item.value})}</Checkbox>
					})}
				</div>
			</div>
			<div className={css.product_transport_item}>
				<p className={css.product_transport_item_left}>
					<FormattedMessage id="mine.product.transport" defaultMessage=""/>：
				</p>
				<TextArea style={{width:"465px"}} onChange={this.handleChange.bind(this)}  rows={4} />
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