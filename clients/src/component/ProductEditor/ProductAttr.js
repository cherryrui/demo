import React from 'react';
import css from './ProductEditor.scss';
import axios from 'axios';
import lrz from 'lrz';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Form,
	Icon,
	Input,
	Button,
	Checkbox,
	message,
	Upload,
	InputNumber,
	Select,
	Cascader,
	Modal,
	Radio,
	Tooltip
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
class ProductAttr extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			new_attr: [{
				id: 1
			}],
			attr: [],
			loading: false,

		}
	}
	componentWillMount() {
		axios.get(`/product/get-product-attr.json?category_id=${this.props.product.category_id}`).then(res => {
			this.setState({
				attr: res.data.attr
			})
		})
	}

	handleAttr = (index) => {
		let new_attr = this.state.new_attr;
		if (index == -1) {
			new_attr.push({
				id: new_attr.length > 0 ? new_attr[new_attr.length - 1].id + 1 : 1
			})
		} else {
			new_attr.splice(index, 1);
		}
		this.setState({
			new_attr: new_attr
		})
	}

	handleChange = (type, index, name, e) => {
		console.log(type, index, name, e)
			//为产品属性赋值
		if (type == 1) {
			let attr = this.state.attr;
			attr[index].value = name.target.value;
			this.setState({
				attr: attr
			})
		} else { //自定义属性
			this.state.new_attr[index][name] = e.target.value;
		}
	}
	backStep = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : ""
	}
	handleSave = () => {
		console.log("handleSave");
		this.setState({
			loading: true
		})
		let param = {
			id: this.props.product.id,
			attr: this.state.attr,
			new_attr: this.state.new_attr,
		}
		axios.post('/product/save-product-attr.json', param).then(res => {
			let pro = this.props.product;
			pro.attr = res.data.attr;
			this.setState({
				loading: false
			})
			this.props.handleSteps ? this.props.handleSteps(1, pro) : ""
		})
	}


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div className={css.product_attr}>
			<div className={css.product_category}>
				<p className={css.category_left}>
					<FormattedMessage id="app.category" defaultMessage="分类"/>&nbsp;:  
				</p>

				<p className={css.category_right}>{this.props.product.category.map(item=>{
					return <p>{item.name}{item.isLeaf?"":">>"}</p>
				})}</p>
			</div>
			{this.state.attr.map((item,index)=>{
				return <div className={css.product_attr_item}>
					<p className={css.attr_item_left}>{item.name}&nbsp;:</p>
					<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} value={item.value} onChange={this.handleChange.bind(this,1,index)}/>
				</div>
			})}
			<div className={css.product_add_title}>
				<p className={css.add_left}>
					<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;  
				</p>
				<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
					<Button icon="plus" onClick={this.handleAttr.bind(this,-1)}/>
				</Tooltip>
			</div>

			{this.state.new_attr.map((item,index)=>{
				return <div>
					<div className={css.product_attr_item}>
						<p className={css.attr_item_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
			
						<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} onChange={this.handleChange.bind(this,0,index,'name')}/>
						<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
							<Button icon="minus" onClick={this.handleAttr.bind(this,index)}/>
						</Tooltip>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.attr_item_left}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
						onChange={this.handleChange.bind(this,0,index,'value')}/>
					</div>
				</div>
			})}
			<div className={css.product_footer}>
				<Button type='primary' className={appcss.button_green} onClick={this.backStep}>
					<FormattedMessage id="app.before" defaultMessage="上一步"/>  
				</Button>
				<Button type='primary' loading={this.state.loading} onClick={this.handleSave}>
					<FormattedMessage id="app.save" defaultMessage="上一步"/> 
				</Button>
			</div>
		</div>
	}
}

export default injectIntl(ProductAttr);