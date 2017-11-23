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
	Input,
	InputNumber,
	Select,
	Icon,
	Checkbox,
	Tooltip,
	Button,
	message
} from 'antd';
const {
	TextArea
} = Input;
const Option = Select.Option;
message.config({
	top: '40%',
	duration: 2,
});
class ProductInstruct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			customProperty: [],
			instrct: {
				types: [],
				typeNames: [],
			},
			unit_list: [],
			product_ins: JSON.parse(JSON.stringify(operator.product_ins))
		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	componentWillMount() {
		axios.get('/product/get-instruct-unit.json').then(res => {
			if (res.data.isSucc) {
				let units = res.data.result;
				let unit_list = [];
				let product_ins = this.state.product_ins;
				product_ins.map(item => {
					if (item.type == 0) {
						units.map(list => {
							if (item.unit_key.indexOf(list.typeName) > -1) {
								item.unit = item.unit.concat(list.unit);
							}
						})
						item.select_unit = item.select_unit ? item.select_unit : item.unit[0].unitId;
					} else if (item.type == 1) {
						let first_unit = [],
							second_unit = [];
						units.map(list => {
							if (item.unit_key.indexOf(list.typeName) > -1) {
								first_unit = first_unit.concat(list.unit);
							}
							if (item.unit_key_2.indexOf(list.typeName) > -1) {
								second_unit = second_unit.concat(list.unit);
							}
						})
						item.unit.push({
							id: 1,
							value: first_unit,
						});
						item.unit.push({
							id: 2,
							value: second_unit
						});
						item.select_unit = item.select_unit && item.select_unit.length > 0 ? item.select_unit : [first_unit[0].unitId, second_unit[0].unitId];
					}

				})
				units.map(item => {
					unit_list = unit_list.concat(item.unit);
				})
				this.setState({
					product_ins,
					unit_list
				})
			} else {
				message.error(res.data.message);
			}
		})
		console.log(this.props.product)
		let param = {
			pid: this.props.product.productId
		}
		axios.post('/product/get-product-pack.json', param).then(res => {
			if (res.data.isSucc) {
				if (res.data.result) {
					let instrct = res.data.result;
					let product_ins = this.state.product_ins;
					let customProperty = [];
					product_ins.map(item => {
						if (item.type == 0) {
							item.select_unit = instrct[item.unit_name_id];
						} else if (item.type == 1) {
							item.select_unit = [];
							item.unit_name_id.map(unit => {
								item.select_unit.push(instrct[unit])
							})
						}
					})
					let type = JSON.parse(instrct.type);
					instrct.types = [];
					instrct.typeNames = [];
					type.map(item => {
						instrct.types.push(Number(item.id));
						instrct.typeNames.push(item.name);
					})
					customProperty = JSON.parse(res.data.result.customProperty)
					this.setState({
						instrct,
						customProperty
					})
				}
			} else if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
	}
	handleChange = (name, value) => {
		let instrct = this.state.instrct;
		instrct[name] = isNaN(value) ? value.target.value : value;
		this.setState({
			instrct: instrct
		})
	}
	handleCheck = (key, value, e) => {
		let instrct = this.state.instrct;
		if (e.target.checked) {
			instrct.types.push(key);
			instrct.typeNames.push(value);
		} else {
			instrct.types.map((item, ind) => {
				if (item == key) {
					instrct.types.splice(ind, 1);
				}
			})
			instrct.typeNames.map((item, ind) => {
				if (item == value) {
					instrct.typeNames.splice(ind, 1);
				}
			})
		}
		this.setState({
			instrct
		})

	}

	/**
	 * 新增或者删除自定义属性
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
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

	/**
	 * 保存自定义属性
	 * @param  {[type]} index [description]
	 * @param  {[type]} name  [description]
	 * @return {[type]}       [description]
	 */
	handleChangeSpec = (index, name, e) => {
		let customProperty = this.state.customProperty;
		customProperty[index][name] = isNaN(e) ? e.target.value : e;
		this.setState({
			customProperty
		})
	}
	handleSave = () => {
		this.setState({
			loading: true
		})
		let param = JSON.parse(JSON.stringify(this.state.instrct));
		param.customAttrNames = [];
		param.customAttrVals = [];
		param.customAttrUnitIds = [];
		let flag = true
		this.state.customProperty.map(item => {
			if (item.name && item.content) {
				param.customAttrNames.push(item.name);
				param.customAttrVals.push(item.content);
				param.customAttrUnitIds.push(item.unitId ? item.unitId : this.state.unit_list[0].unitId);
			} else {
				flag = false;
			}
		})
		if (flag) {
			this.state.product_ins.map(item => {
				if (item.select_unit) {
					if (item.type == 0) {
						item.unit.map(unit => {
							if (item.select_unit == unit.unitId) {
								param[item.unit_name] = unit.unitName;
								param[item.unit_name_id] = unit.unitId;
							}
						})
					} else if (item.type == 1) {
						item.unit.map((list, index) => {
							list.value.map(unit => {
								if (item.select_unit[index] == unit.unitId) {
									param[item.unit_name[index]] = unit.unitName;
									param[item.unit_name_id[index]] = unit.unitId;
								}
							})

						})

					}
				}
			})
			param.customAttrNames = param.customAttrNames.join(",");
			param.customAttrVals = param.customAttrVals.join(",");
			param.customAttrUnitIds = param.customAttrUnitIds.join(",");
			param.typeNames = param.typeNames.join(",");
			param.types = param.types.join(",");
			param.productId = this.props.product.productId;
			axios.post('/product/save-product-instrct.json', param).then(res => {
				this.setState({
					loading: false
				})
				if (res.data.isSucc) {
					this.props.handleSteps ? this.props.handleSteps(1, res.data.result) : ""
				} else if (res.data.code == 104) {
					this.props.login ? this.props.login() : ""
				} else {
					message.error(this.formatMessage({
						id: "mine.product.save_fail"
					}))
				}
			})
		} else {
			message.error(this.formatMessage({
				id: "mine.product.attr_warn"
			}));
			this.setState({
				loading: false
			})
		}

	}
	goBack = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : ""
	}

	/**
	 * 存储选择的单位
	 * @param  {[type]} type  [description]
	 * @param  {[type]} index [description]
	 * @param  {[type]} value [description]
	 * @param  {[type]} e     [description]
	 * @return {[type]}       [description]
	 */
	handleSpec = (type, index, value, e) => {
		console.log(type, index, value, e);
		let product_ins = this.state.product_ins;
		if (type == 1) {
			product_ins[index].select_unit = value;
		} else {
			product_ins[index].select_unit[value] = e;
		}
		this.setState({
			product_ins
		});
	}
	render() {
		console.log(this.state.product_ins);
		return <div className={`${css.product_instruct} ${this.props.className}`}>
			{this.state.product_ins.map((item,index)=>{
				return <div className={css.instuct_item}style={{alignItems:item.type==3?"flex-start":"center"}}>
					<p className={css.instuctitem_left}>
						<FormattedMessage id={item.name} defaultMessage="自定义属性"/>&nbsp;: 
					</p>
					{item.type==0?<div className={css.instuctitem_right}>
						<InputNumber value={this.state.instrct[item.key]} className={css.instuctitem_right_input} onChange={this.handleChange.bind(this,item.key)}/>
						<Select value={item.select_unit} style={{ width: 80 }} 
						onChange={this.handleSpec.bind(this,1,index)}>
							{item.unit.map(unit=>{
								return <Option value={unit.unitId}>{unit.unitName}</Option>
							})}
						</Select>
					</div>
					:item.type==1?<div className={css.instuctitem_right}>
						<InputNumber value={this.state.instrct[item.key]} className={css.instuctitem_right_input} onChange={this.handleChange.bind(this,item.key)}/>
						{item.unit.map((unit,unit_index)=>{
							return <div className={css.left_item}>
								<Select value={item.select_unit&&item.select_unit.length>unit_index?item.select_unit[unit_index]:item.unit.length>0?item.unit[0].unitId:null}
									style={{ width: 80 }} 
									onChange={this.handleSpec.bind(this,2,index,unit_index)}>
									{unit.value.map(un=>{
										return <Option value={un.unitId}>{un.unitName}</Option>
									})}
								</Select>
								{unit_index<item.unit.length-1?<span>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>:""}
							</div>
						})}
					</div>
					:item.type==2?<div>
							{item.unit.map(unit=>{
								return <Checkbox checked={this.state.instrct.types.indexOf(unit.key)>-1?true:false} onChange={this.handleCheck.bind(this,unit.key,unit.value)}>
									<FormattedMessage id={unit.name} defaultMessage="产品特性"/>
								</Checkbox>
							})}
						</div>
					:item.type==3?<TextArea value={this.state.instrct[item.key]} style={{width:"460px"}} onChange={this.handleChange.bind(this,item.key)}  rows={4} />
					:""}
				</div>
			})}
			<p className={css.instuct_item}>
				<p className={css.instuctitem_left}>
					<FormattedMessage id="mine.product.instr_custom" defaultMessage="产品特性"/>&nbsp;:
				</p>
				<Button onClick={this.handleAttr.bind(this,-1)} >
					{this.formatMessage({id:"mine.product.attr_add"})}
				</Button>			
			</p>
			{this.state.customProperty.map((item,attr_index)=>{
				return <div className={css.product_custom}>
					<div className={css.product_attr_item}>
						<p style={{width:"360px"}} className={css.category_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>：  
						</p>
						<Input style={{width:"120px"}} placeholder={this.formatMessage({id: 'mine.product.attr_name_warn'})} 
							value={item.name} onChange={this.handleChangeSpec.bind(this,attr_index,'name')}/>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.product_attr_item_title}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input style={{width:"120px"}} placeholder={this.formatMessage({id: 'mine.product.attr_value_warn'})} 
						value={item.content} onChange={this.handleChangeSpec.bind(this,attr_index,'content')}/>
					</div>
					<Select value={item.unitId?Number(item.unitId):this.state.unit_list[0].unitId} style={{ width: 80,marginRight: 10 }} 
						onChange={this.handleChangeSpec.bind(this,attr_index,'unitId')}>
							{this.state.unit_list.map(unit=>{
								return <Option value={unit.unitId}>{unit.unitName}</Option>
							})}
					</Select>
					<Tooltip title={this.formatMessage({id: 'mine.product.attr_delete'})}>
						<Button style={{minWidth:"36px"}} className={appcss.button_blue} 
						icon="minus" onClick={this.handleAttr.bind(this,attr_index)}/>
					</Tooltip>
				</div>
			})}
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
export default injectIntl(ProductInstruct);