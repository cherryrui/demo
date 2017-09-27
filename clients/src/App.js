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
import BrandList from './component/BrandList/BrandList.js';
import ProductList from './component/ProductList/ProductList.js';
import ProductDetail from './component/ProductDetail/ProductDetail.js';
import BrandDetail from './component/BrandDetail/BrandDetail.js';
import PostWant from './component/PostWant/PostWant.js';
import Home from './component/Home/Home.js';
import Cart from './component/Cart/Cart.js';
import Quotation from './component/Quotation/Quotation.js';
import Mine from './component/Mine/Mine.js';
import PersonCenter from './component/PersonCenter/PersonCenter.js';
import About from './component/About/About.js';
import Message from './component/Message/Message.js';
import SystemMessage from './component/SystemMessage/SystemMessage.js';
import Register from './component/Register/Register.js';
import RePassword from './component/RePassword/RePassword.js';
import RegisterComplete from './component/RegisterComplete/RegisterComplete.js';
import OrderList from './component/OrderList/OrderList.js';
import Favorite from './component/Favorite/Favorite.js';
import QuotationList from './component/QuotationList/QuotationList.js';
import ProductEditor from './component/ProductEditor/ProductEditor.js';
import AgentProduct from './component/AgentProduct/AgentProduct.js';
import OrderDetails from './component/OrderDetails/OrderDetails.js';
import PersonAddress from './component/PersonAddress/PersonAddress.js';
import PersonData from './component/PersonData/PersonData.js';
import Agent from './component/Agent/Agent.js';
import SuccessfulApplication from './component/SuccessfulApplication/SuccessfulApplication.js';
import Supplier from './component/Supplier/Supplier.js';
import Certification from './component/Certification/Certification.js';
import News from './component/News/News.js';
import {
    Provider
} from 'react-redux';
import {
    FormattedMessage,
    addLocaleData,
    IntlProvider,
    injectIntl,
    intlShape
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
    message,
    Modal
} from 'antd';
const Search = Input.Search;
const Option = Select.Option;
var appLocale = {
    antd_locale: locale == "zh" ? null : enUS,
    locale: locale,
    message: locale == "zh" ? zh_message : en_message
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.user ? JSON.parse(sessionStorage.user) : null,
            /*antd_loacl: null,
            locale: 'zh',
            message: zh_message,*/
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
        if (sessionStorage.user) {
            this.setState({
                user: JSON.parse(sessionStorage.user),
            })
        } else if (localStorage.uid) {
            axios.get(`/user/get-user.json?id=${localStorage.uid}`).then(res => {
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.setState({
                    user: res.data.user
                })
            })
        }
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState) {
        console.log("sdsadasd");
        if (sessionStorage.user && !this.state.user) {
            this.setState({
                user: JSON.parse(sessionStorage.user),
            })
        }
    }


    handleChange = () => {
        if (appLocale.locale == 'zh') {
            window.location.href = "/en#" + this.props.location.pathname
        } else {
            window.location.href = "/#" + this.props.location.pathname
        }
    }
    state = {
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false
        });
        this.props.history.pushState(null, '/login');
        localStorage.clear();
        sessionStorage.clear();
        this.setState({
                    user: ""
                })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    render() {
        let {
            intl: {
                formatMessage
            }
        } = this.props;

        console.log(appLocale);
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
                            {this.state.user?<div> <Link to="page/mine" className={css.item1}>{this.state.user.userName}</Link>
                                <p onClick={this.showModal} className={css.item2}><FormattedMessage id="app.pull.out" defaultMessage="退出"/>
                                <Modal className={css.modalcontent}
                                    title="退出系统"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}>
                                    <p>
                                        <FormattedMessage id="app.pull.message" defaultMessage="是否退出系统"/>
                                    </p>
                                </Modal>
                                </p></div>:
                            <Link className={css.item} to="login">
                                <FormattedMessage id="app.login" defaultMessage="登录/注册"/>
                            </Link>}
                            {this.state.user?<Dropdown overlay={order_menu}>
                                <p className={css.item}><FormattedMessage id="app.order" defaultMessage="我的订单"/> <Icon type="down" /></p>
                            </Dropdown>:""}
                            {this.state.user?<p className={css.item}>
                                <FormattedMessage id="app.message" defaultMessage="消息"/>
                            </p>:""}
                            <Dropdown overlay={<Menu onClick={this.handleChange}><Menu.Item>
                                        <FormattedMessage id="app.language.en" defaultMessage="en"/>
                                    </Menu.Item>
                                </Menu>}>
                                <p className={css.item}>
                                    <FormattedMessage id="app.language.zh" defaultMessage="zh"/>
                                <Icon type="down" /></p>
                            </Dropdown>
                        </div>
                    </div>
                    {
                        this.props.children && React.cloneElement(this.props.children)
                    }               
                    <div className={css.footer}>
                        <div className={css.footer_first}>
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
                        </div>
                        <div className={css.bottom}>
                            <FormattedMessage id="app.rights" defaultMessage="Dbuy360@2017 版权所有|重庆CC科技有限公司|维权热线：130000000"/>
                        </div>
                    </div>
                </div>;
    }
}
App = injectIntl(App);
let div = document.createElement('div');
div.className = css.index;
ReactDOM.render(
    (<LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.message}>
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRedirect to="/page" />
                        <Route path="page" component={Home}>
                            <IndexRoute component={Main}/>
                            <Route path="category-list/:id/:name" component={CategoryList}/>
                            <Route path="brand-list" component={BrandList}/>
                            <Route path="product-list/:info(/:name)" component={ProductList}/>
                            <Route path="product-detail/:id" component={ProductDetail}/>
                            <Route path="brand-detail/:id" component={BrandDetail}/>
                            <Route path="post-want" component={PostWant}/>
                            <Route path="cart" component={Cart}/>
                            <Route path="quotation(/:id)" component={Quotation}/>
                            <Route path="about" component={About}>
                            </Route>
                            <Route path="news" component={News}/>
                            <Route path="mine" component={Mine}>
                                <IndexRoute component={PersonCenter}/>
                                <Route path="message" component={Message}/>
                                <Route path="system-message" component={SystemMessage}/>
                                <Route path="order-list" component={OrderList}/>
                                <Route path="order-details" component={OrderDetails}/>
                                <Route path="favorite/:type" component={Favorite}/>
                                <Route path="quotation-list" component={QuotationList}/>
                                <Route path="product-editor" component={ProductEditor}/>
                                <Route path="agent-product" component={AgentProduct}/>
                                <Route path="person-address" component={PersonAddress}/>
                                <Route path="person-data" component={PersonData}/>
                                <Route path="agent" component={Agent}/>
                                <Route path="successful-application/:type" component={SuccessfulApplication}/>
                                <Route path="supplier" component={Supplier}/>
                                <Route path="certification" component={Certification}/>
                            </Route>
                        </Route>
                        <Route path="login" component={Login}/>
                        <Route path="register" component={Register}/>
                        <Route path="reset-password" component={RePassword}/>
                        <Route path="register-complete" component={RegisterComplete}/>
                    </Route>
                </Router>
            </Provider>
        </IntlProvider>
    </LocaleProvider>), document.body.appendChild(div)
);