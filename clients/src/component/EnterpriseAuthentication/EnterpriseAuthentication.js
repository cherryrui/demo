/**
 * Created by WF on 2017/9/15.
 */
/**
 * Created by 17272 on 2017/9/11.
 */
/**
 * Created by 17272 on 2017/9/11.
 */
import axios from 'axios';
import React from 'react';
import css from './EnterpriseAuthentication.scss';
import minecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Tooltip, Popover, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
console.log(222222)

function handleChange(value) {
    console.log(`selected ${value}`);
}


class EnterpriseAuthentication extends React.Component{

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
    };
    handleCertification = (e) =>{
        axios.get('/user/getCertificationCode.json').then(res =>{
            console.log('res的值为: ',res);
        })
    }

    render() {
        console.log('I am EnterpriseAuthentication');
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
            <div>
                <div className='minecss.child_title'>
                    <FormattedMessage id="enpau.enpau.title" defaultMessage="企业数据"/>
                </div>
                <Form>
                    <div className={css.heads}>
                        <div className='css.headimg'></div>
                    </div>

                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.style'})}>
                                {getFieldDecorator('userstyle',{
                                    rules:[{
                                        message:'input your Email'
                                    }]
                                })(
                                    <lable>xxxxx</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.account'})}
                        hasFeedback
                    >
                                {getFieldDecorator('account',{
                                    rules:[{
                                        message:'input your account'
                                    }]
                                })(
                                    <lable>xxxxx</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.certificatio'})}
                        hasFeedback
                    >
                                {getFieldDecorator('certification',{
                                    rules:[{
                                        message:'input your Personal certification'
                                    }]
                                })(
                                    <lable>xxxxx</lable>
                                )}
                        <Button type="primary" className={css.selectsbutton} onClick={this.handleCertification}>
                            <FormattedMessage id="enpau.enpau.certificationbutton" defaultMessage="验证"/>
                        </Button>
                        <lable className={css.selects}>
                            <FormattedMessage id="enpau.enpau.certifications" defaultMessage="验证"/>
                        </lable>xxxxxx
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.username'})}
                        hasFeedback
                    >
                                {getFieldDecorator('name',{
                                    rules:[{
                                        message:'input your User Name'
                                    }]
                                })(
                                    <lable>xxxxx</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.tel'})}
                        hasFeedback
                    >
                                {getFieldDecorator('tel',{
                                    rules:[{
                                        message:'input your tel'
                                    }]
                                })(
                                    <lable>xxxxx</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.email'})}
                        hasFeedback
                    >
                                {getFieldDecorator('email',{
                                    rules:[{
                                        required:true,
                                        message:'input your Email'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.region'})}
                        hasFeedback
                    >
                                {getFieldDecorator('region',{
                                    rules:[{
                                        required:true,
                                        message:'choose region'
                                    }]
                                })(
                                    <div>
                                        <Select defaultValue="lucy" style={{ width: 98 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <Select defaultValue="lucy" style={{ width: 98 }} onChange={handleChange} className={css.selects}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <Select defaultValue="lucy" style={{ width: 98 }} onChange={handleChange} className={css.selects}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </div>

                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.contactaddress'})}
                        hasFeedback
                    >
                                {getFieldDecorator('address',{
                                    rules:[{
                                        required:true,
                                        message:'input your address'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.relname'})}
                        hasFeedback
                    >
                                {getFieldDecorator('relname',{
                                    rules:[{
                                        required:true,
                                        message:'input your relname'
                                    }]
                                })(
                                    <Input className={css.input1}/>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'enpau.enpau.departmnet'})}
                        hasFeedback
                    >
                                {getFieldDecorator('departmnet',{
                                    rules:[{
                                        required:true,
                                        message:'input your departmennt'
                                    }]
                                })(
                                    <div>
                                        <Select defaultValue="lucy" style={{ width: 150 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <Select defaultValue="lucy" style={{ width: 150 }} onChange={handleChange} className={css.selects}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </div>
                                )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} className={css.savebutton}>
                        <Button type="primary" htmlType="submit" className={css.button2}>
                            <FormattedMessage id="enpau.enpau.save" defaultMessage="保存"/>
                        </Button>
                    </FormItem>
                </Form>

            </div>
        )

    }

}

EnterpriseAuthentication = Form.create()(EnterpriseAuthentication);
export default injectIntl(EnterpriseAuthentication);