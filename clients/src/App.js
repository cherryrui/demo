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
import CategoryList from './component/CategoryList/CategoryList.js';
import BranchProduct from './component/BranchProduct/BranchProduct.js';
import ProductList from './component/ProductList/ProductList.js';



import {injectIntl,FormattedMessage,addLocaleData,IntlProvider} from 'react-intl';
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
                            <p className={css.title}>
                                <Link to="/login"><FormattedMessage id="app.home" defaultMessage="首页"/></Link>
                            </p>
                            <p className={css.title}>
                                <Link to="/category-list"><FormattedMessage id="app.allcategroy" defaultMessage="分类"/></Link>

                            </p>
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
            <Route path="category-list" component={CategoryList}/>
            <Route path="branch-product" component={BranchProduct}/>
            <Route path="product-list" component={ProductList}/>
        </Route>
        <Route path="/login" component={Login}/>
    </Router>), document.body.appendChild(div)
);
