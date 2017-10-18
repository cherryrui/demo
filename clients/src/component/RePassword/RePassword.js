/**
 * Created by 17272 on 2017/9/7.
 */
/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './RePassword.scss';
import appcss from '../../App.scss';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Form,
    Input,
    Popover,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    message,
    Tabs
} from 'antd';
import Steps from '../Public/Steps/Steps.js';
import operator from './operator.js';
import {
    Link
} from 'react-router';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;


class RePassword extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
        }
    }
    handleSteps = (step) => {
        this.setState({
            step: this.state.step + step
        })
    }

    render() {


        return (
            <div className={css.body}>
                <div className={css.title}>
                    <Link to="/" className={css.logo}> LOGO </Link>
                    <p className={css.title_text}>
                        <FormattedMessage id="authen.authen.resetpassword" defaultMessage="用户注册"/>
                    </p>
                </div>
                <div className={css.content}>
                    <Steps className={css.steps} steps={operator.steps} current={this.state.step}/>
                    {this.state.step==0?<Authentication handleSteps={this.handleSteps}/>
                    :this.state.step==1?<SetPwd handleSteps={this.handleSteps}/>
                    :this.state.step==2?<SetSuccess/>
                    :""}
                </div>
            </div>
        )


    }
}
class Authentication extends React.Component {

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
    handleCode = (e) => {
        if (this.account.props.value) {
            console.log(this.account)
            this.setState({
                loading: false
            })
            axios.get(`/user/sendcode.json?account=${this.account.props.value}`).then(res => {
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


    render() {
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 12
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 12,
                offset: 10
            }
        };

        return <div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'authen.authen.tel/email'})}
                >
                    <Row gutter={10}>
                        <Col span={16}>
                        {getFieldDecorator('account',{
                            rules:[
                                {
                                    required:true,
                                    message:this.formatMessage({id:"authen.authen.account_warn"})
                                }
                            ]
                        })(
                            <Input size="large" ref={(account)=>{this.account=account}}className={css.password_input} />
                        )}

                        </Col>
                        <Col span={8}>
                            <Button className={css.code_Button} type="primary" disabled={this.state.disabled} size="large" loading={this.state.loading} onClick={this.handleCode}>
                                <FormattedMessage id="repwd.get_code" defaultMessage="获取验证"/>
                                {this.state.time?("("+this.state.time+")"):""}
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id: 'register.register.verification'})}
                >
                {getFieldDecorator('code',{
                    rules:[{
                        required:true,
                        message: this.formatMessage({id:"register.verifivation.warn"})
                    }]
                })(
                    <Input  className={css.password_input} className={css.password_input}/>
                )}

                </FormItem>
                <FormItem className={css.Button_center}>
                    <Button type="primary" htmlType="submit" className={css.password_Button} >
                        <FormattedMessage id="authen.authen.nextstep" defaultMessage="下一步"/>
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
                console.log(values)
                axios.get(`/user/reset-pwd.json?pwd=${values.password}`).then(res => {
                    this.props.handleSteps ? this.props.handleSteps(1) : '';
                })
            }
        });
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
                span: 12,
                offset: 12
            }
        };
        const {
            getFieldDecorator
        } = this.props.form;

        return <div>
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id:'repwd.new.pwd'})}
                >
                {getFieldDecorator('password',{
                    rules: [{
                        required:true,
                        message:this.formatMessage({id:'repwd.new.pwd_warn'})
                    }]
                })(<Input type="password" placeholder={this.formatMessage({id:'repwd.new.pwd_warn'})} className={css.password_input}/>
                )}

                </FormItem>
                <FormItem {...formItemLayout}
                    label={this.formatMessage({id:'repwd.config.pwd'})}
                >
                {getFieldDecorator('confipwd',{
                    rules:[{
                        required:true,
                        message:this.formatMessage({id:'repwd.config.pwd_warn'})
                    },{
                        validator: this.checkPassword,
                    }]
                })(<Input type="password" placeholder={this.formatMessage({id:'repwd.config.pwd_warn'})} className={css.password_input}/>
                )}

                </FormItem>
                <FormItem className={css.Button_center}>
                    <Button type="primary" htmlType="submit" className={css.password_Button}>
                        <FormattedMessage id="authen.authen.nextstep" defaultMessage="下一步"/></Button>
                </FormItem>
            </Form>
        </div>
    }
}

class SetSuccess extends React.Component {

    handleClick = () => {
        this.props.history.pushState(null, "/login");
    }
    render() {
        return <div className={css.reset_success}>
            <div className={css.suc_content}>
                <Icon type="smile-o" />&nbsp;&nbsp;&nbsp;&nbsp;
                <FormattedMessage id="reset.success.info" defaultMessage="密码重置成功！"/>
            </div>
            <Button type="primary" onClick={this.handleClick} className={css.password_Button}>
                <FormattedMessage id="register.go.login" defaultMessage="去登录"/>
            </Button>
        </div>
    }
}
SetPwd = Form.create()(SetPwd);
Authentication = Form.create()(Authentication);
Authentication = injectIntl(Authentication);
SetPwd = injectIntl(SetPwd);
export default RePassword;