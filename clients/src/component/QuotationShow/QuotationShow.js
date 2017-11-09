import React from 'react';
import css from './QuotationShow.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import QuotationPdf from '../QuotationPdf/QuotationPdf.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';
import {
	FormattedMessage
} from 'react-intl';

import {
	Button
} from 'antd';

class QuotationShow extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quotation: {
				participant: {},
				quotationOrder: {},
				productList: [],
				select: {},
			},
			show_sperator: false,
			visible: false,
			reload: false,
		}

	}
	componentWillMount() {
		console.log("componentWillMount");
		if (sessionStorage.user) {
			let qid = this.props.params ? this.props.params.id : this.props.qid;
			if (qid) {
				this.getQuotation(qid);
			} else {
				this.props.history.pushState(null, "page/mine/quotation-list");
			}
		} else {
			this.props.history.pushState(null, "login");
		}
	}
	getQuotation(qid) {
		axios.get('/quotation/get-quotation-byid.json?id=' + qid).then(res => {
			if (res.data.isSucc) {
				let select = {};
				if (res.data.result.quotationOrder && res.data.result.quotationOrder.exportOption) {
					select = res.data.result.quotationOrder.exportOption ? JSON.parse(res.data.result.quotationOrder.exportOption) : {};
				}
				let quotation = res.data.result;
				quotation.productList.map(item => {
					item.coverUrl = item.productUrl;
					item.productBrand = JSON.parse(item.productBrand);
					item.productSpecification = JSON.parse(item.productSpecification);
				})
				quotation.select = select;
				this.setState({
					quotation: quotation,
				})
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
	componentDidMount() {
		this.quotation_pdf.scrollIntoView();
	}
	exportPDF = () => {
		this.setState({
			show_sperator: true
		}, () => {
			var element = document.getElementById('content');
			html2pdf(element, {
				filename: this.state.quotation.quotationOrder.quotationSubject + '.pdf',
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
		});
	}
	handleCancel = () => {
		this.setState({
			visible: false
		})
	}
	render() {
		return <div className={`${appcss.body} ${css.body} ${this.props.className}`} ref={(quotation_pdf)=>{this.quotation_pdf=quotation_pdf}}>
            <div className={css.quotation_button}> 
               <Button id="export_button" ref="export" className={appcss.button_black } type="primary" onClick={this.exportPDF}>
                    <FormattedMessage id="quotation.export" defaultMessage="导出"/>
                </Button>
            </div>
            <QuotationPdf show_sperator={this.state.show_sperator} quotation={this.state.quotation}/>
            <LoginModal visible={this.state.visible} reload={this.state.reload} closeModal={this.handleCancel}/>	
        </div>
	}
}
export default QuotationShow;