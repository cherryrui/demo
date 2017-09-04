import axios from 'axios';
import React from 'react';
import css from './PostWant.scss';
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
	Breadcrumb,
	DatePicker
} from 'antd';
const FormItem = Form.Item;

class PostWant extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			search: "dasd",
		}
	}
	handleSubmit = () => {

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
				span: 4,
				offset: 6,
			},
			wrapperCol: {
				span: 8,
			},
		};
		return <div>
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search:this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.header} style={{background: `url("../img/post_bg.jpg")`}}>
            	<p className={css.title}>
            		<FormattedMessage id="main.post" defaultMessage="分类"/>
            	</p>
            	<p className={css.descrip}>
            		<FormattedMessage id="main.post.descrip" defaultMessage="分类"/>
            	</p>
            </div>
            <div></div>
            <div className={css.form}>
            	<Form onSubmit={this.handleSubmit}>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.login'})}
			          hasFeedback
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.login'})}
			          hasFeedback
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
			            }],
			          })(
			             <DatePicker />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.login'})}
			          hasFeedback
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.login'})}
			          hasFeedback
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'app.login'})}
			          hasFeedback
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
        		</Form>

            </div>
		</div>
	}
}

PostWant = Form.create()(PostWant);
export default injectIntl(PostWant);