import React from 'react';
import css from './ProductEditor.scss';
import basecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import Steps from '../Public/Steps/Steps.js';
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


class ProductEditor extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			current: 2,
			product: {
				id: 1,
				category: [{
					id: 1,
					name: "Tool",
					isLeaf: false
				}, {
					id: 2,
					name: "dev tool",
					isLeaf: false
				}, {
					id: 3,
					name: "sdad",
					isLeaf: false
				}, ]

			},
		}
	}

	componentDidMount() {
		this.product_edit.scrollIntoView();
	}

	/**
	 * 进入下一步骤，step，步骤序号，pro，产品
	 * @param  {[type]} step 1:下一步，-1上一步
	 */
	handleSteps = (step, pro) => {
		let product = step == 1 ? pro : this.state.product;
		this.setState({
			current: this.state.current + step,
			product: product
		}, () => {
			this.product_edit.scrollIntoView();
		})


	}


	render() {
		return <div ref={(product_edit)=>{this.product_edit = product_edit}}>
			<div className={basecss.child_title}>
				<FormattedMessage id="mine.product.upload" defaultMessage="上传产品"/>&nbsp;: 
			</div>
			<Steps steps={operator.steps} current={this.state.current}/>
			<div className={css.body}>
				{this.state.current==0?<EditProductInfo handleSteps={this.handleSteps}/>
				:this.state.current==1?<ProductAttr product={this.state.product} handleSteps={this.handleSteps}/>
				:this.state.current==2?<ProductParam/>
				:""
			}	
			</div>
			
		</div>
	}

}
class EditProductInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product: {},
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
					item.label = item.name
				})
				this.setState({
					brands: res.data.brand,
					category: resp.data.category,
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
		axios.post('/product/add-product-info.json', product).then(res => {
			this.setState({
				loading: false
			})
			product.id = 1;
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
		return <div className={css.product_info}>
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
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'app.category'})}
                    >
                        {getFieldDecorator('category_id', {
                            initialValue: this.state.product.category_id?this.state.product.category_id.split(","):[],
                            rules: [{ type: 'array', required: true, message: formatMessage({id: 'mine.product.category_warn'}) }],
                        })(
                            <Cascader 
                                options={this.state.category}
                                loadData={this.loadData}
                                changeOnSelect
                            />
                      )}
                    </FormItem>
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
class ProductAttr extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			new_attr: [{
				id: 1
			}],
			attr: [],
			loading: false,

		}
	}
	componentWillMount() {
		axios.get(`/product/get-product-attr.json?category_id=${this.props.product.category_id}`).then(res => {
			this.setState({
				attr: res.data.attr
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

	handleChange = (type, index, name, e) => {
		console.log(type, index, name, e)
			//为产品属性赋值
		if (type == 1) {
			let attr = this.state.attr;
			attr[index].value = name.target.value;
			this.setState({
				attr: attr
			})
		} else { //自定义属性
			this.state.new_attr[index][name] = e.target.value;
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
			attr: this.state.attr,
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


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;

		return <div className={css.product_attr}>
			<div className={css.product_category}>
				<p className={css.category_left}>
					<FormattedMessage id="app.category" defaultMessage="分类"/>&nbsp;:  
				</p>

				<p className={css.category_right}>{this.props.product.category.map(item=>{
					return <p>{item.name}{item.isLeaf?"":">>"}</p>
				})}</p>
			</div>
			{this.state.attr.map((item,index)=>{
				return <div className={css.product_attr_item}>
					<p className={css.attr_item_left}>{item.name}&nbsp;:</p>
					<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} value={item.value} onChange={this.handleChange.bind(this,1,index)}/>
				</div>
			})}
			<div className={css.product_add_title}>
				<p className={css.add_left}>
					<FormattedMessage id="mine.product.custom_attr" defaultMessage="自定义属性"/>&nbsp;  
				</p>
				<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
					<Button icon="plus" onClick={this.handleAttr.bind(this,-1)}/>
				</Tooltip>
			</div>

			{this.state.new_attr.map((item,index)=>{
				return <div>
					<div className={css.product_attr_item}>
						<p className={css.attr_item_left}>
							<FormattedMessage id="mine.product.attr_name" defaultMessage="属性名称"/>&nbsp;:  
						</p>
			
						<Input placeholder={formatMessage({id: 'mine.product.attr_name_warn'})} onChange={this.handleChange.bind(this,0,index,'name')}/>
						<Tooltip title={formatMessage({id: 'mine.product.attr_delete'})}>
							<Button icon="minus" onClick={this.handleAttr.bind(this,index)}/>
						</Tooltip>
					</div>
					<div className={css.product_attr_item}>
						<p className={css.attr_item_left}>
							<FormattedMessage id="mine.product.attr_value" defaultMessage="属性值"/>&nbsp;:  
						</p>
						<Input placeholder={formatMessage({id: 'mine.product.attr_value_warn'})} 
						onChange={this.handleChange.bind(this,0,index,'value')}/>
					</div>
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
class ProductParam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product_spec: [], //产品规格
			speci: [], //产品规格列表
			select_speci: [],
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
	handleSpc = (item, e) => {
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

	handleChange = () => {}

	render() {
		console.log(this.state.select_speci)
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
							return <Checkbox onClick={this.handleSpc.bind(this,item)}>{item.name}</Checkbox>
						})}
					</div>
				</div>
				{this.state.product_spec.map((item,index)=>{
					return <div className={css.product_apec_item}>
					<p className={css.apec_item_left}>
						<FormattedMessage 
							id="mine.product.have_specificationg" 
							defaultMessage="产品规格" 
						/>{index+1}:
					</p>
					<div className={css.spec_item_right}>
						{this.state.select_speci.map(speci=>{
							return <p className={css.right_item}>{speci.name}&nbsp;&nbsp;
							<Select style={{ width: 120 }} onChange={this.handleChange.bind(this,index,)}>
								{speci.value.map(val=>{
									return <Option value={val.id}>{val.value}</Option>
								})}
							</Select>
						</p>
						})}
						<p className={css.right_item}>
							<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
							<InputNumber
								style={{width:100}}
	      						defaultValue={0}
	      						formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
	      						parser={value => value.replace(/\$\s?|(,*)/g, '')}
	      						onChange={this.handleChange.bind(this,'price')}
	    					/>
						</p>
						<p className={css.right_item}>
							<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
							<InputNumber
								style={{width:100}}
		      					defaultValue={0}
		      					onChange={this.handleChange.bind(this,'inventory')}
		    				/>
						</p>
						{index==0?<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
							<Button icon="plus" onClick={this.handleSpc.bind(this,-1)}/>
						</Tooltip>
						:<Tooltip title={formatMessage({id: 'mine.product.attr_add'})}>
							<Button icon="minus" onClick={this.handleSpc.bind(this,-1)}/>
						</Tooltip>}
					</div>
					</div>
				})}
		</div>
	}
}

EditProductInfo = injectIntl(EditProductInfo);
ProductAttr = injectIntl(ProductAttr);
ProductParam = injectIntl(ProductParam);
EditProductInfo = Form.create()(EditProductInfo);

export default injectIntl(ProductEditor);