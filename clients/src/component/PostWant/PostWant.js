import axios from 'axios';
import React from 'react';
import css from './PostWant.scss';
import appcss from '../../App.scss';
import Util from '../../Util.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';
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
	Icon,
	Input,
	Button,
	Checkbox,
	Upload,
	Breadcrumb,
	message,
	DatePicker,
	Radio,
} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
message.config({
	top: '40%',
	duration: 2,
});

class PostWant extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			create_time: '',
			demandWay: 1,
			user:JSON.parse(sessionStorage.getItem("user")),
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	/*componentDidMount() {
		this.postwant.scrollIntoView();
	}*/
	handleSubmit = (e) => {
		if(this.state.user && this.state.user.vip==5){
			e.preventDefault();
			this.props.form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					let param = values;
					param.time = this.state.create_time;
					param.demandWay = this.state.demandWay;
					param.uploadFileUrl = [];
					values.file.map(item => {
						param.uploadFileUrl.push(item.response.url);
					})
					param.uploadFileUrl = JSON.stringify(param.uploadFileUrl);
					delete param.file;
					axios.post('api/demand-controller.json', param).then(res => {
						if (res.data.isSucc) {
							/*this.props.history.pushState(null, "/");*/
						} else if (res.data.code == 104) {
							this.setState({
								visible: true
							})
						} else {
							message.error({
								reason: res.data.message
							})
						}
					})
				}
			})
		}else{
			message.error(this.formatMessage({ id:'app.level.warm'}))
		}
		
	}
	onChanges = (date, dateString) => {
		console.log(date, dateString)
		this.setState({
			create_time: dateString
		})
	}
	onChangedemandWay = (e) => {
		this.setState({
			demandWay: e.target.value,
		})
	}
	normFile = (e) => {
		console.log(e);
		if (!this.state.img_logo) {
			this.setState({
				img_logo: true
			})
		}
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}
	beforeUpload = (file) => {
		console.log(file.type);
		var typeCheck = false;
		if (this.state.demandWay == 1) {
			typeCheck = file.type === 'image/jpeg' || file.type === 'image/png';
		} else {
			typeCheck = file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
				file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		}
		if (!typeCheck) {
			message.error(this.formatMessage({
				id: 'file.type.error'
			}))
		}
		const isLt2M = file.size / 1024 / 1024 < 10;
		if (!isLt2M) {
			message.error(this.formatMessage({
				id: 'mine.product.size.warn'
			}));
		}
		return typeCheck && isLt2M;
	}

	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		let {
			getFieldDecorator
		} = this.props.form;
		let formItemLayout = {
			labelCol: {
				span: 4,
				offset: 5,
			},
			wrapperCol: {
				span: 8,
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
					offset: 8,

				},
			},
		};
		return <div className={appcss.body} ref={(postwant)=>{this.postwant=postwant}}>
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="main.post" defaultMessage="Post Your Want"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.header} style={{background: `url("../img/post_bg.jpg")`}}>
            	<p className={css.title}>
            		<FormattedMessage id="main.post" defaultMessage="分类"/>
            	</p>
            	<p className={css.descrip}>
            		<FormattedMessage id="main.post.descrip" defaultMessage="分类"/>
            	</p>
            </div>
            <div></div>
            <div className={css.form}>
            	<Form onSubmit={this.handleSubmit}>
            	<FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.requirement.subject'})}

			        >
			          {getFieldDecorator('demandSubject', {
			            rules: [ {
			              required: true, message:this.formatMessage({ id:'enter.requirement.subject'}),
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'quotation.company.name'})}

			        >
			          {getFieldDecorator('company_name', {
			            rules: [ {
			              required: true, message: this.formatMessage({id:'agent.enter.company'}),
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'post.linkman'})}

			        >
			          {getFieldDecorator('linkman', {
			            rules: [{
			              required: true, message:this.formatMessage({ id:'post.linkman.info'}),
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'post.email'})}

			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              required: true, message:this.formatMessage( {id:'register.email.warn'}),
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'quotation.contact.tel'})}

			        >
			          {getFieldDecorator('phone', {
			            rules: [ {
			              required: true, message:this.formatMessage({ id:'register.tel.warn'}),
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			         <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'quotation.create_time'})}
			          hasFeedback
			        >
			          {getFieldDecorator('time', {
			            rules: [{
			              type: 'object', required: true, message:this.formatMessage({ id:'app.select.time'}),
			            }],
			          })(
			             <DatePicker onChange={this.onChanges} className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			        	{...formItemLayout}
			          	label={formatMessage({id: 'post.demand_way'})}
			         >
			        	<RadioGroup onChange={this.onChangedemandWay} value={this.state.demandWay}>
				        <Radio value={1}>
				        	<FormattedMessage id="post.want.img" defaultMessage=""/>
				        </Radio>
				        <Radio value={2}>
				        	<FormattedMessage id="post.want.file" defaultMessage=""/>
				        </Radio>
				      </RadioGroup>
			        </FormItem>
                    <FormItem  style={{display:"flex"}}
                    	{...formItemLayout}
                    	label={this.formatMessage({id: 'post.upload'})}
                	>
                    	{getFieldDecorator('file', {
	                        valuePropName: 'fileList',
	                        getValueFromEvent: this.normFile,
	                        rules: [{ type:"array", required: true, message: this.formatMessage({id: 'post.upload'}),
	                            }],
                        })(
                            <Upload 
                                name="file"
                                action={Util.url+"/tool/upload"}
                                onRemove={this.removeFile}
                                beforeUpload={this.beforeUpload}
                                multiple
                              >
                                <Button  className={appcss.button_black}  style={{ width:120}}>
                                 	{this.formatMessage({id: 'post.select.file'})}
                              	</Button>
                              	<span style={{paddingLeft:20}}>{this.formatMessage({id:this.state.demandWay==1?"app.picture.format":"app.file.format"})}</span>
                            </Upload>
                    	)}
                	</FormItem>
                    <FormItem {...tailFormItemLayout}>
                          <FormattedMessage id="post.fill.again" defaultMessage="上传" values={{click:<span className={css.clink_here}>clink here</span>}}/>

                    </FormItem>
                    <FormItem style={{ paddingLeft:120}} {...tailFormItemLayout}>
                        <Button style={{ width:200}}type="primary" htmlType="submit" className={appcss.button_radius}>
                              {this.formatMessage({id: 'app.save'})}
                        </Button>
                    </FormItem>
        		</Form>

            </div>
            <LoginModal visible={this.state.visible} reload closeModal={this.handleCancel}/>
		</div>
	}
}

PostWant = Form.create()(PostWant);
export default injectIntl(PostWant);