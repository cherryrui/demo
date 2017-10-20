/**
 * Created by WF on 2017/9/14.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import {
    Radio,
    Button,
    Icon,
    message
} from 'antd';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

class PayOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pay_mode: 0,
            pay_way: [],
        }
        this.formatMessage = this.props.intl.formatMessage;
    }
    componentWillMount() {
        axios.get('/order/get-pay-way.json').then(res => {
            if (res.data.isSucc) {
                this.setState({
                    pay_way: res.data.result
                })
            }
        })
    }
    handlePayMode = (key) => {
        /*console.log(key)*/
        this.setState({
            pay_mode: key
        })
    }
    handleStep = (num) => {
        this.props.handleStep ? this.props.handleStep(num) : "";
    }

    handlePay = () => {
        if (this.state.pay_mode == 0) {
            message.error(this.formatMessage({
                id: "cart.pay.way"
            }))
        } else {
            let param = {
                orderId: this.props.order.orderId,
                payWayId: this.state.pay_mode
            };
            axios.post('/order/pay-order.json', param).then(res => {
                if (res.data.isSucc) {
                    this.props.handleStep ? this.props.handleStep(1) : "";
                } else if (res.data.code == 104) {
                    this.props.handleVisible ? this.props.handleVisible() : "";
                } else {
                    message.error(res.data.message)
                }
            })
        }


    }
    handleBack = () => {
        let param = this.props.order;
        this.props.handleStep ? this.props.handleStep(0, param) : "";
    }

    render() {
        return <div className={css.pay_mode}>
            <p className={css.pay_title}>
                <Icon type="smile-o" />&nbsp;&nbsp;
                <FormattedMessage id="cart.submit.success" defaultMessage="订单提交成功"/>
            </p>
            <p className={css.pay_info}>
                <FormattedMessage id="cart.submit.info" defaultMessage="订单提交成功"/>
            </p>
            <div className={css.payments}>
                <div className={css.payments_left}>
                    <p>
                        <FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>：
                    </p>
                    <div>
                        {this.state.pay_way.map(item=>{
                            return <p className={css.item}>
                                <Radio
                                    checked={this.state.pay_mode==item.payWayId?true:false}
                                    onClick={this.handlePayMode.bind(this,item.payWayId)}>
                                    {item.payWayName}
                                </Radio>
                            </p>
                        })}
                    </div>
                </div>
                <div className={css.grand_total}>
                    <p> <FormattedMessage id="cart.grand" defaultMessage="订单提交成功"/></p>
                    <p className={css.total_text}>$ {this.props.order.orderTotalMoney}</p>
                </div>
            </div>

            <div className={css.pay_footer}>
                <Button size="large" type="primary" onClick={this.handlePay} className={css.button_pay}>
                    <FormattedMessage id="cart.pay" defaultMessage="支付"/>
                </Button>
            </div>
        </div>
    }

}
PayOrder = injectIntl(PayOrder)
export default PayOrder;