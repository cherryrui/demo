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
	}
	componentWillMount() {
		let param = {
			productId: 76
		}
		axios.post('/product/get-product-attr.json', param).then(res => {
			if (res.data.isSucc) {
				let category = res.data.result.category;
				let select = res.data.result.selectProperty;
				let customProperty = JSON.parse(res.data.result.customProperty);
				customProperty.length == 0 ? customProperty.push({}) : "";
				category.map(item => {
					item.property.map(property => {
						select.map(select_p => {
							if (property.propertyId == select_p.propertyId) {
								property.select = select_p.propertyValId;
							}
						})

					})
				})
				this.setState({
					category,
					customProperty
				})
			}
		})
	}

	handleAttr = (index) => {
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
			this.state.customProperty[index][index_attr] = e.target.value;
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
		console.log(this.state.customProperty);
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
		console.log(this.state.category);
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div className={css.product_attr}>
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
					{item.is_show?<div>
						{item.property.map((attr,attr_index)=>{
							return <div className={css.category_attr}>
								<div className={css.category_left}>
									<FormattedMessage id="mine.product.choose.attr" defaultMessage=""/>:
								</div>
								<div className={css.categoty_attr_list}>
									<p className={css.category_attr_title}>
										{attr.propertyName}:
									</p>
									<RadioGroup className={css.category_attr_body} onChange={this.handleChange.bind(this,1,index,attr_index)} value={attr.select}>
										{attr.propertyVals.map(pVal=>{
											return <Radio value={pVal.valId}>{pVal.propertyValue}</Radio>
										})}
								     </RadioGroup>
								</div>
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
					{formatMessage({id: 'mine.product.attr_add'})}
				</Button>
				
			</div>
			{this.state.customProperty.map((item,attr_index)=>{
				return <div className={css.product_custom}>
					<div className={css.product_attr_item}>
						<p className={css.category_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} 
							defaultValue={item.attrName} onChange={this.handleChange.bind(this,0,attr_index,'attrName')}/>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.product_attr_item_title}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
						defaultValue={item.attrVal} onChange={this.handleChange.bind(this,0,attr_index,'attrVal')}/>
					</div>
					<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
						<Button style={{minWidth:"36px"}} className={appcss.button_blue} icon="minus" onClick={this.handleAttr.bind(this,attr_index)}/>
					</Tooltip>
				</div>
			})}
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

export default injectIntl(ProductAttr);