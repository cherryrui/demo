import axios from 'axios';
import React from 'react';
import css from './Home.scss';
import appcss from '../../App.scss';
import {
	Link
} from 'react-router';
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

class Main extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }
	constructor(props) {
		super(props);
		this.state = {
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
        const {
            intl: {
                formatMessage
                }
            } = this.props;
		return <div>
		<div className={css.header}>
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
                    onSearch={value => value?window.location.href='/#/main/product-list/'+value
                        :message.warning(formatMessage({id: 'app.search'}))}
                />
                <Dropdown overlay={this.state.cart_menu} placement="bottomRight">
                    <Badge count={5}>
                        <Button type="primary" size="large" icon="shopping-cart">
                            <FormattedMessage id="shopping.cart" defaultMessage="购物车"/>
                        </Button>
                    </Badge>
                </Dropdown>
            </div>
        </div>
		{this.props.children}
		<div className={css.foot_first}>
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

        </div>
	</div>

	}
}
export default injectIntl(Main);