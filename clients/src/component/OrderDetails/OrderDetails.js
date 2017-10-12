/**
 * Created by hp on 2017/9/11.
 */
import React from 'react';
import axios from 'axios';
import appcss from '../../App.scss';
import css from './OrderDetails.scss';
import basecss from '../Mine/Mine.scss';
import operator from '../OrderList/operator.js';
import moment from 'moment';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Link
} from 'react-router';
import {
    Steps,
    Table,
    Select,
    Input,
    Icon,
    Tooltip,
    Checkbox,
    Button,
    Radio,
    Breadcrumb,
    message,
    Modal,
    Cascader,
    Form
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
import LoginModal from '../Public/LoginModal/LoginModal.js';
import ProductItem from '../Public/ProductItem/ProductItem.js'
const {
    TextArea
} = Input;
class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        console.log("orderdetail constructor")
        this.state = {
            order: {},
            product: [],
            visible: false,
        };
        this.colums_show = [{
                title: <FormattedMessage id="orderdetails.order.no" defaultMessage="订单号"/>,
                className: css.table_col,
                width: "390px",
                render: (record) => <ProductItem className={css.product_info} hiddenMoq product={record}/>
            }, {
                title: <FormattedMessage id="cart.specifucation" defaultMessage="规格"/>,
                width: "140px",
                className: css.table_col,
                render: (record) => <div>
                {record.productSpecification?record.productSpecification.map((item,index)=>{
                    return <div>
                        {item.name}
                    </div>
                }):""}
                </div>
            }, {
                title: <FormattedMessage id="cart.price" defaultMessage="数量"/>,
                width: "100px",
                className: css.table_col,
                dataIndex: 'productPrice',
                key: 'productPrice',
                render: (text) => <span className={css.table_price}>${text}</span>
            }, {
                title: <FormattedMessage id="cart.num" defaultMessage="单价"/>,
                width: "100px",
                className: css.table_col,
                dataIndex: 'productNum',
                key: 'productNum',
            }, {
                title: <FormattedMessage id="quotation.brand" defaultMessage="供应商"/>,
                width: "180px",
                className: css.table_col,
                render: (record) => <div>
                    <p>{record.providerName}</p>
                </div>
            }, {
                title: <FormattedMessage id="cart.sum" defaultMessage="应付总金额"/>,
                width: "170px",
                className: css.table_col,
                render: (record) => <span className={css.table_price}>${record.productPrice*record.productNum}</span>
            },

        ]
    }

    componentWillMount() {
        axios.post('/order/get-order-detail.json', {
            orderId: this.props.params.id
        }).then(res => {
            if (res.data.code == 104) {
                this.setState({
                    visible: true
                })
            } else if (res.data.isSucc) {
                let product = res.data.result.orderProduct;
                product.map(item => {
                    item.brandNameEn = JSON.parse(item.productBrand).brandNameEn;
                    item.brandNameCn = JSON.parse(item.productBrand).brandNameCn;
                    item.coverUrl = item.productImgUrl;
                })
                this.setState({
                    order: res.data.result.order,
                    product: product
                })
            } else {
                message.error(res.data.message);
            }
        })
    }

    handleClick = (type) => {
        if (type == 1) {
            this.props.history.pushState(null, "page/mine/order-list");
        }
    }
    handlePayMode = (name, key) => {
        let order = this.state.order;
        order[name] = key;
        this.setState({
            order: order
        })
    }
    handleCancel = (item) => {
        console.log(item);
        this.setState({
            visible: false
        })
    }
    render() {
        return <div className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/mine/order-list">
                            <FormattedMessage id="mine.person" defaultMessage=""/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage  id="orderdetails.order.details" defaultMessage="订单详情"/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.personal_information}>
                <div className={css.item}>
                    <p className={css.item_cont}><span className={css.item_name}>
                        <FormattedMessage className={css.item_name} id="cart.delivery.address" defaultMessage="交货"/></span></p>
                    <p className={css.item_cont}>{this.state.order.receiverName}</p>
                    <p>{this.state.order.receiverPhone}</p>
                    <p>{locale=="en"?this.state.order.receiverAddress+","+this.state.order.receiverDistrict+","+this.state.order.receiverCity+","+this.state.order.receiverProvince+","+this.state.order.receiverCountry
                    :this.state.order.receiverCountry+","+this.state.order.receiverProvince+","+this.state.order.receiverCity+","+this.state.order.receiverDistrict+","+this.state.order.receiverAddress}</p>
                </div>
                <div className={css.item}>
                    <p className={css.item_cont}> <span className={css.item_name} >
                        <FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>：</span>
                        <span  className={css.status}>{operator.order_status.map(item=>{
                            if(this.state.order.payStatus == item.value){
                                return <FormattedMessage id={item.key} defaultMessage="订单状态"/>
                            }
                        })}</span>
                    </p>
                    <p className={css.item_cont}><span className={css.item_name}>
                        <FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/>：</span>
                        <span>{this.state.order.orderId}</span>
                    </p>
                    <p className={css.item_cont}>
                        <span className={css.item_name}><FormattedMessage  id="orderlist.order.time" defaultMessage="时间"/>：</span>
                        <span>{moment(this.state.order.createTime).format('YYYY-MM-DD hh:mm:ss')}</span>
                    </p>
                    <p className={css.item_cont}>
                        <span className={css.item_name}><FormattedMessage id="cart.delivery.mode" defaultMessage="提货方式"/>：</span>
                        <span>{this.state.order.dispatchingName}</span>
                    </p>
                </div>
                <div className={css.item}>
                    <p className={css.item_cont}>
                        <span className={css.item_name}><FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>：</span>
                        <FormattedMessage id={this.state.order.stageNum?"orderlist.pay.installment":"orderlist.pay.full"} defaultMessage=""/>
                    </p>
                    {this.state.order.stageNum?<div className={css.item_cont}>
                        <FormattedMessage id="cart.advance" values={{firstMoney:this.state.order.downPay*100,lastMoney:(100-this.state.order.downPay*100)}} defaultMessage="分期"/>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;   
                        <FormattedMessage id="orderlist.pay.payment" values={{stageNum: this.state.order.stageNum}} defaultMessage=""/>&nbsp;&nbsp;&nbsp;&nbsp;
                        <p className={css.install_money}>
                            <FormattedMessage id="cart.pay.day" values={{principal: (this.state.order.totalMoney*(1-this.state.order.downPay)/this.state.order.stageNum).toFixed(2) ,interest: (this.state.order.totalMoney*(1-this.state.order.downPay)/this.state.order.stageNum*this.state.order.interestRate).toFixed(2)}} defaultMessage=""/>
                        </p>
                    </div>:""}
                </div>
                <div className={css.item}>
                    <p className={css.item_cont}>
                        <span className={css.item_name} ><FormattedMessage id="cart.remark" defaultMessage="备注"/>:</span>
                        <span>{this.state.order.remark}</span></p>
                </div>
            </div>
            <div className={css.Product_list}>
                <Table
                    pagination={false}
                    rowKey="productId"
                    bordered
                    columns={this.colums_show}
                    dataSource={this.state.product} />
            </div>
            <div className={css.order_sum}>
                <div>
                    <FormattedMessage id="cart.order.total" defaultMessage="订单总金额"/>:
                    <p >$&nbsp;{this.state.order.totalMoney}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
                    <p >$&nbsp;{this.state.order.postage?this.state.order.postage:0}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.grand" defaultMessage="总金额"/>:
                    <p className={css.order_sum_orange}>$&nbsp;{this.state.order.totalMoney}</p>
                </div>
            </div>
            <div className={css.pay_footer}>
                <a className={css.preview}><FormattedMessage id="orderdetails.preview" defaultMessage="预览贸易合同"/></a>
                <Button size="large" onClick={this.handleClick.bind(this,1)} type="primary" className={css.button_order}>
                    <FormattedMessage  id="orderdetails.return" defaultMessage="返回"/>
                </Button>
                <Button size="large" type="primary" className={css.button_order}>
                    <FormattedMessage  id="cart.pay" defaultMessage="支付"/>
                </Button>
            </div>
            <LoginModal visible={this.state.visible} closeModal={this.handleCancel}/>  
        </div>
    }
}
export default OrderDetails;