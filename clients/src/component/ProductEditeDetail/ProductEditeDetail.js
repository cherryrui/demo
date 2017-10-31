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
import {
	Breadcrumb
} from 'antd';

class ProductEditeDetail extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			product: {
				imgs: [],
				productName: "xxxxxxxxxxxxxxxxx",
			},
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	componentWillMount() {

	}
	getProduct() {
		let param = {
			pid: this.props.params.id
		}
		axios.post('/product/get-product-info-byid.json', param).then(res => {
			console.log(res.data);
		})
	}


	render() {
		console.log("ProductEditeDetail");
		return <div>
			<p className={css.product_name}>
			{this.state.product.productName}</p>
			<p className={css.process}>
 			{this.formatMessage({id: 'app.processing'})}
			</p>

			<div>
				{this.state.product.imgs.map(item=>{
					return <div>
						<img src={item.url}/>
					</div>
				})}
			</div>
			<div></div>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'mine.person.data'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>
			<Mainfigure/>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'mine.person.data'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>
			<Basic/>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'cart.specifucation'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>
			<Specifucation/>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'mine.product.param'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>
			<Param/>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'product.detail.package'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>	
			<Package/>
			<div  className={css.title_bg}>
				 {this.formatMessage({id: 'mine.product.transport'})}
				<p className={css.edit_bg}>
					{this.formatMessage({id: 'mine.product.edit'})}					
				</p>
			</div>	
			<Transport/>
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
		return <div>
			
		<div className={css.mainfigure}>
				<p className={css.main_img}></p>
				<p className={css.main_img}></p>
				<p className={css.main_img}></p>
				<p className={css.main_img}></p>
				<p className={css.main_img}></p>

			</div>
		</div>
	}
}
class Basic extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			name: "xxxxxxx",
			art_no: 1342343,
			brand: "agegnt",
			category: "建材",
			unit: "m",
			price: 200,
			moq: 100,
			inventory: 200,
		}
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
					{this.state.name}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'orderdetails.art.no'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.art_no}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'app.brand'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.brand}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'supplier.category'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.category}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'mine.product.unit'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.unit}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'cart.price'})}:
					</p>
					<p className={css.table_right_2}>
					${this.state.price}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'product.detail.MOQ'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.moq}	
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left_2}>
					  {this.formatMessage({id: 'product.detail.inventory'})}:
					</p>
					<p className={css.table_right_2}>
					{this.state.inventory}
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
		this.state = {

			style_v: "欧美",

		}

		this.formatMessage = this.props.intl.formatMessage;
	}


	render() {
		return <div>
			
			<div className={css.detail_table}>
			<div className={css.table_top}></div>
				<div className={css.table_row}>
					<p className={css.table_left_5}>
						<p className={css.specifucation_name}>
						{this.formatMessage({id:'cart.specifucation'})}：</p>
						{this.state.style_v}
					</p>
					<p className={css.table_right_5}>
						<p className={css.specifucation_name}>
						{this.formatMessage({id:'cart.specifucation'})}：</p>
						{this.state.style_v}
					</p>
				</div>
		
				
			</div>
		</div>
	}
}
class Param extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired
	};
	constructor(props) {
		super(props);
		this.state = {
			price: 100,
			inventory: 1,
			param: [0],
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div>
			
			<div className={css.detail_table}>
			<div className={css.table_top}></div>
				<div className={css.table_row}>
					<p className={css.table_left_5}>
						{this.formatMessage({id:'mine.product.name'})}
						{this.state.param}
					</p>
					<p className={css.table_middle}>
						{this.formatMessage({id:'sort.price'})}:
						${this.state.price}
					</p>
					<p className={css.table_m_right}>
						{this.formatMessage({id:'product.detail.inventory'})}:
						{this.state.inventory}
					</p>					
				</div>								
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
		this.state = {
			length: "100m",
			width: "100m",
			height: "100m",
			weight: "500g",
			pack: "500g/箱",
			special: "液体",
			other: "xxxxxxx",
		}
		this.formatMessage = this.props.intl.formatMessage;
	}
	render() {
		return <div>
			<div className={css.detail_table}>
			<div className={css.table_top}></div>

				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_length'})}:
					</p>
					<p className={css.table_right}>
					{this.state.length}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_width'})}:
					</p>
					<p className={css.table_right}>
					{this.state.length}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_height'})}:
					</p>
					<p className={css.table_right}>
					{this.state.height}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_weight'})}:
					</p>
					<p className={css.table_right}>
					{this.state.weight}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_pack'})}:
					</p>
					<p className={css.table_right}>
					{this.state.pack}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_special'})}:
					</p>
					<p className={css.table_right}>
					{this.state.special}
					</p>
				</div>
				<div className={css.table_row}>
					<p className={css.table_left}>
					  {this.formatMessage({id: 'mine.product.instruct_other'})}：
					</p>
					<p className={css.table_right}>
					{this.state.other}
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
		this.state = {

		}

		this.formatMessage = this.props.intl.formatMessage;
	}


	render() {
		return <div>			
					<div className={css.detail_table}>
						<div className={css.table_top}></div>
						<p className={css.table_only_row}>
							{this.formatMessage({id:'product.edite.transport.length'})}/
							{this.formatMessage({id:'product.edite.transport.length'})}									
					    </p>
						<p className={css.table_only_row}>
							{this.formatMessage({id:'mine.product.instruct_other'})}:xxxxxxxxxxxx								
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
		return <div>			
					<div className={css.detail_table}>
						<div className={css.table_top}></div>
						<p className={css.table_only_row}>
							{this.formatMessage({id:'product.edite.transport.length'})}/
							{this.formatMessage({id:'product.edite.transport.length'})}									
					    </p>
						<p className={css.table_only_row}>
							{this.formatMessage({id:'mine.product.instruct_other'})}:
							{this.state.other}					
					    </p>
					</div>
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