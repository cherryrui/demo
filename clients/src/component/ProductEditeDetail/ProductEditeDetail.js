import React from 'react';
import css from './ProductEditeDetail.scss';
import axios from 'axios';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Link
} from 'react-router';
import operator from '../ProductEditor/operator.js';
import {
	Breadcrumb,
	message
} from 'antd';
import ProductPicture from '../ProductEditor/ProductPicture.js';

class ProductEditeDetail extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			status: 5, //状态：1.审核中 2.售卖中 3下架 4审核不通过 5没有提交审核
			product: {},
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		this.getProduct();
	}
	getProduct() {
		let param = {
			pid: this.props.params.id
		}
		axios.post('/product/get-product-info-byid.json', param).then(res => {
			if (res.data.isSucc) {
				let product = res.data.product;
				product.imgs.imgUrl.splice(0, 0, {
					imgUrl: product.imgs.defaultImgUrl
				});
				let category = [];
				res.data.result.category.map(item => {
					if (item.parent && item.parent.parent) {
						let cate = new Array(3);
						cate[0] = item.parent.parent.categoryName;
						cate[1] = item.parent.categoryName;
						cate[2] = item.categoryName;
						category.push(cate);
					}
				})
				if (product.transport.transportationExplain) {
					let transportationExplain = JSON.parse(product.transport.transportationExplain);
					product.transport.explain = "";
					for (let key in transportationExplain) {
						product.transport.explain += transportationExplain[key] + " ";
					}

				}
				product.basic.categoryName = category;
				this.setState({
					product: product
				})
			} else if (res.data.code == 104) {
				this.props.handleVisible ? this.props.handleVisible(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
	}


	render() {
		console.log("ProductEditeDetail");
		return <div>
			<p className={css.product_name}>
			{this.state.product.basic?this.state.product.basic.productName:""}</p>
			{this.state.status==1?
				<p className={css.process}>
	 			{this.formatMessage({id: 'app.processing'})}
				</p>
			:this.state.status==2?
				<p className={css.selling}>
	 			{this.formatMessage({id: 'app.selling'})}
				</p>
			:this.state.status==3?
				<p className={css.unsold}>
	 			{this.formatMessage({id: 'app.unsold'})}
				</p>
			:this.state.status==4?
				<p className={css.unsold}>
	 			{this.formatMessage({id: 'app.not.provaled'})}
				</p>
			:""		
			}
			{operator.steps.map(item=>{
				return <div>
					<div  className={css.title_bg}>
						 {this.formatMessage({id: item.title})}
						<p className={this.state==4||this.state==5?css.edit_bg:css.edit_greybg}>
							{this.formatMessage({id: 'mine.product.edit'})}					
						</p>
					</div>
					{item.key==1?<Basic data={this.state.product.basic?this.state.product.basic:{}}/>
					:item.key==2?<Mainfigure data={this.state.product.imgs?this.state.product.imgs.imgUrl:[]}/>
					:item.key==3?<Specifucation data={this.state.product.attr?this.state.product.attr:{}}/>
					:item.key==4?<Param data={this.state.product.spec?this.state.product.spec:{}}/>
					:item.key==5?<Descrip data={this.state.product.info?this.state.product.info:{}}/>
					:item.key==6?<Package data={this.state.product.pack?this.state.product.pack:{}}/>
					:item.key==7?<Transport data={this.state.product.transport?this.state.product.transport:{}}/>:""
					}
				</div>
			})}
		</div>
	}
}
class Mainfigure extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {}
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div className={css.product_imgs}>
			{this.props.data?this.props.data.map(item=>{
				return <img src={item.imgUrl+ "@160w_160h_1e_1c.png"}/>
			}):""}
		</div>
	}
}
class Basic extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.formatMessage = this.props.intl.formatMessage;
	}

	render() {
		return <div>
			<div className={css.detail_table}>
				<div className={css.table_top}></div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'mine.product.name'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.productName}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'orderdetails.art.no'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.productNumber}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'app.brand'})}:
					</p>
					<p className={css.table_right_2}>
					{locale=="en"?this.props.data.brandNameEn:this.props.data.brandNameCn}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'supplier.category'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.categoryName?this.props.data.categoryName.map(item=>{
						return <p>{item.join("/")}</p>
					}):""}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'mine.product.unit'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.unitName}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'cart.price'})}:
					</p>
					<p className={css.table_right_2}>
					${this.props.data.priceSupplier}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'product.detail.MOQ'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.minBuyQuantity}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'product.detail.inventory'})}:
					</p>
					<p className={css.table_right_2}>
					{this.props.data.inventory}
					</p>
				</div>
			</div>
		</div>
	}
}
class Specifucation extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
	}


	render() {
		return <div  className={css.detail_table}>
			<div className={css.table_top}></div>
				{this.props.data.selectProperty?this.props.data.selectProperty.map(item=>{
					return <div className={css.table_row}>
					<p className={css.table_left_2}>{item.propertyName}：</p>
					<p className={css.table_right_2}>{item.propertyValue}</p>
				</div>
				}):""}
				{this.props.data.customProperty?JSON.parse(this.props.data.customProperty).map(item=>{
					return <div className={css.table_row}>
					<p className={css.table_left_2}>{item.attrName}：</p>
					<p className={css.table_right_2}>{item.attrVal}</p>
				</div>
				}):""}
		</div>
	}
}
class Param extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div>
			<div className={css.detail_table}>
				<div className={css.table_top}>
				</div>
				{this.props.data.itemInfo?this.props.data.itemInfo.map(item=>{
					return <div className={css.table_row}>
					<p className={css.table_left_5}>
						{item.specInfo.map((spec,index)=>{
							return <span>{spec.specVal+(index<item.specInfo.length-1?"/":"")}</span>
						})}
					</p>
					<p className={css.table_middle}>
						{this.formatMessage({id:'sort.price'})}:
						${item.priceSupplier}
					</p>
					<p className={css.table_m_right}>
						{this.formatMessage({id:'product.detail.inventory'})}:
						{item.inventory}
					</p>					
				</div>		
				}):""}	
			</div>
		</div>
	}
}
class Package extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		console.log(this.props.data, operator.product_ins);
		return <div>
			<div className={css.detail_table}>
			<div className={css.table_top}></div>
			{operator.product_ins.map(item=>{
				return item.type<3?<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: item.name})}：
					</p>
					<p className={css.table_right}>
					{item.type==0?this.props.data[item.key]+this.props.data[item.unit_name]
						:item.type==1?this.props.data[item.key]+this.props.data[item.unit_name[0]]+"/"+this.props.data[item.unit_name[1]]
						:item.type==2&&this.props.data.type?JSON.parse(this.props.data.type).map(type=>{
							return <span>{type.name} &nbsp;</span>
						}):""}
					</p>
				</div>:""
			})}
			{this.props.data.customProperty?JSON.parse(this.props.data.customProperty).map(item=>{
				return <div className={css.table_row}>
					<p className={css.table_left}>
					  {item.name}：
					</p>
					<p className={css.table_right}>
						{item.content}{item.unit}
					</p>
				</div>
			}):""}
			<div className={css.table_bottom}>
				<p className={css.table_left}>
				  {this.formatMessage({id: 'mine.product.instruct_other'})}：
				</p>
				<p className={css.table_right}>
					{this.props.data.remark}
				</p>
			</div>
			</div>
		</div>
	}
}
class Transport extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.formatMessage = this.props.intl.formatMessage;
	}


	render() {
		return <div>			
					<div className={css.detail_table}>
						<div className={css.table_top}></div>
						<p className={css.table_only_row}>
							{this.props.data.explain}
						</p>
						<p className={css.table_only_row}>
							{this.formatMessage({id:'mine.product.instruct_other'})}：
							{this.props.data.transportationOther}								
					    </p>
					</div>
			   </div>
	}
}
class Descrip extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			other: "xxxxxxxxxxx",
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div className={css.detail_descrip}>			
			{this.props.data.length>0?this.props.data.map(item=> {
                return <div>
                    <p className={css.info_title}>{item.introduceName}</p>
                    {item.contentType==1?<img src={item.content+"@800w_1e_1c.png"}/>
                    :<div style={{padding: "20px"}} dangerouslySetInnerHTML={{__html: item.content}}/>}
                </div>
            }):<div className={css.no_data}> 
                <FormattedMessage id="product.no_information" defaultMessage="暂无介绍信息"/>
            </div>}
		</div>
	}
}
Basic = injectIntl(Basic);
Specifucation = injectIntl(Specifucation);
Param = injectIntl(Param);
Package = injectIntl(Package);
Transport = injectIntl(Transport);
Descrip = injectIntl(Descrip);
Mainfigure = injectIntl(Mainfigure);
export default injectIntl(ProductEditeDetail);