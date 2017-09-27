/**
 * Created by WF on 2017/9/14.
 */

import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';

import {
    Link
} from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
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
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {
    TextArea
} = Input;

class ConfirmOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {
                pay_mode: 0, //支付方式，1：全款，2：分期
                advance_mode: operator.advance_mode[0].key, //首付额度
                advance_pay: operator.instalment_mode[0].key,
                delivery_mode: 0,
            },
            address_list: [],
            select: 0, //默认选择的地址列表
            address: {}, //当前选中地址
            visible: false, //是否显示地址信息模态框
            options: [], //多级联动地址信息
            title: "cart.address.title", //地址信息模态框title
            loading: false, //正在提交订单
        };
        this.formatMessage = this.props.intl.formatMessage;
        this.colums_show = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            className: css.table_col,
            width: "38%",
            render: (record) => <div className={css.table_product}>
                <img src={record.coverUrl}/>
                <div className={css.info}>
                    <p className={css.name}>{record.productName}</p>
                    <p>
                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>
                        ：{record.brandNameCn}
                    </p>
                    <p>
                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                        ：{record.moq}
                    </p>
                    <p>
                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
                        ：{record.productNo}</p>
                </div>
            </div>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            width: "16%",
            className: css.table_col,
            render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return <div>
                        <p>{item.specName}:{item.specVal[0].spec_value}</p>
                    </div>
                }):""}
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
            dataIndex: 'productNum',
            key: 'productNum',
            render: (num) => <span className={css.table_price}>{num}</span>
        }, {
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            width: "12%",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>${record.price*record.productNum}</span>
        }, ]
    }
    componentWillMount() {
        console.log(this.props.products);
        axios.get('/user/get-address-list.json').then(res => {
            this.setState({
                address_list: res.data.address,
                select: res.data.address.length > 0 ? res.data.address[0].id : 0,
            })
        })
        let sum = 0,
            order = this.state.order;
        this.props.products.map(item => {
            sum += item.price * item.productNum;
        })
        order.sum = sum;
        order.postage = 100;
        order.total = order.sum + order.postage;
        axios.get('/user/get-city-by-parent.json').then(res => {
            this.setState({
                options: res.data.address,
                order: order
            })
        })
    }

    /**
     * 保存订单相关信息
     * @param  {[type]} name [description]
     * @param  {[type]} mode [description]
     * @return {[type]}      [description]
     */
    handlePayMode = (name, mode) => {
        let order = this.state.order;
        if (name === 'note') {
            order[name] = mode.target.value
        } else {
            order[name] = mode
        }
        this.setState(order: order);
    }

    /**
     * 提交订单
     * @return {[type]} [description]
     */
    handlePay = () => {
        this.setState({
            loading: true,
        })
        let param = this.state.order;
        axios.post('/cart/commit-order.json', param).then(res => {
            this.setState({
                loading: false,
            })
            let order = {
                id: 1,
                pay_money: 100
            }
            this.props.handleStep ? this.props.handleStep(1, order) : '';
        })

    }
    handleStep = (num) => {
        this.props.next ? this.props.next(num) : '';
    }
    handleEditAddress = (address) => {
        let title = '',
            addr;
        if (address.id) {
            addr = address;
            title = "cart.address.title";
        } else {
            title = "cart.delivery.new";
            addr = {};
        }
        this.setState({
            address: addr,
            title: title,
            visible: true,
        }, () => {
            this.props.form.resetFields();
        })
    }
    handleAddress = (item) => {
        this.setState({
            select: item.id
        })
    }
    handleOk = () => {

    }
    handleCancel = () => {
        this.setState({
            visible: false,
            address: {},
        })
    }
    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
        this.setState({
            inputValue: selectedOptions.map(o => o.label).join(', '),
        });
    }

    loadData = (selectedOptions) => {
        console.log(selectedOptions);
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        axios.get(`/user/get-city-by-parent.json?cid=${targetOption.id}`).then(res => {
            targetOption.loading = false;
            targetOption.children = res.data.address;
            this.setState({
                options: [...this.state.options],
            });
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        console.log(this.props.products);
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6,
            },
        };
        return <div>
            <div className={css.confirm_title}>
                <FormattedMessage id="cart.delivery.info" defaultMessage="收货信息"/>
                <p onClick={this.handleEditAddress}>
                    <Icon type="plus-circle-o" />
                &nbsp;
                    <FormattedMessage id="cart.delivery.new" defaultMessage="新增地址"/>
                </p>
            </div>
            <div className={css.confirm_address}>
                {this.state.address_list.map(item=>{
                    return <div className={css.radio_content}>
                        <p onClick={this.handleAddress.bind(this,item)}>
                            <Radio value={item.id} checked={item.id==this.state.select?true:false}></Radio>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.name" defaultMessage="收货人"/>
                            &nbsp;{item.name}&nbsp;&nbsp;
                            </span>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.tel" defaultMessage="电话"/>
                            &nbsp;{item.tel}&nbsp;&nbsp;
                            </span>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.address" defaultMessage="收货地址"/>
                            &nbsp;:{item.city}&nbsp;&nbsp;{item.address}
                            </span>
                            {item.default==1?<span className={css.item_default}>
                                <FormattedMessage id="cart.delivery.default" defaultMessage="默认地址"/>
                            </span>:""}
                        </p>
                        {item.id==this.state.select?<Icon type="edit" onClick={this.handleEditAddress.bind(this,item)} />:""}
                    </div>
                })}
            </div>
            <div className={css.confirm_title}><FormattedMessage id="cart.product.list" defaultMessage="产品列表"/></div>
            <Table
                pagination={false}
                rowKey="id"
                bordered
                columns={this.colums_show}
                scroll={{y: 600 }}
                dataSource={this.props.products} />
            <div className={css.confirm_title}>
                <FormattedMessage id="cart.pay.mode" defaultMessage="支付信息"/>
            </div>
            <div className={css.confirm_pay}>
                <div className={css.confirm_mode}>
                {operator.pay_mode.map(item=>{
                    return <p className={this.state.pay_mode==item.key?css.active:css.item}
                        onClick={this.handlePayMode.bind(this,"pay_mode",item.key)}>
                        <FormattedMessage id={item.value_id} />
                    </p>
                })}
                </div>
                {this.state.order.pay_mode==2?<div>
                    {operator.advance_mode.map(item => {
                        return <div>
                            <p className={css.radio}>
                                <Radio checked={this.state.order.advance_mode==item.key?true:false}
                                    onClick={this.handlePayMode.bind(this,"advance_mode",item.key)}>
                                    <FormattedMessage id={item.value_id} defaultMessage="全额支付"/>
                                </Radio>
                            </p>
                                {this.state.order.advance_mode==item.key?<div className={css.advance_pay}>
                                    {operator.instalment_mode.map(pay=>{
                                        return <p className={this.state.order.advance_pay==pay.key?css.active:css.item}
                                            onClick={this.handlePayMode.bind(this,"advance_pay",pay.key)}>
                                            <FormattedMessage id="cart.pay.day" defaultMessage="3期"
                                                values={{num: pay.num}}
                                            />
                                            {pay.name}
                                        </p>
                                    })}
                                </div>:""}

                        </div>
                    })}

                </div>:""}
            </div>
            <div className={css.confirm_title}>
                <FormattedMessage id="cart.delivery.mode" defaultMessage="提货方式"/>
            </div>

            <div className={css.confirm_mode}>
                {operator.delivery_mode.map(item=>{
                    return <p className={this.state.order.delivery_mode==item.key?css.active:css.item}
                        onClick={this.handlePayMode.bind(this,"delivery_mode",item.key)}
                    >
                        <FormattedMessage id={item.value_id} defaultMessage="自提"/>
                    </p>
                })}
            </div>

            <div className={css.confirm_title}>
                <FormattedMessage id="cart.remark" defaultMessage="备注"/>
            </div>
            <TextArea rows={4} onChange={this.handlePayMode.bind(this,"note")}/>
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
            <div className={css.order_footer}>
                <p>
                    <FormattedMessage id="cart.advance.payment" defaultMessage="首父金额"/>
                </p>
                <div className={css.footer_right}>
                    <p>
                        <FormattedMessage id="cart.advance.payment" defaultMessage="首期金额"/>:
                        <span className={css.footer_orange}>$&nbsp;{this.state.order.instal}</span>
                    </p>
                    <Button type='primary' size="large" className={css.button_green} onClick={this.handleStep.bind(this,-1)}>
                        <FormattedMessage id="app.before" defaultMessage="首期金额"/>
                    </Button>
                    <Button type='primary' loading={this.state.loading} size="large" className={css.button_theme} onClick={this.handlePay}>
                        <FormattedMessage id="cart.submit" defaultMessage="首期金额"/>
                    </Button>
                </div>
            </div>
            <Modal
                title={this.formatMessage({id: this.state.title})}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.name'})}
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.address.name,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.name'}), whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'post.company_name'})}
                    >
                        {getFieldDecorator('company_name', {
                            initialValue: this.state.address.company_name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.city'})}
                    >
                        {getFieldDecorator('city', {
                            initialValue: this.state.address.city?this.state.address.city.split(","):[],

                            rules: [{ type: 'array', required: true, message: this.formatMessage({id: 'cart.delivery.city'}) }],
                        })(
                            <Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                                changeOnSelect
                            />
                        )}
                    </FormItem>
                    <FormItem
                          {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.address'})}
                    >
                        {getFieldDecorator('address', {
                            initialValue: this.state.address.address,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.address'}) }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.tel'})}
                    >
                        {getFieldDecorator('tel', {
                            initialValue: this.state.address.tel,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.tel'}) }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('default', {
                            valuePropName: 'checked',
                            initialValue: this.state.address.default==1?true:false,
                        })(
                            <Checkbox>{this.formatMessage({id: 'cart.address.default'})}</Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" className={css.cancel} onClick={this.handleCancel}>{this.formatMessage({id: 'app.cancel'})}</Button>
                        <Button type="primary" htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}
ConfirmOrder = Form.create()(ConfirmOrder);
ConfirmOrder = injectIntl(ConfirmOrder)
export default ConfirmOrder;