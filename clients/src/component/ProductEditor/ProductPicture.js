import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import Util from '../../Util.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Radio,
	Button,
	Upload,
	Icon,
	message
} from 'antd';
const RadioGroup = Radio.Group;

class ProductPicture extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgs: [{}, {}, {}, {}, {}], //显示图片列表
			select: -1, //设置主图的index
			fileList: [], //已上传的文件列表
			loading: false, // 控制上传按钮加载中
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		let param = {
			pid: this.props.product.productId
		}
		axios.post('/product/get-product-imgs.json', param).then(res => {
			if (res.data.isSucc) {
				let imgs = this.state.imgs,
					fileList = [];
				if (res.data.result.defaultImgUrl) {
					imgs[0].img = res.data.result.defaultImgUrl;
					fileList.push({
						uid: '-1', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
						status: 'done', // 状态有：uploading done error removed
						url: res.data.result.defaultImgUrl + "@150w_150h_1e_1c.png",
						response: {
							url: res.data.result.defaultImgUrl
						}, // 服务端响应内容
					})
				}
				if (res.data.result.imgUrl) {
					res.data.result.imgUrl.map((item, index) => {
						if (item.imgUrl) {
							imgs[index + 1].img = item.imgUrl;
							fileList.push({
								uid: '-1', // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
								status: 'done', // 状态有：uploading done error removed
								url: item.imgUrl + "@150w_150h_1e_1c.png",
								response: {
									url: item.imgUrl
								}, // 服务端响应内容
							})
						}
					})
				}
				this.setState({
					imgs: imgs,
					fileList: fileList,
					select: 0
				})
			}
		})
	}

	/**
	 * 上传图片，蒋图片加载到imgs中
	 * @param  {[type]} info [description]
	 * @return {[type]}      [description]
	 */
	handleChange = (info) => {
		let fileList = info.fileList;
		if (info.file.status === 'done') {
			let imgs = this.state.imgs;
			fileList = fileList.slice(-5);
			fileList = fileList.map((file, index) => {
				if (file.response) {
					imgs[index].img = file.response.url;
					file.url = file.response.url;
				}
				return file;
			});
			let select = this.state.select > -1 ? this.state.select : 0
			this.setState({
				imgs,
				select,
				fileList
			});
		} else {
			this.setState({
				fileList
			});
		}
	}

	/**
	 * 设置主图
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	onChange = (e) => {
		this.setState({
			select: e.target.value
		})
	}

	/**
	 * 控制删除图片的显示与隐藏
	 * @param  {[type]} index  [description]
	 * @param  {[type]} status [description]
	 * @return {[type]}        [description]
	 */
	onMouse = (index, status) => {
		let imgs = this.state.imgs;
		imgs[index].show_delete = status;
		this.setState({
			imgs
		})
	}

	/**
	 * 删除图片
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	handleDelete = (index) => {
		let imgs = this.state.imgs;
		imgs.splice(index, 1);
		imgs.push({});
		let select = this.state.select;
		let fileList = this.state.fileList;
		fileList.splice(index, 1)
		if (this.state.select == index) {
			select = 0;
		}
		this.setState({
			imgs,
			select
		})
	}

	/**
	 * 保存上传
	 * @return {[type]} [description]
	 */
	handleSave = () => {
		if (this.state.select < 0 || this.state.fileList.length == 0) {
			message.error(this.formatMessage({
				id: "mine.product.picture_warn"
			}))
		} else {
			this.setState({
				loading: true
			})
			let param = {
				defaultImgUrl: this.state.imgs[this.state.select].img,
				productId: this.props.product.productId,
				imgesUrl: []
			}
			this.state.imgs.map((item, index) => {
				if (index != this.state.select && item.img) {
					param.imgesUrl.push(item.img);
				}
			})
			param.imgesUrl = param.imgesUrl.join(",");
			axios.post('/product/save-product-imgs.json', param).then(res => {
				this.setState({
					loading: false
				})
				if (res.data.isSucc) {
					this.props.handleSteps ? this.props.handleSteps(1, res.data.result) : ""
				} else if (res.data.code == 104) {
					this.props.login ? this.props.login() : ""
				} else {
					message.error(res.data.message);
				}
			})
		}
	}
	goBack = () => {
		this.props.handleSteps ? this.props.handleSteps(-1) : ""
	}

	render() {
		return <div className={`${css.product_picture} ${this.props.className}`}>
			<div className={css.picture_title}>
				<p className={css.picture_title_left}>
					<span className={css.title_warn}>*</span>
					<FormattedMessage id="mine.product.picture" defaultMessage=""/>:
				</p>
				<Upload 
					name="file"
					multiple
                    action={Util.url+"/tool/upload"}
                    accept="image/*"
                    onChange={this.handleChange}
                    fileList={this.state.fileList}
                    showUploadList={false}>
					<Button type="primary">
						<FormattedMessage id="mine.product.picture" defaultMessage=""/>
					</Button>
				</Upload>
			</div>
			<div className={css.picture_body}>
				{this.state.imgs.map((item,index)=>{
					return <div className={css.picture_body_item}>
						{item.img?<div className={css.picture_img} onMouseLeave={this.onMouse.bind(this,index,false)} onMouseEnter={this.onMouse.bind(this,index,true)}>
							<img src={item.img+"@100w_100h_1e_1c.png"}/>
							{item.show_delete?<p onClick={this.handleDelete.bind(this,index)} className={css.picture_delete}>
								<Icon type="delete" />
							</p>:""}
						</div>:<p className={css.picture_img}></p>}
					</div>
				})}
			</div>
			<div className={css.picture_body}>
				<RadioGroup onChange={this.onChange} value={this.state.select}>
					{this.state.imgs.map((item,index)=>{
						return <Radio value={index} disabled={item.img?false: true} >
								<FormattedMessage id="mine.product.set_default" defaultMessage=""/>
							</Radio>
						})}
				</RadioGroup>
			</div>
			<div className={css.product_footer}>
				{this.props.before?<Button type="primary" onClick={this.goBack}>
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>:""}
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}

}
ProductPicture = injectIntl(ProductPicture);
export default ProductPicture;