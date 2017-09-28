import axios from 'axios';
import React from 'react';
import css from './Quotation.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import moment from 'moment';
import QuotationPdf from '../QuotationPdf/QuotationPdf.js';
import ModalHeader from '../Public/ModalHeader/ModalHeader.js';
import CusModal from '../Public/CusModal/CusModal.js';
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
	Modal,
	message
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
				pay_mode_name: "在线",
				invoice_type: 0, //发票类型
				clients: {},
				agent: {},
			},
			width: "680px", //模态框宽度
		}
		this.user = JSON.parse(sessionStorage.user);
		this.formatMessage = this.props.intl.formatMessage;
		this.columns = [{
			title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
			width: "450px",
			render: (record) => <div className={css.table_product}>
                    <img src={record.coverUrl}/>
	                <div className={css.info}>
	                    <p className={css.name}>{record.productName}</p>
	                    <p>
	                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>
	                        ：{record.brandNameCn}
	                    </p>
	                    <p>
	                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
	                        ：{record.moq}
	                    </p>
	                    <p>
	                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
	                        ：{record.productNo}</p>
	                </div>
                </div>
		}, {
			title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
			width: "150px",
			className: css.table_col,
			render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return <p>{item.specName}:{item.specVal[0].spec_value}</p>
                }):""}
            </div>
		}, {
			title: <FormattedMessage id="cart.num" defaultMessage="我的购物车"/>,
			width: "140px",
			className: css.table_col,
			dataIndex: 'productNum',
			key: 'productNum',
			render: (text, record) => <div className={css.table_num}>
                <Input addonBefore={<Icon onClick={this.handleNum.bind(this,record,"productNum",-1)} type="minus" />}
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,"productNum",1)} type="plus" />}
                onChange={this.handleNum.bind(this,record,"productNum")}
                value={text} />
            </div>
		}, {
			title: <FormattedMessage id="quotation.sale.price" defaultMessage="我的购物车"/>,
			width: "180px",
			className: css.table_col,
			dataIndex: 'sale_price',
			key: 'sale_price',
			render: (text, record) => <div className={css.table_num}>
                <Input  addonBefore={<Icon onClick={this.handleNum.bind(this,record,"sale_price",-1)} type="minus" />}
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,"sale_price",1)} type="plus" />}
                onChange={this.handleNum.bind(this,record,"sale_price")}
                value={"$"+(text?text:record.price)} />
            </div>
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
		}, ]
	}
	componentWillMount() {
		if (this.props.params.id) {
			axios.get(`/quotation/get-quotation-byid.json?id=${this.props.params.id}`).then(res => {
				this.setState({
					quotation: res.data.quotation,
				})
			})

		} else if (sessionStorage.quotation) {
			let quotation = JSON.parse(sessionStorage.quotation);
			let data = this.state.quotation;
			data.products = quotation.products;
			data.sale_price = quotation.sale_price;
			data.profit = quotation.profit;
			data.sum_num = quotation.sum_num;
			data.agent = {
				companyName: this.user.companyName,
				deapartment: "",
				realName: this.user.realName,
				tel: this.user.tel,
				email: this.user.email,
				fox: ""
			}
			this.setState({
				quotation: data
			})
		} else {
			message.error("");
			this.props.history.pushState(null, "/");
		}
	}
	getProfile(products) {
		let profits = 0,
			sale_price = 0,
			sum = 0;
		products.map(item => {
			profits += item.productNum * (item.sale_price - item.agent_price);
			sale_price += item.productNum * item.sale_price;
			sum += item.productNum;
		})
		let quotation = this.state.quotation;
		quotation.sale_price = sale_price;
		quotation.profit = profits
		this.setState({
			quotation: quotation
		})
	}
	componentDidMount() {
		this.quotation.scrollIntoView();
	}
	handleNum = (record, name, value) => {
		console.log(record, name)
		let data = this.state.quotation;
		let sum = 0,
			num = 0,
			profit = 0;
		data.products.map(item => {
			if (item.id == record.id) {
				if (isNaN(value)) {
					console.log(value.target.value);
					item[name] = isNaN(value.target.value.substr(1)) ? 0 : parseFloat(value.target.value.substr(1));
				} else {
					console.log(value);
					item[name] = item[name] + value;
				}
			}
			item.productNum = item.productNum > 1 ? item.productNum : 1;
			sum += item.sale_price * item.productNum;
			num += item.productNum;
			profit += (item.sale_price - item.agent_price) * item.productNum;
		})
		data.sale_price = sum;
		data.profit = profit;
		data.sum_num = num;
		this.setState({
			products: data,
			sale_price: sum,
			profit: profit,
			quotation: data
		})
	}
	handleInfo = (type, name, e) => {
		console.log(type, name, e);
		let quotation = this.state.quotation;
		switch (type) {
			case 0:
				quotation[name] = e.target.value;
				break;
			case 1: //保存客户信息
				quotation.clients[name] = e.target.value;
				break;
			case 2: //保存代理商信息
				quotation.agent[name] = e.target.value;
				break;
			case 3:
				quotation[name] = e;
				break;
			default:
				break;
		}
		this.setState({
			quotation: quotation
		})

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
	exportPDF = () => {
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

	/**
	 * 检查数据完整性
	 * @return {[type]} [description]
	 */
	checkParam() {
		let flag = true;
		let quotation = this.state.quotation;
		if (!quotation.clients.realName || !quotation.agent.realName ||
			!quotation.clients.tel || !quotation.agent.tel || !quotation.subject || !quotation.valid_date) {
			flag = false;
		}
		return flag;
	}

	saveQuotation = () => {
		console.log(this.state.quotation);
		if (this.checkParam()) {

		} else {
			message.error(this.formatMessage({
				id: "quotation.param"
			}))
		}
	}


	render() {
		console.log(this.state.quotation);
		return <div className={appcss.body} ref={(quotation)=>this.quotation=quotation}>
		<div  className={css.qutation}>
            <div className={`${appcss.navigate} ${css.qutation_title}`}>
            	{this.state.quotation.id?<Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/mine">
                            <FormattedMessage id="mine.person" defaultMessage="个人中心"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item >
                        <Link to="page/mine/quotation-list">
                            <FormattedMessage id="mine.quotation.list" defaultMessage="报价单列表"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {this.state.quotation.subject}
                    </Breadcrumb.Item>
                </Breadcrumb>
                :<Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/cart">
                            <FormattedMessage id="cart.cart" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="quotation.generate" defaultMessage={this.state.search}/>
                    </Breadcrumb.Item>
                </Breadcrumb>}
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
            		<p className={css.sum_right}>{this.state.quotation.sum_num}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.sum" defaultMessage="总售价"/>:
            		<p className={css.sum_price}>{this.state.quotation.sale_price?this.state.quotation.sale_price.toFixed(2):""}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.profits" defaultMessage="利润"/>:
            		<p className={css.sum_profit}>{this.state.quotation.profit?this.state.quotation.profit.toFixed(2):0}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
            		<Input size="large" type="number" value={this.state.quotation.postage} className={css.sum_right}
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
	            	<p className={css.item_one}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.companyName} onChange={this.handleInfo.bind(this,1,"companyName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.department} onChange={this.handleInfo.bind(this,1,"department")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.realName} onChange={this.handleInfo.bind(this,1,"realName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.tel} onChange={this.handleInfo.bind(this,1,"tel")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.email} onChange={this.handleInfo.bind(this,1,"email")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.fox" defaultMessage="传真"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.clients.fox} onChange={this.handleInfo.bind(this,1,"fox")} />
	            	</p>
            	</div>
            	<div className={css.right}>
	            	<p className={css.item_one}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.companyName} onChange={this.handleInfo.bind(this,2,"companyName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.department} onChange={this.handleInfo.bind(this,2,"department")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.realName} onChange={this.handleInfo.bind(this,2,"realName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.tel} onChange={this.handleInfo.bind(this,2,"tel")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.email} onChange={this.handleInfo.bind(this,2,"email")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.fox" defaultMessage="传真"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.agent.fox} onChange={this.handleInfo.bind(this,2,"fox")} />
	            	</p>
            	</div>
            </div>
            <p className={`${css.item} ${css.padd_20_w}`}>
            	<p className={css.title}>
	            	<FormattedMessage id="quotation.subject" defaultMessage="报价单主题"/>:
	            </p>
	            <Input size='large' value={this.state.quotation.subject} onChange={this.handleInfo.bind(this,0,"subject")} />
	        </p>
	        <p className={css.valid_date}>
            	<p className={css.title}>
	            	<FormattedMessage id="quotation.valid.date" defaultMessage="截止有效期"/>:
	            </p>
	            <DatePicker
	            	size="large"
		          	showTime
		          	style={{width:"300px"}}
		          	defaultValue={this.state.quotation.valid_date?moment(this.state.quotation.valid_date, "YYYY-MM-DD HH:mm:ss"):null}
		          	format="YYYY-MM-DD HH:mm:ss"
		          	onChange={this.handleInfo.bind(this,3,"valid_date")}
		        />
	        </p>
	        <p className={`${css.item} ${css.padd_20_w}`}>
	        	<p className={css.title}>
	            	<FormattedMessage id="cart.pay.mode" defaultMessage="支付方式"/>:
	            </p>
	            <RadioGroup onChange={this.handleInfo.bind(this,0,"pay_mode")} value={this.state.quotation.pay_mode}>
	            	{operator.pay_mode.map(item=>{
	            		return <Radio value={item.id}>
	            			<FormattedMessage id={item.key} defaultMessage={item.value}/>
	            		</Radio>
	            	})}

			    </RadioGroup>
	        </p>
	        <p className={`${css.item} ${css.padd_20}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="quotation.invoice" defaultMessage="分类"/>:
	            </p>
				<RadioGroup onChange={this.handleInfo.bind(this,0,"invoice_type")} value={this.state.quotation.invoice_type}>
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
	            <TextArea value={this.state.quotation.note} onChange={this.handleInfo.bind(this,0,"note")} rows={2} />
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
                    <FormattedMessage id="quotation.online" defaultMessage="在线预览"/>
                </p>
                <p className={appcss.button_green} onClick={this.exportPDF}>
                    <FormattedMessage id="quotation.export" defaultMessage="导出报价单"/>
                </p>
                <p className={appcss.button_theme} onClick={this.saveQuotation}>
                	{this.state.quotation.id?<FormattedMessage id="quotation.save" defaultMessage="保存报价单"/>
                	:<FormattedMessage id="quotation.generate" defaultMessage="生成报价单"/>}
                </p>
	        </div>
            <Modal
                width={this.state.width}
                title={<ModalHeader width={this.state.width}
                    setWidth={this.handleState}
                    export={this.exportQuotation}
                    title={this.formatMessage({
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
	</div>
	}


}
export default injectIntl(Quotation);