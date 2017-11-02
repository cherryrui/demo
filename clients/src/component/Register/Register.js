/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './Register.scss';
import appcss from '../../App.scss';
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
    Tooltip,
    Popover,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
    Tabs,
    Radio
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

const options = [{
    label: '个人用户',
    value: 1
}, {
    label: '企业用户',
    value: 2
}];


class Register extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            time: 0,
            verification_mode: 1, //1手机验证.2邮箱验证
            disabled: false,
            usertype: 1, //1个人用户 2.企业用户
            check: true,
        }
        this.formatMessage = this.props.intl.formatMessage;
        this.timer = null;
    }
    handleSubmit = (e) => {
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let phoneoremail = values.email ? values.email : values.tel;
                let params = {
                    userName: values.name,
                    password: values.password,
                    eamilphone: this.state.verification_mode,
                    emailOrphone: phoneoremail,
                    userType: this.state.usertype,
                    checkCode: values.verificationCode
                }
                axios.post('/user/register.json', params).then(res => {
                    console.log('2222', JSON.stringify(res));
                    if (res.data.isSucc) {
                        message.success(formatMessage({
                            id: 'regcomplt.regcomplt.Registeredsuccessfully'
                        }));
                        let param = {
                            userName: values.name,
                            password: values.password
                        };
                        axios.post('/user/login.json', param).then(res => {
                            if (res.data.isSucc) {
                                sessionStorage.setItem('user', JSON.stringify(res.data.result));
                                /*this.props.history.pushState(null, "/");*/
                                this.props.history.pushState(null, "/register-complete");
                            } else {
                                message.error(formatMessage({
                                    id: 'login.login.fail'
                                }, {
                                    reason: res.data.message
                                }))
                            }
                        })

                    } else {
                        message.error(formatMessage({
                            id: 'register.failed'
                        }, {
                            reason: res.data.message
                        }))
                    }
                });
            }
        })
    };
    handleCode = (e) => {
        if (this.tel.props.value || this.email.props.value) {
            let account = this.tel.props.value ? this.tel.props.value : this.email.props.value;
            let verification_mode = this.state.verification_mode;
            console.log(account)
            this.setState({
                loading: false
            })
            axios.get(`/user/sendcode.json?account=${account}&type=${verification_mode}`).then(res => {
                console.log(res.data)
                if (res.data.isSucc) {
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
                } else {
                    message.error(res.data.message);
                }

            })
        } else {
            message.warn(this.formatMessage({
                id: "authen.authen.account_warn"
            }))

        }
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(this.formatMessage({
                id: "repwd.check.pwd_warn"
            }));
        } else {
            callback();
        }
    }
    onChangeverifi = (e) => {
        console.log(`radio checked:${e.target.value}`);
        this.setState({
            verification_mode: e.target.value
        })
    }
    onChangtype = (e) => {
        console.log(`radio checked:${e.target.value}`);
        this.setState({
            usertype: e.target.value
        })
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


        return (
            <div className={css.body}>
                <div className={css.title}>
                    {/*<Link to="/" className={css.logo}> LOGO </Link>*/}
                    <p className={css.title_text}>
                        <FormattedMessage id="register.register.title" defaultMessage="用户注册"/>
                    </p>
                </div>
                <div className={css.form}>
                    <Form onSubmit={this.handleSubmit}>

                        <FormItem {...tailFormItemLayout} >
                    
                           {(
                            <Radio.Group defaultValue={this.state.usertype} onChange={this.onChangtype}>
                                <Radio value={1}className={css.reqister_radio_one}>
                                    <Icon className={css.icon} type="user" /><FormattedMessage id="persondata.indivdual.user" defaultMessage="个人用户"/>
                                </Radio>
                                <Radio value={2} className={css.reqister_radio_two}>
                                    <Icon className={css.icon} type="usergroup-add" /><FormattedMessage id="persondata.enterprise.user" defaultMessage="企业用户"/>
                                </Radio>
                            </Radio.Group>
                            )}
                        
                        </FormItem>

                        {/*<FormItem {...formItemLayout}
                            label={formatMessage({id: 'persondata.user.style'})}
                        >
                        {(
                            <Radio.Group defaultValue={this.state.usertype} onChange={this.onChangtype}>
                                <Radio.Button value={1}className={css.reqister_radio_one}>
                                    <FormattedMessage id="persondata.indivdual.user" defaultMessage="个人用户"/>
                                </Radio.Button>
                                <Radio.Button value={2} className={css.reqister_radio_two}>
                                    <FormattedMessage id="persondata.enterprise.user" defaultMessage="企业用户"/>
                                </Radio.Button>
                            </Radio.Group>
                        )}
                        </FormItem>*/}

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.register.name'})}
                            
                        >
                        {getFieldDecorator('name',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.name.warn'})
                            }]
                        })(
                            <Input  className={css.reqister_input}/>
                        )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'verification.mode'})}
                        >
                        {(
                            <Radio.Group defaultValue={this.state.verification_mode} onChange={this.onChangeverifi}>
                                <Radio value={1}className={css.reqister_radio_one}>
                                    <Icon className={css.icon} type="phone" /><FormattedMessage id="moblie.phone" defaultMessage="手机"/>
                                </Radio>
                                <Radio value={2} className={css.reqister_radio_two}>
                                    <Icon className={css.icon} type="message" /><FormattedMessage id="post.email" defaultMessage="邮箱"/>
                                </Radio>
                            </Radio.Group>
                        )}
                        </FormItem>
                        {/*<FormItem {...formItemLayout}
                            label={formatMessage({id: 'verification.mode'})}
                        >
                        {(
                            <Radio.Group defaultValue={this.state.verification_mode} onChange={this.onChangeverifi}>
                                <Radio.Button value={1}className={css.reqister_radio_one}>
                                    <FormattedMessage id="moblie.phone" defaultMessage="手机"/>
                                </Radio.Button>
                                <Radio.Button value={2} className={css.reqister_radio_two}>
                                    <FormattedMessage id="post.email" defaultMessage="邮箱"/>
                                </Radio.Button>
                            </Radio.Group>
                        )}
                        </FormItem>*/}
                    {this.state.verification_mode==2?
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'post.email'})}
                        >
                        {getFieldDecorator('email',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:"register.email.warn"})
                            }]
                        })(
                            <Input ref={(email)=>{this.email=email}} className={css.reqister_input}/>
                        )}
                        </FormItem>
                         :   
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'cart.delivery.tel'})}
                        >
                        {getFieldDecorator('tel',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:"register.tel.warn"})
                            }]
                        })(
                            <Input ref={(tel)=>{this.tel=tel}} className={css.reqister_input}/>
                        )}
                        </FormItem>
                    }
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.register.verification'})}
                        >
                            <Row gutter={10}>
                                <Col span={14}>
                                {getFieldDecorator('verificationCode',{
                                    rules:[{
                                        required:true,
                                        message:formatMessage({id:"register.verifivation.warn"})
                                    }]
                                })(
                                    <Input size="large" />
                                )}
                                </Col>
                                <Col span={8}>
                                    <Button type="primary" className={appcss.button_black} disabled={this.state.disabled} size="large" loading={this.state.loading} onClick={this.handleCode}>
                                        <FormattedMessage id="repwd.get_code" defaultMessage="获取验证"/>
                                        {this.state.time?("("+this.state.time+")"):""}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.pwd'})}
                        >
                        {getFieldDecorator('password',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.password.warn'})
                            }]
                        })(
                            <Input type='password' className={css.reqister_input}/>
                        )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.re.pwd'})}
                        >
                        {getFieldDecorator('repassword',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.re_password.warn'})
                            },{
                                validator: this.checkPassword,
                            }]
                        })(
                            <Input type='password' className={css.reqister_input}/>
                        )}
                        </FormItem>

                        <FormItem {...tailFormItemLayout}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox style={{fontSize:"10px"}}>
                                    <FormattedMessage id="register.message" defaultMessage="message"/>
                                    <Link style={{color:"#ffc70d"}}>
                                        <FormattedMessage  id="register.condition" defaultMessage="message"/>
                                    </Link>
                                    <FormattedMessage id="register.and" defaultMessage="message"/>
                                    <Link style={{color:"#ffc70d"}}>
                                        <FormattedMessage   id="register.privacy.notice" defaultMessage="message"/>
                                    </Link>
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" style={{width: 400}}>
                                <FormattedMessage id="login.registor" defaultMessage="注册"/>
                            </Button>
                        </FormItem>
                        <div className={css.footer}>
                            <FormattedMessage id="register.have.acount" defaultMessage="登录"/>
                            <Link to="/login">
                                <FormattedMessage id="register.go.login" defaultMessage="登录"/>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

Register = Form.create()(Register);
export default injectIntl(Register);