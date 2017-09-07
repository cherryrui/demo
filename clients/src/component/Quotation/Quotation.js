import axios from 'axios';
import React from 'react';
import css from './Quotation.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import QuotationPdf from '../QuotationPdf/QuotationPdf.js';
import ModalHeader from '../Public/ModalHeader/ModalHeader.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
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
	DatePicker,
	Modal
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const {
	TextArea
} = Input;
const RadioGroup = Radio.Group;

class Quotation extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			quotation: {
				products: [],
				num: 0,
				sale_price: 100,
				profit: 200,
				pay_mode: 0, //支付方式
				invoice_type: 0, //发票类型
				clients: {},
				agent: {},
			},
			width: "80%", //模态框宽度

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
		let quotation = JSON.parse(localStorage.quotation);
		let data = this.state.quotation;
		data.products = quotation.products;
		data.sale_price = quotation.sale_price;
		data.profit = quotation.profit;
		this.setState({
			quotation: data
		})
	}
	getProfile(products) {
		let profits = 0,
			sale_price = 0;
		products.map(item => {
			profits += item.num * (item.sale_price - item.agent_price);
			sale_price += item.num * item.sale_price;
		})
		let quotation = this.state.quotation;
		quotation.sale_price = sale_price;
		quotation.profit = profits
		this.setState({
			sale_price: sale_price,
			profit: profits,
			quotation: quotation
		})
	}
	componentDidMount() {
		console.log(this.quotation);
		this.quotation.scrollIntoView();
	}
	handleNum = (record, name, value) => {
		console.log(record, name, value);
		let data = this.state.quotation;
		let sum = 0,
			profit = 0;
		data.products.map(item => {
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
		data.sale_price = sum;
		data.profit = profit;
		this.setState({
			products: data,
			sale_price: sum,
			profit: profit,
			quotation: data
		})
	}
	handleInfo = (type, name, e) => {
		console.log(type, name, e);
		switch (type) {
			case 0:
				this.state.quotation[name] = e.target.value;
				break;
			case 1: //保存客户信息
				this.state.quotation.clients[name] = e.target.value;
				break;
			case 2: //保存代理商信息
				this.state.quotation.agent_price[name] = e.target.value;
				break;
			case 3:
				this.state.quotation[name] = e;
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
	handlePrint = (key, e) => {
		this.state.quotation.select = this.state.quotation.select ? this.state.quotation.select : {};
		this.state.quotation.select[key] = e.target.checked;
	}
	onlineShow = () => {
		this.setState({
			visible: true,
		})
	}
	export = () => {
		this.setState({
			visible: true,
		}, this.exportQuotation)
	}
	exportQuotation = () => {
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
			}
		});
	}
	handleCancel = () => {
		this.setState({
			visible: false,
		})
	}
	handleState = (width) => {
		console.log(width);
		this.setState({
			width: width,
		})
	}


	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		console.log(this.state.width);
		return <div className={appcss.body} ref={(quotation)=>this.quotation=quotation}>
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
                dataSource={this.state.quotation.products} />
            <div className={css.order_sum}>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.num" defaultMessage="总数量"/>:
            		<p className={css.sum_right}>{this.state.quotation.products.length}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.sum" defaultMessage="总售价"/>:
            		<p className={css.sum_right}>{this.state.quotation.sale_price}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.profits" defaultMessage="利润"/>:
            		<p className={css.sum_right}>{this.state.quotation.profit}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
            		<Input size="large" type="number" className={css.sum_right} 
            		onChange={this.handleInfo.bind(this,0,"postage")} />
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
	            		<Input size='large' defaultValue={this.state.quotation.agent.company} onChange={this.handleInfo.bind(this,2,"company")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.state.quotation.agent.department} onChange={this.handleInfo.bind(this,2,"department")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.state.quotation.agent.name} onChange={this.handleInfo.bind(this,2,"name")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.state.quotation.agent.tel} onChange={this.handleInfo.bind(this,2,"tel")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.state.quotation.agent.email} onChange={this.handleInfo.bind(this,2,"email")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="app.home" defaultMessage="分类"/>:
	            		</p>
	            		<Input size='large' defaultValue={this.state.quotation.agent.fox} onChange={this.handleInfo.bind(this,2,"fox")} />
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
	            <RadioGroup onChange={this.handleInfo.bind(this,0,"pay_mode")}>
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
	            <RadioGroup onChange={this.handleInfo.bind(this,0,"invoice_type")} >
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
	            <TextArea onChange={this.handleInfo.bind(this,0,"note")} rows={2} />
	        </p>
	        <p className={`${css.item} ${css.export}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="quotation.export.option" defaultMessage="分类"/>:
	            </p>
	            <div>
	            	{operator.quot_title.map(item=>{
	            		return <Checkbox
	            			onChange={this.handlePrint.bind(this,item.value)}>
	            			<FormattedMessage id={item.key} defaultMessage="分类"/>
	            		</Checkbox>
	            	})}
	            </div>
	        </p>
	        <div className={css.footer}>
	        	<p className={appcss.button_orange} onClick={this.onlineShow}>
                    <FormattedMessage id="quotation.online" defaultMessage="支付"/>
                </p>
                <p className={appcss.button_green} onClick={this.export}>
                    <FormattedMessage id="quotation.export" defaultMessage="支付"/>
                </p>
                <p className={appcss.button_theme}>
                    <FormattedMessage id="quotation.generate" defaultMessage="支付"/>
                </p>
	        </div>
	        <Modal
		          width={this.state.width} 
		          title={<ModalHeader width={this.state.width}      
			          setWidth={this.handleState} 
			          export={this.exportQuotation}
			          title={formatMessage({
	                            id: 'quotation.online'
	                        })}/>}
		          visible={this.state.visible}
		          footer={null}
		          onCancel={this.handleCancel}
	        >
		        <div id="content">
		          <QuotationPdf quotation={this.state.quotation}/>
		        </div>
	        </Modal>
		</div>
	}


}
export default injectIntl(Quotation);