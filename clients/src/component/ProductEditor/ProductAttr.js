import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
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
			customProperty: [],
			category: [], //产品分类对应的属性
			loading: false,
			is_show: false,

		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		let param = {
			productId: this.props.product.productId
		}
		axios.post('/product/get-product-attr.json', param).then(res => {
			if (res.data.isSucc) {
				let category = res.data.result.category;
				let select = res.data.result.selectProperty;
				let customProperty = res.data.result.customProperty ? JSON.parse(res.data.result.customProperty) : [];
				customProperty.length == 0 ? customProperty.push({}) : "";
				category.map(item => {
					if (item.property) {
						item.property.map(property => {
							select.map(select_p => {
								if (property.propertyId == select_p.propertyId) {
									property.select = select_p.propertyValId;
								}
							})

						})
					}
				})
				this.setState({
					category,
					customProperty
				})
			}
		})
	}

	handleAttr = (index) => {
		console.log(index);
		let customProperty = this.state.customProperty;
		if (index == -1) {
			customProperty.push({})
		} else {
			customProperty.splice(index, 1);
		}
		this.setState({
			customProperty
		})
	}

	handleChange = (type, index, index_attr, e) => {
		//为产品属性赋值
		if (type == 1) {
			let category = this.state.category;
			category[index].property[index_attr].select = e.target.value;
			this.setState({
				category: category
			})
		} else { //自定义属性
			let customProperty = this.state.customProperty;
			customProperty[index][index_attr] = e.target.value;
			this.setState({
				customProperty
			})
		}
	}
	backStep = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : ""
	}
	handleSave = () => {
		this.setState({
			loading: true
		})
		let param = {
			productId: this.props.product.productId,
			propertyValIds: [],
			customAttrNames: [],
			customAttrVals: [],
		}
		this.state.category.map(item => {
			item.property.map(property => {
				if (property.select) {
					param.propertyValIds.push(property.select);
				}
			})
		})
		this.state.customProperty.map(item => {
			if (item.attrName && item.attrVal) {
				param.customAttrNames.push(item.attrName);
				param.customAttrVals.push(item.attrVal);
			}
		})
		param.propertyValIds = param.propertyValIds.join(",");
		param.customAttrNames = param.customAttrNames.join(",");
		param.customAttrVals = param.customAttrVals.join(",");
		axios.post('/product/save-product-attr.json', param).then(res => {
			this.setState({
				loading: false
			})
			if (res.data.isSucc) {
				let product = res.data.result;
				this.props.handleSteps ? this.props.handleSteps(1, product) : ""
			} else if (res.data.code == 104) {
				this.props.login ? this.props.login() : ""
			} else {
				message.error(res.data.message);
			}
		})
	}

	/**
	 * 控制分类的属性显示与隐藏
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	handleShow = (index) => {
		let category = this.state.category;
		category[index].is_show = !category[index].is_show;
		this.setState({
			category: category
		})
	}

	render() {
		return <div className={`${css.product_attr} ${this.props.className}`}>
			{this.state.category.map((item, index) => {
				return <div className={css.product_attr_list}>
					<div className={css.product_category}>
						<p className={css.category_left}>
							<FormattedMessage id="app.category" defaultMessage="分类"/>&nbsp;:  
						</p>
						<p className={css.category_right}>
							{item.categoryName}
						</p>
					</div>
					{item.is_show?<div className={css.category_attr}>
						<div className={css.category_left}>
							<FormattedMessage id="mine.product.choose.attr" defaultMessage=""/>:
						</div>
						{item.property.map((attr,attr_index)=>{
							return <div className={css.categoty_attr_list}>
								<p className={css.category_attr_title}>
									{attr.propertyName}:
								</p>
								<RadioGroup className={css.category_attr_body} onChange={this.handleChange.bind(this,1,index,attr_index)} value={attr.select}>
									{attr.propertyVals.map(pVal=>{
										return <Radio value={pVal.valId}>{pVal.propertyValue}</Radio>
									})}
							    </RadioGroup>
							</div>
						})}
					</div>:""}
					{item.property&&item.property.length>0?<p className={css.category_icon} onClick={this.handleShow.bind(this,index)}>
						{item.is_show?<Icon type="up" />:<Icon type="down" />}
					</p>:""}
				</div>})}
			<div className={css.product_add_title}>
				<p className={css.category_left}>
					<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>: 
				</p>
				
				<Button className={appcss.button_blue} onClick={this.handleAttr.bind(this,-1)}>
					{this.formatMessage({id: 'mine.product.attr_add'})}
				</Button>
				
			</div>
			{this.state.customProperty.map((item,attr_index)=>{
				return <div className={css.product_custom}>
					<div className={css.product_attr_item}>
						<p className={css.category_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
						<Input placeholder={this.formatMessage({id: 'mine.product.attr_name_warn'})} 
							value={item.attrName} onChange={this.handleChange.bind(this,0,attr_index,'attrName')}/>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.product_attr_item_title}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={this.formatMessage({id: 'mine.product.attr_value_warn'})} 
						value={item.attrVal} onChange={this.handleChange.bind(this,0,attr_index,'attrVal')}/>
					</div>
					<Tooltip title={this.formatMessage({id: 'mine.product.attr_delete'})}>
						<Button style={{minWidth:"36px"}} className={appcss.button_blue} icon="minus" onClick={this.handleAttr.bind(this,attr_index)}/>
					</Tooltip>
				</div>
			})}
			<div className={css.product_footer}>
				{this.props.before?<Button type="primary" onClick={this.backStep}>
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>:""}
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}
}

export default injectIntl(ProductAttr);