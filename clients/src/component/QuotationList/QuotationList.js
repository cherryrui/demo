import React from 'react';
import css from './QuotationList.scss';
import basecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import moment from 'moment';
import QuotationPdf from '../QuotationPdf/QuotationPdf.js';
import CusPagination from '../Public/CusPagination/CusPagination.js';
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
	Input,
	Button,
	Icon,
	Modal,
	message,
	Pagination
} from 'antd';
const Search = Input.Search;


class QuotationList extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			current: 1,
			pageSize: 10,
			info: "",
			total: 0,
			quotation: null,
			visible: false,
			loading: false,
			width: "1200px",
			show_sperator: false,
		};
		this.search = "";
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		this.getQuotation();
		this.props.goTop ? this.props.goTop() : "";
	}
	getQuotation() {
		let param = {
			pageNo: this.state.current,
			pageSize: this.state.pageSize,
			quotationSubject: this.search,
		};
		axios.post(`/quotation/get-quotation.json`, param).then(res => {
			if (res.data.isSucc) {
				this.setState({
					data: res.data.result.list,
					total: res.data.result.allRow
				})
			} else if (res.data.code == 104) {
				this.props.login(true);
			} else {
				message.error(res.data.message);
			}

		})
		this.props.goTop ? this.props.goTop() : "";
	}
	getQuotationDetail(qid, type) {
		axios.get('/quotation/get-quotation-byid.json?id=' + qid).then(res => {
			if (res.data.isSucc) {
				let select = {};
				if (res.data.result.quotationOrder && res.data.result.quotationOrder.exportOption) {
					select = JSON.parse(res.data.result.quotationOrder.exportOption);
				}
				let quotation = res.data.result;
				quotation.productList.map(item => {
					item.coverUrl = item.productUrl;
					item.productBrand = JSON.parse(item.productBrand);
					item.productSpecification = JSON.parse(item.productSpecification);
				})
				quotation.select = select;
				if (type == 1) {
					this.setState({
						quotation: quotation,
						visible: true
					})
				} else {
					this.setState({
						quotation
					}, () => {
						setTimeout(this.exportQuotation(quotation), 3000)
					})
				}

			} else if (res.data.code == 104) {
				this.setState({
					visible: true,
					reload: true,
				})
			} else {
				message.error(res.data.message);
			}
		})
	}

	/**
	 * 在线预览该报价单
	 * @return {[type]} [description]
	 */
	onlineShow = (item) => {
		this.getQuotationDetail(item.quotationId, 1)
	}

	/**
	 * 导出该报价单
	 * @return {[type]} [description]
	 */
	export = (index) => {
		let data = this.state.data;
		data[index].downloading = true;
		this.setState({
			data
		})
		this.getQuotationDetail(this.state.data[index].quotationId, 2)
	}

	getProductListById = () => {

	}

	/**
	 * 根据当前选择报价单生成订单
	 * @param  {[type]} item [description]
	 * @return {[type]}      [description]
	 */
	create_order = (item) => {
		axios.get('/quotation/get-quotation-byid.json?id=' + item.quotationId).then(res => {
			console.log(res.data);
			if (res.data.isSucc) {
				let productlist = res.data.result.productList;
				productlist.map(item => {
					item.brandNameCn = JSON.parse(item.productBrand).brandNameCn;
					item.brandNameEn = JSON.parse(item.productBrand).brandNameEn;
					item.coverUrl = item.productUrl;
					item.moq = item.minBuyQuantity;
					item.id = item.quotationProductId;
					item.price = item.agentPrice;
					item.selectSpecs = JSON.parse(item.productSpecification);
				})
				sessionStorage.setItem("products", JSON.stringify(productlist));
				this.props.history.pushState(null, "/page/cart/1");
			} else {

			}
		})

	}

	exportQuotation = (quotation) => {
		console.log(quotation);
		this.setState({
			show_sperator: true,
		}, () => {
			var element = document.getElementById('content');
			html2pdf(element, {
				filename: quotation.quotationOrder.quotationSubject + '.pdf',
				image: {
					type: 'jpeg',
					quality: 1
				},
				html2canvas: {
					dpi: 192,
					letterRendering: true,
					useCORS: true,
				},
				jsPDF: {
					unit: 'in',
					format: 'letter',
					orientation: 'portrait'
				}
			});
			let data = this.state.data;
			data.map(item => {
				if (item.quotationId == quotation.quotationOrder.quotationId) {
					item.downloading = false;
				}
			})
			this.setState({
				data
			});
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
	handlePage = (page, pageSize) => {
		console.log(page)
		this.state.current = page;
		this.getQuotation();
	}
	handleDelete = (id) => {
		console.log(id)
		axios.get(`/quotation/delete-quotation.json?id=${id}`).then(res => {
			if (res.data.isSucc) {
				message.success(this.formatMessage({
					id: 'cart.delete_warn'
				}))
				this.getQuotation();
				/*this.props.history.pushState(null, "/page/mine/quotation-list");*/
			} else {
				message.error(res.data.message);
			}
		})
	}
	handleSearch = (value) => {
		this.search = value;
		this.state.current = 1;
		this.getQuotation();
	}

	render() {
		let {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div className={css.quotation_list}>
			<div className={basecss.child_title}>
                <FormattedMessage id="mine.quotation.list" defaultMessage="分类"/>
                <Search
				    placeholder={formatMessage({
                            id: 'mine.quotation.placeholder'
                        })}
				    style={{ width: 300 }}
				    onSearch={this.handleSearch}
				 />
            </div>
            <div className={css.quotation_title}>
            	<p className={css.title_info}>
            		<FormattedMessage id="mine.quotation.information" defaultMessage="分类"/>
            	</p>
            	<p className={css.title_num}>
            		<FormattedMessage id="mine.quotation.total" defaultMessage="分类"/>
            	</p>
            	<p className={css.title_sale}>
            		<FormattedMessage id="cart.order.total" defaultMessage="分类"/>
            	</p>
            	<p className={css.title_agent}>
            		<FormattedMessage id="mine.quotation.agent_total" defaultMessage="分类"/>
            	</p>
            	<p className={css.title_profit}>
            		<FormattedMessage id="cart.profits" defaultMessage="分类"/>
            	</p>
            </div>
            <div className={css.quotation_body}>
	            {this.state.data.map((item,index)=>{
	            	return <div className={css.quotation_item}>
	            		<div className={css.quotation_item_title}>
	            			<p>
	            				<FormattedMessage id="quotation.no" defaultMessage="报价单编号"/>
	                			:{item.quotationNo}
	            			</p>
	            			<p>
	            				<FormattedMessage id="quotation.create_time" defaultMessage="创建时间"/>
	                			:{moment(item.createTime).format('YYYY-MM-DD hh:mm:ss')}
	            			</p>
	            		</div>
	            		<div className={css.quotation_item_body}>
	            			<p className={css.item_info}>
	            					<img src={item.quotationUrl+"@70w_70h_1e_1c.png"}/>
	            				<div>
		            				<FormattedMessage id="quotation.subject" defaultMessage="报价单名称"/>
		            				:{item.quotationSubject}
	            				</div>
	            			</p>
			            	<p className={css.item_num}>
			            		{item.totalQuantity}
			            	</p>
			            	<p className={css.item_sale}>
			            		${item.totalSalePrice}
			            	</p>
			            	<p className={css.item_agent}>
			            		${item.totalSalePrice-item.profits}
			            	</p>
			            	<p className={css.item_profit}>
			            		${item.profits}
			            	</p>
	            		</div>
	            		<div className={css.quotation_item_footer}>
	            			<p className={css.item_icon} onClick={this.handleDelete.bind(this,item.quotationId)}>
	            				<Icon type="delete" />&nbsp;&nbsp;
	            				<FormattedMessage id="cart.delete" defaultMessage="删除"/>
	            			</p>
	            			<Link className={css.item_icon} to={'page/quotation/'+item.quotationId}>
	            				<i class="iconfont icon-DYC-23"/>&nbsp;&nbsp;
	            				<FormattedMessage id="cart.see.order" defaultMessage="在线预览"/>
	            			</Link>
	            			<Button type="primary" 
	            				className={appcss.button_blue}
	            				onClick={this.onlineShow.bind(this,item)}>
	            				<FormattedMessage id="quotation.online" defaultMessage="在线预览"/>
		            		</Button>
		            		<Button type="primary"  
		            			loading={this.state.loading} 
		            			className={appcss.button_orange} 
		            			onClick={this.create_order.bind(this,item)}>
	            				<FormattedMessage id="mine.quotation.create_order" defaultMessage="生成订单"/>
		            		</Button>
		            		<Button 
		            			className={appcss.button_black}
		            			loading={item.downloading}
		            			type="primary" onClick={this.export.bind(this,index)}>
	            				<FormattedMessage id="quotation.export" defaultMessage="导出"/>
		            		</Button>
	            		</div>
	            	</div>
	            })}
	        </div>
            <CusPagination current={this.state.current} onChange={this.handlePage} total={this.state.total} onShowSizeChange={this.handlePage} />
            {this.state.quotation&&this.state.quotation.quotationOrder.quotationId?<div className={css.quotation_pdf} >
            	<QuotationPdf show_sperator={this.state.show_sperator} quotation={this.state.quotation}/>
            </div>:""}
            <Modal
		          width={this.state.width} 
		          title={<ModalHeader width={this.state.width}      
			          setWidth={this.handleState} 
			          export={this.exportQuotation.bind(this,this.state.quotation)}
			          title={this.formatMessage({
	                            id: 'quotation.online'
	                        })}/>}
		          visible={this.state.visible}
		          footer={null}
		          onCancel={this.handleCancel}
	        >
		      <QuotationPdf quotation={this.state.quotation}/>
	        </Modal>
		</div>
	}
}
export default injectIntl(QuotationList);