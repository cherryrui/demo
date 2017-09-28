/**
 * Created by WF on 2017/9/14.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import {
    Icon,
    Button
} from 'antd';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

class OrderSuccess extends React.Component {

    render() {

        return <div className={css.pay_mode}>
            <p className={css.pay_title}>
                <Icon type="smile-o" />&nbsp;&nbsp;
                <FormattedMessage id="cart.payment" defaultMessage="订单提交成功"/>
            </p>
        <p className={css.pay_last}>
                <FormattedMessage id="cart.pay.success" defaultMessage="订单提交成功"/>
            </p>
            <div className={css.pay_success}>
                <Button size="large" type="primary" className={css.button_before}>
                    <FormattedMessage id="cart.return.cart" defaultMessage="支付"/>
                </Button>
                <Button size="large" type="primary" className={css.button_pay}>
                    <FormattedMessage id="app.view.order" defaultMessage="支付"/>
                </Button>
            </div>
        </div>
    }
}
export default OrderSuccess;