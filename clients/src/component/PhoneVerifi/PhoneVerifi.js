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
	injectIntl
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
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class PhoneVerifi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
		}
		this.formatMessage = this.props.intl.formatMessage;
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
		            <div className={basecss.child_title}>
		                        { this.formatMessage({id:"app.phone.verification"})}
		            </div>
		            <div className={css.content}>

		                    <Steps className={css.steps} steps={operator.steps} current={this.state.step}/>
		                    {this.state.step==0?<Authentication handleSteps={this.handleSteps}/>
		                    :this.state.step==1?<SetPwd handleSteps={this.handleSteps}/>
		                    :this.state.step==2?<SetSuccess/>
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
		this.state = {
			loading: false,
			time: 0,
			disabled: false
		}
		this.formatMessage = this.props.intl.formatMessage;
		this.timer = null;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.timer) {
					window.clearInterval(this.timer)
				}
				axios.post('/user/authentication.json', values).then(res => {
					if (res.data.status) {
						this.props.handleSteps ? this.props.handleSteps(1) : '';
					} else {
						message.error(this.formatMessage({
							id: 'repassword.fail'
						}, {
							reason: res.data.result
						}))
					}
				})
			}
		})
	};


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		const {
			getFieldDecorator
		} = this.props.form;
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

		return <div className={css.ship_from}>
       
		                <Form onSubmit={this.handleSubmit}>              
		                    <FormItem
					          {...formItemLayout}
		                        label={formatMessage({id: 'verification.mode'})}

		                    >
					    	    {getFieldDecorator('verification_mode', {
		                          rules: [{
		                              required: true, message:this.formatMessage({ id:'verification.mode.select'}),
		                          }],
		                      })(
		                          <RadioGroup onChange={this.onChange} >
								        <Radio 
									        value={1}>  
									        {this.formatMessage({id: 'moblie.phone'})}
								        </Radio>
									        <Radio value={2} style={{paddingLeft:40}}> 
									         {this.formatMessage({id: 'post.email'})}
								        </Radio>		      
								      </RadioGroup>
		                      )}
		                    </FormItem>
		                    <FormItem
					          {...formItemLayout}
		                        label={formatMessage({id: 'app.phone.verification'})}

		                    >
					          {getFieldDecorator('moblie_phone', {
		                         
		                      })(
		                         <p>dffffffffffffffffff</p>
		                      )}
		                    </FormItem>
		                    <FormItem
					          {...formItemLayout}
		                        label={formatMessage({id: 'register.register.verification'})}

		                    >
		                    <Row gutter={8}>
		                         <Col span={11}>   
		      			                 {getFieldDecorator('phone', {
		                                rules: [ {
		                                    required: true, message:this.formatMessage({ id:'register.verifivation.warn'}),
		                                }],
		                            })(
											<Input  className={css.verifi_input} />
		                            )}
		                            </Col>
		                            <Col span={12}>
		                                 <Button className={appcss.button_blue} style={{width:155,height:36,marginLeft: 15}}>
		                                        {this.formatMessage({id: 'repwd.get_code'})}
		                                  </Button>
		                            </Col>
		                          </Row>
		                    </FormItem>


		                    <FormItem  {...tailFormItemLayout}>
		                        <Button  type="primary" 
		                       			 htmlType="submit" 
		                       		   	 className={appcss.button_theme} style={{width:240}}>
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
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (this.timer) {
					window.clearInterval(this.timer)
				}
				axios.post('/user/authentication.json', values).then(res => {
					if (res.data.status) {
						this.props.handleSteps ? this.props.handleSteps(1) : '';
					} else {
						message.error(this.formatMessage({
							id: 'repassword.fail'
						}, {
							reason: res.data.result
						}))
					}
				})
			}
		})
	};


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		const {
			getFieldDecorator
		} = this.props.form;
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

		return <div className={css.ship_from}>
       
		                <Form onSubmit={this.handleSubmit}>              
		                  
		                    <FormItem
						          {...formItemLayout}
			                        label={formatMessage({id: 'new.number'})}

			                    >
						          {getFieldDecorator('re_password', {
			                          rules: [{
			                              required: true, message:this.formatMessage( {id:'register.re_password.warn'}),
			                          }],
			                      })(
			                          <Input   className={appcss.form_input}/>
			                      )}
                   			 </FormItem>
		                    <FormItem
					          	{...formItemLayout}
		                        label={formatMessage({id: 'register.register.verification'})}
		                    >
		                    	<Row gutter={8}>
		                         	<Col span={11}>   
		      			                 {getFieldDecorator('phone', {
		                                rules: [ {
		                                    required: true, message:this.formatMessage({ id:'register.verifivation.warn'}),
		                                }],
		                            })(
											<Input  className={css.verifi_input} />
		                            )}
		                            </Col>
		                            <Col span={12}>
		                                 <Button className={appcss.button_blue} style={{width:155,height:36,marginLeft: 15}}>
		                                        {this.formatMessage({id: 'repwd.get_code'})}
		                                  </Button>
		                            </Col>
		                          </Row>
		                    </FormItem>


		                    <FormItem  {...tailFormItemLayout}>
		                        <Button  type="primary" 
		                       			 htmlType="submit" 
		                       		   	 className={appcss.button_black} style={{width:240}}>
		                             	 {this.formatMessage({id: 'perau.perau.save'})}
		                        </Button>
		                                       
		                    </FormItem>
		                </Form>
		          
            
        </div>
	}
}

class SetSuccess extends React.Component {
	constructor(props) {
		super(props);
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleClick = () => {
		this.props.history.pushState(null, "/login");
	}

	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div className={css.reset_success}>
		<div className={css.suc_content}>
                <Icon type="smile-o" />&nbsp;&nbsp;&nbsp;&nbsp;
                <FormattedMessage id="phone.verifi. success" defaultMessage="密码重置成功！"/>
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