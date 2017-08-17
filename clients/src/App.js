import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cookie from 'react-cookie';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import css from './App.scss';
//import en_message from '../locale/en_message.js';
//import zh_message from '../locale/zh_message.js';
//import en from 'react-intl/locale-data/en.js';
//import zh from 'react-intl/locale-data/zh.js';
//import enUS from 'antd/lib/locale-provider/en_US.js';

import Main from './component/Main/Main.js';
import Login from './component/Login/Login.js';
//import {FormattedMessage,addLocaleData,IntlProvider} from 'react-intl';
//import intl from 'intl';

import{Select,Menu,Dropdown,Icon,Badge,LocaleProvider,Pagination} from 'antd';

const Option = Select.Option;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: 'zh',
            message: ""
        };
        this.order_status=[
            {key:0,name:"all",icon:"eitd",num: 0},
            {key:1,name:"pay",icon:"eitd",num: 0},
            {key:2,name:"send",icon:"eitd",num: 0},
            {key:3,name:"receiver",icon:"eitd",num: 0},
            {key:4,name:"complete",icon:"eitd",num: 0},
        ];
        this.language_menu=(
            <Menu>
                <Menu.Item>
                   中文
                </Menu.Item>
                <Menu.Item>英语</Menu.Item>
            </Menu>
        )
        //this.language = 'zh_CN';
    }
    componentDidMount(){
        console.log(window,window.appLocale)
        //this.language = this.chooseLocale();
    }
    chooseLocale(){
        switch(navigator.language.split('_')[0]){
            case 'en':
                return 'en_US';
                break;
            case 'zh':
                return 'zh_CN';
                break;
            default:
                return 'en_US';
                break;
        }
    }
    /**
     * wdy 返回上一级
     */
    back=()=>{
        this.props.history.goBack()
    };
    handleChange=(key)=>{
        console.log(key)
    }
    render() {
        let order_menu = (<Menu>
        {this.order_status.map(item=>{
            return <Menu.Item>
                <Badge count={item.num}>
                    <a href="#" className="head-example">
                       <p>{item.name}</p>
                    </a>
                </Badge>

            </Menu.Item>
        })}
        </Menu>)
        return <div className={css.main}>
            <div className={css.head}>
                <Link className={css.item}>Login/Register</Link>
                <Dropdown overlay={order_menu}>
                    <p className={css.item}>My Order <Icon type="down" /></p>
                </Dropdown>
                <p className={css.item}>
                   ds
                </p>
                <Select defaultValue="中文" className={css.language} onChange={this.handleChange}>
                    <Option value="zn">中文</Option>
                    <Option value="en">引文</Option>
                </Select>
            </div>
            <div className={css.body}>
            {this.props.children && React.cloneElement(this.props.children)}
            </div>
            <div className={css.footer}>
            <div className={css.foot}>
                <div className={css.item}>
                    <p className={css.title}>About Us</p>
                    <p className={css.info}>Company Profile</p>
                    <p className={css.info}>Partners And Suppliers</p>
                    <p className={css.info}>News</p>
                </div>
                <div className={css.item}>
                    <p className={css.title}>About Us</p>
                    <p className={css.info}>Company Profile</p>
                    <p className={css.info}>Partners And Suppliers</p>
                    <p className={css.info}>News</p>
                </div>
                <div className={css.item}>
                    <p className={css.title}>About Us</p>
                    <p className={css.info}>Company Profile</p>
                    <p className={css.info}>Partners And Suppliers</p>
                    <p className={css.info}>News</p>
                </div>
                <div className={css.item}>
                    <p className={css.title}>About Us</p>
                    <p className={css.info}>Company Profile</p>
                    <p className={css.info}>Partners And Suppliers</p>
                    <p className={css.info}>News</p>
                </div>
            </div>
            <div className={css.bottom}>Dbuy360dsadasd</div>
            </div>
        </div>;
    }
}

let div = document.createElement('div');
div.className = css.index;

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Main}/>
            <Route path="/login" component={Login}/>
        </Route>
    </Router>), document.body.appendChild(div)
);
