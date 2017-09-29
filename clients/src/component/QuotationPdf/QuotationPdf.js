import React from 'react';
import css from './QuotationPdf.scss';
import moment from 'moment';
import axios from 'axios';
import operator from '../Quotation/operator.js';
import {
    FormattedMessage,
} from 'react-intl';

import {
    Table,
    Icon,
    Button
} from 'antd';
class QuotationPdf extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotation: {
                participant: {}
            }
        }

        this.columns = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            width: "38%",
            render: (record) => <div className={css.table_product}>
            <img src={record.coverUrl}/>
                <div className={css.info}>
                    <p className={css.name}>{record.productName}</p>
                    {this.state.quotation.select&&this.props.quotation.select.brand?<p>
                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>
                        ：{record.brandNameCn}
                    </p>:""}
                    <p>
                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                        ：{record.moq}
                    </p>
                    <p className={css.name}>
                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
                        ：{record.productNo}</p>
                </div>
            </div>
        }, {
            title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
            className: css.table_col,
            render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return <p>{item.specName}:{item.specVal[0].spec_value}</p>
                }):""}
            </div>
        }, {
            title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
            className: css.table_col,
            dataIndex: 'num',
            key: 'num',
        }, {
            title: <FormattedMessage id="quotation.sale.price" defaultMessage="我的购物车"/>,
            className: css.table_col,
            dataIndex: 'sale_price',
            key: 'sale_price',
        }, {
            title: <FormattedMessage id="quotation.platform.price" defaultMessage="平台销售价"/>,
            width: "100px",
            dataIndex: 'price',
            key: 'price',
            className: css.table_col,
            render: (text) => <span className={css.table_price}>${text}</span>
        }, {
            title: <FormattedMessage id="quotation.agency.price" defaultMessage="代理商销售价"/>,
            width: "100px",
            className: css.table_col,
            dataIndex: 'agent_price',
            key: 'agent_price',
            render: (text) => <span className={css.table_price}>${text}</span>
        }, ];

    }
    componentWillMount() {

        axios.get('/quotation/get-quotation-byid.json?id=' + this.props.params.id).then(res => {
            this.setState({
                quotation: res.data.result
            })
        })

        /*if (this.state.quotation.select && this.props.quotation.select.plat_price) {
            this.columns.push({
                title: <FormattedMessage id="quotation.platform.price" defaultMessage="平台销售价"/>,
                dataIndex: 'price',
                key: 'price',
                className: css.table_col,
                render: (text) => <span className={css.table_price}>${text}</span>
            });
        }*/
    }

    render() {
        console.log(this.props.quotation)
        return <div className={css.body}>
            <div>
               <Icon type="smile-o" />
               <p>
                   <FormattedMessage id="quotation.message" defaultMessage="创建成功"/>
                   <Button>
                       <FormattedMessage id="quotation.export" defaultMessage="导出"/>
                   </Button>
               </p>
            </div>
            <div className={css.quotation_pdf}>
                <div className={css.title}>
                    <p className={css.logo}>
                        {this.state.quotation.select && this.state.quotation.select.logo?"LOGO":""}
                    LOGO
                    </p>
                    <div>
                        <p className={css.title_item}>
                            <FormattedMessage id="quotation.url" defaultMessage="报价单"/>
                            ：www.chuanchuan.com
                        </p>
                        <p className={css.title_item}>
                            <FormattedMessage id="quotation.contact.tel" defaultMessage="报价单"/>
                            ：028-123456
                        </p>
                        <p className={css.title_item}>
                            <FormattedMessage id="quotation.contact.email" defaultMessage="报价单"/>
                            ：36941555@qq.com
                        </p>
                        <p className={css.title_item}>
                            <FormattedMessage id="quotation.url" defaultMessage="报价单"/>
                            ：DSADSA
                        </p>
                    </div>
                </div>
                <p className={css.quotation_title}>
                    <FormattedMessage id="quotation.quotation" defaultMessage="报价单"/>
                </p>
                <p>
                    <FormattedMessage id="quotation.subject" defaultMessage="报价单"/>
                    :{this.state.quotation.quotationSubject}
                </p>
                <p className={css.quotation_create}>
                    <p>
                        <FormattedMessage id="quotation.no" defaultMessage="报价单"/>
                        :{this.state.quotation.id}
                    </p>
                    <p>
                        <FormattedMessage id="quotation.create_time" defaultMessage="报价单"/>
                        ：{this.state.quotation.create_time?moment(this.props.quotation.create_time).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD')}
                    </p>
                </p>
                <div className={css.infomation}>
                    <p className={css.left}>
                        <FormattedMessage id="quotation.customer.info" defaultMessage="客户信息"/>
                    </p>
                    <p className={css.right}>
                        <FormattedMessage id="quotation.agent.info" defaultMessage="代理商信息"/>
                    </p>
                </div>
                <div className={css.info_write}>
                    <div className={css.left}>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusCompanyName}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.department" defaultMessage="部门"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusDepartment}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusContactPerson}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusContectPhone}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusEmail}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="app.home" defaultMessage="分类"/>：
                            </p>
                            <p>{this.state.quotation.participant.cusFax}</p>
                        </p>
                    </div>
                    <div className={css.right}>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageCompanyName}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.department" defaultMessage="部门"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageDepartment}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageContactPerson}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageContectPhone}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageEmail}</p>
                        </p>
                        <p className={css.item}>
                            <p className={css.info_title}>
                                <FormattedMessage id="app.home" defaultMessage="分类"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageFax}</p>
                        </p>
                    </div>
                </div>
                <Table
                    pagination={false}
                    rowKey="id"
                    bordered
                    columns={this.columns}
                    dataSource={this.state.quotation.products} />
                <div className={css.order_sum}>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.num" defaultMessage="总数量"/>：
                        <p className={css.sum_right_num}>{this.state.quotation.totalQuantity}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.sum" defaultMessage="总售价"/>：
                        <p className={css.sum_right}>{this.state.quotation.totalSalePrice}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.profits" defaultMessage="利润"/>：
                        <p className={css.sum_right}>{this.state.quotation.profits}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>：
                        <p className={css.sum_right}>{this.state.quotation.shoppingCharges}</p>
                    </p>
                </div>
                <p className={css.quotation_info}>
                    <FormattedMessage id="uotation.invoice" defaultMessage="分类"/>：
                    {operator.invoice_type.map(item=>{
                        if(item.id==this.state.quotation.invoiceType){
                            return <FormattedMessage id={item.key} defaultMessage={item.value}/>
                        }
                    })}
                </p>
                <p className={css.quotation_info}>
                    <FormattedMessage id="cart.remark" defaultMessage="备注"/>：
                    {this.state.quotation.remark}
                </p>
                <p className={css.quotation_info}>
                    <FormattedMessage id="quotation.ps" defaultMessage="截止有效期"/>
                </p>
            </div>
		</div>
    }
}

export default QuotationPdf;