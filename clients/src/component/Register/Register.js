/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './Register.scss';
import appcss from '../../App.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Tooltip, Popover, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

class Register extends React.Component{

    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props){
        super(props);
    }
    handleSubmit = (e) => {
        let {
            intl:{
                formatMessage
                }
            } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('RePassword success: ',values);
                axios.post('/user/register.json',values).then(res =>{
                    console.log('2222',JSON.stringify(res));
                    if(res.data.rc==200){
                        console.log('I get the result')
                        window.location.href = "/#/authentication/"
                    }else{
                        console.log("RePassword fail:",res.data.result);

                    }
                })
            }
        })
    }


    render() {
        console.log('I am Register!');
        const {
            intl:{
                formatMessage
                }
            } = this.props;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 10,
                    offset: 6
                },
                sm: {
                    span: 14,
                    offset: 5
                }
            }
        };

        return (
            <div className={css.body}>
                <div className={css.d}>
                    <div className={css.d1}><h1 className={css.lbl}>LOGO</h1></div>
                    <div> <h4 className={css.d2}>User registration</h4></div>
                </div>
                <div className={css.input}>
            <div>
                <Tabs defaultActiveKey="1" onChange={callback} className={css.tabs}>
                    <TabPane tab="Enterprise user" key="1"></TabPane>
                    <TabPane tab="Personal user" key="2"></TabPane>
                </Tabs>
            </div>
                <div  >
                    <div className={css.input1}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout}
                                label="Your name"
                                hasFeedback
                            >
                                {getFieldDecorator('name',{
                                    rules:[{
                                        required:true,
                                        message:'input your name'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout}
                                label="E-mail"
                                hasFeedback
                            >
                                {getFieldDecorator('verification',{
                                    rules:[{
                                        required:true,
                                        message:'input your email'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout}
                                label="TEL"
                                hasFeedback
                            >
                                {getFieldDecorator('tel',{
                                    rules:[{
                                        required:true,
                                        message:'input your Tel'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout}
                                label="Verification code"
                                hasFeedback
                            >
                                <Row gutter={10}>
                                    <Col span={12}>
                                        {getFieldDecorator('verificationCode',{
                                            rules:[{
                                                required:true,
                                                message:'input verification code'
                                            }]
                                        })(
                                            <Input size="large" className={css.input1}/>
                                        )}
                                    </Col>
                                    <Col span={12}>
                                        <Button type="primary" htmlType="submit" size="large" className={css.button1}>send Verification code</Button>
                                    </Col>
                                </Row>
                            </FormItem>


                            <FormItem {...formItemLayout}
                                label="Password"
                                hasFeedback
                            >
                                {getFieldDecorator('password',{
                                    rules:[{
                                        required:true,
                                        message:'input your password'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                            </FormItem>

                            <FormItem {...formItemLayout}
                            label="Re-enter password"
                            hasFeedback
                        >
                                {getFieldDecorator('repassword',{
                                    rules:[{
                                        required:true,
                                        message:'reinput your password'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                            </FormItem>
                            <div className={css.desc}>By createing an account you agree to <a className={css.lbl}>Condition of Use</a> and <a className={css.lbl}>Privacy Notice</a></div>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className={css.button2}>Sign Up</Button>
                            </FormItem>
                            <div className={css.desc}>Already have an account？ <a className={css.lbl}>Sign in ></a></div>
                        </Form>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

Register = Form.create()(Register);
export default injectIntl(Register);