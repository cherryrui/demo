/**
 * Created by 17272 on 2017/9/7.
 */
/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './RegisterComplete.scss';
import appcss from '../../App.scss';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import {Form, Input, Dropdown, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Tabs, Menu } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}
const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3d menu item</a>
        </Menu.Item>
    </Menu>
);

class RegisterComplete extends React.Component{

    handleClick = (e) => {
        console.log('click',e);
        this.setState({
            current:e.key
        });
    };


    render() {
        console.log('I am RegisterComplete!');


        return (
            <div className={css.body}>
                <div className={css.d}>
                    <div className={css.d1}><h1 className={css.lbl}>LOGO</h1></div>
                    <div className={css.d2}>
                        <Menu>
                            <Menu.Item key="Category" className={css.menuitem}>
                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" href="#">
                                        <FormattedMessage id="regcomplt.regcomplt.Category" defaultMessage="分类"/> <Icon type="down" />
                                    </a>
                                </Dropdown>
                            </Menu.Item>
                            <Menu.Item key="home" className={css.menuitem}>
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    <FormattedMessage id="regcomplt.regcomplt.Home" defaultMessage="主页"/>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="brand" className={css.menuitem}>
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    <FormattedMessage id="regcomplt.regcomplt.Brand" defaultMessage="供应商"/>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="news" className={css.menuitem}>
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    <FormattedMessage id="regcomplt.regcomplt.News" defaultMessage="公司近况"/>
                                </a>
                            </Menu.Item>
                            <Menu.Item key="about" className={css.menuitem}>
                                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                    <FormattedMessage id="regcomplt.regcomplt.aboutus" defaultMessage="关于我们"/>
                                </a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className={css.input}>
                    <div className={css.icon}>
                        <Icon type="smile-o" /> <FormattedMessage id="regcomplt.regcomplt.Registeredsuccessfully" defaultMessage="注册成功！"/>
                    </div>
                    <div className={css.mar}>
                        To improve your personal information and help us to better personalize your services,chuan chuan will keep your personal information confidential.
                    </div>
                    <div className={css.button1}>
                        <div className={css.button11}><Button type="primary">
                            <FormattedMessage id="regcomplt.regcomplt.GoShopping" defaultMessage="去购物车"/>
                        </Button></div>
                        <div className={css.button12}><Button type="primary">
                            <FormattedMessage id="regcomplt.regcomplt.GoCertification" defaultMessage="去认证"/></Button></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComplete;
