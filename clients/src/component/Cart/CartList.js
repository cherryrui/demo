/**
 * Created by WF on 2017/9/14.
 */
import axios from 'axios';
import React from 'react';
import css from './Cart.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
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
    Input,
    Icon,
    Tooltip,
    Checkbox,
    Button,
    message,
    Select
} from 'antd';
const Option = Select.Option;
import {
    connect
} from 'react-redux';
message.config({
    top: '40%',
    duration: 2,
});
@connect(state => ({
    cart: state.cart
}), cartAction)
class CartList extends React.Component {

    static propTypes = {
        intl: intlShape.isRequired,
        deleteCart: React.PropTypes.func.isRequired,
        getCarts: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            selectedRowKeys: [],
            select_all: false,
            sum: 0,
            user: JSON.parse(sessionStorage.getItem("user")),
        }
        this.user = JSON.parse(sessionStorage.user)
        this.formatMessage = this.props.intl.formatMessage;
        this.columns = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            width: "350px",
            className: css.table_col,
            render: (record) => <ProductItem product={record}/>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            width: "170px",
            className: css.table_col,
            render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return false?<div>
                        <Select defaultValue={item.value} style={{ width: 120,marginBottom: "10px" }}
                            onChange={this.handleChange.bind(this,record,index)}>
                            {item.attr.map(att=>{
                                return <Option value={att.id}>{att.name}</Option>
                            })}
                        </Select>
                    </div>:<p>{item.specName}：{item.specVal[0].specValue}</p>
                }):""}
            </div>
        }, {
            title: <FormattedMessage id="cart.price" defaultMessage="我的购物车"/>,
            width: "110px",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>
            ${record.price}</span>
        }, {
            title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
            width: "140px",
            className: css.table_col,
            dataIndex: 'productNum',
            key: 'productNum',
            render: (text, record) => <div className={css.table_num}>
                <Input addonBefore={<Icon onClick={this.handleNum.bind(this,record,-1)} type="minus" />}
                    addonAfter={<Icon onClick={this.handleNum.bind(this,record,1)} type="plus" />}
                    onChange={this.handleNum.bind(this,record)}
                    value={text} />
            </div>
        }, {
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            width: "140px",
            className: css.table_col,
            render: (record) => <span className={css.table_price}>
            ${(record.price*record.productNum).toFixed(2)}</span>
        }, {
            title: <FormattedMessage id="cart.operation" defaultMessage="我的购物车"/>,
            width: "110px",
            className: css.table_col_last,
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
        this.props.getCarts().then(res => {
            //axios.get('/cart/get-carts.json').then(res => {
            console.log(125, res);
            this.formatDate(res.value.data);
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", 158, nextProps);
        this.formatDate(nextProps.cart);
    }
    formatDate = (data) => {
        if (data.isSucc) {
            data.result.list.map(item => {
                /*let off_prices;
                const p_price = this.state.user&&this.state.user.userIdentity==1?(item.itemPriceAgent?item.itemPriceAgent:item.agentPrice?item.agentPrice:item.itemPrice ? item.itemPrice : item.price):item.itemPrice?item.itemPrice: item.price;
                if(item.itemoff_price || item.off_price){
                    off_prices = item.itemoff_price?item.itemoff_price:item.off_price;
                    item.price = off_prices<p_price?off_prices:p_price;
                }*/

                item.platPrice = item.itemPrice ? item.itemPrice : item.price;
                item.price = this.state.user && this.state.user.userIdentity == 1 ? (item.itemPriceAgent ? item.itemPriceAgent : item.agentPrice ? item.agentPrice : item.itemPrice ? item.itemPrice : item.price) : item.itemPrice ? item.itemPrice : item.price;
                item.priceSupplier = item.itemPriceSupplier ? item.itemPriceSupplier : item.priceSupplier;
            })
            this.setState({
                data: data.result.list,
                loading: false
            }, () => {
                console.log(this.state.data)
            })
        } else if (data.code == 104) {
            this.props.handleVisible ? this.props.handleVisible(true) : "";
        } else {
            message.error(this.formatMessage({
                id: "request.fail"
            }, {
                reason: data.message
            }))
        }

    }
    onSelectChange = (selectedRowKeys) => {
        let select_all = false;
        if (selectedRowKeys.length == this.state.data.length) {
            select_all = true;
        }
        let sum = 0;
        this.state.data.map(item => {
            if (selectedRowKeys.indexOf(item.id) > -1) {
                sum += item.productNum * item.price;
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
        console.log(record, num);
        let data = this.state.data;
        let sum = 0;
        data.map(item => {
            if (item.id == record.id) {
                if (isNaN(num)) {
                    item.productNum = isNaN(num.target.value) ? 0 : Number(num.target.value);
                } else {
                    item.productNum = item.productNum + num;
                }
            }
            if (item.productNum <= item.moq) {
                item.productNum = item.moq;
            } else if (item.productNum > item.inventory) {
                item.productNum = item.inventory;
                message.error(this.formatMessage({
                    id: "product.detail.inventory.no"
                }));
            }
            if (this.state.selectedRowKeys.indexOf(item.id) > -1) {
                sum += item.productNum * item.price;
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
                sum += item.price * item.productNum;
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
            console.log(products);
            this.props.handleStep ? this.props.handleStep(1, products) : "";
        } else {
            message.warning(this.formatMessage({
                id: 'cart.select.product'
            }))
        }

    }
    deleteCart = () => {
        if (this.state.selectedRowKeys.length > 0) {
            /*axios.post('/cart/delete-cart.json', this.state.selectedRowKeys).then(res => {*/
            this.props.deleteCart(this.state.selectedRowKeys).then(res => {
                console.log(res);
                if (res.value.data.isSucc) {
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
                    message.success(
                        this.formatMessage({
                            id: "cart.delete_warn"
                        })
                    )
                } else {
                    message.error(this.formatMessage({
                        id: "request.fail"
                    }, {
                        reason: res.data.message
                    }))
                }

            })
        } else {
            message.warning(this.formatMessage({
                id: 'cart.select.product'
            }))
        }
    }
    handleDelete = (id) => {
        let data = [];
        data.push(id);
        /* axios.post('/cart/delete-cart.json', data).then(res => {*/
        this.props.deleteCart(data).then(res => {
            if (res.value.data.isSucc) {
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
                        sum += item.price * item.productNum;
                    }
                })
                this.setState({
                    data: data,
                    selectedRowKeys: select,
                    sum: sum
                })
                message.success(
                    this.formatMessage({
                        id: "cart.delete_warn"
                    })
                )

            } else if (res.value.data.code == 104) {
                this.props.handleVisible ? this.props.handleVisible() : "";
            } else {
                message.error(this.formatMessage({
                    id: "request.fail"
                }, {
                    reason: res.data.message
                }))
            }
        });

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
                profit: 0,
                sum_num: 0,
            }
            console.log(353, this.state.data);
            this.state.data.map(item => {
                this.state.selectedRowKeys.map(key => {
                    if (item.id === key) {
                        item.price = item.platPrice;
                        quotation.sum_num += item.productNum;
                        item.salePrice = item.price;
                        item.agentPrice = item.itemPriceAgent ? item.itemPriceAgent : item.agentPrice;
                        quotation.products.push(item);
                        quotation.sale_price += item.productNum * item.price;
                        quotation.profit += item.productNum * (item.salePrice - item.agentPrice);
                    }
                })
            })
            console.log(366, quotation);
            sessionStorage.setItem('quotation', JSON.stringify(quotation));
            this.props.goLink("/page/quotation")
        } else {
            message.warning(this.formatMessage({
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
        console.log(405, this.props);
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div className={css.cart_list}>
            <Table
                rowSelection={{
                    selectedRowKeys: this.state.selectedRowKeys,
                    onChange: this.onSelectChange,
                }}
                loading={this.state.loading}
                pagination={false}
                rowKey="id"
                loading={this.state.loading}
                columns={this.columns}
                scroll={{y: 700}}
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
                        ：<span className={css.total_money}>${this.state.sum.toFixed(2)}</span>
                    </p>
                    {this.user.userIdentity==1?<p className={css.quotation} onClick={this.goQuotation.bind(this)}>
                        <FormattedMessage id="quotation.generate" defaultMessage="我的购物车"/>
                    </p>:""}
                    <p className={css.calculate} onClick={this.handleCart}>
                        <FormattedMessage id="cart.calu" defaultMessage="我的购物车"/>
                    </p>
                </div>
            </div>
        </div>
    }
}
export default injectIntl(CartList);