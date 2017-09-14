import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import lrz from 'lrz';
import TextEditor from '../Public/TextEditor/TextEditor.js';

import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Select,
	Button,
	Upload,
	Icon,
	Modal,
	message
} from 'antd';
const Option = Select.Option;

class ProductInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			text: '',
			modal: [],
			fileList: [],
			previewVisible: false,
			select_modal: {},
			loading: false, //保存按钮的加载中
		}
		this.deleteImgList = []
	}

	componentWillMount() {
		axios.get('/product/get-product-info-modal.json').then(res => {
			this.setState({
				modal: res.data.modal
			})
		})
	}

	/**
	 * 保存富文本信息
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	handleChange = (value) => {
		this.state.select_modal.text = value;
	}

	/**
	 * 本地保存上传图片
	 * @param  {[type]} info [description]
	 * @return {[type]}      [description]
	 */
	normFile = (info) => {
			info.file.thumb = URL.createObjectURL(info.file);
			info.file.url = URL.createObjectURL(info.file);
			info.file.status = 'done';
			this.state.addFlag = true;
			let select_modal = this.state.select_modal;
			select_modal.fileList.push(info.file);
			this.setState({
				select_modal: select_modal
			});
		}
		/**
		 * 删除图片，若该图片是本地未上传图片，则直接删除，若是已上传图片，需要删除服务器存储的图片
		 * @param  {[type]} file [description]
		 * @return {[type]}      [description]
		 */
	removePic = (file) => {
		let select_modal = this.state.select_modal;
		// console.log(file);
		select_modal.files.splice(select_modal.files.indexOf(file), 1);

		if (file.url.indexOf('blob:http:') == -1) {
			this.deleteImgList.push(file.url);
		}
		this.setState({
			select_modal: select_modal
		});
	}
	previewImg = (file) => {
		// console.log(file);
		let url = file.url.replace("x80", "x320");
		this.setState({
			previewImage: url || file.thumbUrl,
			previewVisible: true,
		});
	}
	handleCancel = () => {
		this.setState({
			previewVisible: true,
		});
	}
	handleModel = (index) => {
		let modal = this.state.modal[index];
		modal.fileList = modal.fileList ? modal.fileList : [];
		modal.text = modal.text ? modal.text : "";
		this.setState({
			select_modal: modal,
		})
	}

	backStep = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : "";
	}
	handleSave = () => {
		this.setState({
			loading: true
		})
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		let param = {
			id: this.props.pid,
			modal: []
		}
		this.state.modal.map(item => {
			if (item.text && item.text.length > 0 || item.fileList && item.fileList.length > 0) {
				param.modal.push(item);
			}
		})
		axios.post('/product/save-product-info.json', param).then(res => {
			this.setState({
				loading: false
			})
			if (res.data) {
				this.props.handleSteps ? this.props.handleSteps(1) : "";
			} else {
				message.error(formatMessage({
					id: "mine.product.save_fail"
				}))
			}

		})
	}

	render() {
		console.log(this.state.select_modal)

		return <div className={css.product_attr}>
			<div className={css.product_info_item}>
				<p className={css.info_item_left}>
					<FormattedMessage id="mine.product.info_select" defaultMessage="选择类别"/>&nbsp;:
				</p>
				<Select style={{ width: 200 }} onChange={this.handleModel}>
					{this.state.modal.map((item,index)=>{
						return <Option value={index}>{item.name}</Option>
					})}
    			</Select>
			</div>
			{this.state.select_modal.id?
			<div className={css.product_info_item}>
				<p className={css.info_item_left}>
					<FormattedMessage id="mine.product.upload_img" defaultMessage="分类"/>&nbsp;:
				</p>
				<Upload 
	            	name="img"
	            	customRequest={this.normFile}
					onPreview = {this.previewImg}
	            	listType="picture-card"
	            	onRemove={this.removePic}
	            	fileList={this.state.select_modal.fileList}
	            >
		            <div className={css.upload}>
						<Icon type="plus" />
						<div className="ant-upload-text">
							<FormattedMessage id="mine.product.upload_img" defaultMessage="分类"/>
						</div>
					</div>
		        </Upload>
			</div>:""}
			{this.state.select_modal.id?<div className={`${css.product_info_item} ${css.product_descrip}`}>
				<p className={css.info_item_left}>
					<FormattedMessage id="mine.product.info_descript" defaultMessage="分类"/>&nbsp;:
				</p>
				<TextEditor 
			  		value={this.state.select_modal.text}
                	onChange={this.handleChange} />
			</div>:""}
            <div className={css.product_footer}>
				<Button type='primary' className={appcss.button_green} onClick={this.backStep}>
					<FormattedMessage id="app.before" defaultMessage="上一步"/>  
				</Button>
				<Button type='primary' loading={this.state.loading} onClick={this.handleSave}>
					<FormattedMessage id="app.save" defaultMessage="保存"/> 
				</Button>
			</div>
			<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
		</div>
	}
}
export default injectIntl(ProductInfo);