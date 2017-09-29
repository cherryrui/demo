import React from 'react';
import css from './QuotationPdf.scss';
import appcss from '../../App.scss';
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
                participant: {},
                quotationOrder: {},
                productList: []
            },
            select:{}
        }

        this.columns = [{
            title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
            width: "38%",
            render: (record) => <div className={css.table_product}>
            <img src={record.productUrl}/>
                <div className={css.info}>
                    <p className={css.name}>{record.productName}</p>
                    {this.state.select&&this.state.select.brand?<p>
                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>
                        ：{JSON.parse(record.productBrand).brandNameCn}
                    </p>:""}
                    <p>
                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                        ：{record.minBuyQuantity}
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
            dataIndex: 'productNum',
            key: 'productNum',
        }, {
            title: <FormattedMessage id="quotation.sale.price" defaultMessage="我的购物车"/>,
            className: css.table_col,
            dataIndex: 'salePrice',
            key: 'salePrice',
            render: (text) => <span className={css.table_price}>${text}</span>

        },{
            title: <FormattedMessage id="cart.sum" defaultMessage="我的购物车"/>,
            className: css.table_col,
            dataIndex: 'totalMoney',
            key: 'totalMoney',
            render: (text) => <span className={css.table_price}>${text}</span>

        },];

    }
    componentWillMount() {

        axios.get('/quotation/get-quotation-byid.json?id=' + this.props.params.id).then(res => {

            let select = {};
            if (res.data.result.quotationOrder && res.data.result.quotationOrder.exportOption) {
                select = JSON.parse(res.data.result.quotationOrder.exportOption);
            }
            if (select.plat_price) {
                this.columns.push({
                    title: <FormattedMessage id="quotation.platform.price" defaultMessage="我的购物车"/>,
                    className: css.table_col,
                    dataIndex: 'productPrice',
                    key: 'productPrice',
                }, )
            }
            this.setState({
                quotation: res.data.result,
                select: select
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

    componentDidMount() {
        this.quotation_pdf.scrollIntoView();
    }
    exportPDF = () => {
        html2canvas(document.getElementById("content"), {
            onrendered: (canvas) => {
                console.log(canvas);
                var contentWidth = canvas.width;
                var contentHeight = canvas.height;

                //一页pdf显示html页面生成的canvas高度;
                var pageHeight = contentWidth / 592.28 * 841.89;
                //未生成pdf的html页面高度
                var leftHeight = contentHeight;
                //页面偏移
                var position = 0;
                //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                var imgWidth = 595.28;
                var imgHeight = 592.28 / contentWidth * contentHeight;

                var pageData = canvas.toDataURL('image/jpeg', 1.0);

                var pdf = new jsPDF('', 'pt', 'a4');

                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                console.log(leftHeight, pageHeight);
                if (leftHeight < pageHeight) {
                    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                } else {
                    while (leftHeight > 0) {
                        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                        leftHeight -= pageHeight;
                        position -= 841.89;
                        //避免添加空白页
                        if (leftHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save('content.pdf');
                this.setState({
                    visible: false,
                })
            },
            useCORS: true
        });
    }

    render() {
        console.log(this.props.quotation)
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.quotation_title}> 
               <p className={css.quotation_info}>
                    <Icon type="smile-o" />&nbsp;&nbsp;
                   <FormattedMessage id="quotation.message" defaultMessage="创建成功"/> 
               </p>
               <Button type="primary" onClick={this.exportPDF}>
                    <FormattedMessage id="quotation.export" defaultMessage="导出"/>
                </Button>
            </div>
            <div className={css.quotation_pdf} id="content">
                <div className={css.title}>
                    <p className={css.logo}>
                        {this.state.quotation.quotationOrder && this.state.quotation.quotationOrder.logo?"LOGO":""}
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
                    ：{this.state.quotation.quotationOrder.quotationSubject}
                </p>
                <p className={css.quotation_create}>
                    <p>
                        <FormattedMessage id="quotation.no" defaultMessage="报价单"/>
                        ：{this.state.quotation.quotationOrder.quotationNo}
                    </p>
                    <p>
                        <FormattedMessage id="quotation.create_time" defaultMessage="报价单"/>
                        ：{this.state.quotation.quotationOrder.createTime?moment(this.state.quotation.quotationOrder.createTime).format('YYYY-MM-DD'):""}
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
                                <FormattedMessage id="quotation.contact.fox" defaultMessage="分类"/>：
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
                                <FormattedMessage id="quotation.contact.fox" defaultMessage="分类"/>：
                            </p>
                            <p>{this.state.quotation.participant.ageFax}</p>
                        </p>
                    </div>
                </div>
                <Table
                    pagination={false}
                    rowKey={record => ""+record.productId+record.itemId}
                    bordered
                    columns={this.columns}
                    dataSource={this.state.quotation.productList} />
                <div className={css.order_sum}>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.num" defaultMessage="总数量"/>：
                        <p className={css.sum_right_num}>{this.state.quotation.quotationOrder.totalQuantity}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.sum" defaultMessage="总售价"/>：
                        <p className={css.sum_right}>${this.state.quotation.quotationOrder.totalSalePrice}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.profits" defaultMessage="利润"/>：
                        <p className={css.sum_right}>${this.state.quotation.quotationOrder.profits}</p>
                    </p>
                    <p className={css.sum_item}>
                        <FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>：
                        <p className={css.sum_right}>${this.state.quotation.quotationOrder.shoppingCharges}</p>
                    </p>
                </div>
                <p className={css.quotation_info}>
                    <FormattedMessage id="quotation.invoice" defaultMessage="发票类型"/>：
                    {operator.invoice_type.map(item=>{
                        if(item.id==this.state.quotation.quotationOrder.invoiceType){
                            return <FormattedMessage id={item.key} defaultMessage={item.value}/>
                        }
                    })}
                </p>

                <p className={css.quotation_info}>
                    <FormattedMessage id="cart.remark" defaultMessage="备注"/>：
                    {this.state.quotation.quotationOrder.remark}
                </p>
                <p className={css.quotation_info}>
                    <FormattedMessage id="quotation.ps" defaultMessage="截止有效期"/>
                </p>
            </div>
		</div>
    }
}

export default QuotationPdf;