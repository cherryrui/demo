/**
 * Created by WF on 2017/9/15.
 */
/**
 * Created by 17272 on 2017/9/11.
 */
import axios from 'axios';
import React from 'react';
import css from './PersonalAuthentication.scss';
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


class PersonalAuthentication extends React.Component{

    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props){
        super(props);
    }
    handleSubmit = (e) => {
        console.log(2222222)
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


    render() {
        console.log('I am PersonalAuthentication');
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

        const style = "personal style";
        return (
            <div>
                <div className='minecss.child_title'>
                    <FormattedMessage id="perau.perau.title" defaultMessage="个人数据"/>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <div className={css.heads}>
                        <div className='css.headimg'></div>
                    </div>

                    <FormItem {...formItemLayout}
                        label={formatMessage({id: 'perau.perau.style'})}
                        hasFeedback
                    >
                                {getFieldDecorator('style',{
                                    rules:[{
                                        message: ''
                                    }]
                                })(
                                    <lable>{style}</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id:'perau.perau.account'})}
                        hasFeedback
                    >
                                {getFieldDecorator('account',{
                                    rules:[{
                                        message:''
                                    }]
                                })(
                                    <lable>{'123456'}</lable>
                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id:'perau.perau.percertification'})}
                        hasFeedback
                    >
                                {getFieldDecorator('certification',{
                                    rules:[{
                                        message:''
                                    }]
                                })(
                                    <lable>{'4589'}</lable>
                                )}
                        <Button type="primary" className={css.selectsbutton}>
                            <FormattedMessage id="perau.perau.certification" defaultMessage="验证"/>
                        </Button>
                        <lable className={css.selects}>
                            <FormattedMessage id="perau.perau.certifications" defaultMessage="验证: "/>
                        </lable>xxxxxx
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id:'perau.perau.username'})}
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
                        label={formatMessage({id:'perau.perau.tel'})}
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
                        label={formatMessage({id:'perau.perau.email'})}
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
                        label={formatMessage({id:'perau.perau.region'})}
                        hasFeedback
                    >
                                {getFieldDecorator('region',{
                                    rules:[{
                                        message:'choose region'
                                    }]
                                })(
                                    <div>
                                        <Select defaultValue="lucy" style={{ width: 70 }} onChange={handleChange}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <Select defaultValue="lucy" style={{ width: 70 }} onChange={handleChange} className={css.selects}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                        <Select defaultValue="lucy" style={{ width: 70 }} onChange={handleChange} className={css.selects}>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    </div>

                                )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label={formatMessage({id:'perau.perau.contactaddress'})}
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
                    <FormItem {...tailFormItemLayout} className={css.savebutton}>
                        <Button type="primary" htmlType="submit" className={css.button2}>
                            <FormattedMessage id="perau.perau.save" defaultMessage="保存"/>
                        </Button>
                    </FormItem>
                </Form>

            </div>
        )

    }

}

PersonalAuthentication = Form.create()(PersonalAuthentication);
export default injectIntl(PersonalAuthentication);