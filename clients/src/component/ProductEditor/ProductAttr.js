import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
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
			category: [], //产品分类对应的属性
			loading: false,
			is_show: false,

		}
	}
	componentWillMount() {
		console.log(this.props.product);
		//根据产品id获取其所有的属性
		axios.get(`/product/get-product-attr.json?pid=${this.props.product.id}`).then(res => {
			let category = res.data.category;
			category[0].is_show = true;
			if (this.props.product.category && this.props.product.category.length > 0) {
				this.props.product.category.map(item => {
					category.map(cate => {
						if (item.id == cate.id) {
							item.attr.map(at => {
								cate.attr.map(att => {
									if (at.id == att.id) {
										att.value = at.value
									}
								})
							})
						}
					})
				})
			}
			this.setState({
				category: res.data.category
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
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div className={css.product_attr}>
			{this.state.category.map((item,index)=>{
				return <div className={css.product_attr_list}>
					<div className={css.product_category}>
						<p className={css.category_left}>
							<FormattedMessage id="app.category" defaultMessage="分类"/>&nbsp;:  
						</p>
						<p className={css.category_right}>
							{item.name.map((cate,len)=>{
								return <p>
									{cate}{len==item.name.length-1?"":">>"}
								</p>
							})}
						</p>
					</div>
					{item.is_show?<div>
					{item.attr.map((attr,attr_index)=>{
						return <div className={css.product_attr_item}>
							<p className={css.attr_item_left}>
								{attr.name}&nbsp;
							</p>
							<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
									value={attr.value} 
									onChange={this.handleChange.bind(this,1,index,attr_index)}/>
						</div>
					})}
					{index==0?<div className={css.product_add_title}>
						<p className={css.add_left}>
							<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;  
						</p>
						<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
							<Button icon="plus" onClick={this.handleAttr.bind(this,-1)}/>
						</Tooltip>
					</div>:""}
					{index==0?this.state.new_attr.map((item,attr_index)=>{
						return <div>
							<div className={css.product_attr_item}>
								<p className={css.attr_item_left}>
									<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
								</p>
					
								<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} 
									onChange={this.handleChange.bind(this,0,attr_index,'name')}/>
								<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
									<Button icon="minus" onClick={this.handleAttr.bind(this,attr_index)}/>
								</Tooltip>
							</div>
							<div className={css.product_attr_item}>
								<p className={css.attr_item_left}>
									<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
								</p>
								<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
								onChange={this.handleChange.bind(this,0,attr_index,'value')}/>
							</div>
						</div>
					}):""}
				</div>:""}
				<p className={css.category_icon} onClick={this.handleShow.bind(this,index)}>
					{item.is_show?<Icon type="up" />:<Icon type="down" />}
				</p>
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