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
    Tabs
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;


class Register extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
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
                console.log('RePassword success: ', values);
                axios.post('/user/register.json', values).then(res => {
                    console.log('2222', JSON.stringify(res));
                    if (res.data.rc == 200) {
                        console.log('I get the result')
                        window.location.href = "/#/register-complete"
                    } else {
                        console.log("RePassword fail:", res.data.result);

                    }
                })
            }
        })
    };
    handleCertification = (e) => {
        axios.get('/user/getCertificationCode.json').then(res => {
            console.log('res的值为: ', res);
            console.log('data的值为：', res.data.data);
            if (res.data.rc == 200) {
                alert(`验证码为：${res.data.data}`);
            } else {
                alert('获取验证码失败！');
            }
        })
    }



    render() {
        console.log('I am Register!');
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
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 8
                }
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
                    <p className={css.logo}>LOGO</p>
                    <p className={css.title_text}>
                        <FormattedMessage id="register.register.title" defaultMessage="用户注册"/>
                    </p>
                </div>
                <div className={css.form}>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.register.name'})}
                            hasFeedback
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

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'post.email'})}
                            hasFeedback
                        >
                        {getFieldDecorator('email',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:"register.email.warn"})
                            }]
                        })(
                            <Input />
                        )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'cart.delivery.tel'})}
                            hasFeedback
                        >
                        {getFieldDecorator('tel',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:"register.tel.warn"})
                            }]
                        })(
                            <Input />
                        )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.register.verification'})}
                            hasFeedback
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
                                    <Button type="primary" size="large" className={css.button1} onClick={this.handleCertification}>
                                        <FormattedMessage id="register.register.sendVerificationcode" defaultMessage="发送验证码"/>
                                    </Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.pwd'})}
                            hasFeedback
                        >
                        {getFieldDecorator('password',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.password.warn'})
                            }]
                        })(
                            <Input />
                        )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                            label={formatMessage({id: 'register.re.pwd'})}
                            hasFeedback
                        >
                        {getFieldDecorator('repassword',{
                            rules:[{
                                required:true,
                                message:formatMessage({id:'register.re_password.warn'})
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
                            <Button type="primary" htmlType="submit" className={css.button2}>
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