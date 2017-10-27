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

class ProductSpec extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product_spec: [], //产品规格
			category: [],
			loading: false,
			select_spec: [],
			specs_list: [],
		}
		this.formatMessage = this.props.intl.formatMessage;

	}
	componentWillMount() {
		let param = {
			pid: this.props.product.productId
		}
		axios.post("/product/get-product-specif.json", param).then(res => {
			console.log(res.data)
			if (res.data.isSucc) {
				let category = res.data.result.category;
				let product_spec = category[0].spec;
				res.data.result.selectSpecs.map(item => {

				})
				this.setState({
					category,
					product_spec
				})
			} else {

			}
		})
	}
	handleChange = (e) => {
		console.log(e.target.value, this.state.category, this.state.product_spec)
		let product_spec = this.state.category[e.target.value].spec;
		this.setState({
			product_spec
		})
	}
	handleSpec = (index, key, name, e) => {
		let product_spec = this.state.product_spec;
		if (e.target.checked) {
			if (!product_spec[index].selectSpec) {
				product_spec[index].selectSpec = [];
			}
			product_spec[index].selectSpec.push({
				specVal: key,
				specName: name
			});
		} else {
			product_spec[index].selectSpec.map((item, index) => {
				if (item.specVal == key) {
					product_spec[index].selectSpec.splice(index, 1);
				}
			})
		}
		let specs_list = [];
		product_spec.map(item => {
			if (item.selectSpec) {
				let spec = JSON.parse(JSON.stringify(specs_list));
				if (spec.length == 0) {
					item.selectSpec.map(select_spec => {
						let product = {
							spec: [],
						};
						product.spec.push(select_spec);
						specs_list.push(product);
					})
				} else {
					specs_list = [];
					spec.map(product => {
						item.selectSpec.map(select_spec => {
							console.log(select_spec);
							let product_old = JSON.parse(JSON.stringify(product));
							product_old.spec.push(select_spec);
							specs_list.push(product_old);
						})
					})
				}
			}
		})
		this.setState({
			product_spec,
			specs_list
		})
	}
	handleProduct = (index, name, e) => {
		console.log(index, name, e.target.value);
		let specs_list = this.state.specs_list;
		specs_list[index][name] = e.target.value;
		this.setState({
			specs_list
		});
	}
	render() {
		return <div className={css.product_spec}>
			<p className={css.spec_item_title}>
				<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;: 
			</p>
			<RadioGroup defaultValue={0} className={css.spec_item_body} onChange={this.handleChange}>
				{this.state.category.map((item,index)=>{
					return <Radio value={index}>{item.categoryName}</Radio>
				})}
			</RadioGroup>
			{this.state.product_spec.map((item,index)=>{
				return <div className={css.product_apec_item}>
					<p className={css.spec_item_title}>{item.specName}</p>
					<p className={css.spec_item_body}>
						{item.specVal.map(spec=>{
							return  <Checkbox onChange={this.handleSpec.bind(this,index,spec.valId,spec.specValue)}>{spec.specValue}</Checkbox>
						})}
					</p>
				</div>
			})}
			<div className={css.product_spec_select_title}>
				{this.state.product_spec.map(item=>{
					return <p style={{width: 750/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}>{item.specName}</p>
				})}
				<p style={{width: 750/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}><FormattedMessage id="mine.product.factory_price" defaultMessage=""/></p>
				<p style={{width: 750/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}><FormattedMessage id="product.detail.inventory" defaultMessage=""/></p>
				<p className={css.product_spec_select_title_no}><FormattedMessage id="mine.product.art.no" defaultMessage=""/></p>
			</div>
			{this.state.specs_list.length>0?this.state.specs_list.map((item,index)=>{
				return <div className={css.product_spec_select_body}>
					{item.spec.map(spec=>{
						return <p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>{spec.specName}</p>
					})}
					<p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.priceSuppliers} onChange={this.handleProduct.bind(this,index,"priceSuppliers")}/>
					</p>
					<p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.inventorys} onChange={this.handleProduct.bind(this,index,"inventorys")}/>
					</p>
					<p className={css.product_spec_select_body_no}>
						{item.itemNumbers?<span>{item.itemNumbers}</span>:"adad"}
					</p>
				</div>
			}):""}
			<div className={css.product_footer} style={{marginTop: 20}}>
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

export default injectIntl(ProductSpec);