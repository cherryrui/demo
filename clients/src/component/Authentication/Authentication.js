/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './Authentication.scss';
import appcss from '../../App.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Tooltip, Popover, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Authentication extends React.Component{

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
                axios.post('/user/authentication.json',values).then(res =>{
                    console.log('2222',JSON.stringify(res));
                    if(res.data.rc==200){
                        console.log('I get the result')
                        window.location.href = "/#/registerComplete/"
                    }else{
                        console.log("RePassword fail:",res.data.result);
                        message.error(formatMessage({
                            id:'repassword.fail'
                        },{
                            reason:res.data.result
                        }))
                    }
                })
            }
        })
    }

    render() {
        console.log('I am Authentication!');
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

        return(
            <div className={css.body}>
                <div className={css.d}>
                    <div className={css.d1}><h1 className={css.lbl}>LOGO</h1></div>
                    <div> <h4 className={css.d2}>Retrieve password</h4></div>
                </div>
                <div className={css.input}>
                    <div className={css.fh}>
                        <div className={css.fhc}><span className={css.circle}>1</span></div>
                        <div className={css.fhc}><span className={css.circle1}>2</span></div>
                        <div className={css.fhc}><span className={css.circle1}>3</span></div>

                    </div>
                    <div className={css.fsh}>
                        <div className={css.fhc}>Authentication</div>
                        <div className={css.fhc}>Reset password</div>
                        <div className={css.fhc}>Complete</div>
                    </div>
                    <div className={css.fhz}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout}
                                label="TEL/Email:"
                                hasFeedback
                            >
                                <Row gutter={10}>
                                    <Col span={12}>
                                    {getFieldDecorator('tel/email',{
                                        rules:[
                                            {
                                                required:true,
                                                message:'please input tel or email'
                                            }
                                        ]
                                    })(
                                        <Input size="large" />
                                    )}

                                    </Col>
                                    <Col span={12}>
                                        <Button type="primary" htmlType="submit" size="large" className={css.button1}>Obtain verification</Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem {...formItemLayout}
                                label="Email verification code:"
                                hasFeedback
                            >
                            {getFieldDecorator('verification',{
                                rules:[{
                                    required:true,
                                    message:'Email verification code'
                                }]
                            })(
                                <Input className={css.input1}/>
                            )}

                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className={css.button2}>Next step</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )


    }
}
Authentication = Form.create()(Authentication);
export default injectIntl(Authentication);