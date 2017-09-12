import React from 'react';
import css from './QuotationPdf.scss';
import moment from 'moment';
import {
	FormattedMessage,
} from 'react-intl';

import {
	Table,
	Icon,
} from 'antd';
class QuotationPdf extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

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
			width: "10%",
			className: css.table_col,
			render: (record) => <div>
                {record.attr.map((item,index)=>{
                    return <div>
                        {item.name}
                    </div>
                })}
            </div>
		}, {
			title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
			width: "18%",
			className: css.table_col,
			dataIndex: 'num',
			key: 'num',
		}, {
			title: <FormattedMessage id="quotation.sale.price" defaultMessage="我的购物车"/>,
			width: "18%",
			className: css.table_col,
			dataIndex: 'sale_price',
			key: 'sale_price',
		}, {
			title: <FormattedMessage id="quotation.platform.price" defaultMessage="平台销售价"/>,
			width: "8%",
			dataIndex: 'price',
			key: 'price',
			className: css.table_col,
			render: (text) => <span className={css.table_price}>${text}</span>
		}, {
			title: <FormattedMessage id="quotation.agency.price" defaultMessage="代理商销售价"/>,
			width: "8%",
			className: css.table_col,
			dataIndex: 'agent_price',
			key: 'agent_price',
			render: (text) => <span className={css.table_price}>${text}</span>
		}, ]
	}

	render() {

		return <div className={css.body}>
			<div className={css.title}>
				<p className={css.logo}>LOGO</p>
				<div>
					<p className={css.title_item}>
						<FormattedMessage id="quotation.url" defaultMessage="报价单"/>
						:DSADSA
					</p>
					<p className={css.title_item}>
						<FormattedMessage id="quotation.contact.tel" defaultMessage="报价单"/>
						:DSADSA</p>
					<p className={css.title_item}>
					<FormattedMessage id="quotation.contact.email" defaultMessage="报价单"/>
						:DSADSA</p>
					<p className={css.title_item}>
					<FormattedMessage id="quotation.url" defaultMessage="报价单"/>
						:DSADSA</p>
				</div>
			</div>
			<p className={css.quotation_title}>
				<FormattedMessage id="quotation.quotation" defaultMessage="报价单"/>
			</p>
			<p>
				<FormattedMessage id="quotation.subject" defaultMessage="报价单"/>
				:{this.props.quotation.subject}
			</p>
			<p className={css.quotation_create}>
				<p>
					<FormattedMessage id="quotation.no" defaultMessage="报价单"/>
					:{this.props.quotation.id}
				</p>
				<p>
					<FormattedMessage id="quotation.create_time" defaultMessage="报价单"/>
					：{this.props.quotation.create_time?moment(this.props.quotation.create_time).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD')}
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
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.company}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.dapartment}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.name}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.tel}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.email}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            		</p>
	            		<p>{this.props.quotation.clients.fox}</p>
	            	</p>
            	</div>
            	<div className={css.right}>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.company}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.department}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.name}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.tel}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.email}</p>
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.info_title}>
	            			<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            		</p>
	            		<p>{this.props.quotation.agent.fox}</p>
	            	</p>
            	</div>
            </div>
			<Table 
                pagination={false}
                rowKey="id"
                bordered  
                columns={this.columns} 
                dataSource={this.props.quotation.products} />
            <div className={css.order_sum}>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.num" defaultMessage="总数量"/>:
            		<p className={css.sum_right}>{this.props.quotation.products.length}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.sum" defaultMessage="总售价"/>:
            		<p className={css.sum_right}>{this.props.quotation.sale_price}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.profits" defaultMessage="利润"/>:
            		<p className={css.sum_right}>{this.props.quotation.profit}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
            		<p className={css.sum_right}>{this.props.quotation.postage}</p>
            	</p>
            </div>
            <p className={css.quotation_info}>
            	<FormattedMessage id="quotation.valid.date" defaultMessage="截止有效期"/>:
            	{moment(this.props.quotation.valid_date).format('YYYY-MM-DD hh:mm:ss')}
	        </p>
	        <p className={css.quotation_info}>
            	<FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>:
            	{this.props.quotation.pay_mode}
            </p>
            <p className={css.quotation_info}>
            	<FormattedMessage id="quotation.valid.date" defaultMessage="截止有效期"/>:
	        </p>
	        <p className={css.quotation_info}>
            	<FormattedMessage id="app.home" defaultMessage="分类"/>:
	        </p>
	        <p className={css.quotation_info}>
            	<FormattedMessage id="cart.remark" defaultMessage="备注"/>:
	        </p>
	        <p className={css.quotation_info}>
            	<FormattedMessage id="quotation.ps" defaultMessage="截止有效期"/>:
	        </p>

		</div>
	}
}

export default QuotationPdf;