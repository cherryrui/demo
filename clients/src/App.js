import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import cookie from 'react-cookie';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Link
} from 'react-router';
import css from './App.scss';
import en from 'react-intl/locale-data/en.js';
import zh from 'react-intl/locale-data/zh.js';
import enUS from 'antd/lib/locale-provider/en_US.js';

import Main from './component/Main/Main.js';
import Login from './component/Login/Login.js';
import CategoryList from './component/CategoryList/CategoryList.js';
import BranchList from './component/BranchList/BranchList.js';
import ProductList from './component/ProductList/ProductList.js';
import ShoppingCart from './component/ShoppingCart/ShoppingCart.js';
import ProductDetail from './component/ProductDetail/ProductDetail.js';
import BranchDetail from './component/BranchDetail/BranchDetail.js';
import PostWant from './component/PostWant/PostWant.js';

import {
    FormattedMessage,
    addLocaleData,
    IntlProvider
} from 'react-intl';
import intl from 'intl';
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

const appLocale = window.appLocale;
console.log(appLocale);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            antd_loacl: null,
            locale: 'zh',
            message: zh_message,
            category_menu: "",
            cart_menu: "",
            index: 1,
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
        this.tabs = [{
            key: 1,
            message_id: "app.home",
            default_message: "首页",
            url: "/#/"
        }, {
            key: 2,
            message_id: "app.brand",
            default_message: "供应商",
            url: "/#/branch-list"
        }, {
            key: 3,
            message_id: "app.news",
            default_message: "公司近况",
            url: "/#/news"
        }, {
            key: 4,
            message_id: "app.about",
            default_message: "关于我们",
            url: "/#/about"
        }, ]

        //this.language = 'zh_CN';
    }
    componentWillMount() {
        console.log(97, get_message());
        let index = this.getIndex();
        this.state.products = [{
            id: 1,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 2,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 3,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 4,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, {
            id: 5,
            name: "Product name",
            img: "../img/product.jpg",
            num: 3
        }, ]
        this.state.categorys = [{
            id: 1,
            name: "Category nameCategory nameCategory nameCategory name"
        }, {
            id: 2,
            name: "Category name"
        }, {
            id: 3,
            name: "Category name"
        }, {
            id: 4,
            name: "Category name"
        }, {
            id: 5,
            name: "Category name"
        }, {
            id: 6,
            name: "Category name"
        }, {
            id: 7,
            name: "Category name"
        }, {
            id: 8,
            name: "Category name"
        }, ]
        const category_menu = (
            <Menu  onClick={this.handleMenuClick}>
                {this.state.categorys.map(item => {
                    return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })}
            </Menu>
        );
        const cart_menu = (
            <Menu>
                {this.state.products.map(item => {
                    return <Menu.Item>
                        <Link  to={"/product-detail/"+item.id}>
                            <div className={css.cart_product}>
                                <img src={item.img}/>
                                <p className={css.name}>{item.name}</p>
                                <p>{item.num}</p>
                            </div>

                        </Link>
                    </Menu.Item>
                })}
            </Menu>
        );

        this.setState({
            category_menu: category_menu,
            cart_menu: cart_menu,
            index: index,
        });
    }
    componentDidMount() {}
    getIndex() {
            let index = 0;
            this.tabs.map(item => {
                if (item.url.indexOf(this.props.location.pathname) > -1) {
                    index = item.key;
                }
            })
            return index;

        }
        /**
         * wdy 返回上一级
         */
    back = () => {
        this.props.history.goBack()
    };
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
    handleTabs = (key, url) => {
        if (key != this.state.index) {
            this.setState({
                index: key
            })
            window.location.href = url;
        }
    }
    handleMenuClick = (key) => {
        this.setState({
            index: 0
        })
        window.location.href = "/#/category-list/" + key;
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
        return <LocaleProvider locale={this.state.antd_loacl}>
            <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
                <div className={css.main} >
                    <div className={css.fixed_title}>
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
                        {this.props.location.pathname==="/login"?"":<div className={css.header}>
                            <div className={css.left}>
                                <p className={css.title}>LOGO</p>
                                <p className={this.state.index==0?css.active:css.title}>
                                    <Dropdown overlay={this.state.category_menu}>
                                        <p>
                                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                                            &nbsp;&nbsp;
                                            <Icon type="caret-down" />
                                        </p>
                                    </Dropdown>
                                </p>
                                {this.tabs.map(item=>{
                                    return <p className={this.state.index==item.key?css.active:css.title} onClick={this.handleTabs.bind(this,item.key,item.url)}>
                                    <FormattedMessage id={item.message_id} defaultMessage={item.default_message}/>
                                </p>
                                })}
                            </div>
                            <div className={css.right}>
                                <Search
                                    placeholder="请输入商品信息"
                                    style={{ width: 300,height: "36px" }}
                                    onSearch={value => value?window.location.href='/#/product-list/'+value:message.warning(<FormattedMessage id="app.search" defaultMessage="请输入商品名称或者供应商"/>)}
                                />
                                <Dropdown overlay={this.state.cart_menu} placement="bottomRight">
                                    <Badge count={5}>
                                        <Button type="primary" size="large" icon="shopping-cart">
                                            <FormattedMessage id="shopping.cart" defaultMessage="购物车"/>
                                        </Button>
                                    </Badge>
                                </Dropdown>
                            </div>
                        </div>}
                    </div>
                
                    {this.props.children && React.cloneElement(this.props.children)}
                
                    <div className={css.footer}>
                        {this.props.location.pathname==="/login"?"":<div className={css.foot_first}>
                            <div className={css.item}>
                                <p className={css.icon}><Icon type="like-o" /></p>
                                <p className={css.text}><FormattedMessage id="app.authority" defaultMessage="权威"/></p>
                            </div>
                            <div className={css.item}>
                                <p className={css.icon}><Icon type="trophy" /></p>
                                <p className={css.text}><FormattedMessage id="app.integrity" defaultMessage="完善"/></p>
                            </div>
                            <div className={css.item}>
                                <p className={css.icon}><Icon type="safety" /></p>
                                <p className={css.text}><FormattedMessage id="app.safety" defaultMessage="安全"/></p>
                            </div>
                            <div className={css.item}>
                                <p className={css.icon}><Icon type="customer-service" /></p>
                                <p className={css.text}><FormattedMessage id="app.24.service" defaultMessage="24小时服务"/></p>
                            </div>

                        </div>}
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
            <Route path="category-list/:id" component={CategoryList}/>
            <Route path="branch-list" component={BranchList}/>
            <Route path="product-list/:info" component={ProductList}/>
            <Route path="shopping-cart" component={ShoppingCart}/>
            <Route path="product-detail/:id" component={ProductDetail}/>
            <Route path="branch-detail/:id" component={BranchDetail}/>
            <Route path="post-want" component={PostWant}/>
            <Route path="/login" component={Login}/>
        </Route>
        
    </Router>), document.body.appendChild(div)
);