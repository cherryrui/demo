/**
 * Created by WF on 2017/9/18.
 */
import axios from 'axios';
import React from 'react';
import css from './Certification.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss'
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Link
} from 'react-router';
import {
	Form,
	Input,
	Upload,
	Checkbox,
	Cascader,
	Select,
	Icon,
	Button,
	Modal,
	Radio
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class Certification extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			success: false,

		}
	}
	componentWillMount() {
		if (sessionStorage.user) {
			this.setState({
				user: JSON.parse(sessionStorage.user)
			})
		} else {
			this.props.history.pushState(null, '/login');
		}
	}
	handleSuccess = () => {
		this.setState({
			success: true
		})
	}


	render() {
		return <div>
			<div className={basecss.child_title}>
				<FormattedMessage id="certif.title" defaultMessage="实名认证"/>
			</div>

			{this.state.success?<CertifSuccess/>
				:this.state.user.tp==1?<UserCertif handleSuccess={this.handleSuccess}/>
				:<CompanyCertif handleSuccess={this.handleSuccess}/>}	
		</div>
	}
}
class UserCertif extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			positive: [],
			back: [],

		}
	}
	normFile = (name, info) => {
		info.file.url = URL.createObjectURL(info.file);
		info.file.status = 'done';
		let param = [];
		param.push(info.file);
		if (name === "back") {
			this.setState({
				back: param
			})
		} else {
			this.setState({
				positive: param
			})
		}
	}
	removePic = (name) => {

		let param = {};
		param[name] = [];
		console.log(name, param);
		this.setState(param)
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
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {


				this.props.handleSuccess ? this.props.handleSuccess() : ""
			}
		});
	}


	render() {
		console.log(this.state.back);
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
				span: 8
			},
			wrapperCol: {
				span: 8
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				span: 10,
				offset: 8
			}
		};

		return <div>
			<Form onSubmit={this.handleSubmit}>
			<FormItem {...formItemLayout}
                label={formatMessage({id: 'persondata.Real.name'})}  
            >
                {getFieldDecorator('name',{
                    rules:[{
                        required:true,
                        message:formatMessage({id:'persondata.Real.name'})
                    }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem {...formItemLayout}
                label={formatMessage({id: 'certif.certif.type'})}  
            >
                {getFieldDecorator('type',{
                	initialValue: 0,
                    rules:[{
                        required:true,
                        message:formatMessage({id:'register.name.warn'})
                    }]
                })(
                    <Radio.Group >
                        <Radio.Button value={0}>
                            <FormattedMessage id="certif.certif.card" defaultMessage="个人用户"/>
                        </Radio.Button>
                        <Radio.Button value={1}>
                            <FormattedMessage id="certif.certif.green_card" defaultMessage="企业用户"/>
                        </Radio.Button>
                    </Radio.Group>
                )}
            </FormItem>
            <FormItem {...formItemLayout}
                label={formatMessage({id: 'certif.certif.card_number'})}  
            >
                {getFieldDecorator('no',{
                    rules:[{
                        required:true,
                        message:formatMessage({id:'certif.certif.card_number'})
                    }]
                })(
                    <Input />
                )}
            </FormItem>
            <FormItem {...formItemLayout}
                label={formatMessage({id: 'register.register.name'})}  
            >
                <div>
                	<Upload 
			            	name="img"
			            	customRequest={this.normFile.bind(this,"positive")}
							onPreview = {this.previewImg}
			            	listType="picture-card"
			            	fileList={this.state.positive}
			            	onRemove={this.removePic.bind(this,"positive")}
			            	accept="image/*"
			            >
			              {this.state.positive.length>0 ? null : <div className={css.upload}>
        							<Icon type="plus" />
        							<div className="ant-upload-text">
        								<FormattedMessage id="Agente.front.Side" defaultMessage="正面"/>
        							</div>
      							</div>}
			            </Upload>
			            <Upload 
			            	name="img"
			            	customRequest={this.normFile.bind(this,"back")}
							onPreview = {this.previewImg}
			            	listType="picture-card"
			            	fileList={this.state.back}
			            	onRemove={this.removePic.bind(this,"back")}
			            	accept="image/*"
			            >
			              {this.state.back.length>0 ? null : <div className={css.upload}>
        							<Icon type="plus" />
        							<div className="ant-upload-text">
        								<FormattedMessage id="Agente.back.Side" defaultMessage="背面"/>
        							</div>
      							</div>}
			            </Upload>
                </div>
            </FormItem>
            <FormItem {...formItemLayout}
                label={formatMessage({id: 'register.register.name'})}  
            >
                {getFieldDecorator('name',{
                    rules:[{
                        required:true,
                        message:formatMessage({id:'register.name.warn'})
                    }]
                })(
                    <Input />
                )}
            </FormItem>
			<FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>
                                <FormattedMessage id="register.notes" defaultMessage="记住密码"/>
                            </Checkbox>
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
		</div>
	}

}
class CompanyCertif extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			natrue: [],
			industry: [],
			loading: false,
			fileList: [],
			previewVisible: false,
			previewImage: ""
		}
		this.formatMessage = this.props.intl.formatMessage;
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

	onChange = (index, value, options) => {
		this.state.product.category[index].category_id = value;
		this.state.product.category[index].category_name = options
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
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {


				this.props.handleSuccess ? this.props.handleSuccess() : ""
			}
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
				span: 8
			},
			wrapperCol: {
				span: 8
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				span: 10,
				offset: 8
			}
		};

		return <div> 
			<Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'post.company_name'})}  
                >
	                {getFieldDecorator('company_name',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'certif.company.name_warn'})
	                    }]
	                })(
	                    <Input />
	                )}
                </FormItem>
                 <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'certif.company.website'})}  
                >
	                {getFieldDecorator('website',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'certif.company.website_warn'})
	                    }]
	                })(
	                    <Input />
	                )}
                </FormItem>
                 <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'certif.company.nature'})}  
                >
	                {getFieldDecorator('nature',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'certif.company.nature_warn'})
	                    }]
	                })(
	                    <Select placeholder={this.formatMessage({id: 'mine.product.unit_warn'})}>
                            {this.state.natrue.map(item => {
                                return <Option value={item.value}>
                                	<FormattedMessage id={item.key} defaultMessage={item.value}/>
                                </Option>
                            })}
                        </Select>
	                )}
                </FormItem>
                 <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'certif.company.industry'})}  
                >
	                {getFieldDecorator('industry',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'certif.company.industry_warn'})
	                    }]
	                })(
	                    <Select placeholder={this.formatMessage({id: 'certif.company.industry_warn'})}>
                            {this.state.industry.map(item => {
                                return <Option value={item.value}>
                                	<FormattedMessage id={item.key} defaultMessage={item.value}/>
                                </Option>
                            })}
                        </Select>
	                )}
                </FormItem>
                
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'Agente.Region'})}  
                >
	                {getFieldDecorator('city',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'Agente.Please.enter.a.detailed.address'})
	                    }]
	                })(
	                    <Cascader 
                            options={this.state.category}
                            loadData={this.loadData}
                            onChange={this.onChange}
                        />
	                )}
                </FormItem>
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'certif.company.address'})}  
                >
	                {getFieldDecorator('address',{
	                    rules:[{
	                        required:true,
	                        message:this.formatMessage({id:'certif.company.address'})
	                    }]
	                })(
	                    <Input />
	                )}
                </FormItem>
				<FormItem
			          {...formItemLayout}
			          label={this.formatMessage({id: 'certif.certif.license'})}
			          style={{marginBottom: 0}}
			          extra={formatMessage({id:"certif.company.license_warn"})}

			        >
			          {getFieldDecorator('files', {
			            valuePropName: 'fileList',
			            getValueFromEvent: this.normFile,
			            rules: [{ 
			            	type: 'array', 
			            	required: true, 
			            	message: this.formatMessage({id: 'certif.company.license_warn'}) }],
			          })(
				            <Upload 
				            	name="img"
				            	customRequest={this.normFile}
								onPreview = {this.previewImg}
				            	listType="picture-card"
				            	onRemove={this.removePic}
				            >
				              	<div className={css.upload}>
	        						<Icon type="plus" />
	        						<div>
	        							<FormattedMessage id="mine.product.upload_img" defaultMessage="mine.product.upload_img" />
	        						</div>
	      						</div>
				           	</Upload>
			          )}
			        </FormItem>
			       
					<FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>
                                <FormattedMessage id="register.notes" defaultMessage="记住密码"/>
                            </Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button 
                         	size='large' 
                         	type="primary" 
                         	htmlType="submit"
                         	loading={this.state.loading}
                        >
                         	{formatMessage({id: 'certif.submit'})}
                        </Button>
                    </FormItem>
				</Form>
				<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                	<img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            	</Modal>
            </div>
	}

}
class CertifSuccess extends React.Component {
	render() {
		return <div>
			<p>
				<Icon type="smile-o" />&nbsp;&nbsp;&nbsp;&nbsp;
                <FormattedMessage id="reset.success.info" defaultMessage="密码重置成功！"/>
            </p>
			<p>
				<FormattedMessage id="certif.success.info" defaultMessage="上传成功"/>
			</p>
			<p>
				<FormattedMessage id="certif.success.info" defaultMessage="上传成功"/>
			</p>
			
		</div>
	}
}

UserCertif = Form.create()(UserCertif);
UserCertif = injectIntl(UserCertif);
CompanyCertif = Form.create()(CompanyCertif);
CompanyCertif = injectIntl(CompanyCertif);
export default Certification;