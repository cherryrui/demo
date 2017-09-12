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
	Row,
	Col
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
			product_id: 0,
		}
	}

	/**
	 * 进入下一步骤，step，步骤序号，id，产品id
	 * @param  {[type]} step [description]
	 * @param  {[type]} id   [description]
	 * @return {[type]}      [description]
	 */
	handleSteps = (step, id) => {
		this.setState({
			current: step,
			product_id: id
		})

	}


	render() {
		return <div className={css.body}>
			<div className={basecss.child_title}>
				<FormattedMessage id="mine.product.upload" defaultMessage="上传产品"/>  
			</div>
			<Steps steps={operator.steps} current={this.state.current}/>
			
			<div className={css.body}>
				{this.state.current==0?<EditProductInfo next={this.handleSteps}/>
				:this.state.current==1?<ProductAttr/>
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
			product: {
				files: [{
					uid: -1,
					name: 'xxx.png',
					status: 'done',
					url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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

										axios.post('/product/add-product-info.json', product).then(res => {
											this.props.next ? this.props.next(1, 1) : ""
										})
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
					})
				}
			}
		});
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
	render() {
		let position = {
			left_off: 6,
			left: 6,
			right: 6,
			right_off: 6
		}

		return <div>
			<div>
				<p></p>

				<Input/>
			</div>
		</div>
	}
}
class ProductParam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			have_spec: true, //具有多规格
			specification: [],
		}
	}
	componentWillMount() {
		axios.get(`/product/get-product-specif.json?id=${this.props.pid}`).then(res => {

		})
	}

	render() {
		return <div>
			<Radio checked={!this.state.have_spec}>
				<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>  
			</Radio>
			{this.state.have_spec?"":<div>
				<p>
					<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
					<InputNumber
      					defaultValue={0}
      					formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      					parser={value => value.replace(/\$\s?|(,*)/g, '')}
      					onChange={this.handleChange.bind(this,'price')}
    				/>
				</p>
				<p>
					<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
					<InputNumber
      					defaultValue={0}
      					onChange={this.handleChange.bind(this,'inventory')}
    				/>
				</p>
				
			</div>}
			<Radio checked={this.state.have_spec}>
				<FormattedMessage id="mine.product.have_specificationg" defaultMessage="上传产品"/>  
			</Radio>
			{this.state.have_spec?<div>
				{this.state.specification.map((item,index)=>{
					return <div>
						<FormattedMessage 
							id="mine.product.have_specificationg" 
							defaultMessage="上传产品" 
						/>{index+1}:
						<Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
     					 	<Option value="jack">Jack</Option>
      						<Option value="lucy">Lucy</Option>
      						<Option value="disabled" disabled>Disabled</Option>
      						<Option value="Yiminghe">yiminghe</Option>
    					</Select>
    					<p>
							<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
							<InputNumber
		      					defaultValue={0}
		      					formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
		      					parser={value => value.replace(/\$\s?|(,*)/g, '')}
		      					onChange={this.handleChange.bind(this,'price')}
		    				/>
						</p>
						<p>
							<FormattedMessage id="mine.product.no_specificationg" defaultMessage="上传产品"/>:
							<InputNumber
		      					defaultValue={0}
		      					onChange={this.handleChange.bind(this,'inventory')}
		    				/>
						</p>
						<Button type="primary" icon="plus" />
					</div>
				})}
				
			</div>:""}
		</div>
	}
}

EditProductInfo = injectIntl(EditProductInfo);
EditProductInfo = Form.create()(EditProductInfo);

export default injectIntl(ProductEditor);