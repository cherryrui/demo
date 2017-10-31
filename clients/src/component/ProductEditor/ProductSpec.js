import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import moment from 'moment';
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
		this.select_category = {};
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
		let product_spec = this.state.category[e.target.value].spec;
		let specs_list = [];
		this.select_category = this.state.category[e.target.value];
		this.setState({
			product_spec,
			specs_list
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
			product_spec[index].selectSpec.map((item, select) => {
				if (item.specVal == key) {
					product_spec[index].selectSpec.splice(select, 1);
				}
			})
		}
		let specs_list = [];
		product_spec.map((item, index_spec) => {
			if (item.selectSpec) {
				let spec = JSON.parse(JSON.stringify(specs_list));
				console.log(spec);
				if (spec.length == 0) {
					console.log(item.selectSpec)
					item.selectSpec.map(select_spec => {
						let product = {
							spec: new Array(product_spec.length),
						};
						product.spec[index_spec] = select_spec;
						specs_list.push(JSON.parse(JSON.stringify(product)));
					})
				} else {
					specs_list = [];
					spec.map(product => {
						item.selectSpec.map(select_spec => {
							let product_old = JSON.parse(JSON.stringify(product));
							console.log(product_old, select_spec);
							product_old.spec[index_spec] = select_spec;
							specs_list.push(product_old);
						})
					})
				}
			}
		})
		specs_list.map(list => {
			this.state.specs_list.map(item => {
				if (item.spec && list.spec) {
					let flag = true;
					for (let i = 0; i < product_spec.length; i++) {
						if (!(item.spec[i] && list.spec[i] && (item.spec[i].specVal == list.spec[i].specVal))) {
							flag = false;
						}
					}
					if (flag) {
						list.priceSuppliers = item.priceSuppliers;
						list.inventorys = item.inventorys;
						list.itemNumbers = item.itemNumbers;
					}
				}
			})
		})
		this.setState({
			product_spec,
			specs_list
		})
	}
	handleProduct = (index, name, e) => {
		console.log(index, name, e.target.value);
		let specs_list = this.state.specs_list;
		if (name === "priceSuppliers") {
			let price = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
			specs_list[index][name] = price && !isNaN(price) ? price : 0;
		} else {
			specs_list[index][name] = isNaN(e.target.value) ? 0 : Number(e.target.value);

		}
		this.setState({
			specs_list
		});
	}
	handleSave = () => {

		console.log(this.state.specs_list);
		if (this.state.specs_list.length == 0) {
			this.props.handleSteps ? this.props.handleSteps(1) : "";
		} else {
			let param = {
				specIds: [],
				specValIds: [],
				priceSuppliers: [],
				inventorys: [],
				itemNumbers: [],
				itemIds: [],
			};
			let flag = true;
			this.state.specs_list.map(item => {
				let spec = [];
				item.spec.map(sp => {
					if (sp && sp.specVal) {
						spec.push(sp.specVal);
					} else {
						flag = false;
						message.error(this.formatMessage({
							id: "mine.product.spec.spec_warn"
						}))
						return;
					}
				})
				spec = spec.join("-");
				param.specValIds.push(spec);
				if (item.priceSuppliers) {
					param.priceSuppliers.push(item.priceSuppliers);
				} else {
					flag = false;
					message.error(this.formatMessage({
						id: "mine.product.spec.price_warn"
					}))
				}
				if (item.inventorys || item.inventorys == 0) {
					param.inventorys.push(item.inventorys);
				} else {
					flag = false;
					message.error(this.formatMessage({
						id: "mine.product.spec.inv_warn"
					}))
				}
				if (item.itemNumbers || item.itemNumbers == 0) {
					param.itemNumbers.push(item.itemNumbers);
				} else {
					flag = false;
					message.error(this.formatMessage({
						id: "mine.product.spec.item_warn"
					}))
				}
				param.itemIds.push(item.itemIds ? item.itemIds : "-")
			})
			if (flag) {
				param.specValIds = param.specValIds.join(",");
				param.priceSuppliers = param.priceSuppliers.join(",");
				param.inventorys = param.inventorys.join(",");
				param.itemNumbers = param.itemNumbers.join(",");
				this.state.product_spec.map(item => {
					param.specIds.push(item.specId)
				})
				param.itemIds = param.itemIds.join(",");
				param.specIds = param.specIds.join(",");
				param.productId = this.props.product.productId;
				param.categoryId = this.select_category.categoryId;
				param.oldCategoryId = this.props.product.oldCategoryId ? this.props.product.oldCategoryId : null
				axios.post('/product/save-product-spec.json', param).then(res => {
					console.log(res.data);
					if (res.data.isSucc) {
						this.props.handleSteps ? this.props.handleSteps(1, res.data.result) : ""
					} else if (res.data.code == 104) {
						this.props.login ? this.props.login() : "";
					} else {
						message.error(res.data.message);
					}
				})
			}
		}
	}
	handleAuto = (index) => {
		let specs_list = this.state.specs_list;
		specs_list[index].itemNumbers = "P" + moment().format("YYYYMMDDHHMMSS") + "-" + index;
		this.setState({
			specs_list
		})
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
						return <p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>{spec?spec.specName:""}</p>
					})}
					<p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.priceSuppliers} onChange={this.handleProduct.bind(this,index,"priceSuppliers")}/>
					</p>
					<p style={{width: 750/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.inventorys} onChange={this.handleProduct.bind(this,index,"inventorys")}/>
					</p>
					<p className={css.product_spec_select_body_no}>
						{item.itemNumbers?<i>{item.itemNumbers}</i>
						:<p onClick={this.handleAuto.bind(this,index)}>
							<FormattedMessage id="mine.product.auto" defaultMessage=""/>
						</p>}
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