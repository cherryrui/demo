import React from 'react';
import css from './QuotationList.scss';
import basecss from '../Mine/Mine.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import moment from 'moment';
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
			info: "",
			total: 0,
			quotation: {},
			visible: false,
			loading: false,
			width: "80%"
		}
	}
	componentWillMount() {
		this.getQuotation();
	}
	getQuotation() {
		axios.get(`/quotation/get-quotation.json?page=${this.state.current}&info=${this.state.info}`).then(res => {
			this.setState({
				data: res.data.quotation,
				total: res.data.total
			})
		})
	}

	/**
	 * 在线预览该报价单
	 * @return {[type]} [description]
	 */
	onlineShow = (item) => {
		this.setState({
			visible: true,
			quotation: item
		})
	}

	/**
	 * 导出该报价单
	 * @return {[type]} [description]
	 */
	export = (item) => {
		this.setState({
			visible: true,
			quotation: item

		}, this.exportQuotation)
	}
	/**
	 * 根据当前选择报价单生成订单
	 * @param  {[type]} item [description]
	 * @return {[type]}      [description]
	 */
	create_order = (item) => {
		this.setState({
			loading: true
		})
		axios.post('/order/create_order.json', this.state.quotation).then(res => {
			this.setState({
				loading: false
			})
			message.sucess(formatMessage({
				id: 'mine.quotation.order_success'
			}))
		})

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
	handlePage = (page, pageSize) => {
		this.state.current = page;
		this.getQuotation();
	}
	handleDelete = (id) => {
		axios.get(`/quotation/delete-quotation.json?id=${id}`).then(res => {
			this.getQuotation();
		})
	}

	render() {
		let {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div>
			<div className={basecss.child_title}>
                <FormattedMessage id="mine.quotation.list" defaultMessage="分类"/>
                <Search
				    placeholder={formatMessage({
                            id: 'mine.quotation.placeholder'
                        })}
				    style={{ width: 300 }}
				    onSearch={value => console.log(value)}
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
            {this.state.data.map(item=>{
            	return <div className={css.quotation_item}>
            		<div className={css.quotation_item_title}>
            			<p>
            				<FormattedMessage id="quotation.no" defaultMessage="报价单编号"/>
                			:{item.id}
            			</p>
            			<p>
            				<FormattedMessage id="quotation.create_time" defaultMessage="创建时间"/>
                			:{moment(item.create_time).format('YYYY-MM-DD hh:mm:ss')}
            			</p>
            		</div>
            		<div className={css.quotation_item_body}>
            			<p className={css.item_info}>

            					<img src={item.img}/>

            				<div>
	            				<FormattedMessage id="quotation.subject" defaultMessage="报价单名称"/>
	            				:{item.subject}
            				</div>
            				
            			</p>
		            	<p className={css.item_num}>
		            		{item.num}
		            	</p>
		            	<p className={css.item_sale}>
		            		${item.sale_total}
		            	</p>
		            	<p className={css.item_agent}>
		            		${item.agent_total}
		            	</p>
		            	<p className={css.item_profit}>
		            		${item.sale_total-item.agent_total}
		            	</p>
            		</div>
            		<div className={css.quotation_item_footer}>
            			<p className={css.item_icon} onClick={this.handleDelete.bind(this,item.id)}>
            				<Icon type="delete" />&nbsp;&nbsp;
            				<FormattedMessage id="cart.delete" defaultMessage="删除"/>
	            	
            			</p>
            			<Link className={css.item_icon} to={'page/quotation/'+item.id}>
            				<Icon type="eye-o" />&nbsp;&nbsp;
            				<FormattedMessage id="cart.see.order" defaultMessage="在线预览"/>
            			</Link>
            			<Button type="primary" className={appcss.button_orange} onClick={this.onlineShow.bind(this,item)}>
            				<FormattedMessage id="quotation.online" defaultMessage="在线预览"/>
	            		</Button>
	            		<Button type="primary" loading={this.state.loading} className={appcss.button_green} onClick={this.create_order.bind(this,item)}>
            				<FormattedMessage id="mine.quotation.create_order" defaultMessage="生成订单"/>
	            		</Button>
	            		<Button type="primary" onClick={this.export.bind(this,item)}>
            				<FormattedMessage id="quotation.export" defaultMessage="导出"/>
	            		</Button>
            		</div>
            	</div>
            })}
            <div className={css.footer}>
            	<Pagination defaultCurrent={1} total={this.state.total} onChange={this.handlePage} />
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
export default injectIntl(QuotationList);