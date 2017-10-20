/**
 * Created by WF on 2017/9/14.
 */

import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import CusModal from '../Public/CusModal/CusModal.js';
import cartAction from '../../action/cartAction.js';
import ProductItem from '../Public/ProductItem/ProductItem.js'
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
import {
    connect
} from 'react-redux';

@connect(state => ({
    carts: state.carts
}), cartAction)
class ConfirmOrder extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired,
        commitOrder: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            order: {
                pay_mode: 0, //支付方式，1：全款，2：分期
                advance_mode: 0, //首付额度
                stageId: 0, //分期方式
                delivery_mode: 1,
            },
            pay_mode_list: [], //支付方式列表
            pay_mode_detail: [], // 支付方式对应的详情
            address_list: [],
            select: 0, //默认选择的地址列表
            address: {}, //当前选中地址
            visible: false, //是否显示地址信息模态框
            options: [], //多级联动地址信息
            title: "cart.address.title", //地址信息模态框title
            loading: false, //正在提交订单
            telCode: [],
            logo_visible: false,
        };
        this.user = JSON.parse(sessionStorage.user);
        this.select_address = [];
        this.formatMessage = this.props.intl.formatMessage;
        this.colums_show = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            className: css.table_col,
            width: "536px",
            render: (record) => <ProductItem product={record}/>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            width: "170px",
            className: css.table_col,
            render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return <div>
                        <p>{item.specName}：{item.specVal[0].specValue}</p>
                    </div>
                }):""}
            </div>
        }, {
            title: <FormattedMessage id="cart.price" defaultMessage="我的购物车"/>,
            width: "100px",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>${record.price.toFixed(2)}</span>
        }, {
            title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
            width: "100px",
            className: css.table_col,
            dataIndex: 'productNum',
            key: 'productNum',
            render: (num) => <span className={css.table_price}>{num}</span>
        }, {
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            width: "170px",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>${(record.price*record.productNum).toFixed(2)}</span>
        }, ];
        this.telSelect = null;
    }
    componentWillMount() {
        this.getAddressList();
        let sum = 0,
            order = this.state.order;
        this.props.products.map(item => {
            sum += item.price * item.productNum;
        })
        order.sum = sum;
        order.postage = 0;
        order.total = order.sum + order.postage;
        order.sum = order.sum.toFixed(2);
        order.total = order.total.toFixed(2);
        axios.get('/user/get-city-by-parent.json').then(res => {
            let address = this.convertData(JSON.parse(res.data.address.result));
            console.log(address);
            this.setState({
                options: address,
                order: order
            })
        })
        axios.get('/order/get-pay-mode.json').then(res => {
            this.setState({
                pay_mode_list: res.data.result
            })
        })
        axios.get('/user/get-tel-code.json').then(res => {
            if (res.data.isSucc) {
                this.setState({
                    telCode: res.data.result
                })
            }
        })
    }

    getPayDetail = () => {
        axios.get(`/order/get-pay-mode-detail.json?pay_mode=${this.state.order.pay_mode}`).then(res => {
            console.log(res.data);
            if (res.data.isSucc) {
                let order = this.state.order;
                order.advance_mode = 0;
                order.sum_interest = 0;
                if (res.data.result.length == 0) {
                    order.stageId = -1;
                } else {
                    order.stageId = 0;
                }
                this.setState({
                    pay_mode_detail: res.data.result,
                    order: order

                })
            }
        })
    }
    convertData(data) {
        data.map(item => {
            item.value = item.v;
            item.label = item.n;
            item.children = item.s;
            if (item.children && item.children.length > 0) {
                this.convertData(item.children);
            } else {
                return data;
            }
        })
        return data;
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
        } else if (name == "stageId") {
            order[name] = mode.stageId
            order.sum_interest = (parseFloat(order.sum) * (1 - mode.firstMoney) * mode.interestRate).toFixed(2);
        } else if (name == "advance_mode") {
            order[name] = mode;
            order.stageId = 0;
            order.sum_interest = 0;
        } else {
            order[name] = mode;
        }
        this.setState({
            order: order
        });
        if (name == "pay_mode") {
            this.getPayDetail();
        }
    }

    /**
     * 提交订单
     * @return {[type]} [description]
     */
    handlePay = () => {
        console.log(this.state.order)
        if (this.state.order.stageId) {
            this.setState({
                loading: true,
            })
            let param = {
                addressId: this.state.select,
                productIds: [],
                productNumbers: [],
                itemIds: [],
                itemNumbers: [],
                payModelId: this.state.order.pay_mode,
                deliveryId: this.state.order.delivery_mode,
                remark: this.state.order.note,
            }
            if (this.state.order.stageId > 0) {
                param.payModelStageId = this.state.order.stageId;
            }
            this.props.products.map(item => {
                if (item.itemId) {
                    param.itemIds.push(item.itemId);
                    param.itemNumbers.push(item.productNum);
                } else {
                    param.productIds.push(item.productId);
                    param.productNumbers.push(item.productNum);
                }
            })
            param.itemIds = param.itemIds.join(",");
            param.itemNumbers = param.itemNumbers.join(",");
            param.productIds = param.productIds.join(",");
            param.productNumbers = param.productNumbers.join(",");
            this.props.commitOrder(param).then(res => {
                console.log(res);
                this.setState({
                    loading: false,
                })
                if (res.value.data.isSucc) {
                    this.props.handleStep ? this.props.handleStep(1, res.value.data.order) : '';
                } else if (res.data.code == 104) {
                    this.props.handleVisible ? this.props.handleVisible() : "";
                } else {
                    message.error(res.value.data.message);
                }

            })
        } else {
            message.error(this.formatMessage({
                id: "cart.pay.warn"
            }))
        }

    }
    handleStep = (num) => {
        this.props.handleStep ? this.props.handleStep(num) : '';
    }
    handleEditAddress = (address) => {
        console.log('address:', address);
        let title = '',
            addr;
        if (address.addressId) {
            addr = address;
            addr.citys = [];
            addr.citys.push(address.countryId);
            addr.citys.push(address.provinceId);
            addr.citys.push(address.cityId);
            addr.citys.push(address.districtId);
            title = "cart.address.title";
        } else {
            title = "cart.delivery.new";
            addr = {};
        }
        this.select_address = [];
        this.setState({
            address: addr,
            title: title,
            visible: true,
        }, () => {
            this.props.form.resetFields();
        })
    }
    getAddressList = () => {
        console.log("get-address-list.json")
        axios.get('/user/get-address-list.json').then(res => {
            if (res.data.isSucc) {
                this.setState({
                    address_list: res.data.result,
                    select: this.state.select == 0 && res.data.result.length > 0 ? res.data.result[0].addressId : this.state.select,
                })
            } else if (res.data.code == 104) {
                this.props.handleVisible ? this.props.handleVisible(true) : "";
            } else {
                message.error(res.data.message);
            }
        })
    }
    handleAddress = (key) => {
        this.setState({
            select: key
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                })
                let param = values;
                if (this.select_address.length > 0) {
                    param.country = this.select_address[0].label;
                    param.countryId = this.select_address[0].value;
                    param.province = this.select_address.length > 1 ? this.select_address[1].label : "";
                    param.provinceId = this.select_address.length > 1 ? this.select_address[1].value : 0;
                    param.city = this.select_address.length > 2 ? this.select_address[2].label : "";
                    param.cityId = this.select_address.length > 2 ? this.select_address[2].value : 0;
                    param.district = this.select_address.length > 3 ? this.select_address[3].label : "";
                    param.districtId = this.select_address.length > 3 ? this.select_address[3].value : 0;
                } else if (this.state.address.addressId) {
                    param.country = this.state.address.country;
                    param.countryId = this.state.address.countryId;
                    param.province = this.state.address.province;
                    param.provinceId = this.state.address.provinceId;
                    param.city = this.state.address.city;
                    param.cityId = this.state.address.cityId;
                    param.district = this.state.address.district;
                    param.districtId = this.state.address.districtId;
                }
                param.isDefault = values.isDefault ? 1 : 0;
                this.state.telCode.map(item => {
                    if (item.id == param.phoneDcId) {
                        param.phoneDc = item.districtCode
                    }
                })
                if (this.state.address.addressId) {
                    param.addressId = this.state.address.addressId;
                    axios.post('/user/update-address.json', param).then(res => {
                        if (res.data.isSucc) {
                            this.setState({
                                loading: false,
                                visible: false,
                            })
                            this.getAddressList();
                        } else if (res.data.code == 104) {
                            this.setState({
                                loading: false,
                                visible: false,
                            })
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else {
                            this.setState({
                                loading: false,
                            })
                            message.error(res.data.message);
                        }

                    })

                } else {
                    axios.post('/user/add-user-address.json', param).then(res => {
                        if (res.data.isSucc) {
                            this.setState({
                                loading: false,
                                visible: false,
                            })
                            this.getAddressList();
                        } else if (res.data.code == 104) {
                            this.setState({
                                loading: false,
                                visible: false,
                            })
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else {
                            this.setState({
                                loading: false,
                            })
                            message.error(res.data.message);
                        }
                    })
                }
            }
        });
    }

    changeAddress = (value, selectedOptions) => {
        this.select_address = selectedOptions;
    }

    render() {
        console.log(this.state.order)
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
        const prefixSelector = getFieldDecorator('phoneDcId', {
            initialValue: this.state.address.phoneDcId ? this.state.address.phoneDcId : this.state.telCode.length > 0 ? this.state.telCode[0].id : "",
        })(
            <Select style={{ width: 60 }}>
            {this.state.telCode.map(item=>{
                return <Option value={item.id}>{item.districtCode}</Option>
            })}
        </Select>
        );
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
                        <p onClick={this.handleAddress.bind(this,item.addressId)}>
                            <Radio style={{bottom: 1}} checked={item.addressId==this.state.select?true:false}></Radio>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.name" defaultMessage="收货人"/>
                            &nbsp;{item.name}&nbsp;&nbsp;
                            </span>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.tel" defaultMessage="电话"/>
                            &nbsp;{item.phoneDc}-{item.phone}&nbsp;&nbsp;
                            </span>
                            <span className={css.item}>
                                <FormattedMessage id="cart.delivery.address" defaultMessage="收货地址"/>
                            &nbsp;:{item.country},{item.province},{item.city},{item.district},{item.address}
                            </span>
                            {item.isDefault==1?<span className={css.item_default}>
                                <FormattedMessage id="cart.delivery.default" defaultMessage="默认地址"/>
                            </span>:""}
                        </p>
                        {item.addressId==this.state.select?<Icon className={css.pointer}type="edit" onClick={this.handleEditAddress.bind(this,item)} />:""}
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
            <div className={css.confirm_pay} ref={(pay_mode)=>{this.pay_mode=pay_mode}}>
                <div className={css.confirm_mode}>
                {this.state.pay_mode_list.map(item=>{
                    return <p className={this.state.order.pay_mode==item.payModelId?css.active:css.item}
                        onClick={this.handlePayMode.bind(this,"pay_mode",item.payModelId)}>
                        {item.payModelName}
                    </p>
                })}
                </div>
                {this.state.pay_mode_detail.length>0?<div>
                    {this.state.pay_mode_detail.map(item => {
                        return <div>
                            <p className={css.radio}>
                                <Radio checked={this.state.order.advance_mode==item.firstMoney?true:false}
                                    onClick={this.handlePayMode.bind(this,"advance_mode",item.firstMoney)}>
                                    <FormattedMessage id="cart.advance" 
                                        values={{
                                            firstMoney:item.firstMoney*100,
                                            lastMoney: 100-item.firstMoney*100,
                                        }}
                                    defaultMessage="全额支付"/>
                                </Radio>
                            </p>
                                {this.state.order.advance_mode==item.firstMoney?<div className={css.advance_pay}>
                                    {item.paymentModelStages.map(pay=>{
                                        return <p className={this.state.order.stageId==pay.stageId?css.active:css.item}
                                            onClick={this.handlePayMode.bind(this,"stageId",pay)}>
                                            <FormattedMessage id="orderlist.pay.payment" values={{stageNum: pay.stageNum}} defaultMessage=""/>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <FormattedMessage tagName='a' id="cart.pay.day" defaultMessage="3期"
                                                values={{
                                                    principal: (this.state.order.sum*(1-pay.firstMoney)/pay.stageNum).toFixed(2),
                                                    interest: (this.state.order.sum*(1-pay.firstMoney)*pay.interestRate/pay.stageNum).toFixed(2),
                                                }}
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

            <div className={css.confirm_mode_delivery}>
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
            <TextArea rows={4} onChange={this.handlePayMode.bind(this,"note")} className={css.remark_test}/>
            <div className={css.order_sum}>
                <div>
                    <FormattedMessage id="cart.order.total" defaultMessage="订单总金额"/>:
                    <p >$&nbsp;{this.state.order.sum}</p>
                </div>

                <div>
                    <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
                    <p >$&nbsp;{this.state.delivery_mode == 1 ? "0.00" : this.state.order.postage.toFixed(2)}</p>
                </div>
                <div>
                    <FormattedMessage id="orderdetails.interest" defaultMessage="邮费"/>:
                    <p >$&nbsp;{this.state.order.sum_interest}</p>
                </div>
                <div>
                    <FormattedMessage id="cart.grand" defaultMessage="总金额"/>:
                    <p className={css.order_sum_orange}>$&nbsp;{(parseFloat(this.state.order.total)+(this.state.order.postage?parseFloat(this.state.order.postage):0)+(this.state.order.sum_interest?parseFloat(this.state.order.sum_interest):0)).toFixed(2)}</p>
                </div>
            </div>
            <div className={css.order_footer}>
                <p>
                </p>
                <div className={css.footer_right}>
                    {this.state.order.advance_mode>0?<p>
                        <FormattedMessage id="cart.advance.payment" defaultMessage="首期金额"/>:
                        <span className={css.footer_orange}>$&nbsp;{(this.state.order.sum*this.state.order.advance_mode).toFixed(2)}</span>
                    </p>:""}
                    <Button type='primary' size="large" className={css.button_green} onClick={this.handleStep.bind(this,-1)}>
                        <FormattedMessage id="app.before" defaultMessage="上一步"/>
                    </Button>
                    <Button type='primary' loading={this.state.loading} size="large" className={css.button_theme} onClick={this.handlePay}>
                        <FormattedMessage id="cart.submit" defaultMessage="提交订单"/>
                    </Button>
                </div>
            </div>
            <CusModal width="650"
                title={this.formatMessage({id: this.state.title})}
                visible={this.state.visible}
                closeModal={this.handleCancel.bind(this,"visible")}
            >
                <Form className={css.modify_address} onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.name'})}
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.address.name,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.name'}), whitespace: true }],
                        })(
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'post.company_name'})}
                    >
                        {getFieldDecorator('companyName', {
                            initialValue: this.state.address.companyName,
                        })(
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.city'})}
                    >
                        {getFieldDecorator('citys', {
                            initialValue: this.state.address.citys?this.state.address.citys:[],
                            rules: [{ type: 'array', required: true, message: this.formatMessage({id: 'cart.delivery.city'}) }],
                        })(
                            <Cascader  className={css.address_input}
                                options={this.state.options}
                                onChange={this.changeAddress}
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
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.tel'})}
                    >
                        {getFieldDecorator('phone', {
                            initialValue: this.state.address.phone,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.tel'}) }],
                        })(
                            <Input addonBefore={prefixSelector}  className={css.address_input_tel}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('isDefault', {
                            valuePropName: 'checked',
                            initialValue: this.state.address.isDefault==1?true:false,
                        })(
                            <Checkbox>{this.formatMessage({id: 'cart.address.default'})}</Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}style={{ marginBottom:14}}>
                        <Button type="primary" className={css.cancel} onClick={this.handleCancel}>{this.formatMessage({id: 'app.cancel'})}</Button>
                        <Button type="primary" className={css.submit} loading={this.state.loading} htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>
                    </FormItem>
                </Form>
            </CusModal>
        </div>
    }
}
ConfirmOrder = Form.create()(ConfirmOrder);
ConfirmOrder = injectIntl(ConfirmOrder)
export default ConfirmOrder;