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
import LoginModal from '../Public/LoginModal/LoginModal.js'
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
            step: 0,
            order: {},
            visible: false,
            reload: false,
        }

    }
    componentWillMount() {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, "login");
        }
        if (this.props.params.step) {
            if (this.props.params.step == 1 && sessionStorage.products) {
                let products = [];
                products.push(JSON.parse(sessionStorage.products));
                this.setState({
                    step: 1,
                    products: products
                }, () => {
                    sessionStorage.removeItem("products");
                })
            } else if (this.props.params.step == 2 && this.props.params.orderId) {
                axios.post('/order/get-order-money.json', {
                    orderId: this.props.params.orderId
                }).then(res => {
                    if (res.data.code == 104) {
                        this.setState({
                            visible: true,
                        })
                    } else if (res.data.isSucc) {
                        this.setState({
                            order: {
                                orderId: this.props.params.orderId,
                                orderTotalMoney: res.data.result.money,
                            },
                            step: 2,
                        })
                    } else {
                        message.error(res.data.message);
                    }
                })
            } else {
                this.props.history.pushState(null, "/");
            }
        }
        document.body.scrollTop = 0
    }
    handleStep = (step, data) => {
        if (this.state.step == 0) {
            this.state.products = data;
        } else if (this.state.step == 1) {
            this.state.order = data;
        }
        this.setState({
            step: this.state.step + step,
        }, () => {
            document.body.scrollTop = 0
        })
    }
    goLink = (url) => {
        this.props.history.pushState(null, url);
    }
    handleVisible = (status) => {
        this.setState({
            visible: true,
            reload: status == true ? true : false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return <div className={appcss.body} ref={(cart)=>this.cart=cart}>
            <div className={`${appcss.navigate} ${css.cart_title}`}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/">
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
            {this.state.step==0?<CartList
                goLink={this.goLink}
                handleVisible={this.handleVisible}
                handleStep={this.handleStep}/>
                :this.state.step==1?<ConfirmOrder
                    handleVisible={this.handleVisible}
                    products={this.state.products}
                    handleStep={this.handleStep}
                />
                :this.state.step==2?<PayOrder 
                    handleStep={this.handleStep} 
                    handleVisible={this.handleVisible}
                    order={this.state.order}/>
                :this.state.step==3?<OrderSuccess handleStep={this.handleStep} 
                    goLink={this.goLink} order={this.state.order}/>
                :""}
            <LoginModal visible={this.state.visible} reload={this.state.reload} closeModal={this.handleCancel}/>
        </div>
    }
}

export default injectIntl(Cart);