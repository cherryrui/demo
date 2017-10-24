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
			new_attr: [{
				id: 1
			}],
			category: [], //产品分类对应的属性
			loading: false,
			is_show: false,

		}
	}
	componentWillMount() {
		console.log(this.props.product);
		let param = {
			productId: 76
		}
		axios.post('/product/get-product-attr.json', param).then(res => {
			if (res.data.isSucc) {
				let category = res.data.result.all;
				let select = res.data.result.select;
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
					category
				})
			}
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

	handleChange = (type, index, index_attr, e) => {
		console.log(type, index, index_attr, e)
			//为产品属性赋值
		if (type == 1) {
			let category = this.state.category;
			category[index].attr[index_attr].value = e.target.value;
			this.setState({
				category: category
			})
		} else { //自定义属性
			this.state.new_attr[index][index_attr] = e.target.value;
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
			category: this.state.category,
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
									<RadioGroup className={css.category_attr_body} onChange={this.onChange} value={attr.select}>
										{attr.propertyVals.map(pVal=>{
											return <Radio value={pVal.valId}>{pVal.propertyValue}</Radio>
										})}
								     </RadioGroup>
								</div>
							</div>
						})}
					</div>:""}
					<p className={css.category_icon} onClick={this.handleShow.bind(this,index)}>
						{item.is_show?<Icon type="up" />:<Icon type="down" />}
					</p>
				</div>})}
			<div className={css.product_add_title}>
				<p className={css.category_left}>
					<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>: 
				</p>
				<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
					<Button className={appcss.button_blue} icon="plus" onClick={this.handleAttr.bind(this,-1)}/>
				</Tooltip>
			</div>
			{this.state.new_attr.map((item,attr_index)=>{
				return <div className={css.product_custom}>
					<div className={css.product_attr_item}>
						<p className={css.category_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} 
							onChange={this.handleChange.bind(this,0,attr_index,'name')}/>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.product_attr_item_title}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
						onChange={this.handleChange.bind(this,0,attr_index,'value')}/>
					</div>
					<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
						<Button className={appcss.button_blue} icon="minus" onClick={this.handleAttr.bind(this,attr_index)}/>
					</Tooltip>
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