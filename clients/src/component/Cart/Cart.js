/**
 * Created by WF on 2017/8/30.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import {
    Link
} from 'react-router';
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
    Breadcrumb
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const {
    TextArea
} = Input;



class Cart extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            selectedRowKeys: [],
            select_all: false,
            advance_mode: [], //分期方式
            advance_pay: [], //还款方式
            products: [], //提交订单的商品
            step: 0, //当前为第几步，0：购物车，1：确认订单，2：付款，1：付款成功
            current_key: "cart.cart",
            sum: 0, //订单总金额
            sum_num: 0, //共选择多少项商品

        }
        this.columns = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            className: css.table_col,
            width: "38%",
            render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p >{record.name}</p>
                        <p>
                            <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>
                            {record.branch}
                        </p>
                        <p><FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/></p>
                        <p>{record.name}</p>
                    </div>
                </div>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            width: "16%",
            className: css.table_col,
            render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div>
                        <Select defaultValue={item.value} style={{ width: 120,marginBottom: "10px" }}
                            onChange={this.handleChange.bind(this,record,index)}>
                            {item.attr.map(att=>{
                                return <Option value={att.id}>{att.name}</Option>
                            })}
                        </Select>
                    </div>
                })}
            </div>
        }, {
            title: <FormattedMessage id="cart.price" defaultMessage="我的购物车"/>,
            width: "8%",
            className: css.table_col,
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span className={css.table_price}>${text}</span>
        }, {
            title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
            width: "18%",
            className: css.table_col,
            dataIndex: 'num',
            key: 'num',
            render: (text, record) => <div className={css.table_num}>
                <Input type="number" addonBefore={<Icon onClick={this.handleNum.bind(this,record,-1)} type="minus" />} 
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,1)} type="plus" />} 
                onChange={this.handleNum.bind(this,record)}
                value={text} />
            </div>
        }, {
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            width: "12%",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
        }, {
            title: <FormattedMessage id="cart.operation" defaultMessage="我的购物车"/>,
            width: "8%",
            className: css.table_col,
            render: (record) => <div className={css.table_operator}>
                <Tooltip title={<FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>}>
                    <Icon type="delete" />
                </Tooltip>      
            </div>
        }, ]

    }
    componentWillMount() {
        let data = [{
            id: 1,
            name: "product nameni你打大萨达阿萨德阿萨德阿萨德撒大声地撒大声地打手大大打手大萨达阿达撒大声地打手d",
            img: '../img/product.jpg',
            price: 100,
            num: 20,
            attr: [{
                id: 1,
                value: 1,
                name: "红色",
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
        }, {
            id: 2,
            name: "product name",
            img: '../img/product.jpg',
            price: 100,
            num: 20,
            attr: [{
                id: 1,
                value: 1,
                name: "红色",
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
        }, {
            id: 3,
            name: "product name",
            img: '../img/product.jpg',
            price: 100,
            num: 20,
            attr: [{
                id: 1,
                value: 1,
                name: "红色",
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
                name: "红色",
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
        }, {
            id: 4,
            name: "product name",
            img: '../img/product.jpg',
            price: 100,
            num: 20,
            attr: [{
                id: 1,
                value: 1,
                name: "红色",
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
        let advance_mode = [{
            id: 1,
            name: "分期20%，按揭30%"
        }, {
            id: 2,
            name: "分期30%，按揭30%"
        }, {
            id: 3,
            name: "分期40%，按揭30%"
        }, ]
        let advance_pay = [{
            id: 1,
            num: 3,
            regular: "手续费02132"
        }, {
            id: 2,
            num: 6,
            regular: "手续费02132"
        }, {
            id: 3,
            num: 9,
            regular: "手续费02132"
        }, {
            id: 4,
            num: 12,
            regular: "手续费02132"
        }, ]
        this.setState({
            data: data,
            advance_mode: advance_mode,
            advance_pay: advance_pay
        })
    }
    componentDidMount() {}
    onSelectChange = (selectedRowKeys) => {
        let select_all = false;
        if (selectedRowKeys.length == this.state.data.length) {
            select_all = true;
        }
        console.log(80, select_all);
        this.setState({
            selectedRowKeys,
            select_all: select_all,
        });
    }
    handleChange = (record, index, value) => {
        let data = this.state.data;
        data.map(item => {
            if (item.id == record.id) {
                item.attr[index].value = value;
            }
        })
        this.setState({
            data: data
        })
    }
    handleNum = (record, num) => {
        let data = this.state.data;
        data.map(item => {
            if (item.id == record.id) {
                if (isNaN(num)) {
                    item.num = isNaN(num.target.value) ? 0 : Number(num.target.value);
                } else {
                    item.num = item.num + num;
                }
            }
        })
        this.setState({
            data: data
        })
    }
    handleSelectAll = (e) => {
            let key = [];
            if (e.target.checked) {
                this.state.data.map(item => {
                    key.push(item.id);
                })
            }
            this.setState({
                selectedRowKeys: key,
                select_all: !this.state.select_all
            });
        }
        /**
         * 结算所选商品
         * @return {[type]} [description]
         */
    handleCart = () => {
        console.log("handleCart");
        let products = []
        this.state.data.map(item => {
            this.state.selectedRowKeys.map(key => {
                if (item.id === key) {
                    products.push(item);
                }
            })
        })
        this.setState({
            products: products,
            step: 1,
        })

    }

    render() {
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div className={appcss.body}>
            <div className={css.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id={this.state.current_key} defaultMessage={this.state.search}
    
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.steps}>
                <Steps current={this.state.step}>
                    <Step title={formatMessage({id: 'cart.cart'})} description="" />
                    <Step title={formatMessage({id: 'cart.confirm.order'})} description="" />
                    <Step title={formatMessage({id: 'cart.pay'})} description="" />
                    <Step title={formatMessage({id: 'cart.payment'})} description="" />
                </Steps>
            </div>
            {this.state.step==0?<div>
                <Table 
                    rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: this.onSelectChange,
                    }}
                    loading={this.state.loading}
                    pagination={false}
                    rowKey="id"
                    bordered  
                    columns={this.columns} 
                    scroll={{y: 600 }}
                    dataSource={this.state.data} />
                <div className={css.footer}>
                    <div className={css.left}>
                        <Checkbox onChange={this.handleSelectAll} checked={this.state.select_all}>
                            <FormattedMessage id="cart.select.all" defaultMessage="我的购物车"/>
                        </Checkbox>
                        <Tooltip title={formatMessage({id: 'cart.delete'})}>
                            <Icon type="delete" />
                        </Tooltip>  
                    </div>
                    <div className={css.right}>
                        <p className={css.total}>
                            <FormattedMessage id="cart.cart" defaultMessage="我的购物车"/>
                        </p>
                        <p className={css.quotation}>
                            <FormattedMessage id="cart.cart" defaultMessage="我的购物车"/>
                        </p>
                        <p className={css.calculate} onClick={this.handleCart}>
                            <FormattedMessage id="cart.cart" defaultMessage="我的购物车"/>
                        </p>
                    </div>
                </div>
                </div>:this.state.step==1?<OrderDetail 
                    advance_modes={this.state.advance_mode}
                    advance_pay={this.state.advance_pay}
                    products={this.state.products}
                />
                :this.state.step==2?<Payment/>:<PaySuccess/>}
        </div>
    }
}
class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pay_mode: 0, //支付方式，0：全款，1：分期
            advance_mode: props.advance_modes[0].id, //首付额度
            advance_pay: props.advance_pay[0].id,
            delivery_mode: 0,
            address: {},

        };
        this.colums_show = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            className: css.table_col,
            width: "38%",
            render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p >{record.name}</p>
                        <p>
                            <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>
                            {record.branch}
                        </p>
                        <p><FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>{record.moq}</p>
                        <p>{record.name}</p>
                    </div>
                </div>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            width: "16%",
            className: css.table_col,
            render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div>
                        {item.name}
                    </div>
                })}
            </div>
        }, {
            title: <FormattedMessage id="cart.price" defaultMessage="我的购物车"/>,
            width: "8%",
            className: css.table_col,
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span className={css.table_price}>${text}</span>
        }, {
            title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
            width: "18%",
            className: css.table_col,
            dataIndex: 'num',
            key: 'num',
        }, {
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            width: "12%",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>${record.price*record.num}</span>
        }, ]
    }
    handlePayMode = (name, mode) => {
        let param = {};
        param[name] = mode
        this.setState(param);
    }
    render() {

        return <div>
            <div className={css.confirm_title}>
                <FormattedMessage id="cart.delivery.info" defaultMessage="收货信息"/>
                <Link>
                    <FormattedMessage id="cart.delivery.select" defaultMessage="选择地址"/>
                </Link>
            </div>
            <div className={css.confirm_address}>
                <p className={css.item}><FormattedMessage id="cart.delivery.name" defaultMessage="收货人"/>{this.state.address.name}</p>
                <p className={css.item}><FormattedMessage id="cart.delivery.tel" defaultMessage="电话"/>{this.state.address.name}</p>
                <p className={css.item}><FormattedMessage id="cart.delivery.address" defaultMessage="收货地址"/>{this.state.address.name}</p>
                <p className={css.item_default}><FormattedMessage id="cart.delivery.default" defaultMessage="默认地址"/></p>
            </div>
            <div className={css.confirm_title}><FormattedMessage id="cart.product.list" defaultMessage="产品列表"/></div>  
            <Table 
                pagination={false}
                rowKey="id"
                bordered  
                columns={this.colums_show} 
                scroll={{y: 600 }}
                dataSource={this.props.products} />
           
            <div className={css.confirm_title}><FormattedMessage id="cart.pay.mode" defaultMessage="支付信息"/></div>
            <div className={css.confirm_pay}>
                <div className={css.confirm_mode}>
                    <p className={this.state.pay_mode==0?css.active:css.item} onClick={this.handlePayMode.bind(this,"pay_mode",0)}>
                        <FormattedMessage id="cart.pay.full" defaultMessage="全额支付"/>
                    </p>
                    <p className={this.state.pay_mode==1?css.active:css.item} onClick={this.handlePayMode.bind(this,"pay_mode",1)}>
                        <FormattedMessage id="cart.pay.install" defaultMessage="分期付款"/>
                    </p>
                </div>
                {this.state.pay_mode?<div>
                    {this.props.advance_modes.map(item => {
                            return <div>
                                <p className={css.radio}>
                                    <Radio checked={this.state.advance_mode==item.id?true:false} onClick={this.handlePayMode.bind(this,"advance_mode",item.id)}>{item.name}</Radio>
                                </p>
                                {this.state.advance_mode==item.id?<div className={css.advance_pay}>
                                    {this.props.advance_pay.map(pay=>{
                                        return <p className={this.state.advance_pay==pay.id?css.active:css.item} onClick={this.handlePayMode.bind(this,"advance_pay",item.id)}>
                                        <FormattedMessage id="cart.pay.day" defaultMessage="3期"
                                        values={{num: pay.num}}
                                        />
                                        {pay.name}</p>
                                    })}
                                </div>:""}

                            </div>
                        })}
                    
                </div>:""}
            </div>
            <div className={css.confirm_title}><FormattedMessage id="cart.delivery.mode" defaultMessage="提货方式"/></div>
            
            <div className={css.confirm_mode}>
                <p className={this.state.delivery_mode==0?css.active:css.item}>
                    <FormattedMessage id="cart.delivery.take" defaultMessage="自提"/>
                </p>
                <p className={this.state.delivery_mode==1?css.active:css.item}>
                    <FormattedMessage id="cart.delivery.home" defaultMessage="送货上门"/>
                </p>
            </div>
            
             <div className={css.confirm_title}><FormattedMessage id="cart.remark" defaultMessage="备注"/></div>
             <TextArea rows={4} />
             <div className={css.order_sum}>
                 <p><FormattedMessage id="cart.order.total" defaultMessage="订单总金额"/></p>
                 <p><FormattedMessage id="cart.discount" defaultMessage="利润"/></p>
                 <p><FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/></p>
                 <p><FormattedMessage id="cart.grand" defaultMessage="总金额"/></p>
             </div>
             <div className={css.order_footer}>
                 <p>
                    <FormattedMessage id="cart.advance.payment" defaultMessage="首期金额"/>da
                </p>
                 <Button>
                      <FormattedMessage id="cart.submit" defaultMessage="首期金额"/>
                 </Button>
             </div>

        </div>
    }
}

class Payment extends React.Component {

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
    handlePayMode = (key) => {
        this.setState({
            pay_mode: key
        })
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
            <div className={css.pay_footer}>
                <Button size="large" type="primary" className={appcss.button_theme}>
                    <FormattedMessage id="cart.pay" defaultMessage="支付"/>
                </Button>
            </div>
        </div>
    }

}

class PaySuccess extends React.Component {

    render() {

        return <div className={css.pay_mode}>
             <p className={css.pay_title}>
                <Icon type="smile-o" />&nbsp;&nbsp;
                <FormattedMessage id="cart.payment" defaultMessage="订单提交成功"/>
            </p>
            <p className={css.pay_info}>
                <FormattedMessage id="cart.pay.success" defaultMessage="订单提交成功"/>
            </p>
            <div className={css.pay_footer}>
                <Button size="large" type="primary" className={appcss.button_green}>
                    <FormattedMessage id="cart.pay" defaultMessage="支付"/>
                </Button>
                <Button size="large" type="primary" className={appcss.button_theme}>
                    <FormattedMessage id="cart.see.order" defaultMessage="支付"/>
                </Button>
            </div>
        </div>
    }
}
export default injectIntl(Cart);