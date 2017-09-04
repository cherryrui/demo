import axios from 'axios';
import React from 'react';
import css from './Quotation.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import {
	FormattedMessage,
} from 'react-intl';
import {
	Link
} from 'react-router';
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
	DatePicker
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const {
	TextArea
} = Input;
const RadioGroup = Radio.Group;

class Quotation extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			num: 0,
			sale_price: 100,
			profit: 200,
			pay_mode: 0, //支付方式
			invoice_type: 0, //发票类型

		}
		this.customer = {};
		this.agent = {};

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
			render: (text, record) => <div className={css.table_num}>
                <Input type="number" addonBefore={<Icon onClick={this.handleNum.bind(this,record,"num",-1)} type="minus" />} 
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,"num",1)} type="plus" />} 
                onChange={this.handleNum.bind(this,record,"num")}
                value={text} />
            </div>
		}, {
			title: <FormattedMessage id="quotation.sale.price" defaultMessage="我的购物车"/>,
			width: "18%",
			className: css.table_col,
			dataIndex: 'sale_price',
			key: 'sale_price',
			render: (text, record) => <div className={css.table_num}>
                <Input type="number" addonBefore={<Icon onClick={this.handleNum.bind(this,record,"sale_price",-1)} type="minus" />} 
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,"sale_price",1)} type="plus" />} 
                onChange={this.handleNum.bind(this,record,"sale_price")}
                value={text} />
            </div>
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
	componentWillMount() {
		let data = [{
			id: 1,
			name: "product nameni你打大萨达阿萨德阿萨德阿萨德撒大声地撒大声地打手大大打手大萨达阿达撒大声地打手d",
			img: '../img/product.jpg',
			price: 100,
			agent_price: 80,
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
			}]
		}];
		data.map(item => {
			item.sale_price = item.price;
		})
		this.setState({
			data: data,
			num: 0,
			sale_price: 100,
			profit: 200,
		})

	}
	handleNum = (record, name, value) => {
		console.log(record, name, value);
		let data = this.state.data;
		let sum = 0,
			profit = 0;
		data.map(item => {
			if (item.id == record.id) {
				if (isNaN(value)) {
					item[name] = isNaN(value.target.value) ? 0 : parseFloat(value.target.value).toFixed(2);
				} else {
					item[name] = item[name] + value;
				}
			}
			sum += item.sale_price * item.num;
			profit += (item.sale_price - item.agent_price) * item.num;
		})
		this.setState({
			data: data,
			sale_price: sum,
			profit: profit,
		})
	}
	handleInfo = (type, name, e) => {
		switch (type) {
			case 0:
				break;
			case 1: //保存客户信息
				this.customer[name] = e.target.value;
				break;
			case 2: //保存代理商信息
				this.agent[name] = e.target.value;
				break;
			case 3:
				break;
			default:
				break;
		}

	}
	onChange = (field, value) => {
		this.setState({
			[field]: value,
		});
	}


	render() {

		return <div className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/cart">
                            <FormattedMessage id="cart.cart" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="quotation.generate" defaultMessage={this.state.search}/>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <Table 
                pagination={false}
                rowKey="id"
                bordered  
                columns={this.columns} 
                dataSource={this.state.data} />
            <div className={css.order_sum}>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.num" defaultMessage="总数量"/>:
            		<p className={css.sum_right}>{this.state.num}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.sum" defaultMessage="总售价"/>:
            		<p className={css.sum_right}>{this.state.sale_price}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.profits" defaultMessage="利润"/>:
            		<p className={css.sum_right}>{this.state.profit}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
            		<Input size="large" type="number" className={css.sum_right} />
            	</p>
            </div>
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
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"company")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"department")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"name")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"tel")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"email")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            		</p>
	            		<Input size='large' onChange={this.handleInfo.bind(this,1,"fox")} />
	            	</p>
            	</div>
            	<div className={css.right}>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.company} onChange={this.handleInfo.bind(this,2,"company")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.department} onChange={this.handleInfo.bind(this,2,"department")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.name} onChange={this.handleInfo.bind(this,2,"name")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.tel} onChange={this.handleInfo.bind(this,2,"tel")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.email} onChange={this.handleInfo.bind(this,2,"email")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.agent.fox} onChange={this.handleInfo.bind(this,2,"fox")} />
	            	</p>
            	</div>
            </div>
            <p className={`${css.item} ${css.padd_20_w}`}>
            	<p className={css.title}>
	            	<FormattedMessage id="quotation.subject" defaultMessage="报价单主题"/>:
	            </p>
	            <Input size='large' onChange={this.handleInfo.bind(this,0,"subject")} />
	        </p>
	        <p className={css.valid_date}>
            	<p className={css.title}>
	            	<FormattedMessage id="quotation.valid.date" defaultMessage="截止有效期"/>:
	            </p>
	            <DatePicker
	            	size="large"
		          	showTime
		          	format="YYYY-MM-DD HH:mm:ss"
		          	onChange={this.handleInfo.bind(this,3,"valid_date")}
		        />
	        </p>
	        <p className={`${css.item} ${css.padd_20_w}`}>
	        	<p className={css.title}>
	            	<FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>:
	            </p>
	            <RadioGroup onChange={this.handleInfo.bind(this,0,"pay_mode")} value={this.state.value}>
	            	{operator.pay_mode.map(item=>{
	            		return <Radio value={item.id}>
	            			<FormattedMessage id={item.key} defaultMessage={item.value}/>
	            		</Radio>
	            	})}
			   
			    </RadioGroup>

	        </p>
	        <p className={`${css.item} ${css.padd_20}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            </p>
	            <RadioGroup onChange={this.this.handleInfo.bind(this,0,"invoice_type")} value={this.state.value}>
			        {operator.invoice_type.map(item=>{
	            		return <Radio value={item.id}>
	            			<FormattedMessage id={item.key} defaultMessage={item.value}/>
	            		</Radio>
	            	})}
			    </RadioGroup>

	        </p>
	        <p className={`${css.item} ${css.remark}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="cart.remark" defaultMessage="备注"/>:
	            </p>
	            <TextArea onChange={this.this.handleInfo.bind(this,0,"note")} rows={2} />
	        </p>
	        <p className={`${css.item} ${css.export}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="quotation.export.option" defaultMessage="分类"/>:
	            </p>
	            <div>
	            	{operator.quot_title.map(item=>{
	            		return <Checkbox onChange={this.onChange} onChange={this.this.handlePrint.bind(this,item.key)}>
	            			<FormattedMessage id={item.key} defaultMessage="分类"/>
	            		</Checkbox>
	            	})}
	            </div>
	        </p>
	        <div className={css.footer}>
	        	<Button size="large" type="primary" className={appcss.button_orange}>
                    <FormattedMessage id="quotation.online" defaultMessage="支付"/>
                </Button>
                <Button size="large" type="primary" className={appcss.button_green}>
                    <FormattedMessage id="quotation.export" defaultMessage="支付"/>
                </Button>
                <Button size="large" type="primary" className={appcss.button_theme}>
                    <FormattedMessage id="quotation.generate" defaultMessage="支付"/>
                </Button>
	        </div>
			
		</div>
	}


}
export default Quotation;