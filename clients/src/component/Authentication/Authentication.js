/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './Authentication.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Tooltip, Popover, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs } from 'antd';
import Steps from '../Public/Steps/Steps.js';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
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
                        console.log('I get the result');
                        window.location.href = "/#/rePassword/"
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
    };
    handleGetVcode =(e) =>{
        axios.get('/user/getVcodeByTelorEmail.json?teloremail=123456789').then(res=>{
            if(res.data.rc==200){
                alert(`验证码获取成功：${res.data.data}`)
            }else{
                alert('获取验证码失败');
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
                    <div className={css.steps}>
                        <Steps steps={operator.steps} current={0}/>
                    </div>


                    <div className={css.fhz}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout}
                                label={formatMessage({id: 'authen.authen.tel/email'})}
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
                                        <Button type="primary" size="large" className={css.button1} onClick={this.handleGetVcode}>
                                            <FormattedMessage id="authen.authen.Obtainverification" defaultMessage="获取验证"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                            <FormItem {...formItemLayout}
                                label={formatMessage({id: 'authen.authen.Everificationcode'})}
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
                                <Button type="primary" htmlType="submit" className={css.button2}>
                                    <FormattedMessage id="authen.authen.nextstep" defaultMessage="下一步"/>
                                </Button>
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