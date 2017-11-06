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
				transportationOther: "",
			}
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		let param = {
			pid: this.props.product.productId
		}
		axios.post('/product/get-product-transport.json', param).then(res => {
			console.log(res.data);
			if (res.data.isSucc) {

				if (res.data.result) {
					let transport = this.state.transport;
					let transportationExplain = res.data.result.transportationExplain ? JSON.parse(res.data.result.transportationExplain) : "";
					for (let key in transportationExplain) {
						transport.explains.push(transportationExplain[key]);
					}
					transport.transportationOther = res.data.result.transportationOther;
					this.setState({
						transport
					})
				}
			} else if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
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
		let transport = this.state.transport;
		transport.transportationOther = e.target.value;
		this.setState({
			transport
		})
	}
	goBack = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : "";
	}
	handleSave = () => {
		this.state.transport.explains = this.state.transport.explains.join(",");
		this.state.transport.productId = this.props.product.productId;
		axios.post('/product/save-transport.json', this.state.transport).then(res => {
			if (res.data.isSucc) {
				this.props.handleSteps ? this.props.handleSteps(1) : "";
			} else if (res.data.code == 104) {
				this.pros.login ? this.props.login() : "";
			} else {
				message.error(res.data.message);
			}
		})
	}

	render() {
		console.log(this.state.transport);
		return <div className={`${css.product_transport} ${this.props.className}`}>
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
				<TextArea  value={this.state.transport.transportationOther} style={{width:"465px"}} onChange={this.handleText.bind(this)}  rows={4} />
			</div>
			<div className={css.product_footer}>
				{this.props.before?<Button type="primary" onClick={this.goBack}>
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>:""}
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}


}
ProductTransport = injectIntl(ProductTransport);
export default ProductTransport;