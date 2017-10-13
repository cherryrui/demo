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
    Upload,
	Breadcrumb,
	DatePicker
} from 'antd';
const FormItem = Form.Item;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
class PostWant extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			create_time : '',
		}
	}
	componentDidMount() {
		this.postwant.scrollIntoView();
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) =>{
			if(!err){
				console.log(values)
				let param = values;
				param.time = this.state.create_time;
				console.log(param);
			}
		})
	}
	onChanges = (date, dateString) =>{
		console.log(date, dateString)
		this.setState({
			create_time:dateString
		})
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
				span: 3,
				offset: 5,
			},
			wrapperCol: {
				span: 8,
			},
		};
        const tailFormItemLayout = {

            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,

                },
            },
        };
		return <div className={appcss.body} ref={(postwant)=>{this.postwant=postwant}}>
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="main.post" defaultMessage="Post Your Want"/>
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
			          label={formatMessage({id: 'quotation.company.name'})}

			        >
			          {getFieldDecorator('company_name', {
			            rules: [ {
			              required: true, message: 'agent.enter.company',
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'quotation.create_time'})}
			          hasFeedback
			        >
			          {getFieldDecorator('time', {
			            rules: [{
			              type: 'object', required: true, message: 'Please select time!'
			            }],
			          })(
			             <DatePicker onChange={this.onChanges} className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'post.linkman'})}

			        >
			          {getFieldDecorator('linkman', {
			            rules: [{
			              required: true, message: 'Please enter the contact person',
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'post.email'})}

			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              required: true, message: 'register.email.warn',
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label={formatMessage({id: 'quotation.contact.tel'})}

			        >
			          {getFieldDecorator('phone', {
			            rules: [ {
			              required: true, message: 'register.tel.warn',
			            }],
			          })(
			            <Input className={css.want_input}/>
			          )}
			        </FormItem>
                    <FormItem style={{ marginBottom:10}}
			          {...formItemLayout}
                        label={formatMessage({id: 'post.upload'})}

                    >
			          {getFieldDecorator('upload', {

                      })(
                          <Upload {...props}>
                              <Button  className={appcss.button_theme}  style={{ width:120}}>
                                 {formatMessage({id: 'post.select.file'})}
                              </Button>
                          </Upload>


                      )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                          <FormattedMessage id="post.fill.again" defaultMessage="上传" values={{click:<span className={css.clink_here}>clink here</span>}}/>

                    </FormItem>
                    <FormItem style={{ paddingLeft:120}} {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className={appcss.button_radius}>
                              {formatMessage({id: 'app.save'})}
                        </Button>

                    </FormItem>
        		</Form>

            </div>
		</div>
	}
}

PostWant = Form.create()(PostWant);
export default injectIntl(PostWant);