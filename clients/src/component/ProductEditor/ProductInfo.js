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
	Modal
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
		}
	}

	componentWillMount() {
		axios.get('/product/get-product-info-modal.json').then(res => {
			this.setState({
				modal: res.data.modal
			})
		})
	}
	handleChange = (value) => {
		let modal = this.state.select_modal;
		modal.text = value;
		this.setState({
            select_modal: modal
		})
	}


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
	removePic = (file) => {
		console.log(file)
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

	render() {
        console.log(this.state.select_modal)
		const {
			intl: {
				formatMessage
			}
		} = this.props;
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