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
            stageList: [],
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
                        {item.specName}：{item.specVal[0].specValue}
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
                    if (item.productBrand) {
                        item.brandNameEn = JSON.parse(item.productBrand).brandNameEn;
                        item.brandNameCn = JSON.parse(item.productBrand).brandNameCn;
                    }
                    item.coverUrl = item.productImgUrl;
                    item.productSpecification = JSON.parse(item.productSpecification)
                })
                let stageList = res.data.result.OrderPaymentStageList;
                let flag = true,
                    total_interst = 0,
                    total = 0;
                stageList.map(item => {
                    if (item.payStatus == 1 && flag) {
                        item.payStatus = 0; //当前应付款
                        flag = false;
                    }
                    total_interst += item.interest;
                })
                let order = res.data.result.order;
                total = order.totalMoney + total_interst;
                order.total_interst = total_interst.toFixed(2);
                order.grand_total = (total + (this.state.order.postage ? parseFloat(this.state.order.postage) : 0)).toFixed(2);

                this.setState({
                    stageList: stageList,
                    order: order,
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
        } else {
            this.props.history.pushState(null, "page/cart/2/" + this.state.order.orderId)
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
        this.setState({
            visible: false
        })
    }
    render() {
        console.log(this.state.order);
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
                        <span>{moment(this.state.order.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
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
                        <FormattedMessage id="orderlist.pay.payment" values={{stageNum: this.state.order.stageNum-1}} defaultMessage=""/>&nbsp;&nbsp;&nbsp;&nbsp;
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
                    scroll={{y: 600}}
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
                    <FormattedMessage id="orderdetails.interest" defaultMessage="邮费"/>:
                    <p >$&nbsp;{this.state.order.total_interst}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.grand" defaultMessage="总金额"/>:
                    <p className={css.order_sum_orange}>$&nbsp;{this.state.order.grand_total}</p>
                </div>
            </div>
            {this.state.stageList.length>0?this.state.stageList.map(item=>{
                return <div className={item.payStatus==0?css.detail_stage_list_active:css.detail_stage_list}>
                    <p className={item.payStatus==0?css.stage_item_title_active:css.stage_item_title}>{item.stageSort==1?<FormattedMessage id="cart.advance.payment" defaultMessage="付款"/>
                        :<FormattedMessage id="order.detail.stage" values={{cur: item.stageSort-1,sum:this.state.stageList.length-1}} defaultMessage=" 期数"/>}
                    </p>
                    <p className={css.stage_item_body}>
                        <FormattedMessage id="orderdetails.principal" defaultMessage="本金"/>：
                        <span className={item.payStatus>0?css.stage_item_body_font:css.stage_item_body_font_active}>${item.amount}</span>
                        <FormattedMessage id="orderdetails.interest" defaultMessage="利息"/>
                        <span className={item.payStatus>0?css.stage_item_body_font:css.stage_item_body_font_active}>${item.interest}</span>
                        {item.stageSort>1?<FormattedMessage id="orderdetails.pay.date" defaultMessage="还款日期"/>:""}
                        {item.stageSort>1?<span className={item.payStatus>0?css.stage_item_body_font:css.stage_item_body_font_active}>{moment(item.predictPayTime).format("YYYY-MM-DD")}</span>:""}
                    </p>
                    {item.payStatus==1?<FormattedMessage id="orderdetails.unpay" defaultMessage="未还"/>
                    :item.payStatus==0?<p className={css.stage_item_right}>
                        <FormattedMessage id="orderdetails.total" defaultMessage="利息"/>：
                        <span className={css.stage_item_total}>${item.total}</span></p>
                    :<FormattedMessage id="orderdetails.payed" defaultMessage=""/>}
                </div>
                }):""}
            <div className={css.pay_footer}>
                <a className={css.preview}><FormattedMessage id="orderdetails.preview" defaultMessage="预览贸易合同"/></a>
                <Button size="large" onClick={this.handleClick.bind(this,1)} type="primary" className={css.button_order}>
                    <FormattedMessage  id="orderdetails.return" defaultMessage="返回"/>
                </Button>
                <Button size="large" onClick={this.handleClick.bind(this,2)} type="primary" className={css.button_order}>
                    <FormattedMessage  id="cart.pay" defaultMessage="支付"/>
                </Button>
            </div>
            <LoginModal reload visible={this.state.visible} closeModal={this.handleCancel}/>  
        </div>
    }
}
export default OrderDetails;