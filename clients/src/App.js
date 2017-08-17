import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cookie from 'react-cookie';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import css from './App.scss';
import en_message from '../locale/en_message.js';
import zh_message from '../locale/zh_message.js';
import en from 'react-intl/locale-data/en.js';
import zh from 'react-intl/locale-data/zh.js';
import enUS from 'antd/lib/locale-provider/en_US.js';

import Main from './component/Main/Main.js';
import Login from './component/Login/Login.js';
import {FormattedMessage,addLocaleData,IntlProvider} from 'react-intl';
import intl from 'intl';
addLocaleData(zh);
import{Select,Menu,Dropdown,Icon,Badge,LocaleProvider,Pagination,Input,Button} from 'antd';
const Search = Input.Search;
const Option = Select.Option;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locale: 'zh',
            message: zh_message
        };
        this.order_status=[
            {key:0,message:"app.all",default_message:"所有",icon:"eitd",num: 0},
            {key:1,message:"app.pay",default_message:"待付款",icon:"eitd",num: 0},
            {key:2,message:"app.send",default_message:"待发货",icon:"eitd",num: 0},
            {key:3,message:"app.receiver",default_message:"待收货",icon:"eitd",num: 0},
            {key:4,message:"app.complete",default_message:"已完成",icon:"eitd",num: 0},
        ];
        //this.language = 'zh_CN';
    }
    componentDidMount(){
        //console.log(window,window.appLocale)
        //this.language = this.chooseLocale();
    }
    /**
     * wdy 返回上一级
     */
    back=()=>{
        this.props.history.goBack()
    };
    handleChange=(key)=>{
        switch(key){
            case 'en':
                this.setState({
                    locale: "en",
                    message: en_message
                })
                break;
            case 'zh':
                this.setState({
                    locale: "zh",
                    message: zh_message
                })
                break;
            default:
                this.setState({
                    locale: "zh",
                    message: zh_message
                })
                break;
        }
    }
    render() {
        let order_menu = (<Menu>
        {this.order_status.map(item=>{
            return <Menu.Item>
                <Badge count={item.num}>
                    <a href="#" className="head-example">
                        <FormattedMessage id={item.message} defaultMessage={item.default_message}/>
                    </a>
                </Badge>

            </Menu.Item>
        })}
        </Menu>)
        return <LocaleProvider locale={null}>
            <IntlProvider locale={this.state.locale} messages={this.state.message}>
                <div className={css.main}>
                    <div className={css.head}>
                        <Link className={css.item}><FormattedMessage id="app.login" defaultMessage="登录/注册"/></Link>
                        <Dropdown overlay={order_menu}>
                            <p className={css.item}><FormattedMessage id="app.order" defaultMessage="我的订单"/> <Icon type="down" /></p>
                        </Dropdown>
                        <p className={css.item}>
                            <FormattedMessage id="app.message" defaultMessage="消息"/>
                        </p>
                        <Select defaultValue="中文" className={css.language} onChange={this.handleChange}>
                    <Option value="zn"><FormattedMessage id="app.language.zh" defaultMessage="中文"/></Option>
                    <Option value="en"><FormattedMessage id="app.language.en" defaultMessage="英语"/></Option>
                </Select>
                    </div>
                    <div className={css.header}>
                        <div className={css.left}>
                            <p className={css.title}>LOGO</p>
                            <p className={css.title}>Home</p>
                            <p className={css.title}>Brand</p>
                            <p className={css.title}>News</p>
                            <p className={css.title}>About Us</p>
                        </div>
                        <div className={css.right}>
                            <Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)}
                            />
                            <Button type="primary" icon="shopping-cart">My Cart</Button>
                        </div>
                    </div>
                    <div className={css.body}>
            {this.props.children && React.cloneElement(this.props.children)}
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
        </div>
            </IntlProvider>
        </LocaleProvider>;
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
