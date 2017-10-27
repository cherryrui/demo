import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import operator from './operator.js';
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
	Tooltip,
	Spin
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class ProductBasic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
			category: [],
			brands: [],
			category: [{
				id: 1,
				category_id: []
			}],
			unit: [],
			categoryList: [],
			fileList: [],
			previewVisible: false,
			loading: false,

		}
		this.formatMessage = this.props.intl.formatMessage;
		this.timeout = null;
	}

	componentWillMount() {
		axios.get('/category/get-agent-category.json').then(category => {
			axios.get('/product/get-product-unit.json').then(unit => {
				axios.post('/brand/get-product-brand.json', {}).then(brands => {
					let categoryList = category.data.result;
					categoryList.map(item => {
						item.value = item.categoryId;
						item.label = item.categoryName;
						item.isLeaf = false;
					})
					this.setState({
						categoryList: categoryList,
						unit: unit.data.result,
						brands: brands.data.result.list,
						product: this.props.product.id ? this.props.product : this.state.product
					})
				})
			})
		})
	}
	/**
	 * 提交基础信息
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true
				})
				console.log('Received values of form: ', values, this.state.category);
				values.brand ? values.brandId = values.brand.value : "";
				let category = [],
					productCategorys = "[";
				this.state.category.map(item => {
					item.category_id.map(cate => {
						if (category.indexOf(cate) == -1) {
							category.push(cate);
							productCategorys += cate + "],[";
						}
					})
				})
				console.log(category, productCategorys);
				productCategorys = productCategorys.substr(0, productCategorys.length - 2);
				values.productCategorys = productCategorys;
				axios.post('/product/add-product-basic.json', values).then(res => {
					this.setState({
						loading: false
					})
					if (res.data.isSucc) {
						let product = values;
						product.productId = res.data.result.productId;
						this.props.handleSteps ? this.props.handleSteps(1, product) : ""
					} else if (res.data.code == 104) {
						this.props.login ? this.props.login() : ""
					} else {
						message.error(res.data.message);
					}
				})
			}
		});
	}

	submitProduct = (product) => {
		product.category = this.state.product.category;
		axios.post('/product/save-product-basic.json', product).then(res => {
			this.setState({
				loading: false
			})
			let product = {
				id: res.data.id,
				category: this.state.product.category
			}
			this.props.handleSteps ? this.props.handleSteps(1, product) : ""
		})
	}
	onChange = (index, value, options) => {
		this.state.category[index].category_id = value;
		this.state.category[index].category_name = options
	}

	removePic = (file) => {
		console.log(file)
	}
	previewImg = (file) => {
		// console.log(file);
		let url = file.url.replace("x80", "x320");
		this.setState({
			previewImage: url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleCancel = () => {
		this.setState({
			previewVisible: false,
		});
	}

	/**
	 * 删除或者添加产品分类
	 */
	handleCategory = (index) => {
		let category = this.state.category;
		if (index == -1) {
			category.push({
				id: category[category.length - 1].id + 1,
			});
		} else {
			category.splice(index, 1);
		}
		this.setState({
			category: category
		})
	}

	/**
	 * 加载分类信息
	 * @param  {[type]} selectedOptions [description]
	 * @return {[type]}                 [description]
	 */
	loadData = (selectedOptions) => {
		console.log(selectedOptions);
		const targetOption = selectedOptions[selectedOptions.length - 1];
		let url = selectedOptions.length == 1 ? "/category/get-two-category.json?cid=" : "/category/get-category.json?pid=";
		axios.get(url + targetOption.categoryId).then(res => {
			targetOption.loading = false;
			let children = res.data.result
			children.map(item => {
				item.label = item.categoryName;
				item.value = item.categoryId;
				item.isLeaf = selectedOptions.length > 1 ? true : false;
			})
			targetOption.children = children;
			this.setState({
				categoryList: [...this.state.categoryList],
			})
		})
	}
	handleNo = () => {
		this.props.form.setFieldsValue({
			productNumber: "P" + moment().format("YYYYMMDDHHMMSS"),
		});
	}
	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		const {
			getFieldDecorator
		} = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 12
			},
		};

		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 14,
					offset: 6,
				},
			},
		};
		return <div className={css.product_base}>
			<Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'mine.product.name'})}
                    >
                        {getFieldDecorator('productName', {
                            initialValue: this.state.product.name,
                            rules: [{ required: true, message: formatMessage({id: 'mine.product.name_warn'}), whitespace: true }],
                         })(
							<Input className={appcss.form_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'mine.product.No'})}
                    >
                        {getFieldDecorator('productNumber', {
                            initialValue: this.state.product.name,
                            rules: [{ required: true, message: formatMessage({id: 'mine.product.No'}), whitespace: true }],
                         })(
							<Input style={{width:"260px"}} />
                        )}
                        <Button style={{marginLeft:"10px",width: "130px"}} className={appcss.button_blue} onClick={this.handleNo}>
                        	<FormattedMessage id="mine.product.auto" defaultMessage=""/>
                        </Button>
                    </FormItem>
                    <FormItem 
                    	{...formItemLayout}
                    	label={formatMessage({id: 'orderdetails.brand'})}
                    >
                        {getFieldDecorator('brand', {
                            initialValue: this.state.product.brand
                        })(
                        	<SearchInput placeholder={this.formatMessage({id:"mine.product.search"})}/>
                        )}
                    </FormItem>
                    {this.state.category.map((item,index)=>{
	                    return <FormItem
	                        {...formItemLayout}
	                        label={this.formatMessage({id: 'app.category'})+(index+1)}
	                    >
	                        {getFieldDecorator('category'+index, {
	                            rules: [{ type: 'array', required: true, message: this.formatMessage({id:'mine.product.category_warn'}),}],
	                        })(
	                            <Cascader 
	                            	className={appcss.form_input}
	                                options={this.state.categoryList}
	                                loadData={this.loadData}
	                                onChange={this.onChange.bind(this,index)}
	                            />
	                        )}
	                        {index==0?<Tooltip title={this.formatMessage({id:'mine.product.add_category'})}>
	                                <Button className={appcss.button_blue} style={{marginLeft:"10px",minWidth:"36px"}} icon="plus" onClick={this.handleCategory.bind(this,-1)}/>
	                            </Tooltip>
	                            :<Tooltip title={this.formatMessage({id:'mine.product.del_category'})}>
	                                <Button  className={appcss.button_blue} style={{marginLeft:"10px",minWidth:"36px"}} icon="minus" onClick={this.handleCategory.bind(this,index)}/>
	                            </Tooltip>}
	                    </FormItem>
                	})}
                    <FormItem 
                    	{...formItemLayout}
                    	label={formatMessage({id: 'mine.product.unit'})}
                    >
                        {getFieldDecorator('unitId', {
                            rules: [{
                                required: true, message: formatMessage({id: 'mine.product.unit_warn'}),
                            }],
                            initialValue: this.state.product.unit
                        })(
                            <Select className={appcss.form_input}
                            placeholder={formatMessage({id: 'mine.product.unit_warn'})}>
                                {this.state.unit.map(item => {
                                    return <Option value={item.uId}>{item.unitName}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'product.detail.MOQ'})}
                    >
                        {getFieldDecorator('minBuyQuantity', {
                        	 rules: [{
                                required: true, message: formatMessage({id: 'product.detail.MOQ'}),
                            }],
                            initialValue: this.state.product.moq?this.state.product.moq:1,
                         })(
							<InputNumber className={appcss.form_input} precision={0} style={{width: '100%'}} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'mine.product.factory_price'})}
                    >
                        {getFieldDecorator('priceSupplier', {
                            initialValue: this.state.product.name,
                             rules: [{
                                required: true, message: formatMessage({id: 'mine.product.factory_price'}),
                            }],
                         })(
							<InputNumber className={appcss.form_input} min={0}  style={{width: '100%'}} precision={2} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'product.detail.inventory'})}
                    >
                        {getFieldDecorator('inventory', {
                            initialValue: this.state.product.inventory,
                             rules: [{
                                required: true, message: formatMessage({id: 'product.detail.inventory'}),
                            }],
                         })(
							<InputNumber className={appcss.form_input} min={0} precision={0} style={{width: '100%'}} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                         <Button 
                         	type="primary" 
                         	htmlType="submit"
                         	loading={this.state.loading}
                         	style={{minWidth:"100px"}}
                         >
                         	{formatMessage({id: 'app.ok'})}
                         </Button>
                    </FormItem>
                </Form>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                	<img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            	</Modal>
		</div>
	}
}

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.value = this.props.value || {};
		this.state = {
			value: 0,
			label: "",
			data: []
		};
		this.timeout = null;
		this.currentValue = "";
	}
	componentWillMount() {
		if (this.props.value) {
			this.setState({
				value: this.props.value.value ? this.props.value.value : 0,
				label: this.props.value.label ? this.props.value.label : 0
			})
		}
		this.getBrand();
	}
	componentWillReceiveProps(nextProps) {
		// Should be a controlled component.
		if ('value' in nextProps) {
			const value = nextProps.value;
			this.setState(value);
		}
	}
	fetch = (value) => {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.timeout = setTimeout(this.getBrand(value), 300);
	}
	getBrand = (value) => {
		let param = {
			brandName: value
		}
		this.currentValue = value;
		axios.post('/brand/get-product-brand.json', param).then(res => {
			if (res.data.isSucc) {
				console.log(this.currentValue, value);
				if (this.currentValue === value) {
					this.setState({
						data: res.data.result.list,
						label: res.data.result.allRow == 0 ? "" : value,
						value: 0
					})
				}
			}
		});
	}
	handleChange = (value) => {
		console.log(value, isNaN(value))
		let brand_id = 0,
			label = "";
		if (isNaN(value) || !value) {
			label = value;
			this.setState({
				label: value,
				value: 0,
			})
			this.fetch(value);
		} else {
			this.state.data.map(item => {
				if (item.bid == value) {
					label = locale == "en" ? item.brandNameEn : item.brandNameCn;
					value = value;
					this.setState({
						value: value,
						label: label,
					})
				}
			})
		}
		this.triggerChange({
			value: value,
			label: label
		});
	}

	triggerChange = (changedValue) => {
		// Should provide an event to pass value to Form.
		console.log(changedValue, changedValue.value);
		const onChange = this.props.onChange;
		if (onChange) {
			let value = {
				value: isNaN(changedValue.value) ? 0 : Number(changedValue.value),
				label: changedValue.label,
			}
			onChange(Object.assign({}, value));
		}
	}
	render() {
		const options = this.state.data.map(d => <Option key={d.bid}>{locale=="en"?d.brandNameEn:d.brandNameCn}</Option>);
		return (
			<Select
				size="large"
		        mode="combobox"
		        value={this.state.label}
		        className={appcss.form_input}
        		placeholder={this.props.placeholder}
        		notFoundContent="没有该品牌"
        		style={this.props.style}
        		defaultActiveFirstOption={false}
        		showArrow={false}
        		filterOption={false}
        		onChange={this.handleChange}
      		>
	        	{options}
	      	</Select>
		);
	}
}
ProductBasic = Form.create()(ProductBasic);
ProductBasic = injectIntl(ProductBasic);
export default ProductBasic;