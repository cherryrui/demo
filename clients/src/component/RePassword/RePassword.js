/**
 * Created by 17272 on 2017/9/7.
 */
/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './RePassword.scss';
import appcss from '../../App.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Popover, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs } from 'antd';
import Steps from '../Public/Steps/Steps.js';
import operator from './operator.js';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Step = Steps.Step;
const customDot = (dot, { status, index }) => (
    <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
    </Popover>
);


class RePassword extends React.Component{

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
                axios.post('/user/repassword.json',values).then(res =>{
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
        console.log('I am RePassword!');
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
                </div>
                <div className={css.input}>
                    <div className={css.steps}>
                        <Steps steps={operator.steps} current={1}/>
                    </div>
                    <div className={css.fhz}>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem {...formItemLayout}
                                label={formatMessage({id:'repwd.new.pwd'})}
                                hasFeedback
                            >
                            {getFieldDecorator('newpwd',{
                                rules: [{
                                    required:true,
                                    message:'please input new password'
                                }]
                            })(<Input className={css.input1} placeholder={formatMessage({id:'repwd.new.inputpwd'})}/>
                            )}

                            </FormItem>
                            <FormItem {...formItemLayout}
                                label={formatMessage({id:'repwd.config.pwd'})}
                                hasFeedback
                            >
                            {getFieldDecorator('confipwd',{
                                rules:[{
                                    required:true,
                                    message:'please Confirm new password'
                                }]
                            })(<Input className={css.input1} placeholder={formatMessage({id:'repwd.config.inputpwd'})}/>
                            )}

                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" className={css.button2}>
                                    <FormattedMessage id="repwd.next.step" defaultMessage="下一步"/></Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        )


    }
}
RePassword = Form.create()(RePassword);
export default injectIntl(RePassword);