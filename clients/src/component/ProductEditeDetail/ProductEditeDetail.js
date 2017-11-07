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
	message,
	Spin
} from 'antd';
import ProductBasic from '../ProductEditor/ProductBasic.js';
import ProductPicture from '../ProductEditor/ProductPicture.js';
import ProductAttr from '../ProductEditor/ProductAttr.js';
import ProductInfo from '../ProductEditor/ProductInfo.js';
import ProductInstruct from '../ProductEditor/ProductInstruct.js';
import ProductSpec from '../ProductEditor/ProductSpec.js';
import ProductTransport from '../ProductEditor/ProductTransport.js';

class ProductEditeDetail extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			basic: {},
			attr: {},
			imgs: [],
			spec: [],
			info: [],
			pack: {},
			transport: {},
			steps: JSON.parse(JSON.stringify(operator.steps)),
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {
		this.getProduct();
	}
	getProduct() {
		this.setState({
			loading: true
		});
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
				if (product.transport && product.transport.transportationExplain) {
					let transportationExplain = JSON.parse(product.transport.transportationExplain);
					product.transport.explain = "";
					for (let key in transportationExplain) {
						product.transport.explain += transportationExplain[key] + " ";
					}

				}
				product.basic.categoryName = category;
				product.loading = false;
				this.setState(product)
			} else if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : "";
			} else {
				message.error(res.data.message);
			}
		})
	}
	handleEditeStatus = (index) => {
		let steps = this.state.steps;
		steps[index].is_edite = steps[index].is_edite ? false : true;
		this.setState({
			steps
		});
	}

	handleEdite = (index, status) => {
		console.log(index, status);
		let steps = this.state.steps;
		if (status != this.state.steps[index].is_edite) {
			steps[index].is_edite = status;
			if (!status) {
				let url = "";
				let param = {
					pid: this.props.params.id
				}
				switch (index) {
					case 0:
						url = "/product/get-product-basic.json";
						break;
					case 1:
						url = "/product/get-product-imgs.json";
						break;
					case 2:
						url = "/product/get-product-attr.json";
						break;
					case 3:
						url = "/product/get-product-spec.json";
						break;
					case 4:
						url = "/product/get-product-introduct.json";
						break;
					case 5:
						url = "/product/get-product-pack.json";
						break;
					case 6:
						url = "/product/get-product-transport.json";
						break;
					default:
						break;
				}
				if (url) {
					axios.post(url, param).then(res => {
						if (res.data.isSucc) {
							let param = {};
							switch (index) {
								case 0:
									param.basic = result.result.product;
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
									param.basic.categoryName = category;
									break;
								case 1:
									param.imgs = res.data.result;
									param.imgs.imgUrl.splice(0, 0, {
										imgUrl: param.imgs.defaultImgUrl
									});
									break;
								case 2:
									param.attr = res.data.result;
									break;
								case 3:
									param.spec = res.data.result.itemInfo;
									break;
								case 4:
									param.info = res.data.result;
									break;
								case 5:
									param.pack = res.data.result ? res.data.result : {};
									break;
								case 6:
									param.transport = {};
									param.transport.explain = "";
									param.transport.transportationOther = res.data.result.transportationOther;
									if (res.data.result.transportationExplain) {
										let transportationExplain = JSON.parse(res.data.result.transportationExplain);
										for (let key in transportationExplain) {
											param.transport.explain += transportationExplain[key] + " ";
										}

									}
									break;
							}
							param.steps = steps;
							this.setState(param, () => {
								this.goPosition("product_" + index)
							});

						} else if (res.data.code == 104) {
							this.props.login ? this.props.login(true) : "";
						} else {
							message.error(res.data.message);
						}
					})
				} else {
					this.setState({
						steps
					});
				}
			} else {
				this.setState({
					steps
				})
			}
		}
	}
	goPosition = (name) => {
		let element = document.getElementById(name);

		let top = 0;
		if (element) {
			top = element.offsetTop;
		}
		console.log(top);
		document.documentElement.scrollTop = document.body.scrollTop = top - 120;

	}

	render() {
		console.log("ProductEditeDetail", this.state);
		let product = {
			productId: this.props.params.id
		}
		return <div>
			<Spin spinning={this.state.loading}>
				<p className={css.product_name}>
				{this.state.basic?this.state.basic.productName:""}</p>
				{this.state.basic.status==0?
					<p className={css.process}>
		 			{this.formatMessage({id: 'app.processing'})}
					</p>
				:this.state.basic.isBuy==1?
					<p className={css.selling}>
		 			{this.formatMessage({id: 'app.selling'})}
					</p>
				:this.state.basic.isBuy==0?
					<p className={css.unsold}>
		 			{this.formatMessage({id: 'app.unsold'})}
					</p>
				:this.state.basic.status==2?
					<p className={css.unsold}>
		 			{this.formatMessage({id: 'app.not.provaled'})}
					</p>
				:""}
				{this.state.steps.map((item,index)=>{
					return <div>
						<div  className={css.title_bg}>
							 {this.formatMessage({id: item.title})}
							<p id={"product_"+index} className={this.state.basic.status!=1?css.edit_bg:css.edit_greybg} onClick={this.handleEditeStatus.bind(this,index)}>
								{this.formatMessage({id: item.is_edite?'app.cancel':'mine.product.edit'})}					
							</p>
						</div>
						{item.key==1?(item.is_edite?<div className={css.product_edite}>
								<ProductBasic product={product} handleSteps={this.handleEdite.bind(this,index,false)}/>
							</div>
							:<Basic data={this.state.basic}/>)
						:item.key==2?(item.is_edite?<div className={css.product_edite}>
							<ProductPicture className={css.edite_picture} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/>
							</div>
							:<Mainfigure data={this.state.imgs}/>)
						:item.key==3?(item.is_edite?<div className={css.product_edite}>
							<ProductAttr className={css.edite_attr} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/>
							</div>
							:<Specifucation data={this.state.attr}/>)
						:item.key==4?(item.is_edite?<div className={css.product_edite}>
							<ProductSpec className={css.edite_spec} width={600} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/>
							</div>
							:<Param data={this.state.spec}/>)
						:item.key==5?(item.is_edite?<div className={css.product_edite}><ProductInfo className={css.edite_info} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/></div>:<Descrip data={this.state.info}/>)
						:item.key==6?(item.is_edite?<div className={css.product_edite}><ProductInstruct className={css.edite_pack} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/></div>:<Package data={this.state.pack}/>)
						:item.key==7?(item.is_edite?<div className={css.product_edite}><ProductTransport className={css.edite_trans} product={product} handleSteps={this.handleEdite.bind(this,index,false)}/></div>:<Transport data={this.state.transport}/>):""
						}
					</div>
				})}
			</Spin>
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
			{this.props.data.imgUrl&&this.props.data.imgUrl.length>0?this.props.data.imgUrl.map(item=>{
				return item.imgUrl?<img src={item.imgUrl+ "@160w_160h_1e_1c.png"}/>:""
			}):<img src="../img/no_picture.jpg"/>}
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
				{(this.props.data.selectProperty&&this.props.data.selectProperty.length>0)||this.props.data.customProperty?"":<div className={css.table_row}>
					<p className={css.table_left_2}>-：</p>
					<p className={css.table_right_2}>-</p>
				</div>}
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
		console.log(this.props.data);
		return <div>
			<div className={css.detail_table}>
				<div className={css.table_top}>
				</div>
				{this.props.data?this.props.data.map(item=>{
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
				{this.props.data&&this.props.data.length>0?"":<div className={css.table_row}>
					<p className={css.table_left_5}>
						-
					</p>
					<p className={css.table_middle}>
						{this.formatMessage({id:'sort.price'})}:
						$-
					</p>
					<p className={css.table_m_right}>
						{this.formatMessage({id:'product.detail.inventory'})}:
						-
					</p>					
				</div>}
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
		return <div>
			<div className={css.detail_table}>
			<div className={css.table_top}></div>
			{operator.product_ins.map(item=>{
				return item.type<3?<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: item.name})}：
					</p>
					<p className={css.table_right}>
					{item.type==0?((this.props.data[item.key]?this.props.data[item.key]:"-")+(this.props.data[item.unit_name]?this.props.data[item.unit_name]:"-"))
						:item.type==1?((this.props.data[item.key]?this.props.data[item.key]:"-")+(this.props.data[item.unit_name[0]]?this.props.data[item.unit_name[0]]:"-")+"/"+(this.props.data[item.unit_name[1]]?this.props.data[item.unit_name[1]]:"-"))
						:item.type==2&&this.props.data.type?JSON.parse(this.props.data.type).map(type=>{
							return <span>{type.name?type.name:"-"} &nbsp;</span>
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
							{this.props.data.explain?this.props.data.explain:"-"}
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
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div className={css.detail_descrip}>			
			{this.props.data.length>0?this.props.data.map(item=> {
                return <div>
                    <p className={css.info_title}>{item.introduceName}</p>
                    {item.contentType==1?item.content.split(",").map(img=>{
                    	return <img src={img+"@800w_1e_1c.png"}/>
                    })
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