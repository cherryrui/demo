/**
 * Created by WF on 2017/9/18.
 */
import axios from 'axios';
import React from 'react';
import css from './Certification.scss';
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
} from 'antd';
const FormItem = Form.Item;

class Certification extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {}
		}
	}
	componentWillMount() {
		if (sessionStorage.user) {
			this.setState({
				user: JSON.parse(sessionStorage.user)
			})
		} else {
			window.location.href = '/#/login'
		}
	}

	render() {



		return <div>
			<div></div>

			{this.state.user.tp==1?<UserCertif/>
				:<CompanyCertif/>}

			
			
		</div>
	}
}
class UserCertif extends React.Component {



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

		return <Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout}
                    label={formatMessage({id: 'register.register.name'})}  
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


			</Form>
	}

}
class CompanyCertif extends React.Component {

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

		return <Form onSubmit={this.handleSubmit}>
				<FormItem {...formItemLayout}
                    label={formatMessage({id: 'register.register.name'})}  
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


			</Form>
	}

}

UserCertif = Form.create()(UserCertif);
UserCertif = injectIntl(UserCertif);
CompanyCertif = Form.create()(CompanyCertif);
CompanyCertif = injectIntl(CompanyCertif);
export default Certification;