/**
 * Created by WF on 2017/9/14.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';

import {
    FormattedMessage,
    injectIntl,
    intlShape
    } from 'react-intl';

import {
    Table,
    Input,
    Icon,
    Tooltip,
    Checkbox,
    Button,
    message,
    Select
    } from 'antd';
const Option = Select.Option;

class CartList extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data: [],
            loading: false,
            selectedRowKeys: [],
            select_all: false,
            sum: 0,
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
                            {record.brand}
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
            let products = []
            this.state.data.map(item => {
                this.state.selectedRowKeys.map(key => {
                    if (item.id === key) {
                        products.push(item);
                    }
                })
            })
            this.props.handleStep?this.props.handleStep(1,products):"";

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

    render(){
        const {
            intl: {
                formatMessage
                }
            } = this.props;


        return <div>
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
                        <FormattedMessage id="brand.product.sum"
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
        </div>
    }
}
export default injectIntl(CartList);