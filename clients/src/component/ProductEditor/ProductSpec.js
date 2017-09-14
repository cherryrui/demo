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

class ProductSpec extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product_spec: [], //产品规格
			speci: [], //产品规格列表
			select_speci: [],
			loading: false
		}

	}
	componentWillMount() {
		console.log("componentWillMount");
		axios.get(`/product/get-product-specif.json?id=${this.props.pid}`).then(res => {
			this.setState({
				speci: res.data.specif
			})
		})
	}

	handleSelect = (item, e) => {
		let select = this.state.select_speci,
			product_spec = this.state.product_spec;
		if (e.target.checked) {
			select.push(item)
		} else {
			select.map((it, index) => {
				if (it.id == item.id) {
					select.splice(index, 1)
				}
			})
		}

		if (select.length > 0 && product_spec.length == 0) {
			product_spec.push({
				index: 1,
			})
		}
		this.setState({
			select_speci: select,
			product_spec: product_spec
		})
	}
	handleSpec = (index) => {
		console.log("handleSpec", index)
		let spec = this.state.product_spec;
		if (index == -1) {
			spec.push({
				index: spec[spec.length - 1].index + 1,
			})
		} else {
			spec.splice(index, 1)
		}

		this.setState({
			product_spec: spec
		})
	}

	handleChange = (index, name, value, e) => {
		//console.log(index, name, value, e);
		let spec = this.state.product_spec;
		if (name == "attr") {
			let attr = spec[index].attr ? spec[index].attr : [];
			let flag = true;
			attr.map(item => {
				if (item.id == value) {
					flag = false;
					item.value = e;
				}
			})
			if (flag) {
				attr.push({
					id: value,
					value: e
				})
			}
			spec[index].attr = attr;
		} else {
			spec[index][name] = value;
		}
		console.log(spec);
		this.setState({
			product_spec: spec
		})
	}
	handleSave = () => {
		this.setState({
			loading: true
		})
		let param = {
			id: this.props.product,
			attr: this.state.product_spec
		}
		axios.post('/product/save-product-spec.json', param).then(res => {
			console.log(657, this.props.handleSteps)
			this.props.handleSteps ? this.props.handleSteps(1) : "";
			this.setState({
				loading: false
			})
		})
	}

	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div className={css.product_spec}>
			<div className={css.product_apec_item}>
				<p className={css.apec_item_left}>
					<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;: 
				</p>
				<div>
					{this.state.speci.map((item,index)=>{
						return <Checkbox onClick={this.handleSelect.bind(this,item)}>{item.name}</Checkbox>
					})}
				</div>
			</div>
			{this.state.product_spec.map((item,index)=>{
				return <div className={css.product_apec_item}>
					<p className={css.apec_item_left}>
						<FormattedMessage 
							id="product.detail.specification" 
							defaultMessage="产品规格" 
						/>{index+1}:
					</p>
					<div className={css.spec_item_right}>
						{this.state.select_speci.map(speci=>{
							return <p className={css.right_item}>{speci.name}:&nbsp;&nbsp;
							<Select style={{ width: 120 }} onChange={this.handleChange.bind(this,index,"attr",speci.id)}>
								{speci.value.map(val=>{
									return <Option value={val.id}>{val.value}</Option>
								})}
							</Select>
						</p>
						})}
						<p className={css.right_item}>
							<FormattedMessage id="mine.product.factory_price" defaultMessage="出厂价"/>:&nbsp;&nbsp;
							<InputNumber
								style={{width:100}}
	      						defaultValue={0}
	      						formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	      						parser={value => value.replace(/\$\s?|(,*)/g, '')}
	      						onChange={this.handleChange.bind(this,index,'price')}
	    					/>
						</p>
						<p className={css.right_item}>
							<FormattedMessage id="product.detail.inventory" defaultMessage="上传产品"/>:&nbsp;&nbsp;
							<InputNumber
								style={{width:100}}
		      					defaultValue={0}
		      					onChange={this.handleChange.bind(this,index,'inventory')}
		    				/>
						</p>
						{index==0?<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
							<Button icon="plus" onClick={this.handleSpec.bind(this,-1)}/>
						</Tooltip>
						:<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
							<Button icon="minus" onClick={this.handleSpec.bind(this,index)}/>
						</Tooltip>}
					</div>
				</div>
			})}
			<div className={css.product_footer}>
				<Button type='primary' className={appcss.button_green} onClick={this.backStep}>
					<FormattedMessage id="app.before" defaultMessage="上一步"/>  
				</Button>
				<Button type='primary' loading={this.state.loading} onClick={this.handleSave}>
					<FormattedMessage id="app.save" defaultMessage="保存"/> 
				</Button>
			</div>
		</div>
	}
}

export default injectIntl(ProductSpec);