import React from 'react';
import css from './QuotationPdf.scss';
import appcss from '../../App.scss';
import moment from 'moment';
import operator from '../Quotation/operator.js';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

import {
    Table,
    Icon,
    Button,
    message
} from 'antd';
message.config({
    top: '40%',
    duration: 2,
});
class QuotationPdf extends React.Component {

    constructor(props) {
        super(props);
        this.formatMessage = this.props.intl.formatMessage;
    }
    render() {
        return <div className={css.quotation_pdf} id="content">
            <div className={css.title}>
                <p className={css.logo}>
                    {this.props.quotation.select.logo?"LOGO":""}
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
                        <FormattedMessage id="quotation.contact.fox" defaultMessage="报价单"/>
                        ：028-1234567899
                    </p>
                </div>
            </div>
            <p className={css.quotation_title}>
                <FormattedMessage id="quotation.quotation" defaultMessage="报价单"/>
            </p>
            <p>
                <FormattedMessage id="quotation.subject" defaultMessage="报价单"/>
                ：{this.props.quotation.quotationOrder.quotationSubject}
            </p>
            <p className={css.quotation_create}>
                <p>
                    <FormattedMessage id="quotation.no" defaultMessage="报价单"/>
                    ：{this.props.quotation.quotationOrder.quotationNo}
                </p>
                <p>
                    <FormattedMessage id="quotation.create_time" defaultMessage="报价单"/>
                    ：{this.props.quotation.quotationOrder.createTime?moment(this.props.quotation.quotationOrder.createTime).format('YYYY-MM-DD'):""}
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
                        <p>{this.props.quotation.participant.cusCompanyName}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.department" defaultMessage="部门"/>：
                        </p>
                        <p>{this.props.quotation.participant.cusDepartment}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>：
                        </p>
                        <p>{this.props.quotation.participant.cusContactPerson}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>：
                        </p>
                        <p>{this.props.quotation.participant.cusContectPhone}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>：
                        </p>
                        <p>{this.props.quotation.participant.cusEmail}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.fox" defaultMessage="分类"/>：
                        </p>
                        <p>{this.props.quotation.participant.cusFax}</p>
                    </p>
                </div>
                <div className={css.right}>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageCompanyName}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.department" defaultMessage="部门"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageDepartment}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageContactPerson}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageContectPhone}</p>
                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageEmail}</p>

                    </p>
                    <p className={css.item}>
                        <p className={css.info_title}>
                            <FormattedMessage id="quotation.contact.fox" defaultMessage="分类"/>：
                        </p>
                        <p>{this.props.quotation.participant.ageFax}</p>
                    </p>
                </div>
            </div>
            <div className={css.product_list}>
                <div className={css.table_header}>
                    <p className={css.table_col_info}>{this.formatMessage({id: "cart.product.info"})}</p>
                    <p className={css.table_col_spec}>{this.formatMessage({id: "cart.specifucation"})}</p>
                    <p className={css.table_col_num}>{this.formatMessage({id: "cart.num"})}</p>
                    <p className={css.table_col_price}>{this.formatMessage({id: "quotation.sale.price"})}</p>
                    <p className={css.table_col_sum}>{this.formatMessage({id: "cart.sum"})}</p>
                </div>
                <div>
                    {this.props.quotation.productList.map((record,index)=>{
                        return index==4||((index-4)%8==0)?<div>
                        <div className="html2pdf__page-break"></div>
                        {this.props.show_sperator ? <div className={css.pdf_sperator}></div> : ""}
                        <div className={css.table_body_item}>
                            <p className={`${css.table_product} ${css.table_col_info}`}>
                                <img crossOrigin="Anonymous" src={record.coverUrl+"@111w_111h_1e_1c.png"}/>
                                <div className={css.info}>
                                    <p className={css.name}>{record.productName}</p>
                                    {this.props.quotation.select.brand?<p>
                                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>：
                                        {locale=="en"?record.productBrand.brandNameEn:record.productBrand.brandNameCn}
                                    </p>:""}
                                    <p>
                                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                                        ：{record.minBuyQuantity}
                                    </p>
                                    <p>
                                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
                                        ：{record.productNo}</p>
                                </div>
                            </p>
                            <div className={`${css.table_col_spec} ${css.table_spec}`}>
                                {record.productSpecification?record.productSpecification.map((item,index)=>{
                                    return <p>{item.specVal[0].specValue}</p>
                                }):""}
                            </div>
                            <p className={`${css.table_col_num} ${css.table_spec}`}>{record.productNum}</p>
                            <p className={`${css.table_col_price} ${css.table_price}`}>${record.salePrice}</p>
                            <p className={`${css.table_col_sum} ${css.table_sum}`}>${record.totalMoney}</p>
                        </div></div>:<div className={css.table_body_item}>
                            <p className={`${css.table_product} ${css.table_col_info}`}>
                                <img crossOrigin="Anonymous" src={record.coverUrl+"@111w_111h_1e_1c.png"}/>
                                <div className={css.info}>
                                    <p className={css.name}>{record.productName}</p>
                                    {this.props.quotation.select.brand?<p>
                                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>：
                                        {locale=="en"?record.productBrand.brandNameEn:record.productBrand.brandNameCn}
                                    </p>:""}
                                    <p>
                                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                                        ：{record.minBuyQuantity}
                                    </p>
                                    <p>
                                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
                                        ：{record.productNo}</p>
                                </div>
                            </p>
                            <div className={`${css.table_col_spec} ${css.table_spec}`}>
                                {record.productSpecification?record.productSpecification.map((item,index)=>{
                                    return <p>{item.specVal[0].specValue}</p>
                                }):""}
                            </div>
                            <p className={`${css.table_col_num} ${css.table_spec}`}>{record.productNum}</p>
                            <p className={`${css.table_col_price} ${css.table_price}`}>${record.salePrice}</p>
                            <p className={`${css.table_col_sum} ${css.table_sum}`}>${record.totalMoney}</p>
                        </div>
                    })}
                </div>
            </div>
            {this.props.quotation.productList.length==4||((this.props.quotation.productList.length-4)%8==0)?<div><div className="html2pdf__page-break"></div>
                {this.props.show_sperator?<div className={css.pdf_sperator}></div>:""}</div>:""}
            <div className={css.order_sum}>
                <p className={css.sum_item}>
                    <FormattedMessage id="cart.num" defaultMessage="总数量"/>：
                    <p className={css.sum_right_num}>{this.props.quotation.quotationOrder.totalQuantity}</p>
                </p>
                <p className={css.sum_item}>
                    <FormattedMessage id="cart.sum" defaultMessage="总售价"/>：
                    <p className={css.sum_right}>${this.props.quotation.quotationOrder.totalSalePrice}</p>
                </p>
                {false?<p className={css.sum_item}>
                    <FormattedMessage id="cart.profits" defaultMessage="利润"/>：
                    <p className={css.sum_right}>${this.props.quotation.quotationOrder.profits}</p>
                </p>:""}
                <p className={css.sum_item}>
                    <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>：
                    <p className={css.sum_right}>${this.props.quotation.quotationOrder.shoppingCharges}</p>
                </p>
            </div>
            {this.props.quotation.productList.length==3||(this.props.quotation.productList.length>4&&(this.props.quotation.productList.length-4)%7==0)?<div className="html2pdf__page-break"></div>:""}
            <div className={css.quo_footer}>
                <div className={css.quo_left}>
                    <p className={css.quotation_info}>
                        <FormattedMessage id="quotation.invoice" defaultMessage="发票类型"/>：
                        {operator.invoice_type.map(item=>{
                            if(item.id==this.props.quotation.quotationOrder.invoiceType){
                                return <FormattedMessage id={item.key} defaultMessage={item.value}/>
                            }
                        })}
                    </p>

                    <p className={css.quotation_info}>
                        <FormattedMessage id="cart.remark" defaultMessage="备注"/>：
                        {this.props.quotation.quotationOrder.remark}
                    </p>
                    <p className={css.quotation_info}>
                        <FormattedMessage id="quotation.ps" defaultMessage="截止有效期"/>
                    </p>
                </div>
                <div className={css.quo_footer_right}>
                    <img src="../img/yin.png"/>
                </div>
            </div>
        </div>
    }
}
QuotationPdf = injectIntl(QuotationPdf);
export default QuotationPdf;