/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Login.scss';

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
           <div>LOGO</div>
            <div className={css.form}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        <p>用户登录</p>
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
        </div>
    }
}
Login = Form.create()(Login);
export default Login