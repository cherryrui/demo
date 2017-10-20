import axios from 'axios';
import React from 'react';
import css from './Quotation.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import moment from 'moment';
import QuotationPdf from '../QuotationPdf/QuotationPdf.js';
import ModalHeader from '../Public/ModalHeader/ModalHeader.js';
import CusModal from '../Public/CusModal/CusModal.js';
import ProductItem from '../Public/ProductItem/ProductItem.js'
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
	InputNumber,
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
				totalSalePrice: 0,
				profits: 0,
				invoiceType: 1, //发票类型
				totalQuantity: 0,
				participant: {},
			},
			width: "80%", //模态框宽度
		}
		this.user = sessionStorage.user ? JSON.parse(sessionStorage.user) : null;
		this.formatMessage = this.props.intl.formatMessage;
		this.columns = [{
			title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
			width: "430px",
			render: (record) => <ProductItem className={css.table_product} product={record}/>
		}, {
			title: <FormattedMessage id="cart.specifucation" defaultMessage="我的购物车"/>,
			width: "150px",
			className: css.table_col,
			render: (record) => <div>
                {record.selectSpecs?record.selectSpecs.map((item,index)=>{
                    return <p>{item.specName}:{item.specVal[0].specValue}</p>
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
			dataIndex: 'salePrice',
			key: 'salePrice',
			render: (text, record) => <div className={css.table_num}>
                <Input addonBefore={<Icon onClick={this.handleNum.bind(this,record,"salePrice",-1)} type="minus" />}
                addonAfter={<Icon onClick={this.handleNum.bind(this,record,"salePrice",1)} type="plus" />}
                onChange={this.handleNum.bind(this,record,"salePrice")}
                value={"$"+text} />
            </div>
		}, {
			title: <FormattedMessage id="quotation.platform.price" defaultMessage="平台销售价"/>,
			width: "110px",
			dataIndex: 'price',
			key: 'price',
			className: css.table_col,
			render: (text) => <span className={css.table_price}>${text}</span>
		}, {
			title: <FormattedMessage id="quotation.agency.price" defaultMessage="代理商销售价"/>,
			width: "110px",
			className: css.table_col,
			dataIndex: 'priceSupplier',
			key: 'priceSupplier',
			render: (text) => <span className={css.table_price}>${text}</span>
		}, ]
	}
	componentWillMount() {
		if (!sessionStorage.user) {
			this.props.history.pushState(null, "/");
		} else if (this.props.params.id) {
			axios.get(`/quotation/get-quotation-byid.json?id=${this.props.params.id}`).then(res => {
				this.setState({
					quotation: res.data.quotation,
				})
			})

		} else if (sessionStorage.quotation) {
			let quotation = JSON.parse(sessionStorage.quotation);
			sessionStorage.removeItem("quotation");
			let data = this.state.quotation;
			data.products = quotation.products;
			data.totalSalePrice = quotation.sale_price.toFixed(2);
			data.profits = quotation.profit.toFixed(2);
			data.totalQuantity = quotation.sum_num;
			data.participant = {
				ageCompanyName: this.user.companyName,
				ageDepartment: "",
				ageContactPerson: this.user.realName,
				ageContectPhone: this.user.tel,
				ageEmail: this.user.email,
				ageFax: "",
				cusCompanyName: '',
				cusDepartment: '',
				cusContactPerson: '',
				cusContectPhone: '',
				cusEmail: '',
				cusFax: '',
			}
			this.setState({
				quotation: data
			})
		} else {
			this.props.history.pushState(null, "page/cart");
		}
	}
	getProfile(products) {
		let profits = 0,
			sale_price = 0,
			sum = 0;
		products.map(item => {
			profits += item.productNum * (item.sale_price - item.priceSupplier);
			sale_price += item.productNum * item.sale_price;
			sum += item.productNum;
		})
		let quotation = this.state.quotation;
		quotation.totalSalePrice = sale_price.toFixed(2);
		quotation.profits = profits.toFixed(2);
		this.setState({
			quotation: quotation
		})
	}
	componentDidMount() {
		this.quotation.scrollIntoView();
	}
	handleNum = (record, name, value) => {
		let data = this.state.quotation;
		let sum = 0,
			num = 0,
			profit = 0;
		data.products.map(item => {
			if (item.id == record.id) {
				if (isNaN(value)) {
					console.log(value, value.target.value);
					let price = value.target.value.substr(1);
					price = price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
					item[name] = price && !isNaN(price) ? price : 0;
				} else {
					item[name] = (parseFloat(item[name]) + value) > 0 ? parseFloat(item[name]) + value : 0;
				}
			}
			item.productNum = item.productNum > item.moq ? item.productNum : item.moq;
			sum += item.salePrice * item.productNum;
			num += item.productNum;
			profit += (item.salePrice - item.priceSupplier) * item.productNum;
		})
		data.totalSalePrice = sum.toFixed(2);
		data.profits = profit.toFixed(2);
		data.totalQuantity = num;
		this.setState({
			products: data,
			totalSalePrice: sum.toFixed(2),
			profits: profit.toFixed(2),
			quotation: data
		})
	}
	handleInfo = (type, name, e) => {
		let quotation = this.state.quotation;
		switch (type) {
			case 0:
				quotation[name] = e.target.value;
				break;
			case 1: //保存客户信息,保存代理商信息
				quotation.participant[name] = e.target.value;
				break;
			case 2: //
				quotation[name] = e;
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
		this.state.quotation.exportOption = this.state.quotation.exportOption ? this.state.quotation.exportOption : {};
		this.state.quotation.exportOption[key] = e.target.checked;
	}
	onlineShow = () => {
		this.setState({
			visible: true,
		})
	}
	exportPDF = () => {
		this.exportQuotation();
	}
	exportQuotation = () => {

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
		if (sessionStorage.user) {
			if (this.state.quotation.quotationSubject) {
				let param = this.state.quotation;
				console.log(param);
				/*param.profits = (param.profits).toFixed(2);*/
				param.participant = JSON.stringify(param.participant);
				var productList = [];
				this.state.quotation.products.map(item => {
					productList.push({
						productId: item.productId,
						productSpecification: item.itemId,
						productBrand: JSON.stringify({
							brandNameCn: item.brandNameCn,
							brandNameEn: item.brandNameEn,
						}),
						productUrl: item.coverUrl,
						minBuyQuantity: item.moq,
						productNo: item.productNo,
						productName: item.productName,
						productPrice: item.price,
						salePrice: item.salePrice,
						agentPrice: item.priceSupplier,
						productNum: item.productNum,
						totalMoney: item.salePrice * item.productNum,
					});
				})
				param.productList = JSON.stringify(productList);
				param.exportOption = JSON.stringify(this.state.quotation.exportOption);
				delete param.products;
				delete param.num;
				param.userId = JSON.parse(sessionStorage.user).uid;
				axios.post('/quotation/create-quotation.json', param).then(res => {
					if (res.data.isSucc) {
						sessionStorage.removeItem("quotation");
						this.props.history.pushState(null, "page/quotation-pdf/" + res.data.result);
					} else {
						message.error(res.data.message);
					}
				})

			} else {
				message.error(this.formatMessage({
					id: "quotation.param"
				}))
			}
		} else {
			message.error(this.formatMessage({
				id: "product.login.info"
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
            		<p className={css.sum_right}>{this.state.quotation.totalQuantity}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.sum" defaultMessage="总售价"/>:
            		<p className={css.sum_price}>{this.state.quotation.totalSalePrice?this.state.quotation.totalSalePrice:""}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.profits" defaultMessage="利润"/>:
            		<p className={css.sum_profit}>{this.state.quotation.profits?this.state.quotation.profits:0}</p>
            	</p>
            	<p className={css.sum_item}>
            		<FormattedMessage id="cart.shipping.cost" defaultMessage="邮费"/>:
            		<InputNumber size="large" min={0} precision="2" value={this.state.quotation.shoppingCharges} className={css.sum_right}
            		onChange={this.handleInfo.bind(this,2,"shoppingCharges")} />
            	</p>
            </div>
            <div className={css.infomation} id="info">
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
	            		<Input size='large' value={this.state.quotation.participant.cusCompanyName} onChange={this.handleInfo.bind(this,1,"cusCompanyName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.cusDepartment} onChange={this.handleInfo.bind(this,1,"cusDepartment")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<span></span>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.cusContactPerson} onChange={this.handleInfo.bind(this,1,"cusContactPerson")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.cusContectPhone} onChange={this.handleInfo.bind(this,1,"cusContectPhone")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.cusEmail} onChange={this.handleInfo.bind(this,1,"cusEmail")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.fox" defaultMessage="传真"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.cusFax} onChange={this.handleInfo.bind(this,1,"cusFax")} />
	            	</p>
            	</div>
            	<div className={css.right}>
	            	<p className={css.item_one}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.company.name" defaultMessage="公司名称"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageCompanyName} onChange={this.handleInfo.bind(this,1,"ageCompanyName")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.department" defaultMessage="部门"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageDepartment} onChange={this.handleInfo.bind(this,1,"ageDepartment")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.name" defaultMessage="联系人"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageContactPerson} onChange={this.handleInfo.bind(this,1,"ageContactPerson")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.tel" defaultMessage="电话"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageContectPhone} onChange={this.handleInfo.bind(this,1,"ageContectPhone")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.email" defaultMessage="邮箱"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageEmail} onChange={this.handleInfo.bind(this,1,"ageEmail")} />
	            	</p>
	            	<p className={css.item}>
	            		<p className={css.title}>
	            			<FormattedMessage id="quotation.contact.fox" defaultMessage="传真"/>:
	            		</p>
	            		<Input size='large' value={this.state.quotation.participant.ageFax} onChange={this.handleInfo.bind(this,1,"ageFax")} />
	            	</p>
            	</div>
            </div>
            <p className={`${css.item} ${css.padd_20_w}`}>
            	<p className={css.title}>
            		<span style={{color: "red",fontSize:"16px"}}>*&nbsp;</span>
	            	<FormattedMessage id="quotation.subject" defaultMessage="报价单主题"/>:
	            </p>
	            <Input size='large' value={this.state.quotation.quotationSubject} onChange={this.handleInfo.bind(this,0,"quotationSubject")} />
	        </p>
	        <p className={`${css.item} ${css.padd_20}`}>
	            <p className={css.title}>
	            	<FormattedMessage id="quotation.invoice" defaultMessage="分类"/>:
	            </p>
				<RadioGroup onChange={this.handleInfo.bind(this,0,"invoiceType")} value={this.state.quotation.invoiceType}>
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
	            <TextArea value={this.state.quotation.remark} onChange={this.handleInfo.bind(this,0,"remark")} rows={2} />
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