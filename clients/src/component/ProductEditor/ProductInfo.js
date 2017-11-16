import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import TextEditor from '../Public/TextEditor/TextEditor.js';
import operator from './operator.js';
import Util from '../../Util.js';
import CusModal from '../Public/CusModal/CusModal.js';
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
	message,
	Radio,
	Tooltip
} from 'antd';
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
			product_info: [{
				contentType: 1,
			}],
			previewImg: "",
			previewVisble: false,
			introduceType: JSON.parse(JSON.stringify(operator.introduceType)),
		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	componentWillMount() {
		let param = {
			pid: this.props.product.productId,
		}
		axios.post('/product/get-product-introduct.json', param).then(res => {
			if (res.data.isSucc) {
				let product_info = res.data.result.length > 0 ? res.data.result : [];
				let introduceType = this.state.introduceType;
				product_info.map(item => {
					item.introduceType ? introduceType[item.introduceType - 1].is_select = true : "";
					if (item.contentType === 1) {
						item.fileList = [];
						item.content.split(",").map((img, index) => {
							let file = {
								uid: '-' + (index + 1), // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
								status: 'done', // 状态有：uploading done error removed
								url: img + "@150w_150h_1e_1c.png",
								response: {
									url: img
								}, // 服务端响应内容
							};
							item.fileList.push(file);
						})
					} else {
						item.contentText = item.content;
					}
				})
				product_info = product_info.length > 0 ? product_info : this.state.product_info;
				this.setState({
					product_info
				})
			} else if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : ""
			} else {
				message.error(res.data.message);
			}
		})
	}

	handlePicture = (index, info) => {
		let fileList = info.fileList;
		fileList = fileList.map((file) => {
			if (file.response) {
				// Component will show file.url as link
				file.url = file.response.url + "@150w_150h_1e_1c.png";
				file.thumbUrl = file.response.url + "@150w_150h_1e_1c.png";
			}
			return file;
		});
		let product_info = this.state.product_info;
		product_info[index].fileList = fileList;
		this.setState({
			product_info
		});
	}

	/**
	 * 保存富文本信息
	 * @param  {[type]} value [description]
	 * @return {[type]}       [description]
	 */
	handleText = (index, value) => {
		console.log(index, value);
		let product_info = this.state.product_info;
		product_info[index].contentText = value;
		this.setState({
			product_info
		})
	}


	previewImg = (file) => {
		console.log(120, file);
		this.setState({
			previewImg: file.response.url,
			previewVisble: true,
		});
	}
	handleCancel = () => {
		this.setState({
			previewVisble: false,
		});
	}
	handleIntroduceType = (index, e) => {
		let product_info = this.state.product_info;
		let introduceType = this.state.introduceType;
		introduceType.map(item => {
			if (item.key == e) {
				item.is_select = true;
				product_info[index].introduceName = this.formatMessage({
					id: item.value
				});
			}
			if (item.key == product_info[index].introduceType) {
				item.is_select = false;
			}
		})

		product_info[index].introduceType = e;
		this.setState({
			product_info,
			introduceType
		})
	}

	handleContentType = (index, e) => {
		let product_info = this.state.product_info;
		if (Number(e.target.value) == 1) {
			product_info[index].content = [];
		} else {
			delete product_info[index].fileList;
		}
		product_info[index].contentType = e.target.value;
		this.setState({
			product_info
		})
	}
	backStep = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : "";
	}
	handleSave = () => {
		this.setState({
			loading: true
		});
		let productIntroductArray = [],
			flag = true;
		this.state.product_info.map(item => {
			let param = {}
			if (item.introduceType) {
				if (item.contentType == 1) {
					if (!item.fileList || item.fileList.length == 0) {
						flag = false;
						return;
					} else {
						param.content = [];
						item.fileList.map(file => {
							param.content.push(file.response.url);
						})
						param.content = param.content.join(",");
					}
				} else if (!item.contentText) {
					flag = false;
				} else {
					param.content = item.contentText;
				}
				if (flag) {
					param.productId = this.props.product.productId;
					param.introduceType = item.introduceType;
					param.contentType = item.contentType;
					param.introduceName = item.introduceName;
					productIntroductArray.push(param);
				}
			} else {
				flag = false
			}
		})
		console.log(productIntroductArray)
		let param = {
			productIntroductArray: JSON.stringify(productIntroductArray),
		};
		if (flag) {
			axios.post('/product/save-product-info.json', param).then(res => {
				this.setState({
					loading: false
				})
				if (res.data.isSucc) {
					this.props.handleSteps ? this.props.handleSteps(1, res.data.result) : "";
				} else if (res.data.code == 104) {
					this.props.login ? this.props.login() : "";
				} else {
					message.error(res.data.message)
				}
			})
		} else {
			message.error(this.formatMessage({
				id: "product.edite.complete.info"
			}))
		}
	}
	handleInfo = (index) => {
		let product_info = this.state.product_info;
		if (index > -1) {
			product_info.splice(index, 1)
		} else {
			product_info.push({
				contentType: 1,
			})
		}
		this.setState({
			product_info
		});
	}
	beforeUpload = (file) => {
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error(this.formatMessage({
				id: "mine.product.size.warn"
			}));
		}
		return isLt2M;
	}

	render() {
		return <div className={`${css.product_attr} ${this.props.className}`}>
			{this.state.product_info.map((item,index)=>{
				return <div className={css.product_info}>
					<div className={css.product_info_item}>
						<p className={css.info_item_left}>
							<span style={{color:"#ff9a2c",paddingRight:"10px"}}>*</span>
							<FormattedMessage id="product.edite.introduce.type" defaultMessage="选择类别"/>：
						</p>
						<Select placeholder={this.formatMessage({id:"mine.product.info_select"})} 
							style={{ width: "180px" }} 
							value={item.introduceType}
							onChange={this.handleIntroduceType.bind(this,index)}>
							{this.state.introduceType.map((type)=>{
								return <Option disabled={!type.is_select|| type.key== item.introduceType?false:true}value={type.key}>{this.formatMessage({id:type.value})}</Option>
							})}
		    			</Select>
		    			{index>0?<Tooltip title={this.formatMessage({id: 'cart.delete'})}>
							<Button style={{minWidth:"36px",marginLeft: "10px"}} className={appcss.button_blue} icon="minus" onClick={this.handleInfo.bind(this,index)}/>
						</Tooltip>:""}
					</div>
					<div className={css.product_info_item}>
						<p className={css.info_item_left}>
							<span style={{color:"#ff9a2c",paddingRight:"10px"}}>*</span>
							<FormattedMessage id="product.edite.content.type" defaultMessage="内容模式"/>：
						</p>
						<RadioGroup onChange={this.handleContentType.bind(this,index)} value={item.contentType?item.contentType:1}>
		        			{operator.contentType.map((item)=>{
								return <Radio value={item.key}>
								{this.formatMessage({id:item.value})}</Radio>
							})}
		      			</RadioGroup>
					</div>
					{item.contentType==1?
					<div className={css.product_info_upload}>
						<p className={css.info_item_left}>
							<span style={{color:"#ff9a2c",paddingRight:"10px"}}>*</span>
							<FormattedMessage id="mine.product.upload_img" defaultMessage="分类"/>：
						</p>
						<Upload
			            	name="file"
							multiple
		                    action={Util.url+"/tool/upload"}
		                    accept="image/*"
		                    onChange={this.handlePicture.bind(this,index)}
			            	listType="picture-card"
			            	onPreview={this.previewImg}
			            	onRemove={this.removePic}
			            	className={css.info_upload}
			            	fileList={item.fileList}
			            	beforeUpload={this.beforeUpload}
			            >
				            <span className={css.upload_icon}>
		                        <i class="iconfont icon-jiahao"></i>
		                    </span>
				        </Upload>
					</div>:<div className={css.product_descrip}>
					<p className={css.info_item_left}>
						<span style={{color:"#ff9a2c",paddingRight:"10px"}}>*</span>
						<FormattedMessage id="mine.product.info_descript" defaultMessage="分类"/>：
					</p>
					<TextEditor  id={"content"+index} content={item.contentText} className={css.product_editor}/>
				</div>}
			</div>})}
            <div className={css.product_footer}>
				{this.props.before?<Button type="primary" onClick={this.backStep}>
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>:""}
				<Button type="primary" className={appcss.button_blue} onClick={this.handleInfo.bind(this,-1)}>
					<FormattedMessage id="mine.product.add" defaultMessage=""/>
				</Button>
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
			<CusModal visible={this.state.previewVisble} width="800px" closeModal={this.handleCancel}>
            	{this.state.previewImg?<img alt="example" style={{ width: '100%' }} src={this.state.previewImg+ "@800w_1e.png"}/>:""}
        	</CusModal>
		</div>
	}
}
export default injectIntl(ProductInfo);