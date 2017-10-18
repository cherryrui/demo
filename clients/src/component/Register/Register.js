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


class Register extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired
    };
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
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post('/user/register.json', values).then(res => {
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
            console.log(this.account)
            this.setState({
                loading: false
            })
            axios.get(`/user/sendcode.json?account=${account}`).then(res => {
                this.setState({
                    loading: false,
                    time: 60,
                    disabled: true
                })
                this.timer = window.setInterval(() => {
                    console.log(this.state.time);
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
                    <Link to="/" className={css.logo}> LOGO </Link>
                    <p className={css.title_text}>
                        <FormattedMessage id="register.register.title" defaultMessage="用户注册"/>
                    </p>
                </div>
                <div className={css.form}>
                    <Form onSubmit={this.handleSubmit}>

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'persondata.user.style'})}
                        >
                        {getFieldDecorator('tp',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.style_warn'})
                            }]
                        })(
                            <Radio.Group >
                                <Radio.Button value={1}className={css.reqister_radio_one}>
                                    <FormattedMessage id="persondata.indivdual.user" defaultMessage="个人用户"/>
                                </Radio.Button>
                                <Radio.Button value={2} className={css.reqister_radio_two}>
                                    <FormattedMessage id="persondata.enterprise.user" defaultMessage="企业用户"/>
                                </Radio.Button>
                            </Radio.Group>
                        )}
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
                            <Input  className={css.reqister_input}/>
                        )}
                        </FormItem>

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

                        {/*<FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.register.verification'})}
                        >
                            <Row gutter={10}>
                                <Col span={12}>
                                {getFieldDecorator('verificationCode',{
                                    rules:[{
                                        required:true,
                                        message:formatMessage({id:"register.verifivation.warn"})
                                    }]
                                })(
                                    <Input size="large" />
                                )}
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" disabled={this.state.disabled} size="large" loading={this.state.loading} onClick={this.handleCode}>
                                        <FormattedMessage id="repwd.get_code" defaultMessage="获取验证"/>
                                        {this.state.time?("("+this.state.time+")"):""}
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>*/}
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
                                <Checkbox>
                                    <FormattedMessage id="register.notes" defaultMessage="记住密码"/>
                                </Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" className={css.reqister_Button}>
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