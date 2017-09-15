/**
 * Created by WF on 2017/8/30.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import Steps from '../Public/Steps/Steps.js';
import CartList from './CartList.js';
import ConfirmOrder from './ConfirmOrder.js';
import PayOrder from './PayOrder.js';
import OrderSuccess from './OrderSuccess.js';
import {
    Link
} from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Breadcrumb,
    message,
} from 'antd';

class Cart extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            step:0,
            order: {}
        }

    }
    handleStep=(step,data)=>{
        if(this.state.step==0){
            this.state.products = data;
        }else if(this.state.step==1){
            this.state.order = data;
        }
        this.setState({
            step: this.state.step+step,
        },()=>{
            document.body.scrollTop = 0
        })
    }

    render() {
        return <div className={appcss.body} ref={(cart)=>this.cart=cart}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id={operator.steps[this.state.step].title}
                            defaultMessage={this.state.search}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.steps}>
                <Steps current={this.state.step} steps={operator.steps}/>
            </div>
            {this.state.step==0?<CartList handleStep={this.handleStep}/>
                :this.state.step==1?<ConfirmOrder
                    products={this.state.products}
                    handleStep={this.handleStep}
                />
                :this.state.step==2?<PayOrder order={this.state.order}/>
                :this.state.step==3?<OrderSuccess/>
                :""}
        </div>
    }
}

export default injectIntl(Cart);