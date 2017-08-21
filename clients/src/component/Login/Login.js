/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Login.scss';
import appcss from '../../App.scss';
import {FormattedMessage} from 'react-intl';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props){
        super(props);

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return <div>
            <div className={appcss.logo}>LOGO</div>
            <div className={css.form}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <p><FormattedMessage id="login.login" defaultMessage="用户登录"/>
                    </p>
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                        <a className={css.forgot} href="">Forgot password</a>
                        <Button size="large" type="primary" htmlType="submit" className={css.button}>
                            Log in
                        </Button>
                        <Button size="large" type="primary" htmlType="submit" className={css.button}>
                        Log out
                    </Button>
                    </FormItem>
                </Form>
            </div>
            <div className={css.footer}>
                <div className={css.foot_first}>
                    <div className={css.item}>
                        <img src='../img/1.jpg'/>
                        <p>AUTHORITY</p>
                    </div>
                    <div className={css.item}>
                        <img src='../img/1.jpg'/>
                        <p>AUTHORITY</p>
                    </div>
                    <div className={css.item}>
                        <img src='../img/1.jpg'/>
                        <p>AUTHORITY</p>
                    </div>
                    <div className={css.item}>
                        <img src='../img/1.jpg'/>
                        <p>AUTHORITY</p>
                    </div>

                </div>
                <div className={appcss.foot}>
                    <div className={appcss.item}>
                        <p className={appcss.title}>
                            <FormattedMessage id="app.about" defaultMessage="关于我们"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.profile" defaultMessage="公司简介"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.partners" defaultMessage="合作伙伴"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.news" defaultMessage="公司新闻"/></p>
                    </div>
                    <div className={appcss.item}>
                        <p className={appcss.title}>
                            <FormattedMessage id="app.guide" defaultMessage="用户指引"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.terms" defaultMessage="支付团队"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.shopping" defaultMessage="购物方式"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.question" defaultMessage="疑难解答"/></p>
                    </div>
                    <div className={appcss.item}>
                        <p className={appcss.title}>
                            <FormattedMessage id="app.customer" defaultMessage="客户服务"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.orders" defaultMessage="物流跟踪"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.rating" defaultMessage="供应商评分"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.protection" defaultMessage="法律声明"/></p>
                    </div>
                    <div className={appcss.item}>
                        <p className={appcss.title}>
                            <FormattedMessage id="app.contact" defaultMessage="联系客服"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.feedback" defaultMessage="问题反馈"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.supplier" defaultMessage="诚征英才"/></p>
                        <p className={appcss.info}>
                            <FormattedMessage id="app.program" defaultMessage="联盟计划"/></p>
                    </div>
                </div>
                <div className={appcss.bottom}>
                    <FormattedMessage id="app.rights" defaultMessage="Dbuy360@2017 版权所有|重庆CC科技有限公司|维权热线：130000000"/>
                </div>
            </div>
        </div>
    }
}
Login = Form.create()(Login);
export default Login