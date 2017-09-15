import axios from 'axios';
import React from 'react';
import css from './LoginModal.scss';
import appcss from '../../../App.scss';
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

class LoginModal extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
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
				this.setState({
					loading: true
				})
				axios.post('/user/login.json', values).then(res => {
					if (res.data.status) {
						if (values.remember) {
							localStorage.setItem('uid', res.data.result.id);
						} else {
							localStorage.setItem('uid', null);
						}
						sessionStorage.setItem('user', JSON.stringify(res.data.result))
						message.success(formatMessage({
							id: 'login.login.success'
						}))
                        parent.location.reload();
						this.props.closeModal ? this.props.closeModal() : ""
					} else {
						message.error(formatMessage({
							id: 'login.login.fail'
						}, {
							reason: res.data.result
						}))
					}
				})
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
		return <Form onSubmit={this.handleSubmit} className={css.login_form}>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.name'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
                        placeholder= {formatMessage({id: 'login.input.name'})} />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.password'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} 
                        type="password" placeholder= {formatMessage({id: 'login.input.password'})} />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>
                            <FormattedMessage id="login.remember" defaultMessage="记住密码"/>
                        </Checkbox>
                    )}
                        <Link className={css.forgot} to="/reset-password">
                            <FormattedMessage id="login.forget" defaultMessage="用户登录"/>
                        </Link>
                        <Button size="large" loading={this.state.loading} type="primary" htmlType="submit" className={css.button}>
                            <FormattedMessage id="login.login" defaultMessage="登录"/>
                        </Button>
                    </FormItem>
                </Form>
	}
}

LoginModal = Form.create()(LoginModal);
LoginModal = injectIntl(LoginModal);
export default LoginModal;