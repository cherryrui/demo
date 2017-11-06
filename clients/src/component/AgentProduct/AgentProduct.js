import React from 'react';
import css from './AgentProduct.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import TabBar from '../Public/TabBar/TabBar.js';
import operator from './operator.js';
import CusPagination from '../Public/CusPagination/CusPagination.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Link
} from 'react-router';
import {
	Pagination,
	Tooltip,
	Checkbox,
	Icon,
	Table,
	Input,
	message
} from 'antd';
const Search = Input.Search;

class AgentProduct extends React.Component {

	static propTypes = {
		intl: intlShape.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			product_status: JSON.parse(JSON.stringify(operator.product_status)),
			current: this.props.params.type ? Number(this.props.params.type) : 0,
			pageSize: 10,
			pageNo: 1,
			info: '',
			total: 0,
			loading: false,
		}
		this.pageSizeOptions = ["10", "15", "20"]
		this.columns = [{
			title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
			className: css.table_col,
			width: "350px",
			render: (record) => <div className={css.table_product}>
                    <img src={record.coverUrl?record.coverUrl+"@100w_100h_1e_1c.png":"../img/no_picture.jpg"}/>
                    <div className={css.info}>
                        <p className={css.name}>{record.productName}</p>
                        <p>
                            <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>：
                            {record.productMap.brand?(locale=="en"?record.productMap.brand.brandNameEn:record.productMap.brand.brandNameCn):""}
                        </p> 
                    	{record.status==0?<p className={css.product_review}><FormattedMessage id="mine.product.status.reviewimg" defaultMessage=""/></p>
                    	:record.status==2?<p className={css.product_refused}><FormattedMessage id="mine.product.status.unaudited" defaultMessage=""/></p>
                    	:record.buy==1?<p className={css.product_selling}><FormattedMessage id="mine.product.status.selling" defaultMessage=""/></p>
                    	:record.buy==0?<p className={css.product_unsold}><FormattedMessage id="mine.product.status.unsold" defaultMessage=""/></p>
                    	:""}
                    </div>
                </div>
		}, {
			title: <FormattedMessage id="app.category" defaultMessage="我的购物车"/>,
			width: "165px",
			className: css.table_col,
			render: (record) => <div>
                {record.productMap.productCategory.map((item,index)=>{
                    return <div>
                        {item.categoryName}
                    </div>
                })}
            </div>
		}, {
			title: <FormattedMessage id="product.detail.specification" defaultMessage="我的购物车"/>,
			width: "245px",
			className: css.table_col,
			render: (record) => <div>
				{record.productMap.productSpec.map(item=>{
					return <p>
						{item.spec.split(",").join("/")}
					</p>
				})}
			</div>
		}, {
			title: <FormattedMessage id="cart.operation" defaultMessage="我的购物车"/>,
			width: "90px",
			className: css.table_col,
			render: (record) => <div className={css.table_operator}>
				<Link to={"page/mine/product-detail/"+record.productId} className={css.operation_text}>
                    <i class="iconfont icon-DYC-23"/>
                    <FormattedMessage id="orderlist.order.view" defaultMessage="查看"/>
                </Link>
                <Tooltip title={<FormattedMessage id="cart.delete" defaultMessage="我的购物车"/>}>
                    <Icon type="delete" onClick={this.handleDelete.bind(this,record.id)} />
                </Tooltip>      
            </div>
		}, ]
	}
	componentWillMount() {
		this.getProducts();
		axios.post('/user/get-supply-product-status.json', {}).then(res => {
			if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : "";
			} else if (res.data.isSucc) {
				let product_status = this.state.product_status;
				product_status.map(item => {
					item.count = res.data.result[item.value_key];
				})
				this.setState({
					product_status
				})
			} else {
				message.error(res.data.message);
			}
		})
	}
	getProducts = () => {
		this.setState({
			loading: true
		})
		this.props.goTop ? this.props.goTop() : "";
		let param = {
			pageNo: this.state.pageNo,
			pageSize: this.state.pageSize,
		}
		console.log(this.state.current);
		switch (this.state.current) {
			case 0:
				break;
			case 1:
				param.isBuy = 1;
				break;
			case 2:
				param.status = 0;
				break;
			case 3:
				param.status = 2;
				break;
			case 4:
				param.isBuy = 0;
				break;
		}
		axios.post(`/product/get-supply-products.json`, param).then(res => {
			this.setState({
				loading: false
			})
			if (res.data.isSucc) {
				this.setState({
					products: res.data.result.list,
					total: res.data.result.allRow
				})

			} else if (res.data.code == 104) {
				this.props.login ? this.props.login(true) : ""
			} else {
				message.error(res.data.message)
			}
		})
	}

	handleDelete = () => {

	}
	handlePage = (page, pageSize) => {
		this.state.pageNo = page;
		this.state.pageSize = pageSize;
		this.getProducts();
	}
	handleBar = (key) => {
		console.log(key);
		this.state.current = key;
		this.state.pageNo = 1;
		this.getProducts();
	}
	render() {
		let {
			intl: {
				formatMessage
			}
		} = this.props;
		return <div>
			<div className={basecss.child_title}>
                <FormattedMessage id={this.state.type==1?"mine.favorite.product":"mine.favorite.brand"} 
                defaultMessage="分类"/>
                <Search
                    placeholder={formatMessage({
                        id: 'mine.product.name_warn'
                    })}
                    style={{ width: 300 }}
                    onSearch={value => console.log(value)}
                />
            </div>
            <TabBar activeColor="#2e2b2e" tabs={this.state.product_status} current={this.state.current} 
                handleBar={this.handleBar.bind(this)}
             />
            <div className={css.tabber_bottom}>
            </div>
	        <Table 
	        	className={css.table}
                pagination={false}
                loading={this.state.loading}
                rowKey="productId"
                bordered  
                columns={this.columns}
                dataSource={this.state.products} />
            <CusPagination pageSizeOptions={this.pageSizeOptions} onChange={this.handlePage} total={this.state.total} onShowSizeChange={this.handlePage} />
		</div>
	}

}

export default injectIntl(AgentProduct);