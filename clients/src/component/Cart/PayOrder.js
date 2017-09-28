/**
 * Created by WF on 2017/9/14.
 */

import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import {Radio,Button,Icon} from 'antd';
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

        }
        this.pay_mode = [{
            id: 0,
            key: "cart.pay.letter",
            defaultValue: "信用证"
        }, {
            id: 1,
            key: "cart.pay.check",
            defaultValue: "支票"
        }, {
            id: 2,
            key: "cart.pay.blank",
            defaultValue: "银行卡"
        }, ]
    }
    handlePayMode = (name, key) => {
        let order = this.state.order;
        order[name] = key;
        this.setState({
            order: order
        })
    }
    handleStep = (num) => {
        this.props.next ? this.props.next(num) : "";
    }

    handlePay = () => {
        let param = this.props.order;
        console.log(1111111,this.props.handleStep);
        this.props.handleStep ? this.props.handleStep(1,param) : "";
    }

    render() {
        {console.log('PayOrder.js:',this.props)}

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
                        {this.pay_mode.map(item=>{
                            return <p className={css.item}>
                                <Radio
                                    checked={this.state.pay_mode==item.id?true:false}
                                    onClick={this.handlePayMode.bind(this,item.id)}>
                                    <FormattedMessage id={item.key} defaultMessage={item.defaultValue}/>
                                </Radio>
                                {this.state.pay_mode==item.id && this.state.pay_mode==2?<div>
                                    <img src="../img/product.jpg"/>
                                    <img src="../img/product.jpg"/>
                                    <img src="../img/product.jpg"/>
                                </div>:""}
                            </p>
                        })}
                    </div>
                </div>
                <div className={css.grand_total}>
                    <p> <FormattedMessage id="cart.grand" defaultMessage="订单提交成功"/></p>
                    <p className={css.total_text}>{this.props.order.total}</p>
                </div>
            </div>

            <div className={css.pay_footer}>
                <Button size="large" type="primary" className={css.button_before}>
                    <FormattedMessage id="app.before" defaultMessage="支付"/>
                </Button>
                <Button size="large" type="primary" onClick={this.handlePay} className={css.button_pay}>
                    <FormattedMessage id="cart.pay" defaultMessage="支付"/>
                </Button>
            </div>
        </div>
    }

}

export default PayOrder;