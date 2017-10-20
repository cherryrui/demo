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

class Home extends React.Component {
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
        this.timer = false;
        this.cate_enter = false;
        this.tabs = [{
            key: 1,
            message_id: "app.home",
            default_message: "首页",
            url: "/"
        }, {
            key: 2,
            message_id: "quotation.brand",
            default_message: "供应商",
            url: "/page/brand-list"
        }, {
            key: 3,
            message_id: "app.news",
            default_message: "公司近况",
            url: "/page/news"
        }, {
            key: 4,
            message_id: "app.about",
            default_message: "关于我们",
            url: "/page/about"
        }, ];
        //this.language = 'zh_CN';
    }

    componentWillMount() {
        //console.log("componentWillMount");
        if (sessionStorage.user) {
            this.props.getShoppingCart();
        }
        let index = this.getIndex();
        /**
         * 获取一级分类和最近购物车商品
         */
        axios.get('/api/get-title-data.json').then(res => {
            //console.log('home.js:',res.data);
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
    handleCancel = () => {
        this.setState({
            visible: false,
        })
    }
    handleCart = () => {
        if (sessionStorage.user) {
            this.props.history.pushState(null, "/page/cart");
        } else {
            this.setState({
                visible: true
            })
        }
    }
    handleCategory = (index, name) => {
        this.setState({
            showCategory: false
        })
        if (typeof(index) == 'number') {
            /*window.location.href = "/#/main/category-list/" + index;*/
            this.props.history.pushState(null, "page/category-list/" + index + "/" + name);

        }
    }
    handleShow = (status) => {
        this.setState({
            showCategory: status
        })
    }
    onMouse = (e) => {
        if (e == "enter") {
            console.log(this.timer);
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.handleShow(true)
        }
        if (e == 'leave') {
            this.timer = setTimeout(() => {
                if (this.state.showCategory && !this.cate_enter) {
                    this.handleShow(false);

                }
            }, 1000);
        }

        if (e == "cate_enter") {
            this.cate_enter = true;
        }
        if (e == "cate_leave" && this.state.showCategory) {
            this.cate_enter = false;
            this.handleShow(false)
        }
    }
    goHome = () => {
        this.props.history.pushState(null, "/");
    }
    deleteCart = (id) => {
        let param = [];
        param.push(id);
        axios.post('/cart/delete-cart.json', param).then(res => {
            console.log(res.data);
            if (res.data.isSucc) {
                this.props.getShoppingCart();
            }
        })
    }

    render() {
        console.log(this.props.cart);
        let cart_menu = (
            <Menu>
                <Menu.Item className={css.cart_product_title}>
                    <FormattedMessage  id="home.recent.add" defaultMessage="最近新加产品"/>
                </Menu.Item>
                {this.props.cart.result?this.props.cart.result.list.map(item => {
                    return <Menu.Item>
                        <div className={css.cart_product}>
                            <Link  to={"page/product-detail/" + item.productId}>
                                <img src={item.coverUrl+"@50w_50h_1e_1c.png"}/>
                            </Link>
                            <div className={css.product_info}>
                                <p className={css.product_name}>{item.productName}</p>
                                <p className={css.product_price}>
                                    <span className={css.price}>{item.itemPrice?item.itemPrice:item.price}$</span>
                                    <span >
                                        x{item.productNum}
                                        <Icon onClick={this.deleteCart.bind(this,item.id)} type="delete" style={{paddingLeft: "20px"}}/>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Menu.Item>
                }):""}
                <Menu.Item className={css.cart_product_footer}>
                    <Link to="page/cart" >
                        <p >
                            <FormattedMessage  id="home.recent.go" defaultMessage=""/>
                        </p>
                    </Link>
                </Menu.Item>
            </Menu>
        );
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div>
        <div className={css.header}>
            <div className={css.header_content}>
                <div className={css.left}>
                    <p onClick={this.goHome} className={css.logo}>LOGO</p>
                    <p onMouseEnter={this.onMouse.bind(this,"enter")} onMouseLeave={this.onMouse.bind(this,"leave")} className={this.state.index == 0 ? css.active : css.title}>  
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
                        onSearch={value => value ? this.props.history.pushState(null, '/page/product-list/' + value)
                            : message.warning(formatMessage({id: 'app.search'}))}
                    />
                    {this.props.cart.result?<Dropdown overlay={cart_menu} placement="bottomRight">
                        <Badge count={this.props.cart.result.allRow} overflowCount={99}>
                            <Button type="primary" size="large" onClick={this.handleCart}>
                                <i class="iconfont icon-DYC-7"></i>&nbsp;&nbsp;<FormattedMessage id="cart.cart" defaultMessage="购物车"/>
                            </Button>
                        </Badge>
                    </Dropdown>:<Button type="primary" size="large" onClick={this.handleCart}>
                                <i class="iconfont icon-DYC-7"></i>&nbsp;&nbsp;<FormattedMessage id="cart.cart" defaultMessage="购物车"/>
                            </Button>}
                </div>
            </div>
            </div>
            {this.state.showCategory?<div className={css.categorys_drop}>
                <div className={css.categorys_body}>
                    <div className={css.categorys_content} onMouseEnter={this.onMouse.bind(this,"cate_enter")} onMouseLeave={this.onMouse.bind(this,"cate_leave")}>
                        <p className={css.drop_icon}><Icon type="caret-up" /></p>
                        {this.state.categorys.map(item=>{
                            return <p className={css.drop_item} onClick={this.handleCategory.bind(this,item.categoryId,item.categoryName)}>
                            <img src={item.iconUrl+"@18w_18h_1e_1c.png"}/>{item.categoryName}
                            </p>
                        })}
                    </div>
                </div>
            </div>:""}
            {this.props.children}
            <div className={css.foot_first}>
                <div className={css.item}>
                    <p className={css.icon}>
                        <i class="iconfont icon-DYC-6"></i>
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.authority" defaultMessage="权威"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <i class="iconfont icon-DYC-4"></i>
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.integrity" defaultMessage="完善"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <i class="iconfont icon-DYC-3"></i>
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.safety" defaultMessage="安全"/>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.icon}>
                        <i class="iconfont icon-DYC-5"></i>
                    </p>
                    <p className={css.text}>
                        <FormattedMessage id="app.24.service" defaultMessage="24小时服务"/>
                    </p>
                </div>
            </div>
            <LoginModal reload visible={this.state.visible} closeModal={this.handleCancel}/>
        </div>
    }
}
Home = injectIntl(Home);
export default Home;