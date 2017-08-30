import React from 'react';
import appcss from '../../App.scss';
import css from './BranchDetail.scss';

import {
	Breadcrumb,
	Pagination,
	Icon,
	Rate
} from 'antd';
import {
	Link
} from 'react-router';
import {
	FormattedMessage
} from 'react-intl';

import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';
import Product from '../Public/Product/Product.js';

class BranchDetail extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			search: "avi",
			branch: {
				id: 1,
				name: "Branch Name",
				img: "../img/br_main.jpg",
				descrip: "你好年好阿打算打手大大大大大打手大",
				rating: 4.5,
			},
			products: [],
		}
	}
	componentWillMount() {
		let products = [{
			id: 1,
			name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 2,
			name: "dsds",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 3,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 4,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 5,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 6,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 3,
			name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 1,
			name: "a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 2,
			name: "dsds",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 3,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 4,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 5,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 6,
			name: "NSK deep groove ball bearing 6204 zzc3 BH NS7S6",
			price: 2132,
			img: '../img/product.jpg'
		}, {
			id: 3,
			name: "dsNSK deep groove ball bearing 6204 zzc3 BH NS7S6ds",
			price: 2132,
			img: '../img/product.jpg'
		}, ]
		this.setState({
			products: products
		})
	}
	componentDidMount() {
		this.branch_detail.scrollIntoView(true);
	}
	handleSort = (name, key) => {
		console.log(name, key)
	}
	handleStar = (index) => {
		let products = this.state.products
		if (products[index].star) {
			products[index].star = false;
		} else {
			products[index].star = true;
		}
		this.setState({
			products: products
		});
	}


	render() {

		return <div className={appcss.body} ref={(branch_detail)=>this.branch_detail=branch_detail} >
			<div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
		<Link to="/main">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search:this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.branch_info}>
                <div className={css.img}>
            		<img src={this.state.branch.img}/>
            		<p className={css.star}>
                		<FormattedMessage id="branch.product.rate" defaultMessage="评分"/>
                		<Rate className={css.rating} allowHalf defaultValue={this.state.branch.rating} disabled />
                		<span>{this.state.branch.rating}</span>
           			</p>
            	</div>
            	<div className={css.info}>
            		<div className={css.title}>
            			{this.state.branch.name}
            			<p className={css.collect}>
            				<Icon className={true?css.active:css.icon} type="star" />
            				<FormattedMessage id="product.detail.collect" defaultMessage="收藏"/>
            			</p>
            		</div>
            		<p>{this.state.branch.descrip}</p>
            	</div>
            </div>
            <SingleSelect more title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.item}>Comprehensive</p>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Rating"/>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Sale"/>
                </div>
                <div className={css.right}>
                    <FormattedMessage id="branch.product.sum" defaultMessage="总计"
                        values={{total:this.state.total}}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <Pagination size="small" total={50} simple showTotal={this.showTotal} />
                </div>
            </div>
            <div className={css.product_list}>
                {this.state.products.map((item,index)=>{
                    return <Product className={css.product} product={item} handleStar={this.handleStar.bind(this,index)} addCart/>
                })}
            </div>
            <div className={css.footer}>
                <Pagination showSizeChanger size="small" onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
            </div>
		</div>
	}
}
export default BranchDetail;