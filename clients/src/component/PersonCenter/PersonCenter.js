/**
 * Created by WF on 2017/9/4.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './PersonCenter.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import operator from './operator.js';
import Brand from '../Public/Brand/Brand.js';
import Product from '../Public/Product/Product.js';
import operator_order from '../OrderList/operator.js';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Button,
    Icon,
    Tooltip,
    Progress,
    Pagination,
    Avatar,
    message
} from 'antd';
class PersonCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            message_list: [],
            products: [],
            brands: [],
            orderList: [],
            demandList: [],
            collectList: [],
            visible: false,
            product_page: 1,
            brand_page: 2,

        }

    }
    componentWillMount() {
        if (sessionStorage.user) {
            this.state.user = JSON.parse(sessionStorage.user);
            this.getData();
        } else {
            this.props.history.pushState(null, 'login');
        }
    }

    jump = (e) => {
        this.props.history.pushState(null, "page/mine/system-message")
    }
    getData = () => {
        let orderList = JSON.parse(JSON.stringify(operator_order.order_status)),
            demandList = JSON.parse(JSON.stringify(operator.demand_menu)),
            collectList = JSON.parse(JSON.stringify(operator.favorite_menu));
        axios.post('/user/get-center-num.json', {}).then(res => {
            if (res.data.code == 104) {
                this.props.handleVisible ? this.props.handleVisible(true) : "";
            } else if (res.data.isSucc) {
                let sum = 0;
                orderList.map(item => {
                    res.data.order.map(order => {
                        if (item.value == order.orderStatus) {
                            item.count = order.total;
                            sum += order.total;
                        }
                    })
                })
                orderList[0].count = sum;
                sum = 0;
                demandList.map(item => {
                    res.data.demand.map(demand => {
                        if (item.key == demand.demandStatus) {
                            sum += demand.total;
                            item.count = demand.total;
                        }
                    })
                })
                demandList[0].count = sum;
                sum = 0;
                collectList.map(item => {
                    res.data.collect.map(demand => {
                        if (item.key == demand.type) {
                            sum += demand.total;
                            item.count = demand.total;
                        }
                    })
                })
                collectList[0].count = sum;
                this.setState({
                    orderList: orderList,
                    demandList: demandList,
                    collectList: collectList,
                    brands: res.data.brand,
                    products: res.data.product,
                })
            } else {
                message.error(res.data.message);
            }
        });
    }
    handleMenu = (key, url) => {
        console.log(key, url);
        this.setState({
            select: key
        });
        if (url)
            this.props.history.pushState(null, url);
    }
    handleChange = (name, page) => {
        let param = {};
        param[name] = page;
        this.setState(param);
    }
    render() {
        return <div class={css.center}>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person" defaultMessage="分类"/>
            </div>
            <div className={css.user}>
                <div className={css.user_info}>
                    <Avatar size="large" icon="user" className={css.user_avatar}/>
                    <div className={css.user_name}>
                        <p  style={{ fontSize:18,fontWeight:"bold"}}>
                             {this.state.user.userName}
                             <Icon type="user"  className={css.name_icon}/></p>
                        <p>
                            <Icon type="safety" className={css.member_icon}/>
                            Regular member
                        </p>
                        <p>
                            <FormattedMessage id="app.account.security" defaultMessage="分类"/>:
                            <div style={{ width: 100,paddingLeft:5}}>
                                <Progress type="line" percent={50} format={() => 'middle'}  strokeWidth={10} strokeHeigth={12} status="active" style={{ color: "#ff9a2c"}} />
                            </div>
                        </p>
                    </div>
                </div>
                <div className={css.user_message}>
                    <div className={css.user_message_title}>
                        <FormattedMessage id="mine.my.message" defaultMessage="分类"/>
                        <p className={css.message_more} onClick={this.jump}>
                            <FormattedMessage id="app.more" defaultMessage="分类" />
                        </p>
                    </div>
                    {this.state.message_list.map(item=>{
                        return <div className={css.user_message_item}>
                            <i>●</i>【
                            {item.type==0?<FormattedMessage id="mine.message.system" defaultMessage="分类"/>
                            :<FormattedMessage id="mine.message.consult" defaultMessage="分类"/>}】
                            {item.info}
                        </div>
                    })}
                </div>               
            </div>
            <div className={css.order}>
                <p className={css.title_item}>
                    <FormattedMessage id="mine.order" defaultMessage="分类"/>
                </p>
                <div className={css.order_content}>
                    {this.state.orderList.map(item=>{
                        return <div className={css.order_item}
                        onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <img src={item.icon}/>
                            <Tooltip placement="top"
                                arrowPointAtCenter
                                title={<FormattedMessage id={item.key} defaultMessage="分类"/>}
                            >
                                <p className={css.order_text}>
                                    <FormattedMessage id={item.key} defaultMessage="分类"/>
                                </p>
                            </Tooltip>
                            <p className={css.order_num}>{item.count}</p>
                        </div>
                    })}
                </div>    
            </div>
            <div style={{display: "flex"}}>
                <div className={css.demand}>
                    <p className={css.title_item}>
                        <FormattedMessage id="app.demand.management" defaultMessage="分类"/>
                    </p>
                    <div className={css.demand_content}>
                        {this.state.demandList.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                    arrowPointAtCenter
                                    title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                    <p className={css.order_text}>
                                        <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                    </p>
                                 </Tooltip>
                                    <p className={css.order_num}>{item.count}</p>
                            </div>
                    })}
                    </div>                    
                </div>
                <div className={css.favorite}>
                    <p className={css.title_item}>
                        <FormattedMessage id="mine.favorite" defaultMessage="分类"/>
                    </p>
                    <div className={css.favorite_content}>
                        {this.state.collectList.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                    arrowPointAtCenter
                                    title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                        <p className={css.order_text}>
                                            <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                        </p>
                                </Tooltip>
                                    <p className={css.order_num} >{item.count}</p>
                            </div>
                        })}
                    </div>
                </div>
                {this.state.user.userIdentity==1?
                <div className={css.quotation}>
                    <p className={css.title_item}>
                        <FormattedMessage id="quotation.quotation" defaultMessage="分类"/>
                    </p>
                    <div className={css.quotation_content}>
                        {operator.quotation_menu.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                    arrowPointAtCenter
                                    title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                        <p className={css.order_text}>
                                            <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                        </p>
                                </Tooltip>
                                    <p className={css.order_num}>30</p>

                            </div>
                        })}
                    </div>
                </div>:""}
            </div>
            {this.state.user.userIdentity==2?<div className={css.management}>
                <p className={css.title_item}>
                    <FormattedMessage id="mine.product.management" defaultMessage="分类"/>
                </p>
                <div className={css.management_content}>
                    {operator.management_menu.map(item=>{
                        return <div className={css.order_item}
                            onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <img src={item.icon}/>
                            <Tooltip placement="top"
                                arrowPointAtCenter
                                title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                            >
                                    <p className={css.order_text}>
                                        <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                    </p>
                            </Tooltip>
                            <p className={css.order_num}>30</p>
                        </div>
                    })}
                </div>
            </div>:""}
            <div className={css.like_title}>
                <FormattedMessage id="app.like" defaultMessage="分类"/>

            </div>
            <div className={css.like}>
                <div className={css.like_content}>
                    <div className={css.like_product}>
                        <div className={css.product_title}>
                            <FormattedMessage id="app.products" defaultMessage="分类"/>
                            <Pagination simple defaultCurrent={1} defaultPageSize={5} total={this.state.products.length} onChange={this.handleChange.bind(this,"product_page")}/>
                        </div>
                        <div  className={css.product_list}>
                            {this.state.products.map((item,index)=>{
                                return index>=(this.state.product_page-1)*5 && index<this.state.product_page*5?<Product product={item} className={css.like_item}/>:""
                            })}
                        </div>
                    </div>

                </div>                 
            </div>
            <div className={css.like}>
                <div className={css.like_content}>
                    <div className={css.like_brand}>
                        <div className={css.brand_title}>
                            <FormattedMessage id="app.supplier" defaultMessage="分类"/>
                            <Pagination simple defaultCurrent={1} defaultPageSize={5} total={this.state.brands.length} onChange={this.handleChange.bind(this,"brand_page")}/>
                        </div>
                        <div  className={css.brand_list}>
                            {this.state.brands.map((item,index)=>{
                                return index>=(this.state.brand_page-1)*5 && index<this.state.brand_page*5?<Brand brand={item} showStar className={css.like_item}/>:""
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default PersonCenter;