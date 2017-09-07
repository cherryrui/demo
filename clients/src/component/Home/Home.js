import axios from 'axios';
import React from 'react';
import css from './Home.scss';
import appcss from '../../App.scss';
import {
    Link
} from 'react-router';
import {
    connect
} from 'react-redux';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
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
import cartAction from '../../action/cartAction.js';

@connect(state => ({
    cart: state.cart
}), cartAction)

class Main extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
        getShoppingCart: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            categorys: [],
            carts: [],

        };
        this.tabs = [{
            key: 1,
            message_id: "app.home",
            default_message: "首页",
            url: "/#/"
        }, {
            key: 2,
            message_id: "app.brand",
            default_message: "供应商",
            url: "/#/main/branch-list"
        }, {
            key: 3,
            message_id: "app.news",
            default_message: "公司近况",
            url: "/#/main/news"
        }, {
            key: 4,
            message_id: "app.about",
            default_message: "关于我们",
            url: "/#/main/about"
        }, ];
        //this.language = 'zh_CN';
    }

    componentWillMount() {
        console.log("componentWillMount");
        this.props.getShoppingCart();
        let index = this.getIndex();
        /**
         * 获取一级分类和最近购物车商品
         */
        axios.get('/api/get-title-data.json').then(res => {
            console.log(res.data);
            this.setState({
                categorys: res.data.categorys,
                carts: res.data.carts,
                cart_num: res.data.cart_num,
                index: index,
            });
        });
    }

    componentDidMount() {}

    getIndex() {
        let index = 1;
        this.tabs.map(item => {
            if (this.props.location.pathname.indexOf(item.url) > -1) {
                index = item.key;
            }
        })
        return index;
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
    handleTabs = (key, url) => {
        if (key != this.state.index) {
            this.setState({
                index: key
            })
        }
        window.location.href = url;
    }
    handleMenuClick = (value) => {
        this.setState({
            index: 0
        })
        window.location.href = "/#/main/category-list/" + value.key;
    }

    render() {
        console.log(this.props.cart);
        let category_menu = (
            <Menu  onClick={this.handleMenuClick}>
                {this.state.categorys.map(item => {
                    return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                })}
            </Menu>
        );
        let cart_menu = (
            <Menu>
                {this.props.cart.carts.map(item => {
                    return <Menu.Item>
                        <Link  to={"main/product-detail/" + item.id}>
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
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div>
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.title}>LOGO</p>
                    <p className={this.state.index == 0 ? css.active : css.title}>
                        <Dropdown overlay={category_menu}>
                            <p>
                                <FormattedMessage id="app.category" defaultMessage="分类"/>
                            &nbsp;&nbsp;
                                <Icon type="caret-down" />
                            </p>
                        </Dropdown>
                    </p>
                {this.tabs.map(item=> {
                    return <p className={this.state.index == item.key ? css.active : css.title} onClick={this.handleTabs.bind(this, item.key, item.url)}>
                        <FormattedMessage id={item.message_id} defaultMessage={item.default_message}/>
                    </p>
                })}
                </div>
                <div className={css.right}>
                    <Search
                        placeholder="请输入商品信息"
                        style={{width: 300, height: "36px"}}
                        onSearch={value => value ? window.location.href = '/#/main/product-list/' + value
                            : message.warning(formatMessage({id: 'app.search'}))}
                    />
                    <Dropdown overlay={cart_menu} placement="bottomRight">
                        <Badge count={this.props.cart.sum}>
                            <Link to="main/cart">
                                <Button type="primary" size="large" icon="shopping-cart">
                                    <FormattedMessage id="shopping.cart" defaultMessage="购物车"/>
                                </Button>
                            </Link>
                        </Badge>
                    </Dropdown>
                </div>
            </div>
		{this.props.children}
            <div className={css.foot_first}>
                <div className={css.item}>
                    <p className={css.icon}>
                        <Icon type="like-o" />
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.authority" defaultMessage="权威"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <Icon type="trophy" />
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.integrity" defaultMessage="完善"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <Icon type="safety" />
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.safety" defaultMessage="安全"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <Icon type="customer-service" />
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.24.service" defaultMessage="24小时服务"/>
                    </p>
                </div>

            </div>
        </div>

    }
}
export default injectIntl(Main);