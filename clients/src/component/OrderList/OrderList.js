/**
 * Created by WF on 2017/9/5.
 */
import React from 'react';
import axios from 'axios';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import css from './OrderList.scss';
import operator from './operator.js';
import moment from 'moment';
import {
    Input,
    Icon,
    Table,
    Button,
    Pagination,
    message,
    Tooltip
} from 'antd';
import {
    Link
} from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
const Search = Input.Search;
import TabBar from '../Public/TabBar/TabBar.js';

class OrderList extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            total: 0,
            pageNo: 1, //当前页码
            pageSize: 10, //每页数量
            visible: false,
            current: this.props.params.type && !isNaN(this.props.params.type) ? Number(this.props.params.type) : 0,
            order_status: operator.order_status,
        };
        this.formatMessage = this.props.intl.formatMessage;
        this.colums_show = [{
                title: <FormattedMessage id="orderlist.order.info" defaultMessage="订单号和付款方式"/>,
                width: "320px",
                render: (record) => <div className={css.table_product}>
                <img src={record.productImgUrl}/>
                <div className={css.info}>
                    <p className={css.product_title}>
                        <FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/> :{record.orderId}
                    </p>
                    {record.stageNum?<p className={css.table_payment}>
                        <FormattedMessage  id="orderlist.pay.installment" defaultMessage="订单号"/>
                        {this.formatMessage({id:"orderlist.pay.payment"},{stageNum: record.stageNum})}
                    </p>:<p className={css.table_payment_full}>
                        <FormattedMessage  id="orderlist.pay.full" defaultMessage="订单号"/>
                    </p>}
                </div>
            </div>
            }, {
                title: <FormattedMessage id="orderlist.order.money" defaultMessage="应付总金额"/>,
                width: "200px",
                className: css.table_col,
                dataIndex: 'totalMoney',
                key: 'totalMoney',
                render: (test) => <span className={css.table_price}>${test}</span>
            }, {
                title: <FormattedMessage id="orderlist.order.time" defaultMessage="订单时间"/>,
                width: "120px",
                dataIndex: 'createTime',
                key: 'createTime',
                className: css.table_col,
                render: (text) => <div>
                    <p>{moment(text).format('YYYY-MM-DD ')}</p>
                    <p>{moment(text).format(' HH:mm:ss')}</p>
                </div>
            }, {
                title: <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>,
                width: "100px",
                className: css.table_col,
                dataIndex: 'orderStatus',
                key: 'orderStatus',
                render: (text) => <span className={css.table_status}>
                    {operator.order_status.map(item=>{
                        if(text == item.value){
                            return <Tooltip title={this.formatMessage({id: item.key})}>
                                <img src={item.icon}/>
                            </Tooltip>
                        }
                    })}
                </span>
            }, {
                title: <FormattedMessage id="cart.operation" defaultMessage="我的购物车"/>,
                width: "140px",
                className: css.table_col,
                render: (record) => <span className={css.table_operation}>
                    <Link to={"page/order-details/"+record.orderId} className={css.operation_text}>
                        <i class="iconfont icon-DYC-23"/>
                        <FormattedMessage id="orderlist.order.view" defaultMessage="查看"/>
                    </Link>
                    <p>
                        <Button onClick={this.handleClick.bind(this,record)} size="small" style={{width:70,fontSize:14,border:"none"}} type="primary">
                            <FormattedMessage  id="cart.pay" defaultMessage="支付"/>
                        </Button>
                    </p>
                </span>
            }

        ];
    }
    handleClick = (record) => {
        this.props.history.pushState(null, "page/cart/2/" + record.orderId)
    }
    componentWillMount() {
        this.searchOrder();
        axios.post('/order/get-order-status-num.json', {}).then(res => {
            let order_status = operator.order_status,
                total = 0;
            order_status.map(item => {
                item.count = 0;
                res.data.order_status.map(order => {
                    if (order.orderStatus == item.value) {
                        item.count = order.total;
                        total += order.total;
                    }
                })
            })
            order_status[0].count = total;
            this.setState({
                order_status: order_status
            })
        })
    }

    /**
     * 查询用户订单，type：0 按状态查询，1：关键字搜索
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    searchOrder = (type, search) => {
        let param = {
            pageSize: this.state.pageSize,
            pageNo: this.state.pageNo,
            type: type,
        }
        if (type == 1) {
            param.param = search;
        } else if (this.state.current) {
            param.orderStatus = this.state.current;
        }
        axios.post('/order/get-user-order.json', param).then(res => {
            if (res.data.code == 104) {
                this.props.handleVisible ? this.props.handleVisible(true) : "";
            } else if (res.data.isSucc) {
                this.props.goTop();
                this.setState({
                    orders: res.data.result.list,
                    total: res.data.result.allRow,
                })
            } else {
                message.error(res.data.message);
            }
        })
    }
    onShowSizeChange = (current, pageSize) => {
        this.state.pageNo = current;
        this.state.pageSize = pageSize;
        this.searchOrder();
    }
    jump = (e) => {
        this.props.history.pushState(null, "/page/mine/order-details");
    }
    handleCancel = (item) => {
        console.log(item);
        this.setState({
            visible: false
        })
    }
    handleBar = (key) => {
        this.setState({
            current: key
        }, () => {
            this.searchOrder()
        })
    }
    search = (value) => {
        console.log(value);
        if (value) {
            this.setState({
                pageNo: 1
            }, () => {
                this.searchOrder(1, value);
            })
        } else {
            message.error(this.formatMessage({
                id: 'orderlist.search.warn'
            }))
        }
    }
    render() {
        return <div className={css.order_list} ref={(order_list)=>this.order_list = order_list}>
            <div className={basecss.child_title}>
                <FormattedMessage  id="orderlist.all.order" defaultMessage="所有订单"/>
                <Search
                    placeholder={this.formatMessage({
                            id: 'orderlist.search.warn'
                        })}
                    style={{ width: 200 }}
                    onSearch={this.search.bind(this)}
                 />
            </div>
            <div className={css.card_container}>
                <TabBar className={css.tabtar} hiddenTest tabs={this.state.order_status} current={this.state.current} 
                            handleBar={this.handleBar.bind(this)}
                        />
                <Table
                    pagination={false}
                    rowKey="orderId"
                    columns={this.colums_show}
                    dataSource={this.state.orders}
                />
            </div>
            <div className={css.Pagination}> 
                <Pagination showSizeChanger 
                    onShowSizeChange={this.onShowSizeChange} 
                    onChange={this.onShowSizeChange}
                    defaultCurrent={1} 
                    current={this.state.pageNo}
                    total={this.state.total} />
            </div>
        </div>
    }
}
export default injectIntl(OrderList);