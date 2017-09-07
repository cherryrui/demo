/**
 * Created by WF on 2017/8/30.
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
            loading: false,
            address_list: [],

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
                <Tooltip title={<FormattedMessage id="cart.delete" defaultMessage="我的购物车"/>}>
                    <Icon type="delete" onClick={this.handleDelete.bind(this,record.id)} />
                </Tooltip>      
            </div>
        }, ]

    }
    componentWillMount() {
        this.getCarts();
    }
    getCarts() {
        this.setState({
            loading: true,
        })
        axios.get('/cart/get-carts.json').then(res => {
            this.setState({
                data: res.data.carts,
                loading: false
            })
        })
    }
    componentDidMount() {}
    onSelectChange = (selectedRowKeys) => {
        let select_all = false;
        if (selectedRowKeys.length == this.state.data.length) {
            select_all = true;
        }
        let sum = 0;
        this.state.data.map(item => {
            if (selectedRowKeys.indexOf(item.id) > -1) {
                sum += item.num * item.price;
            }
        })
        this.setState({
            selectedRowKeys,
            select_all: select_all,
            sum: sum
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
        let sum = 0;
        data.map(item => {
            if (item.id == record.id) {
                if (isNaN(num)) {
                    item.num = isNaN(num.target.value) ? 0 : Number(num.target.value);
                } else {
                    item.num = item.num + num;
                }
            }
            if (this.state.selectedRowKeys.indexOf(item.id) > -1) {
                sum += item.num * item.price;
            }
        })
        this.setState({
            data: data,
            sum: sum
        })
    }
    handleSelectAll = (e) => {
        console.log(174, "handleSelectAll");
        let key = [],
            sum = 0;
        if (e.target.checked) {
            this.state.data.map(item => {
                key.push(item.id);
                sum += item.price * item.num;
            })
        }
        this.setState({
            selectedRowKeys: key,
            select_all: !this.state.select_all,
            sum: sum

        });
    }

    /**
     * 结算所选商品
     * @return {[type]} [description]
     */
    handleCart = () => {
        if (this.state.selectedRowKeys.length > 0) {
            axios.get('/user/get-address-list.json').then(res => {
                let products = []
                this.state.data.map(item => {
                    this.state.selectedRowKeys.map(key => {
                        if (item.id === key) {
                            products.push(item);
                        }
                    })
                })
                let that = this;
                this.setState({
                    products: products,
                    step: 1,
                    address_list: res.data.address
                }, () => {
                    that.cart.scrollIntoView(true);
                })
            })

        } else {
            const {
                intl: {
                    formatMessage
                }
            } = this.props;
            message.warning(formatMessage({
                id: 'cart.select.product'
            }))
        }

    }
    deleteCart = () => {
        if (this.state.selectedRowKeys.length > 0) {
            axios.post('/cart/delete-cart.json', this.state.selectedRowKeys).then(res => {
                let data = [];
                this.state.data.map(item => {
                    if (this.state.selectedRowKeys.indexOf(item.id) == -1) {
                        data.push(item);
                    }
                })
                this.setState({
                    data: data,
                    selectedRowKeys: [],
                    sum: 0,
                })

            })
        } else {
            const {
                intl: {
                    formatMessage
                }
            } = this.props;
            message.warning(formatMessage({
                id: 'cart.select.product'
            }))
        }
    }
    handleDelete = (id) => {
        let data = this.state.data;
        let select = this.state.selectedRowKeys;
        let sum = 0;
        data.map((item, index) => {
            if (item.id == id) {
                data.splice(index, 1);
            }
        })
        if (select.indexOf(id) > -1) {
            select.map((item, index) => {
                if (item == id) {
                    select.splice(index, 1);
                }
            })
        }
        data.map(item => {
            if (select.indexOf(item.id) > -1) {
                sum += item.price * item.num;
            }
        })
        this.setState({
            data: data,
            selectedRowKeys: select,
            sum: sum
        })

    }
    handleStep = (num) => {
        this.setState({
            step: this.state.step + num,
        }, () => {
            this.cart.scrollIntoView(true);
        })
    }
    goQuotation = () => {
        if (this.state.selectedRowKeys.length > 0) {
            let quotation = {
                products: [],
                sale_price: 0,
                profit: 0
            }
            this.state.data.map(item => {
                this.state.selectedRowKeys.map(key => {
                    if (item.id === key) {
                        quotation.products.push({
                            id: item.id,
                            attr_id: 1,
                            attr: [{
                                id: 1,
                                name: "红色"
                            }, {
                                id: 2,
                                name: "56"
                            }, ],
                            num: item.num,
                            sale_price: item.price,
                            price: item.price,
                            agent_price: item.agent_price,
                            img: item.img,
                            name: item.name,
                            brand: item.brand,
                            moq: 1,
                            NO: "3213213",
                        });
                        quotation.sale_price += item.num * item.price;
                        quotation.profit += item.num * (item.price - item.agent_price);
                    }
                })
            })
            localStorage.setItem('quotation', JSON.stringify(quotation));
            window.location.href = "/#/main/quotation";
        } else {
            const {
                intl: {
                    formatMessage
                }
            } = this.props;
            message.warning(formatMessage({
                id: 'cart.select.product'
            }))
        }
    }

    /**
     * wdy 打印
     */
    print = () => {
        let htmls = [];
        this.state.select.map(item => {
            let html = document.all.item(item).innerHTML;
            let index = html.indexOf('addContentDistrict');
            if (index > -1) {
                html = html.substring(0, index) + html.substring(index + 18)
            }
            let style = `style="max-height: 200px;`;
            let styleIndex = html.indexOf(style);
            if (styleIndex > index) {
                html = html.substring(0, styleIndex) + html.substring(styleIndex + style.length)
            }
            htmls.push(html);
        });
        Util.print("<div>" + htmls.join("<br>") + "</div>");
    };

    render() {
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div className={appcss.body} ref={(cart)=>this.cart=cart}>
            <div className={appcss.navigate}>
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
                    loading={this.state.loading}
                    columns={this.columns} 
                    scroll={{y: 600}}
                    dataSource={this.state.data} />
                <div className={css.footer}>
                    <div className={css.left}>
                        <Checkbox onChange={this.handleSelectAll} checked={this.state.select_all}>
                            <FormattedMessage id="cart.select.all" defaultMessage="我的购物车"/>
                        </Checkbox>
                        <Tooltip title={formatMessage({id: 'cart.delete.all'})}>
                            <Icon type="delete" onClick={this.deleteCart} />
                        </Tooltip>  
                    </div>
                    <div className={css.right}>
                        <p className={css.total}>
                            <FormattedMessage id="branch.product.sum" 
                                defaultMessage="总计"
                                values={{total:this.state.selectedRowKeys.length}}
                            />
                            :&nbsp;&nbsp;${this.state.sum}
                        </p>
                        <p className={css.quotation} onClick={this.goQuotation}>
                            <FormattedMessage id="quotation.generate" defaultMessage="我的购物车"/>
                        </p>
                        <p className={css.calculate} onClick={this.handleCart}>
                            <FormattedMessage id="cart.calu" defaultMessage="我的购物车"/>
                        </p>
                    </div>
                </div>
                </div>:this.state.step==1?<OrderDetail
                    products={this.state.products}
                    address_list={this.state.address_list}
                    next={this.handleStep}
                />
                :this.state.step==2?<Payment/>:<PaySuccess/>}
        </div>
    }
}

/**
 * 确认订单
 */
class OrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {
                pay_mode: 0, //支付方式，1：全款，2：分期
                advance_mode: operator.advance_mode[0].key, //首付额度
                advance_pay: operator.instalment_mode[0].key,
                delivery_mode: 0,
            },
            select: this.props.address_list[0].id, //默认选择的地址列表
            address: {}, //当前选中地址
            visible: false, //是否显示地址信息模态框
            options: [], //多级联动地址信息
            title: "cart.address.title", //地址信息模态框title
            loading: false, //正在提交订单
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
    componentWillMount() {
        let sum = 0,
            order = this.state.order;
        this.props.products.map(item => {
            sum += item.price * item.num;
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
            this.props.next ? this.props.next(1) : '';
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
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const {
            intl: {
                formatMessage
            }
        } = this.props;
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
                {this.props.address_list.map(item=>{
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
                                            onClick={this.handlePayMode.bind(this,"advance_pay",item.key)}>
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
                title={formatMessage({id: this.state.title})}
                visible={this.state.visible}
                onOk={this.handleSubmit}
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'cart.delivery.name'})}
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.address.name,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.name'}), whitespace: true }],
                         })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'post.company_name'})}
                    >
                        {getFieldDecorator('company_name', {
                            initialValue: this.state.address.company_name,
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={formatMessage({id: 'cart.delivery.city'})}
                    >
                        {getFieldDecorator('city', {
                            initialValue: this.state.address.city?this.state.address.city.split(","):[],
                            rules: [{ type: 'array', required: true, message: formatMessage({id: 'cart.cart'}) }],
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
                          label={formatMessage({id: 'cart.delivery.address'})}
                    >
                        {getFieldDecorator('address', {
                            initialValue: this.state.address.address,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.address'}) }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                          label={formatMessage({id: 'cart.delivery.tel'})}
                        >
                        {getFieldDecorator('tel', {
                            initialValue: this.state.address.tel,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.tel'}) }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('default', {
                            valuePropName: 'checked',
                            initialValue: this.state.address.default==1?true:false,
                        })(
                            <Checkbox>{formatMessage({id: 'cart.address.default'})}</Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" className={css.cancel} onClick={this.handleCancel}>{formatMessage({id: 'app.cancel'})}</Button>
                        <Button type="primary" htmlType="submit">{formatMessage({id: 'app.ok'})}</Button>
                    </FormItem>
                </Form>
            </Modal>
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
    handlePayMode = (name, key) => {
        let order = this.state.order;
        order[name] = key;
        this.setState({
            order: order
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
OrderDetail = Form.create()(OrderDetail);
OrderDetail = injectIntl(OrderDetail)
export default injectIntl(Cart);