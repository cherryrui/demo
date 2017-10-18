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
import CusModal from '../CusModal/CusModal.js';

class LoginModal extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({
					loading: true
				})
				axios.post('/user/login.json', values).then(res => {
					if (res.data.isSucc) {
						sessionStorage.setItem('user', JSON.stringify(res.data.result));
						message.success(this.formatMessage({
							id: 'login.login.success'
						}));
						this.props.reload ? parent.location.reload() : "";
						this.props.closeModal ? this.props.closeModal(true) : ""
					} else {
						message.error(this.formatMessage({
							id: 'login.login.fail'
						}, {
							reason: res.data.result
						}))
						this.setState({
							loading: false
						});
					}
				})
			}
		});
	}
	handleCancel = () => {
		this.props.closeModal ? this.props.closeModal() : ""
	}

	render() {

		const {
			getFieldDecorator
		} = this.props.form;
		return <CusModal style={{width:400}}
            title={this.formatMessage({id: 'login.login.title'})}
            closeModal={this.handleCancel}
            visible={this.props.visible}>
				<Form onSubmit={this.handleSubmit} className={css.login_form}>
					<FormItem>
                	</FormItem>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: this.formatMessage({id: 'login.input.name'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
							placeholder = {
								this.formatMessage({
									id: 'login.input.name'
								})
							}
							/>
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: this.formatMessage({id: 'login.input.password'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} 
                        type="password" placeholder= {this.formatMessage({id: 'login.input.password'})} />
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
            </CusModal>
	}
}

LoginModal = Form.create()(LoginModal);
LoginModal = injectIntl(LoginModal);
export default LoginModal;