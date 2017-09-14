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
	Select,
	Icon,
	Checkbox,
	Tooltip,
	Button
} from 'antd';
const {
	TextArea
} = Input;
const Option = Select.Option;

class ProductInstruct extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			new_attr: [{
				id: 1
			}],
			instrct: {},

		}
	}
	handleChange = (type, key, value, e, unit) => {
		console.log(key, value, e)
		let instrct = this.state.instrct;
		let param
		switch (type) {
			case 0:
				param = instrct[key] ? instrct[key] : {};
				if (value == "unit") {
					param[value] = e;
				} else {
					param[value] = e.target.value;
				}
				instrct[key] = param;
				break;
			case 1:
				param = instrct[key] ? instrct[key] : {};
				if (value == "unit") {
					param.unit = param.unit ? param.unit : [];
					let flag = true;
					param.unit.map(item => {
						if (item.id == e) {
							flag = false;
							item.value = unit;
						}
					})
					if (flag) {
						param.unit.push({
							id: e,
							value: unit
						})
					}
				} else {
					param[value] = e.target.value;
				}
				instrct[key] = param;
				break;
			case 2:
				param = instrct[key] ? instrct[key] : [];
				if (e.target.checked) {
					param.push(value);
				} else {
					param.map((item, index) => {
						if (item == value) {
							param.splice(index, 1);
						}
					})
				}
				instrct[key] = param;
				break;
			case 3:
				instrct[key] = value.target.value;
				break;
		}
		this.setState({
			instrct: instrct
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
	handleAttrChange = (index, name, e) => {
		this.state.new_attr[index][name] = e.target.value;
	}

	handleSteps = (step) => {
		this.props.handleSteps ? this.props.handleSteps(step) : "";
	}
	handleSave = () => {
		this.setState({
			loading: true
		})
		let param = {
			id: this.props.product.id,
			new_attr: this.state.new_attr,
			instrct: this.state.instrct
		}
		axios.post('/product/save-product-instrct.json', param).then(res => {
			this.setState({
				loading: false
			})
			if (res.data) {
				this.handleSteps(1)
			} else {
				const {
					intl: {
						formatMessage
					}
				} = this.props;
				message.error(formatMessage({
					id: "mine.product.save_fail"
				}))
			}
		})

	}
	render() {

		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div className={css.product_instruct}>
			{operator.product_ins.map(item=>{
				return <div className={css.instuct_item}>
					<p className={css.instuctitem_left}>
						<FormattedMessage id={item.name} defaultMessage="自定义属性"/>&nbsp;: 
					</p>
					{item.type==0?<div className={css.instuctitem_right}>
						<Input onChange={this.handleChange.bind(this,item.type,item.key,"value")}/>
						<Select defaultValue={item.unit[0]} style={{ width: 120 }} onChange={this.handleChange.bind(this,item.type,item.key,'unit')}>
							{item.unit.map(unit=>{
								return <Option value={unit}>{unit}</Option>
							})}
						</Select>
					</div>
					:item.type==1?<div className={css.instuctitem_right}>
						<Input onChange={this.handleChange.bind(this,item.type,item.key,"value")}/>
						{item.unit.map((unit,unit_index)=>{
							return <div className={css.left_item}>
								<Select defaultValue={unit.value[0]} 
									style={{ width: 120 }} 
									onChange={this.handleChange.bind(this,item.type,item.key,'unit',unit.id)}>
									{unit.value.map(un=>{
										return <Option value={un}>{un}</Option>
									})}
								</Select>
								{unit_index<item.unit.length-1?<span>&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;</span>:""}
							</div>
						})}
					</div>
					:item.type==2?<div>
							{item.unit.map(unit=>{
								return <Checkbox onChange={this.handleChange.bind(this,item.type,item.key,unit.key)}>
									<FormattedMessage id={unit.name} defaultMessage="产品特性"/>
								</Checkbox>
							})}
						</div>
					:item.type==3?<TextArea onChange={this.handleChange.bind(this,item.type,item.key)}  rows={4} />
					:""}
				</div>
			})}
			<p className={css.instuct_item}>
				<p className={css.instuctitem_left}>
					<FormattedMessage id="mine.product.instr_custom" defaultMessage="产品特性"/>&nbsp;:
				</p>
				<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
					<Button icon="plus" onClick={this.handleAttr.bind(this,-1)}/>
				</Tooltip>			
			</p>
			{this.state.new_attr.map((item,index)=>{
				return <div>
					<div className={css.instuct_item}>
						<p className={css.instuctitem_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
						<p className={css.instuctitem_right}>
							<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} 
								onChange={this.handleAttrChange.bind(this,index,'name')}/>
							<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
								<Button icon="minus" onClick={this.handleAttr.bind(this,index)}/>
							</Tooltip>
						</p>
					</div>
					<div className={css.instuct_item}>
						<p className={css.instuctitem_left}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
						onChange={this.handleAttrChange.bind(this,index,'value')}/>
					</div>
				</div>
			})}
			<div className={css.product_footer}>
				<Button type='primary' className={appcss.button_green} onClick={this.handleSteps.bind(this,-1)}>
					<FormattedMessage id="app.before" defaultMessage="上一步"/>  
				</Button>
				<Button type='primary' loading={this.state.loading} onClick={this.handleSave}>
					<FormattedMessage id="app.save" defaultMessage="上一步"/> 
				</Button>
			</div>
		</div>
	}
}
export default injectIntl(ProductInstruct);