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
import Home from './component/Home/Home.js';

import PersonCenter from './component/PersonCenter/PersonCenter.js';
import CusModal from './component/Public/CusModal/CusModal.js';


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
const Login = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Login/Login.js').default)
    }, 'login')
}
const Register = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Register/Register.js').default)
    }, 'register')
}
const Mine = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Mine/Mine.js').default)
    }, 'mine')
}
const ProductDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/ProductDetail/ProductDetail.js').default)
    }, 'productDetail')
}
const ProductList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/ProductList/ProductList.js').default)
    }, 'productList')
}
const BrandList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/BrandList/BrandList.js').default)
    }, 'brandList')
}
const CategoryList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/CategoryList/CategoryList.js').default)
    }, 'categoryList')
}
const Favorite = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Favorite/Favorite.js').default)
    }, 'favorite')
}
const BrandDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/BrandDetail/BrandDetail.js').default)
    }, 'brandDetail')
}
const PostWant = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/PostWant/PostWant.js').default)
    }, 'postWant')
}
const Cart = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Cart/Cart.js').default)
    }, 'cart')
}
const Quotation = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Quotation/Quotation.js').default)
    }, 'quotation')
}
const About = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/About/About.js').default)
    }, 'about')
}
const Message = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Message/Message.js').default)
    }, 'message')
}
const SystemMessage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/SystemMessage/SystemMessage.js').default)
    }, 'systemMessage')
}
const RePassword = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/RePassword/RePassword.js').default)
    }, 'resetPassword')
}

const RegisterComplete = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/RegisterComplete/RegisterComplete.js').default)
    }, 'registerComplete')
}
const OrderList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/OrderList/OrderList.js').default)
    }, 'orderList')
}
const QuotationList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/QuotationList/QuotationList.js').default)
    }, 'quotationList')
}
const ProductEditor = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/ProductEditor/ProductEditor.js').default)
    }, 'productEditor')
}
const AgentProduct = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/AgentProduct/AgentProduct.js').default)
    }, 'agentProduct')
}
const OrderDetails = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/OrderDetails/OrderDetails.js').default)
    }, 'orderDetails')
}
const PersonAddress = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/PersonAddress/PersonAddress.js').default)
    }, 'personAddress')
}
const PersonData = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/PersonData/PersonData.js').default)
    }, 'personData')
}
const Agent = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Agent/Agent.js').default)
    }, 'agent')
}
const SuccessfulApplication = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/SuccessfulApplication/SuccessfulApplication.js').default)
    }, 'successful-application')
}
const Supplier = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Supplier/Supplier.js').default)
    }, 'supplier')
}
const Certification = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/Certification/Certification.js').default)
    }, 'certification')
}
const News = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/News/News.js').default)
    }, 'news')
}
const QuotationPdf = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./component/QuotationPdf/QuotationPdf.js').default)
    }, 'quotationPdf')
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
        this.formatMessage = this.props.intl.formatMessage;
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
        }
        /*else if (localStorage.uid) {
            axios.get(`/user/get-user.json?id=${localStorage.uid}`).then(res => {
                sessionStorage.setItem('user', JSON.stringify(res.data.user))
                this.setState({
                    user: res.data.user
                })
            })
        }*/
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
            window.location.href = "/#" + this.props.location.pathname
        } else {
            window.location.href = "/cn#" + this.props.location.pathname
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
                            {this.state.user?<div> <Link to="page/mine" className={css.item1}>{this.state.user.userName}/</Link>
                                <p onClick={this.showModal} className={css.item2}>
                                    <FormattedMessage id="app.pull.out" defaultMessage="退出"/>
                                </p>
                            </div>
                            :<div><Link className={css.item} to="login">
                                <FormattedMessage id="login.login" defaultMessage="登录"/>
                            </Link><Link style={{color:"white"}} to="register">
                                /<FormattedMessage id="login.registor" defaultMessage="注册"/>
                            </Link></div>}
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
                                        <FormattedMessage id="about.how.supplier" defaultMessage="诚征英才"/></p>
                                    <p className={css.info}>
                                        <FormattedMessage id="app.program" defaultMessage="联盟计划"/></p>
                                </div>
                            </div>
                        </div>
                        <div className={css.bottom}>
                            <FormattedMessage id="app.rights" defaultMessage="Dbuy360@2017 版权所有|重庆CC科技有限公司|维权热线：130000000"/>
                        </div>
                    </div>
                    <CusModal closeModal={this.handleCancel} visible={this.state.visible} title={this.formatMessage({id:"app.pull.modal.title"})}>
                        <p className={css.quit_modal}>
                            <FormattedMessage id="app.pull.message" defaultMessage="是否退出系统"/>
                        </p>
                        <p className={css.quit_button}>
                            <Button className={css.button_green} type="primary" onClick={this.handleCancel} >
                                <FormattedMessage id="app.cancel" defaultMessage="取消"/>
                            </Button>
                            <Button className={css.button_theme} type="primary" onClick={this.handleOk} >
                                <FormattedMessage id="app.pull.out" defaultMessage="退出"/>
                            </Button>
                        </p>
                    </CusModal>
                </div>;
    }
}
App = injectIntl(App);
let div = document.createElement('div');
div.className = css.index;
ReactDOM.render(
    (<LocaleProvider locale={appLocale.antd_locale}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.message}>
            <Provider store={store}>
                <Router history={hashHistory}>
                    <Route path="/" component={App}>
                        <IndexRedirect to="/page" />
                        <Route path="page" component={Home}>
                            <IndexRoute component={Main}/>
                            <Route path="category-list/:id/:name" getComponent={CategoryList}/>
                            <Route path="brand-list" getComponent={BrandList}/>
                            <Route path="product-list/:info(/:name)" getComponent={ProductList}/>
                            <Route path="product-detail/:id(/:name)" getComponent={ProductDetail}/>
                            <Route path="brand-detail/:id" getComponent={BrandDetail}/>
                            <Route path="post-want" getComponent={PostWant}/>
                            <Route path="cart(/:step)" getComponent={Cart}/>
                            <Route path="quotation(/:id)" getComponent={Quotation}/>
                            <Route path="quotation-pdf/:id" getComponent={QuotationPdf}/>
                            <Route path="about" getComponent={About}>
                            </Route>
                            <Route path="news" getComponent={News}/>
                            <Route path="mine" getComponent={Mine}>
                                <IndexRoute component={PersonCenter}/>
                                <Route path="message" getComponent={Message}/>
                                <Route path="system-message" getComponent={SystemMessage}/>
                                <Route path="order-list" getComponent={OrderList}/>
                                <Route path="order-details/:id" getComponent={OrderDetails}/>
                                <Route path="favorite/:type" getComponent={Favorite}/>
                                <Route path="quotation-list" getComponent={QuotationList}/>
                                <Route path="product-editor" getComponent={ProductEditor}/>
                                <Route path="agent-product" getComponent={AgentProduct}/>
                                <Route path="person-address" getComponent={PersonAddress}/>
                                <Route path="person-data" getComponent={PersonData}/>
                                <Route path="agent" getComponent={Agent}/>
                                <Route path="successful-application/:type" getComponent={SuccessfulApplication}/>
                                <Route path="supplier" getComponent={Supplier}/>
                                <Route path="certification" getComponent={Certification}/>
                            </Route>
                        </Route>
                        <Route path="login" getComponent={Login}/>
                        <Route path="register" getComponent={Register}/>
                        <Route path="reset-password" getComponent={RePassword}/>
                        <Route path="register-complete" getComponent={RegisterComplete}/>
                    </Route>
                </Router>
            </Provider>
        </IntlProvider>
    </LocaleProvider>), document.body.appendChild(div)
);