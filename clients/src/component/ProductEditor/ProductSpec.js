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
			select_category: 0,
			width: this.props.width ? this.props.width : 750,
		}
		this.oldCategoryId = null;
		this.formatMessage = this.props.intl.formatMessage;

	}
	componentWillMount() {
		let param = {
			pid: this.props.product.productId
		}
		axios.post("/product/get-product-spec.json", param).then(res => {
				console.log(res.data)
				if (res.data.isSucc) {
					let category = res.data.result.category;
					let select_category = 0;
					let product_spec = [];
					let specs_list = [];
					if (res.data.result.selectCategory) {
						this.oldCategoryId = res.data.result.selectCategory.categoryId;
						category.map((item, index) => {
							if (item.categoryId == res.data.result.selectCategory.categoryId) {
								product_spec = item.spec;
								select_category = index;
							}
						})
					} else {
						product_spec = category[0].spec;
					}
					res.data.result.selectSpecs.map(item => {
						let specs = JSON.parse(item.productSpecs);
						product_spec.map(spec => {
							if (spec.specId == item.specId) {
								spec.selectSpec = [];
								spec.select = [];
								specs.specValue.map(it => {
									spec.selectSpec.push({
										specVal: it.valId,
										specName: it.specValue
									});
									spec.select.push(it.valId);
								})
							}
						})
					})
					if (res.data.result.itemInfo) {
						res.data.result.itemInfo.map(item => {
							let product = JSON.parse(JSON.stringify(item));
							product.spec = [];
							product_spec.map(spec => {
								item.specInfo.map(info => {
									if (spec.specId == Number(info.specId)) {
										console.log(info, info.specValId, info.specVal)
										product.spec.push({
											specName: info.specVal,
											specVal: Number(info.specValId),
										})
									}
								})
							})
							specs_list.push(product);

						})
					}
					specs_list.map(item => {
						item.specInfo.map(spec => {
							spec.specName = spec.specVal;
							spec.specVal = Number(spec.specValId);
						})
					})
					this.setState({
						category,
						product_spec,
						select_category,
						specs_list
					})
				} else {

				}
			})
			/*axios.post('/product/get-product-spec.json', param).then(res => {
				console.log(res.data.result)
			})*/
	}
	handleChange = (e) => {
		let product_spec = this.state.category[e.target.value].spec;
		let specs_list = [];
		let select_category = e.target.value;
		this.setState({
			product_spec,
			specs_list,
			select_category
		})
	}
	handleSpec = (index, key, name, e) => {
		let product_spec = this.state.product_spec;
		if (e.target.checked) {
			if (!product_spec[index].selectSpec) {
				product_spec[index].selectSpec = [];
				product_spec[index].select = [];
			}
			product_spec[index].selectSpec.push({
				specVal: key,
				specName: name
			});
			product_spec[index].select.push(key);
		} else {
			product_spec[index].selectSpec.map((item, select) => {
				if (item.specVal == key) {
					product_spec[index].selectSpec.splice(select, 1);
					product_spec[index].select.splice(select, 1);
				}
			})
		}
		let specs_list = [];
		product_spec.map((item, index_spec) => {
			if (item.selectSpec) {
				let spec = JSON.parse(JSON.stringify(specs_list));
				if (spec.length == 0) {
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
						list.priceSupplier = item.priceSupplier;
						list.inventory = item.inventory;
						list.itemNumber = item.itemNumber;
						list.itemId = item.itemId;
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
		if (name === "priceSupplier") {
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
		this.setState({
			loading: true
		})
		if (this.state.specs_list.length == 0 && this.state.category[this.state.select_category].categoryId == this.oldCategoryId) {
			this.props.handleSteps ? this.props.handleSteps(1) : "";
			this.setState({
				loading: false
			})
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
						if (flag) {
							message.error(this.formatMessage({
								id: "mine.product.spec.spec_warn"
							}))
						}
						flag = false;
						return;
					}
				})
				spec = spec.join("-");
				param.specValIds.push(spec);
				if (item.priceSupplier) {
					param.priceSuppliers.push(item.priceSupplier);
				} else {
					if (flag) {
						message.error(this.formatMessage({
							id: "mine.product.spec.price_warn"
						}))
					}
					flag = false;
				}
				if (item.inventory || item.inventory == 0) {
					param.inventorys.push(item.inventory);
				} else {
					if (flag) {
						message.error(this.formatMessage({
							id: "mine.product.spec.inv_warn"
						}))
					}
					flag = false;
				}
				if (item.itemNumber || item.itemNumber == 0) {
					param.itemNumbers.push(item.itemNumber);
				} else {
					if (flag) {
						message.error(this.formatMessage({
							id: "mine.product.spec.item_warn"
						}))
					}
					flag = false;
				}
				param.itemIds.push(item.itemId ? item.itemId : "-")
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
				param.categoryId = this.state.category[this.state.select_category].categoryId;
				param.oldCategoryId = this.oldCategoryId ? this.oldCategoryId : null
				console.log(param);
				axios.post('/product/save-product-spec.json', param).then(res => {
					console.log(res.data);
					this.setState({
						loading: false
					})
					if (res.data.isSucc) {
						this.props.handleSteps ? this.props.handleSteps(1, res.data.result) : ""
					} else if (res.data.code == 104) {
						this.props.login ? this.props.login() : "";
					} else {
						message.error(res.data.message);
					}
				})
			} else {
				this.setState({
					loading: false
				})
			}
		}
	}
	handleAuto = (index) => {
		let specs_list = this.state.specs_list;
		specs_list[index].itemNumber = "P" + moment().format("YYYYMMDDHHMMSS") + "-" + index;
		this.setState({
			specs_list
		})
	}
	goBack = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : ""
	}
	render() {
		return <div className={`${css.product_spec} ${this.props.className}`}>
			<p className={css.spec_item_title}>
				<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;: 
			</p>
			<RadioGroup value={this.state.select_category} className={css.spec_item_body} onChange={this.handleChange}>
				{this.state.category.map((item,index)=>{
					return <Radio value={index}>{item.categoryName}</Radio>
				})}
			</RadioGroup>
			{this.state.product_spec.map((item,index)=>{
				return <div className={css.product_apec_item}>
					<p className={css.spec_item_title}>{item.specName}</p>
					<p className={css.spec_item_body}>
						{item.specVal.map(spec=>{
							return  <Checkbox checked={item.select&&item.select.indexOf(spec.valId)>-1?true:false} onChange={this.handleSpec.bind(this,index,spec.valId,spec.specValue)}>{spec.specValue}</Checkbox>
						})}
					</p>
				</div>
			})}
			<div className={css.product_spec_select_title}>
				{this.state.product_spec.map(item=>{
					return <p style={{width: this.state.width/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}>{item.specName}</p>
				})}
				<p style={{width: this.state.width/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}><FormattedMessage id="mine.product.factory_price" defaultMessage=""/></p>
				<p style={{width: this.state.width/(this.state.product_spec.length+2)}} className={css.product_spec_select_title_item}><FormattedMessage id="product.detail.inventory" defaultMessage=""/></p>
				<p className={css.product_spec_select_title_no}><FormattedMessage id="mine.product.art.no" defaultMessage=""/></p>
			</div>
			{this.state.specs_list.length>0?this.state.specs_list.map((item,index)=>{
				return <div className={css.product_spec_select_body}>
					{item.spec.map(spec=>{
						return <p style={{width: this.state.width/(item.spec.length+2)}} className={css.product_spec_select_body_item}>{spec?spec.specName:""}</p>
					})}
					<p style={{width: this.state.width/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.priceSupplier} onChange={this.handleProduct.bind(this,index,"priceSupplier")}/>
					</p>
					<p style={{width: this.state.width/(item.spec.length+2)}} className={css.product_spec_select_body_item}>
						<Input value={item.inventory} onChange={this.handleProduct.bind(this,index,"inventory")}/>
					</p>
					<p className={css.product_spec_select_body_no}>
						{item.itemNumber?<i>{item.itemNumber}</i>
						:<p onClick={this.handleAuto.bind(this,index)}>
							<FormattedMessage id="mine.product.auto" defaultMessage=""/>
						</p>}
					</p>
				</div>
			}):""}
			<div className={css.product_footer} style={{marginTop: 20}}>
				{this.props.before?<Button type="primary" onClick={this.goBack}>
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>:""}
				<Button loading={this.state.loading} type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}
}

export default injectIntl(ProductSpec);