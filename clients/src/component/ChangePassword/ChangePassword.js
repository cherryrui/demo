/**
 * Created by hp on 2017/10/23.
 */
import React from 'react';
import css from './ChangePassword.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import CusModal from '../Public/CusModal/CusModal.js';
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
  Breadcrumb,
  message,
  DatePicker
} from 'antd';
const FormItem = Form.Item;
class ChangePassword extends React.Component {
  state = {
    visible: false
  }
  handlePassword = () => {
    this.setState({
      visible: false,
    });
  }
  handleOk = (e) => {
    /*console.log(e);*/
    this.setState({
      visible: false,
    });
    this.props.history.pushState(null, "/page/mine/account");
  }
  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(values.password == values.re_password){
            let param = {
              originalPwd:values.original_password,
              password:values.password
            };
            axios.post('/user/repassword.json',param).then(res=>{
              console.log(res.data);
              if(res.data.isSucc){
                message.success(this.formatMessage({
                  id:"reset.success.info"
                }));
                this.setState({
                  visible:true
                })
                /*this.props.history.pushState(null, "/page/mine/account");*/
              }else if(res.data.code == 104){
                this.setState({
                    user: JSON.parse(sessionStorage.user),
                }) 
                this.props.handleVisible ? this.props.handleVisible() : "";              
              }else{
                message.error(res.data.message);
              }
            })
        }else{
          message.error(this.formatMessage({
            id:"repwd.check.pwd_warn"
          }))
        }
        
      }
    });
  }

  constructor(props) {
    super(props);
    this.formatMessage = this.props.intl.formatMessage;
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
    return <div>
            <div className={basecss.child_title}>
                        { this.formatMessage({id:"app.login.password"})}
            </div>
            <div className={css.account_from}>
                <Form onSubmit={this.handleSubmit}>
                  <FormItem
			                 {...formItemLayout}
                        label={formatMessage({id: 'original.password'})}
                  >
			                  {getFieldDecorator('original_password', {
                          rules: [ {
                              required: true, message: this.formatMessage({id:'enter.original.password'}),
                          }],
                        })(
                            <Input className={appcss.form_input} type='password'/>
                         )}
                    </FormItem>

                    <FormItem
			                  {...formItemLayout}
                        label={formatMessage({id: 'repwd.new.pwd'})}
                    >
			                   {getFieldDecorator('password', {
                          rules: [{
                              required: true, message:this.formatMessage({ id:'register.password.warn'}),
                          }],
                        })(
                          <Input  type='password' className={appcss.form_input}/>
                        )}
                    </FormItem>
                    <FormItem
			                 {...formItemLayout}
                        label={formatMessage({id: 'repwd.config.pwd'})}
                    >
			                 {getFieldDecorator('re_password', {
                          rules: [{
                              required: true, message:this.formatMessage( {id:'register.re_password.warn'}),
                          }],
                        })(
                          <Input type='password' className={appcss.form_input}/>
                        )}
                    </FormItem>
                    <FormItem
			                   {...formItemLayout}
                          label={formatMessage({id: 'phone.verification.code'})}
                    >
                          <Row gutter={8}>
                               <Col span={11}>   
            			                 {getFieldDecorator('phone', {
                                      rules: [ {
                                          required: true, message:this.formatMessage({ id:'register.verifivation.warn'}),
                                      }],
                                  })(
                                      <Input  className={css.phone_input} />                            
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
                        <Button  className={appcss.button_theme} style={{width:120}}>
                              {this.formatMessage({id: 'app.cancel'})}
                        </Button>
                        <Button className={appcss.button_black}
                            onClick={this.handlePassword} 
                            style={{marginLeft: 10,width:120}} htmlType="submit">
                                  {this.formatMessage({id: 'app.save'})}
                        </Button>                
                        <CusModal width="450"
                            visible={this.state.visible}
                            closeModal={this.handleCancel}
                            onOk={this.handleOk}
                        >
                            <div className={css.success}>
                                <div className={css.success_info}>
                                    <Icon className={css.success_icon} type="smile-o"  /> 
                                    <p>{this.formatMessage({id: 'reset.success.info'})}</p>
                                </div>
                                
                                <Button  
                                    className={appcss.button_black}
                                    style={{width:120,height:36}}
                                    onClick={this.handleOk} >
                                   {this.formatMessage({id: 'app.ok'})}
                                </Button>
                            </div>
                        </CusModal> 
                    </FormItem>
                </Form>
            </div>


        </div>
  }
}

ChangePassword = Form.create()(ChangePassword);
export default injectIntl(ChangePassword);