import React from 'react';
import css from './ProductEditor.scss';
import axios from 'axios';
import operator from './operator.js';
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

class ProductBasic extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {
				category: [{
					id: 1,
					category_id: []
				}]
			},
			brands: [],
			category: [],
			fileList: [],
			previewVisible: false,
			loading: false,

		}
	}

	componentWillMount() {
		axios.get('/brand/get-agent-brand.json').then(res => {
			axios.get('/category/get-agent-category.json').then(resp => {
				let category = resp.data.category;
				category.map(item => {
					item.value = item.id;
					item.label = item.name;
					item.isLeaf = false;
				})
				this.setState({
					brands: res.data.brand,
					category: resp.data.category,
					product: this.props.product.id ? this.props.product : this.state.product
				})
			})

		})
	}
	normFile = (info) => {
		console.log('Upload event:', info);
		if (info.file && info.file.status == "uploading") {
			info.file.url = URL.createObjectURL(info.file.originFileObj);
			info.file.status = 'done';
		}
		if (Array.isArray(info)) {
			return info;
		}
		if (info.fileList) {
			info.fileList.map(item => {
				item.status = "done"
			})
			this.setState({
				fileList: info.fileList
			})
		}
		return info && info.fileList;
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
				let img_path = [],
					img_more = [];
				console.log('Received values of form: ', values);
				if (values.files.length > 0) {
					values.files.map((item, index) => {
						if (item.url.indexOf("blob:") > -1) {
							lrz(item.originFileObj).then(res => {
									//处理成功会执行
									res.realTp = res.origin.name.split('.')[res.origin.name.split('.').length - 1];
									console.log(398, index, this.state.fileList.length);
									/*if (index < this.state.fileList.length) {
										res.type = 1;
									}*/
									axios.post('/img/save-product-img.json', res).then(res => {
										img_path.push(res.data.path);
										img_more.push(res.data.fileName);
										if (img_path.length == this.state.fileList.length) {
											let product = values;
											this.submitProduct(product)
										}
									})
								})
								.catch(err => {
									// 处理失败会执行
									console.log("失败", err)
								})
								.always(() => {
									// 不管是成功失败，都会执行
								});
						} else {
							img_path.push(item.path);
							img_more.push(item.url);
							if (img_path.length == values.files.length) {
								let product = values;
								this.submitProduct(product)
							}
						}
					})
				}
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
	 * 保存所选择的分类id
	 * @param  {[type]} value           [description]
	 * @param  {[type]} selectedOptions [description]
	 * @return {[type]}                 [description]
	 */
	onChange = (index, value, options) => {
		this.state.product.category[index].category_id = value;
		this.state.product.category[index].category_name = options
	}

	/**
	 * 删除或者添加产品分类
	 */
	handleCategory = (index) => {
		let product = this.state.product;
		if (index == -1) {
			product.category.push({
				id: product.category[product.category.length - 1].id + 1,
			});
		} else {
			product.category.splice(index, 1);
		}
		this.setState({
			product: product
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
		axios.get(`/category/get-category.json?type=${3}&id=${targetOption.id}`).then(res => {
			let category = res.data.categorys;
			category.map(item => {
				item.value = item.id;
				item.label = item.name;
				item.isLeaf = true;
			})
			targetOption.loading = false;
			targetOption.children = category;
			console.log(this.state.product)
			this.setState({
				product: this.state.product,
			});
		})
	}

	render() {
		console.log(this.state.product)
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
                        {getFieldDecorator('name', {
                            initialValue: this.state.product.name,
                            rules: [{ required: true, message: formatMessage({id: 'mine.product.name_warn'}), whitespace: true }],
                         })(
							<Input size="large" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'app.brand'})}
                    >
                        {getFieldDecorator('brand_id', {
                            initialValue: this.state.product.brand_id,
                            rules: [{ 
                            	required: true, 
                            	message: formatMessage({id: 'mine.product.brand_warn'}),
                            }],
                        })(
                            <Select placeholder={formatMessage({id: 'mine.product.brand_warn'})}>
                                {this.state.brands.map(item => {
                                    return <Option value={item.id}>{item.name}</Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    {this.state.product.category.map((item,index)=>{
                    	return <FormItem
                        	{...formItemLayout}
                        	label={formatMessage({id: 'app.category'})+(index+1)}
                    	>
                    		<div className={css.basic_category}>
	                    		<Cascader 
	                                options={this.state.category}
	                                loadData={this.loadData}
	                                onChange={this.onChange.bind(this,index)}
	                            />
	                            {index==0?<Tooltip title={formatMessage({id:'mine.product.add_category'})}>
	    							<Button icon="plus" onClick={this.handleCategory.bind(this,-1)}/>
	  							</Tooltip>
								:<Tooltip title={formatMessage({id:'mine.product.del_category'})}>
	    							<Button icon="minus" onClick={this.handleCategory.bind(this,index)}/>
	  							</Tooltip>}
  							</div>
                   		</FormItem>
                    })}
                    
                    <FormItem 
                    	{...formItemLayout}
                    	label={formatMessage({id: 'mine.product.unit'})}
                    >
                        {getFieldDecorator('unit', {
                            rules: [{
                                required: true, message: formatMessage({id: 'mine.product.unit_warn'}),
                            }],
                            initialValue: this.state.product.unit
                        })(
                            <Select placeholder={formatMessage({id: 'mine.product.unit_warn'})}>
                                {operator.unit_list.map(item => {
                                    return <Option value={item.value}>
                                    	<FormattedMessage id={item.key} defaultMessage={item.value}/>
                                    </Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'product.detail.MOQ'})}
                    >
                        {getFieldDecorator('moq', {
                            initialValue: this.state.product.moq?this.state.product.moq:1,
                         })(
							<InputNumber precision={0} style={{width: '100%'}} size="large" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'mine.product.factory_price'})}
                    >
                        {getFieldDecorator('factory_price', {
                            initialValue: this.state.product.name,
                         })(
							<InputNumber style={{width: '100%'}} precision={2} size="large" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'product.detail.inventory'})}
                    >
                        {getFieldDecorator('inventory', {
                            initialValue: this.state.product.inventory,
                         })(
							<InputNumber precision={0} style={{width: '100%'}} size="large" />
                        )}
                    </FormItem>
                    <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'mine.product.picture'})}
			          style={{marginBottom: 0}}
			        >
			          {getFieldDecorator('files', {
			            valuePropName: 'fileList',
			            getValueFromEvent: this.normFile,
			            initialValue: this.state.product.files,
			            rules: [{ 
			            	type: 'array', 
			            	required: true, 
			            	message: formatMessage({id: 'mine.product.picture_warn'}) }],
			          })(
				            <Upload 
				            	name="img"
				            	customRequest={this.normFile}
								onPreview = {this.previewImg}
				            	listType="picture-card"
				            	onRemove={this.removePic}
				            	accept="image/*"
				            >
				              {this.state.fileList.length >= 4 ? null : <div className={css.upload}>
	        							<Icon type="plus" />
	        							<div className="ant-upload-text">Upload</div>
	      							</div>}
				            </Upload>
			          )}
			        </FormItem>
			         <FormItem 
			         	{...tailFormItemLayout}
			         	style={{marginBottom: 0}}
			         >
			         {getFieldDecorator('set_default', {
                            rules: [{
                                required: true, message: formatMessage({id: 'mine.product.picture_warn'}),
                            }],
                            initialValue: this.state.product.is_default?this.state.product.is_default:0
                        })(
			         		<RadioGroup >
        						{this.state.fileList.map((item,index)=>{
		                         	return <Radio value={index} className={css.set_default}>
		                         		{formatMessage({id: 'mine.product.set_default'})}
		                         	</Radio>
	                         	})}
      						</RadioGroup>
      					)}     
                         
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                         <Button 
                         	size='large' 
                         	type="primary" 
                         	htmlType="submit"
                         	loading={this.state.loading}
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

ProductBasic = Form.create()(ProductBasic);
ProductBasic = injectIntl(ProductBasic);
export default ProductBasic;