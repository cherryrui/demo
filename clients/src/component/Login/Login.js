/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Login.scss';
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
    Icon,
    Input,
    Button,
    Checkbox,
    message
} from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired,
    }
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
                console.log('Received values of form: ', values);
                axios.post('/user/login.json', values).then(res => {
                    if (res.data.isSucc) {
                        sessionStorage.setItem('user', JSON.stringify(res.data.result));
                        this.props.history.pushState(null, "/");
                    } else {
                        message.error(formatMessage({
                            id: 'login.login.fail'
                        }, {
                            reason: res.data.message
                        }))
                    }
                })
            }
        });
    };
    handleClick = () => {
        /* window.location.href = "/#/register"*/
        this.props.history.pushState(null, "/register");
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
        return <div className={css.body}>
            <Link to="/" className={css.logo}>LOGO</Link>
            <div className={css.form} style={{background: `url("../img/login_bg.png")`}}>
                <Form onSubmit={this.handleSubmit} className={css.login_form}>
                    <FormItem>
                        <p className={css.title}>
                            <FormattedMessage id="login.login.title" defaultMessage="用户登录"/>
                        </p>
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.name'}) }],
                    })(
                        <Input  className={css.input_row}size="large" prefix={<Icon type="user" style={{ fontSize: 24 }} />}
                            placeholder= {formatMessage({id: 'login.input.name'})} />
                    )}
                    </FormItem>
                    <FormItem  style={{ marginBottom: 10,orderRadius: 2 }}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.password'}) }],
                    })(
                        <Input className={css.input_row}size="large" prefix={<Icon type="lock" style={{ fontSize: 24,paddingRight:20 }} />}
                            type="password" placeholder= {formatMessage({id: 'login.input.password'})} />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className={css.remember} >
                            <FormattedMessage id="login.remember" defaultMessage="记住密码"/>
                        </Checkbox>
                    )}
                        <Link className={css.forgot} to="/reset-password" >
                            <FormattedMessage id="login.forget" defaultMessage="用户登录"/>
                        </Link>
                        <Button size="large" type="primary" htmlType="submit" className={css.button}>
                            <FormattedMessage id="login.login" defaultMessage="登录"/>
                        </Button>
                        <Button size="large" type="primary" onClick={this.handleClick}  className={css.button_registor}>
                            <FormattedMessage id="login.registor" defaultMessage="注册"/>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    }
}
Login = Form.create()(Login);
export default injectIntl(Login);