import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cookie from 'react-cookie';
import {
    Router,
    Route,
    IndexRoute,
    IndexRedirect,
    hashHistory,
    Link
} from 'react-router';
import css from './App.scss';
import en from 'react-intl/locale-data/en.js';
import zh from 'react-intl/locale-data/zh.js';
import enUS from 'antd/lib/locale-provider/en_US.js';
import zh_message from '../locale/zh_message';
import en_message from '../locale/en_message';

import Main from './component/Main/Main.js';
import Login from './component/Login/Login.js';
import CategoryList from './component/CategoryList/CategoryList.js';
import BranchList from './component/BranchList/BranchList.js';
import ProductList from './component/ProductList/ProductList.js';
import ShoppingCart from './component/ShoppingCart/ShoppingCart.js';
import ProductDetail from './component/ProductDetail/ProductDetail.js';
import BranchDetail from './component/BranchDetail/BranchDetail.js';
import PostWant from './component/PostWant/PostWant.js';
import Home from './component/Home/Home.js';
import Cart from './component/Cart/Cart.js';
import Quotation from './component/Quotation/Quotation.js';
import Mine from './component/Mine/Mine.js';
import PersonCenter from './component/PersonCenter/PersonCenter.js';
import About from './component/About/About.js';
import {
    Provider
    } from 'react-redux';
import {
    FormattedMessage,
    addLocaleData,
    IntlProvider
} from 'react-intl';
import intl from 'intl';
import store from './store';
addLocaleData(zh);
import {
    Select,
    Menu,
    Dropdown,
    Icon,
    Badge,
    LocaleProvider,
    Pagination,
    Input,
    Button,
    Popover,
    message
} from 'antd';
const Search = Input.Search;
const Option = Select.Option;
const appLocale = window.appLocale ? window.appLocale : {};
appLocale.antd = "";
appLocale.locale = "zh";
appLocale.messages = zh_message;

console.log(appLocale);



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            antd_loacl: null,
            locale: 'zh',
            message: zh_message,
        };
        this.order_status = [{
            key: 0,
            message: "app.all",
            default_message: "所有",
            icon: "eitd",
            num: 0
        }, {
            key: 1,
            message: "app.pay",
            default_message: "待付款",
            icon: "eitd",
            num: 0
        }, {
            key: 2,
            message: "app.send",
            default_message: "待发货",
            icon: "eitd",
            num: 0
        }, {
            key: 3,
            message: "app.receiver",
            default_message: "待收货",
            icon: "eitd",
            num: 0
        }, {
            key: 4,
            message: "app.complete",
            default_message: "已完成",
            icon: "eitd",
            num: 0
        }, ];
    }
    componentWillMount() {
        localStorage.setItem('uid', 1);
        console.log(localStorage.uid);
        if (localStorage.uid) {
            axios.get(`/user/get-user.json?id=${localStorage.uid}`).then(res => {
                this.setState({
                    user: res.data.user
                })
            })
        }

    }
    componentDidMount() {

    }

    handleChange = (key) => {
        switch (key) {
            case 'en':
                this.setState({
                    antd_loacl: enUS,
                    locale: "en",
                    message: en_message
                })
                break;
            case 'zh':
                this.setState({
                    antd_loacl: null,
                    locale: "zh",
                    message: zh_message
                })
                break;
            default:
                this.setState({
                    antd_loacl: null,
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
        return <div className={css.main} >
                    <div className={css.fixed_title}>
                        <div className={css.head}>
                            {this.state.user?<p className={css.item}>{this.state.user.name}</p>:
                            <Link className={css.item}>
                                <FormattedMessage id="app.login" defaultMessage="登录/注册"/>
                            </Link>}
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
                    </div>
                    {
                        this.props.children && React.cloneElement(this.props.children)
                    }               
                    <div className={css.footer}>
                        <div className={css.foot}>
                                <div className={css.item}>
                                    <p className={css.title}>
                                        <FormattedMessage id="app.about" defaultMessage="关于我们"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.profile" defaultMessage="公司简介"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.partners" defaultMessage="合作伙伴"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.news" defaultMessage="公司新闻"/></p>
                                </div>
                                <div className={css.item}>
                                    <p className={css.title}>
                                        <FormattedMessage id="app.guide" defaultMessage="用户指引"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.terms" defaultMessage="支付团队"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.shopping" defaultMessage="购物方式"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.question" defaultMessage="疑难解答"/></p>
                                </div>
                                <div className={css.item}>
                                    <p className={css.title}>
                                        <FormattedMessage id="app.customer" defaultMessage="客户服务"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.orders" defaultMessage="物流跟踪"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.rating" defaultMessage="供应商评分"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.protection" defaultMessage="法律声明"/></p>
                                </div>
                                <div className={css.item}>
                                    <p className={css.title}>
                                        <FormattedMessage id="app.contact" defaultMessage="联系客服"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.feedback" defaultMessage="问题反馈"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.supplier" defaultMessage="诚征英才"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.program" defaultMessage="联盟计划"/></p>
                                </div>
                            </div>
                        <div className={css.bottom}>
                            <FormattedMessage id="app.rights" defaultMessage="Dbuy360@2017 版权所有|重庆CC科技有限公司|维权热线：130000000"/>
                        </div>
                    </div>
                </div>;
    }
}

let div = document.createElement('div');
div.className = css.index;
console.log(239,store);
ReactDOM.render(
    (<LocaleProvider locale={appLocale.antd} >
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRedirect to="/main" />
                    <Route path="main" component={Home}>
                        <IndexRoute component={Main}/>
                        <Route path="category-list/:id" component={CategoryList}/>
                        <Route path="branch-list" component={BranchList}/>
                        <Route path="product-list/:info" component={ProductList}/>
                        <Route path="shopping-cart" component={ShoppingCart}/>
                        <Route path="product-detail/:id" component={ProductDetail}/>
                        <Route path="branch-detail/:id" component={BranchDetail}/>
                        <Route path="post-want" component={PostWant}/>
                        <Route path="cart" component={Cart}/>
                        <Route path="quotation" component={Quotation}/>
                        <Route path="about" component={About}>
                        </Route>
                        <Route path="mine" component={Mine}>
                            <IndexRoute component={PersonCenter}/>
                        </Route>
                    </Route>
                    <Route path="login" component={Login}/>
                </Route>
            </Router>
            </Provider>
        </IntlProvider>
    </LocaleProvider>), document.body.appendChild(div)
);