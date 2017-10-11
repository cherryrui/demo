/**
 * Created by hp on 2017/9/11.
 */
import React from 'react';
import axios from 'axios';
import appcss from '../../App.scss';
import css from './OrderDetails.scss';
import basecss from '../Mine/Mine.scss';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
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
const {
    TextArea
} = Input;

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
class OrderDetails extends React.Component {
    jump = (e) => {
        this.props.history.pushState(null, "/page/mine/order-list");
    }
    constructor(props) {
        super(props);
        console.log("orderdetail constructor")
        this.state = {
            order: {},
            visible: false,
        };
        this.colums_show = [{
                title: <FormattedMessage id="orderdetails.order.no" defaultMessage="订单号"/>,
                className: css.table_col,
                width: "38%",
                render: (record) => <div className={css.table_product}>
                <img src={record.img}/>
                <div className={css.info}>
                    <p className={css.product_title}>{record.name}</p>
                    <p><FormattedMessage className={css.title_center} id="app.brand" defaultMessage="规格"/>：{record.brand}</p>
                    <p><FormattedMessage id="orderdetails.art.no" defaultMessage="规格"/>：{record.Art_No}</p>
                </div>
            </div>
            }, {
                title: <FormattedMessage id="cart.specifucation" defaultMessage="规格"/>,
                width: "15%",
                className: css.table_col,
                render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div>
                        {item.name}
                    </div>
                })}
                </div>
            }, {
                title: <FormattedMessage id="cart.price" defaultMessage="数量"/>,
                width: "10%",
                className: css.table_col,
                dataIndex: 'price',
                key: 'price',
                render: (text) => <span className={css.table_price}>${text}</span>
            }, {
                title: <FormattedMessage id="cart.num" defaultMessage="单价"/>,
                width: "10%",
                className: css.table_col,
                dataIndex: 'num',
                key: 'num',
            }, {
                title: <FormattedMessage id="quotation.brand" defaultMessage="供应商"/>,
                width: "15%",
                className: css.table_col,
                render: (record) => <div>
                    <p>{record.supplier}</p>
                </div>
            }, {
                title: <FormattedMessage id="cart.sum" defaultMessage="应付总金额"/>,
                width: "12%",
                className: css.table_col,
                render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
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
                this.setState({
                    order: res.data.result,
                })
            } else {
                message.error(res.data.message);
            }
        })
    }

    callback = () => {

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

        return <div className={css.body}>
            <div className={basecss.child_title}>
                <FormattedMessage  id="orderdetails.order.details" defaultMessage="订单详情"/>
            </div>
            <div className={css.personal_information}>
                <div className={css.item}>
                    <p className={css.item_cont}><span className={css.item_name}>
                        <FormattedMessage className={css.item_name} id="cart.delivery.address" defaultMessage="交货"/></span></p>
                    <p className={css.item_cont}>{this.state.order.name}</p>
                    <p>{this.state.order.tel}</p>
                    <p>{this.state.order.address}</p>
                </div>
                <div className={css.item}>
                    <p className={css.item_cont}> <span className={css.item_name} ><FormattedMessage id="orderlist.order.status" defaultMessage="状态"/>：</span><span  className={css.status}>{this.state.order.state}</span></p>
                    <p className={css.item_cont}><span className={css.item_name}><FormattedMessage  id="orderdetails.order.no" defaultMessage="订单号"/>：</span><span>{this.state.order.order_no}</span></p>
                    <p className={css.item_cont}><span className={css.item_name}><FormattedMessage  id="orderlist.order.time" defaultMessage="时间"/>：</span><span>{this.state.order.time}</span></p>
                    <p className={css.item_cont}><span className={css.item_name}><FormattedMessage id="cart.delivery.mode" defaultMessage="提货方式"/>：</span><span>{this.state.order.delivery_mode}</span></p>

                </div>
                <div className={css.item}>

                    <p className={css.item_cont}><span className={css.item_name}><FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>：</span><span>{this.state.order.pay_mode}</span></p>
                    <div className={css.item_cont}>
                        <span> {this.state.order.advance}</span>
                        <span className={css.item_line}>|</span>
                        <span className={css.pay_day}>{this.state.order.pay_day}</span>
                        <div className={css.item_pay}>
                            <FormattedMessage id="orderdetails.principal" defaultMessage="本金"/> ：
                            <p className={css.pay_nom}>${this.state.order.interest}</p>
                        </div>
                        <div className={css.item_pay}>
                            <FormattedMessage id="orderdetails.interest" defaultMessage="利息" /> ：
                            <p className={css.pay_nom}> ${this.state.order.principal}</p>
                        </div>

                    </div>

                </div>
                <div className={css.item}>
                    <p className={css.item_cont}> <span className={css.item_name} ><FormattedMessage id="cart.remark" defaultMessage="备注"/>:</span><span>{this.state.order.remark}</span></p>


                </div>
            </div>
            <div className={css.Product_list}>
                <Table
                    pagination={false}
                    rowKey="id"
                    bordered
                    columns={this.colums_show}
                    dataSource={this.state.order.products} />
            </div>
            <div className={css.order_sum}>
                <div>
                    <FormattedMessage id="cart.order.total" defaultMessage="订单总金额"/>:
                    <p >$&nbsp;{this.state.order.sum}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.discount" defaultMessage="折扣"/>:
                    <p >$&nbsp;{this.state.order.total}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
                    <p >$&nbsp;{this.state.order.postage}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.grand" defaultMessage="总金额"/>:
                    <p className={css.order_sum_orange}>$&nbsp;{this.state.order.total}</p>
                </div>
            </div>
            <div className={css.pay_footer}>
                <a className={css.preview}><FormattedMessage id="orderdetails.preview" defaultMessage="预览贸易合同"/></a>
                <Button size="large" onClick={this.jump} type="primary" className={css.button_order}>
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