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
    message,
    Modal
} from 'antd';

const Search = Input.Search;
const Option = Select.Option;
import cartAction from '../../action/cartAction.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';

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
            visible: false,
            confirmloading: false,
            showCategory: false

        };
        this.tabs = [{
            key: 1,
            message_id: "app.home",
            default_message: "首页",
            url: "/"
        }, {
            key: 2,
            message_id: "app.brand",
            default_message: "供应商",
            url: "/main/brand-list"
        }, {
            key: 3,
            message_id: "app.news",
            default_message: "公司近况",
            url: "/main/news"
        }, {
            key: 4,
            message_id: "app.about",
            default_message: "关于我们",
            url: "/main/about"
        }, ];
        //this.language = 'zh_CN';
    }

    componentWillMount() {
        //console.log("componentWillMount");
        this.props.getShoppingCart();
        let index = this.getIndex();
        /**
         * 获取一级分类和最近购物车商品
         */
        axios.get('/api/get-title-data.json').then(res => {
            console.log(res.data);
            this.setState({
                categorys: res.data.categorys.result,
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
    handleTabs = (key, url) => {
        if (key != this.state.index) {
            this.setState({
                index: key
            })
        }
        this.props.history.pushState(null, url);
    }
    handleMenuClick = (value) => {
        this.setState({
            index: 0
        })
        this.props.history.pushState(null, "/main/category-list/" + value.key);
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    handleCart = () => {
        if (sessionStorage.user) {
            this.props.history.pushState(null, "/main/cart");
        } else {
            this.setState({
                visible: true
            })
        }
    }
    handleCategory = (index) => {
        this.setState({
            showCategory: !this.state.showCategory
        })
        if (typeof(index) == 'number') {
            console.log(this.props)
                /*window.location.href = "/#/main/category-list/" + index;*/
            this.props.history.pushState(null, "main/category-list/" + index);

        }
    }

    render() {
        //console.log(this.props.cart);

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
                    <p className={css.logo}>LOGO</p>
                    <p onClick={this.handleCategory} className={this.state.index == 0 ? css.active : css.title}>  
                        <FormattedMessage id="app.category" defaultMessage="分类"/>
                        &nbsp;&nbsp;
                        <Icon type="caret-down" />
                    </p>
                {this.tabs.map(item=> {
                    return <p className={this.state.index == item.key ? css.active : css.title} onClick={this.handleTabs.bind(this, item.key, item.url)}>
                        <FormattedMessage id={item.message_id} defaultMessage={item.default_message}/>
                    </p>
                })}
                </div>
                <div className={css.right}>
                    <Search
                        placeholder={formatMessage({id:"home.input_warn"})}
                        style={{width: 300, height: "42px"}}
                        onSearch={value => value ? window.location.href = '/#/main/product-list/' + value
                            : message.warning(formatMessage({id: 'app.search'}))}
                    />
                    <Dropdown overlay={cart_menu} placement="bottomRight">
                        <Badge count={this.props.cart.sum}>
                            <Button type="primary" size="large" icon="shopping-cart" onClick={this.handleCart}>
                                <FormattedMessage id="cart.cart" defaultMessage="购物车"/>
                            </Button>
                        </Badge>
                    </Dropdown>
                </div>
            </div>
            {this.state.showCategory?<div className={css.categorys_drop}>
                <p className={css.drop_icon}><Icon type="caret-up" /></p>
                {this.state.categorys.map(item=>{
                    return <p className={css.drop_item} onClick={this.handleCategory.bind(this,item.categoryId)}>
                    {item.categoryName}
                    </p>
                })}
            </div>:""}
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
            <Modal
                title={formatMessage({id:"login.login.title"})}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <LoginModal closeModal={this.handleCancel}/>
            </Modal>
        </div>

    }
}
export default injectIntl(Main);