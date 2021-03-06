/**
 * Created by hp on 2017/10/24.
 */
import React from 'react';
import css from './PhoneVerifi.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import Steps from '../Public/Steps/Steps.js';
import operator from './operator.js';

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
	Row,
	Col,
	Radio,
	Breadcrumb,
	message,
	DatePicker
} from 'antd';
message.config({
	top: '40%',
	duration: 2,
});
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const user = JSON.parse(sessionStorage.getItem("user"));
class PhoneVerifi extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		console.log(this.props.params)
		this.state = {
			step: parseInt(this.props.params.type) == 1 ? (user.tel ? 0 : 1) : (user.email ? 0 : 1),
			verifi_modl: this.props.params.type, //1手机验证，2邮箱验证
			user: user,
			phone: 12432434,
			email: 224,

		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleJump = (url) => {
		this.props.history.pushState(null, url);
	}

	handleSteps = (step) => {
		this.setState({
			step: this.state.step + step
		})
	}
	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div  className={css.phone_verifi}>
		            <div className={basecss.child_title}>{console.log(this.state.step,this.props.params.type,user.tel)}
		                        {this.state.verifi_modl==1?this.formatMessage({id:"app.phone.verification"})
		                        :this.formatMessage({id:"app.email.verification"})
		                    	}
		            </div>
		            <div className={css.content}>
		            		{ <Steps className={css.steps} 
		            			steps={this.state.verifi_modl==1?operator.steps:operator.steps_email} 
								current = {this.state.step}
							  />
							}		

		                    {this.state.step==0?<Authentication handleSteps={this.handleSteps} type={this.state.verifi_modl}/>

		                    :this.state.step==1?<SetPwd handleSteps={this.handleSteps} type={this.state.verifi_modl} />
		                    :this.state.step==2?<SetSuccess type={this.state.verifi_modl} handleJump={this.handleJump}/>
		                    :""}
		            </div>		           
       			</div>
	}
}
class Authentication extends React.Component {
	state = {
		value: 1,
	}
	onChange = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
	}

	constructor(props) {
		super(props);
		console.log(this.props.type)
		this.state = {
			loading: false,
			time: 0,
			verifi_modl: this.props.type, //认证类型：1验证手机，2验证邮箱
			code_modl: 1, //接收方式：1选择手机接收验证码，2选择邮箱收验证码
			phone: 12432434,
			email: 224,
			disabled: false
		}
		this.formatMessage = this.props.intl.formatMessage;
		this.timer = null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(values)
			if (!err) {
				let param;
				if (this.state.verifi_modl == 1) {
					let tel = user.tel,
						check = values.phoneoremailcheck;
					param = {
						tel: tel,
						telCode: check
					};
					axios.post('/user/phonecheck.json', param).then(res => {
						if (res.data.isSucc) {
							console.log(res.data)
							this.props.handleSteps ? this.props.handleSteps(1) : '';
						} else {
							message.error(res.data.message);
						}
					})
				} else {
					let email = user.email,
						check = values.phoneoremailcheck;
					param = {
						email: email,
						emailCode: check
					};
					axios.post('/user/emailcheck.json', param).then(res => {
						if (res.data.isSucc) {
							console.log(res.data)
							this.props.handleSteps ? this.props.handleSteps(1) : '';
						} else {
							message.error(res.data.message);
						}
					})
				}
			}
		})
	}

	getVerifiCode = () => {
		if (user.tel || user.email) {
			this.setState({
				loading: false,
				time: 60,
				disabled: true
			})
			this.timer = setInterval(() => {
				/*console.log(this.state.time);*/
				if (this.state.time - 1 >= 0) {
					this.setState({
						time: this.state.time - 1,
						disabled: true
					})
				} else {
					this.setState({
						time: 0,
						disabled: false
					})
					clearInterval(this.timer)
				}
			}, 1000)
			if (this.state.verifi_modl == 1) {
				let tel = user.tel;
				let type = this.state.verifi_modl;
				axios.get(`/user/sendcode.json?account=${tel}&type=${type}`).then(res => {
					if (res.data.isSucc) {
						console.log(res.data);
					} else {
						message.error(res.data.message);
					}
				})
			} else {
				let email = user.email;
				let type = this.state.verifi_modl;
				axios.get(`/user/sendcode.json?account=${email}&type=${type}`).then(res => {
					if (res.data.isSucc) {
						console.log(res.data);
					} else {
						message.error(res.data.message);
					}
				})
			}
		} else {
			message.error(this.formatMessage({
				id: 'authen.authen.account_warn'
			}))
		}

	}
	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	render() {

		let formItemLayout = {
			labelCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 8

				},
			},
			wrapperCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 14
				},
			},
		};
		const tailFormItemLayout = {

			wrapperCol: {
				xs: {
					span: 24,
					offset: 8,
				},
				sm: {
					span: 14,
					offset: 8,

				},
			},
		};
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		const {
			getFieldDecorator
		} = this.props.form;
		return <div className={css.ship_from}>
       
		                <Form onSubmit={this.handleSubmit}>              
		                    
		                    <FormItem
					          {...formItemLayout}
		                        label={this.state.verifi_modl==1?this.formatMessage({id: 'moblie.phone'})
		                    		  :this.formatMessage({id: 'post.email'})
		                    		}

		                    >
					          {getFieldDecorator('phone_email', {
		                         
		                      })(
		                         <p>{this.state.verifi_modl==1?user.tel:user.email}</p>
		                      )}
		                    </FormItem>
		                    <FormItem
					          {...formItemLayout}
		                        label={this.formatMessage({id: 'register.register.verification'})}

		                    >
		                    <Row gutter={8}>
		                         <Col span={11} style={{ width: 203}}>   
		      			                 {getFieldDecorator('phoneoremailcheck', {
		                                rules: [ {
		                                    required: true, message:this.formatMessage({ id:'register.verifivation.warn'}),
		                                }],
		                            })(
											<Input ref={(phoneoremail)=>{this.phoneoremail=phoneoremail}} className={css.verifi_input} />
		                            )}
		                            </Col>
		                            <Col span={12}>
		                                 <Button onClick={this.getVerifiCode} disabled={this.state.disabled} loading={this.state.loading} className={appcss.button_blue}  style={{minWidth:185,height:36,marginLeft: 12}}>
		                                        {this.formatMessage({id: 'repwd.get_code'})}
		                                        {this.state.time?("("+this.state.time+")"):""}
		                                  </Button>
		                            </Col>
		                          </Row>
		                    </FormItem>


		                    <FormItem  {...tailFormItemLayout}>
		                        <Button  type="primary" 
		                       			 htmlType="submit" 
		                       		   	 className={appcss.button_theme}>
		                             	 {this.formatMessage({id: 'authen.authen.nextstep'})}
		                        </Button>
		                                       
		                    </FormItem>
		                </Form>
		          
            
        </div>
	}
}
class SetPwd extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props)
		this.state = {
			verifi_modl: this.props.type, //1手机验证，2邮箱验证
			phone: 12432434,
			email: 224,
			loading: false,
			disabled: false,
		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			let param;
			if (this.state.verifi_modl == 1) {
				param = {
					tel: values.verifi_phone,
					telCode: values.verifi_code
				};
				axios.post('user/verifi_phone.json', param).then(res => {
					if (res.data.isSucc) {
						user.tel = param.tel;
						sessionStorage.setItem("user", JSON.stringify(user));
						this.props.handleSteps ? this.props.handleSteps(1) : '';
					} else {
						message.error(res.data.message);
					}
				})
			} else {
				param = {
					email: values.verifi_email,
					emailCode: values.verifi_code
				};
				axios.post('user/verifi_email.json', param).then(res => {
					if (res.data.isSucc) {
						user.email = param.email;
						sessionStorage.setItem("user", JSON.stringify(user));
						this.props.handleSteps ? this.props.handleSteps(1) : '';
					} else {
						message.error(res.data.message);
					}
				})
			}

		})
	}

	getVerifiCode = () => {
		/*console.log(this.verifi_email.props.value)*/
		console.log(this.props.form.getFieldsValue())
		console.log(this.verifi_email)
		let values = this.props.form.getFieldsValue();
		if (values.verifi_phone || values.verifi_email) {
			this.setState({
				loading: false,
				time: 60,
				disabled: true
			})
			this.timer = window.setInterval(() => {
				/*console.log(this.state.time);*/
				if (this.state.time - 1 >= 0) {
					this.setState({
						time: this.state.time - 1,
						disabled: true
					})
				} else {
					this.setState({
						time: 0,
						disabled: false
					})
					window.clearInterval(this.timer)
				}
			}, 1000)
			if (this.state.verifi_modl == 1) {
				let phone = values.verifi_phone;
				let type = this.state.verifi_modl;
				axios.get(`/user/sendcode.json?account=${phone}&type=${type}`).then(res => {
					if (res.data.isSucc) {
						console.log(res.data);
					} else {
						message.error(res.data.message);
					}
				})
			} else {
				let email = values.verifi_email;
				let type = this.state.verifi_modl;
				axios.get(`/user/sendcode.json?account=${email}&type=${type}`).then(res => {
					if (res.data.isSucc) {
						console.log(res.data);
					} else {
						message.error(res.data.message);
					}
				})
			}
		} else {
			message.error(this.formatMessage({
				id: 'authen.authen.account_warn'
			}))
		}

	}


	render() {


		let formItemLayout = {
			labelCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 8

				},
			},
			wrapperCol: {
				xs: {
					span: 24
				},
				sm: {
					span: 14
				},
			},
		};
		const tailFormItemLayout = {

			wrapperCol: {
				xs: {
					span: 24,
					offset: 8,
				},
				sm: {
					span: 14,
					offset: 8,

				},
			},
		};
		const {
			getFieldDecorator
		} = this.props.form;
		return <div className={css.ship_from}>
       
		                <Form onSubmit={this.handleSubmit}>              
		                  
		                    <FormItem
						          {...formItemLayout}
						            label={this.state.verifi_modl==1?this.formatMessage({id: 'new.number'})
									 :this.formatMessage({id:'post.email'})			                      	
									}
			                    >
			                    {this.state.verifi_modl==1?
							          getFieldDecorator('verifi_phone', {
				                          rules: [{
				                              required: true, message:this.formatMessage( {id:'register.tel.warn'}),
				                          }],
				                      })(

				                      	 <Input ref={(verifi_phone)=>{this.verifi_phone=verifi_phone}} className={appcss.form_input}/>
						   
				                      )
									: 
									getFieldDecorator('verifi_email', {
				                          rules: [{
				                              required: true, message:this.formatMessage( {id:'register.email.warn'}),
				                          },{ type: 'email',  message:this.formatMessage( {id:'app.email.reg'}),}],
				                      })(

				                      	 <Input ref={(verifi_email)=>{this.verifi_email=verifi_email}} className={appcss.form_input}/>
						   
				                      )
								}

                   			 </FormItem>
		                    <FormItem
					          	{...formItemLayout}
		                        label={this.formatMessage({id: 'register.register.verification'})}
		                    >
		                    	<Row gutter={8}>
		                         	<Col span={11} style={{ width: 203}}>   
		      			                 {getFieldDecorator('verifi_code', {
		                                rules: [ {
		                                    required: true, message:this.formatMessage({ id:'register.verifivation.warn'}),
		                                }],
		                            })(
											<Input className={css.verifi_input} />
		                            )}
		                            </Col>
		                            <Col span={12}>
		                                 <Button  style={{ width: 185,marginLeft:12}} onClick={this.getVerifiCode} disabled={this.state.disabled} loading={this.state.loading} className={appcss.button_blue} >
		                                        {this.formatMessage({id: 'repwd.get_code'})}
		                                        {this.state.time?("("+this.state.time+")"):""}
		                                  </Button>
		                            </Col>
		                          </Row>
		                    </FormItem>


		                    <FormItem  {...tailFormItemLayout}>
		                        <Button  type="primary" 
		                       			 htmlType="submit" 
		                       		   	 className={this.state.verifi_modl==1?appcss.button_black:appcss.button_theme}>		                		   	 
		                             	 {this.state.verifi_modl==1?this.formatMessage({id: 'perau.perau.save'})
		                             	 :this.formatMessage({id: 'authen.authen.nextstep'})
		                             	}
		                        </Button>
		                                       
		                    </FormItem>
		                </Form>
		          
            
        </div>
	}
}

class SetSuccess extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {

			verifi_modl: this.props.type, //1手机验证，2邮箱验证
			phone: 12432434,
			email: 224,

		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleClick = () => {
		axios.get('user/get-userinfo-byuid.json').then(res => {
			console.log(res.data)
			if (res.data.isSucc) {
				localStorage.clear();
				sessionStorage.clear();
				sessionStorage.setItem('user', JSON.stringify(res.data.result));
				this.props.handleJump("/page/mine/account");
				/*this.props.history.pushState(null, "/page/mine/account");*/
			} else {
				message.error(res.data.message)
			}
		})

	}

	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div className={css.reset_success}>
		<div className={css.suc_content}>
                <Icon type="smile-o" />&nbsp;&nbsp;&nbsp;
                {this.state.verifi_modl==1?this.formatMessage({id: 'modify.success'})
                :this.formatMessage({id: 'phone.verifi.success'})
            }
                
            </div>
            <Button type="primary" onClick={this.handleClick} className={appcss.button_theme} style={{width:240}}>
                <FormattedMessage id="orderdetails.return" defaultMessage="去登录"/>
            </Button>
        </div>
	}
}
SetPwd = Form.create()(SetPwd);
Authentication = Form.create()(Authentication);
Authentication = injectIntl(Authentication);
SetPwd = injectIntl(SetPwd);
SetSuccess = injectIntl(SetSuccess);

PhoneVerifi = Form.create()(PhoneVerifi);
export default injectIntl(PhoneVerifi);