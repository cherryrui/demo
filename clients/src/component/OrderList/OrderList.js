/**
 * Created by WF on 2017/9/5.
 */
import React from 'react';
import axios from 'axios';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import css from './OrderList.scss';
import operator from './operator.js';
import {
    Input,
    Icon,
    Tabs,
    Table,
    Button,
    Pagination
} from 'antd';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
const Search = Input.Search;
const TabPane = Tabs.TabPane;

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
class OrderList extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            carts: [{
                id: 1,
                name: "WEE000000",
                img: '../img/product.jpg',
                price: 100,
                staging: "6期",
                agent_price: 80,
                full: "全款",
                installment: "分期付款",
                num: 20,
                attr: [{
                    id: 1,
                    value: 1,
                    name: "2117-04-08",

                }, {
                    id: 2,
                    value: 2,
                    name: "12:00:00",

                }]
            }, {
                id: 2,
                name: "product name",
                img: '../img/product.jpg',
                price: 100,
                staging: "6期",
                agent_price: 80,
                full: "全款",
                installment: "分期付款",
                num: 40,
                attr: [{
                    id: 1,
                    value: 1,
                    name: "2017-05-07",
                    attr: [{
                        id: 1,
                        name: "红色"
                    }, {
                        id: 2,
                        name: "蓝色"
                    }, {
                        id: 3,
                        name: "绿色"
                    }, ]
                }, {
                    id: 2,
                    value: 2,
                    name: "28",
                    attr: [{
                        id: 1,
                        name: "27"
                    }, {
                        id: 2,
                        name: "28"
                    }, {
                        id: 3,
                        name: "29"
                    }, ]
                }]
            }, ]
        };
        this.formatMessage = this.props.intl.formatMessage;
        this.colums_show = [{
                    title: <FormattedMessage id="orderlist.order.amount_payable" defaultMessage="订单号和付款方式"/>,

                    width: "38%",
                    render: (record) => <div className={css.table_product}>
                <img src={record.img}/>
                <div className={css.info}>
                    <p className={css.product_title}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.name}</p>
                    <p className={css.table_payment}>
                        <Button type="primary" style={{background: "#e23c0a",fontSize:14,border:"none"}}>{record.installment}</Button>
                        <span className={css.payment_text}>{record.staging}</span><span className={css.payment_text}></span>
                    </p>
                </div>
            </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.amount_payable" defaultMessage="应付总金额"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
                }, {
                    title: <FormattedMessage id="orderlist.order.time" defaultMessage="订单时间"/>,
                    width: "16%",
                    className: css.table_col,
                    render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div className={css.table_time}>
                        {item.name}
                    </div>
                })}
                </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                    width: "8%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_status}><Icon  style={{fontSize: 18,color:"#ffa300"}}type="clock-circle" />

                </span>
                }, {
                    title: <FormattedMessage id="orderlist.order.operation" defaultMessage="我的购物车"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_operation}>
                    <a onClick={this.jump} className={css.operation_text}>
                        <Icon style={{fontSize: 18,color:"#636363",paddingRight:5}} type="file-text" />
                        <FormattedMessage id="orderlist.order.view" defaultMessage=""/>
                    </a>
                    <p><Button style={{width:70,fontSize:14,border:"none"}}type="primary">
                        <FormattedMessage  id="cart.pay" defaultMessage="支付"/>
                    </Button></p>
                </span>

                },

            ],
            this.colums_nopayment = [{
                    title: <FormattedMessage id="orderlist.order.no.method" defaultMessage="订单号和付款方式"/>,
                    className: css.table_col,
                    width: "38%",
                    render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p className={css.product_title}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.name}</p>
                        <p className={css.table_payment}>
                            <Button type="primary" style={{background: "#06cdbe",fontSize:14,border:"none"}}>{record.full}</Button>

                        </p>
                    </div>
                </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.payable" defaultMessage="应付总金额"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
                }, {
                    title: <FormattedMessage id="rderlist.order.time" defaultMessage="订单时间"/>,
                    width: "16%",
                    className: css.table_col,
                    render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div className={css.table_time}>
                        {item.name}
                    </div>
                })}
                    </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                    width: "8%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_status}><Icon  style={{fontSize: 18,color:"#06cdbe"}}type="pay-circle" />

                    </span>
                }, {
                    title: <FormattedMessage id="orderlist.Order.Operation" defaultMessage="我的购物车"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_operation}>
                        <a onClick={this.jump} className={css.operation_text}>
                            <Icon style={{fontSize: 18,color:"#636363",paddingRight:5}} type="file-text" />
                            <FormattedMessage id="orderlist.order.view" defaultMessage=""/>
                        </a>
                        <p><Button style={{width:70,fontSize:14,border:"none"}}type="primary">
                            <FormattedMessage  id="cart.pay" defaultMessage="支付"/>

                        </Button></p>
                    </span>

                },

            ],
            this.colums_partial = [{
                    title: <FormattedMessage id="orderlist.order.no_method" defaultMessage="订单号和付款方式"/>,
                    className: css.table_col,
                    width: "38%",
                    render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p className={css.product_title}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.name}</p>
                        <p className={css.table_payment}>
                            <Button type="primary" style={{background: "#e23c0a",fontSize:14,border:"none"}}>{record.installment}</Button>
                            <span className={css.payment_text}>{record.staging}</span><span className={css.payment_text}></span>
                        </p>


                    </div>
                </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.payable" defaultMessage="应付总金额"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
                }, {
                    title: <FormattedMessage id="rderlist.order.time" defaultMessage="订单时间"/>,
                    width: "16%",
                    className: css.table_col,
                    render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div className={css.table_time}>
                        {item.name}
                    </div>
                })}
                    </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                    width: "8%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_status}><Icon  style={{fontSize: 18,color:"#ffa300"}}type="heart" />

                    </span>
                }, {
                    title: <FormattedMessage id="orderlist.order.operation" defaultMessage="我的购物车"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_operation}>
                        <a onClick={this.jump}  className={css.operation_text}>
                            <Icon style={{fontSize: 18,color:"#636363",paddingRight:5}} type="file-text" />
                            <FormattedMessage id="orderlist.order.view" defaultMessage=""/>
                        </a>

                    </span>

                },

            ],
            this.colums_paid = [{
                    title: <FormattedMessage id="orderlist.order.no_method" defaultMessage="订单号和付款方式"/>,
                    className: css.table_col,
                    width: "38%",
                    render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p className={css.product_title}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.name}</p>
                        <p className={css.table_payment}>
                            <Button type="primary" style={{background: "#06cdbe",fontSize:14,border:"none"}}>{record.full}</Button>

                        </p>


                    </div>
                </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.payable" defaultMessage="应付总金额"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
                }, {
                    title: <FormattedMessage id="rderlist.order.time" defaultMessage="订单时间"/>,
                    width: "16%",
                    className: css.table_col,
                    render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div className={css.table_time}>
                        {item.name}
                    </div>
                })}
                    </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                    width: "8%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_status}><Icon  style={{fontSize: 18,color:"#ffa300"}}type="clock-circle" />

                    </span>
                }, {
                    title: <FormattedMessage id="orderlist.order.operation" defaultMessage="我的购物车"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_operation}>
                        <a onClick={this.jump} className={css.operation_text}>
                            <Icon style={{fontSize: 18,color:"#636363",paddingRight:5}} type="file-text" />
                            <FormattedMessage id="orderlist.order.view" defaultMessage=""/>
                        </a>
                        <p><Button style={{width:70,fontSize:14,border:"none"}} type="primary">

                            <FormattedMessage  id="cart.pay" defaultMessage="支付"/>
                        </Button></p>
                    </span>

                },

            ],
            this.colums_settled = [{
                    title: <FormattedMessage style={{ textAlign: "center"}} id="orderlist.order.no_method" defaultMessage="订单号和付款方式"/>,
                    className: css.table_col,
                    width: "38%",
                    render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p className={css.product_title}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.name}</p>
                        <p className={css.table_payment}>
                            <Button type="primary" style={{background: "#06cdbe",fontSize:14,border:"none"}}>{record.full}</Button>

                        </p>


                    </div>
                </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.payable" defaultMessage="应付总金额"/>,
                    width: "12%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
                }, {
                    title: <FormattedMessage id="rderlist.order.time" defaultMessage="订单时间"/>,
                    width: "16%",
                    className: css.table_col,
                    render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div className={css.table_time}>
                        {item.name}
                    </div>
                })}
                    </div>
                }, {
                    title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                    width: "8%",
                    className: css.table_col,
                    render: (record) => <span className={css.table_status}><Icon  style={{fontSize: 18,color:"#06cdbe"}}type="down-circle" />

                    </span>
                }, {
                    title: <FormattedMessage style={{ textAlign: "center"}} id="orderlist.order.operation" defaultMessage="我的购物车"/>,
                    width: "12%",
                    fontSize: "20px",
                    className: css.table_col,
                    render: (record) => <span  className={css.table_operation}>
                        <a onClick={this.jump} className={css.operation_text}>
                            <Icon style={{fontSize: 18,color:"#636363",paddingRight:5}} type="file-text" />
                            <FormattedMessage id="orderlist.order.view" defaultMessage=""/>
                        </a>
                        <p><Button style={{width:70,fontSize:14,border:"none"}}type="primary">
                            <FormattedMessage  id="cart.pay" defaultMessage="支付"/>

                        </Button></p>
                    </span>

                },

            ]
    }
    jump = (e) => {
        this.props.history.pushState(null, "/main/mine/order-details");
    }
    callback = () => {}

    render() {
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div className={css.order_list}>
            <div className={basecss.child_title}>
                <FormattedMessage  id="orderlist.all.order" defaultMessage="所有订单"/>
                <Search
                    placeholder={this.formatMessage({
                            id: 'mine.quotation.placeholder'
                        })}
                    style={{ width: 200 }}
                    onSearch={value => console.log(value)}
                 />
            </div>
            <div className={css.card_container}>
                <Tabs onChange={this.callback} type="card">
                    {operator.order_status.map(item=>{
                        return <TabPane
                            tab={<span style={{ textAlign: "center"}}>
                                    <Icon type="appstore" />
                                    <FormattedMessage id={item.key} defaultMessage="所有订单"/>
                                </span>}
                            key={item.value}>
                        </TabPane>
                    })}                    
                </Tabs>
                <Table
                    pagination={false}
                    rowKey="id"
                    columns={this.colums_show}
                    dataSource={this.state.carts} />
            </div>
            <div className={css.Pagination}> 
                <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
            </div>

        </div>
    }
}
OrderList = injectIntl(OrderList);
export default OrderList;