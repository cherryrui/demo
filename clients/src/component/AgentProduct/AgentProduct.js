import React from 'react';
import css from './AgentProduct.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';

import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';
import {
	Pagination,
	Tooltip,
	Checkbox,
	Icon,
	Table,
	Input
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
			current: 1,
			info: '',
			total: 50
		}
		this.columns = [{
			title: <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>,
			className: css.table_col,
			width: "38%",
			render: (record) => <div className={css.table_product}>
                    <img src={record.img}/>
                    <div className={css.info}>
                        <p >{record.name}</p>
                        <p>
                            <FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>
                            {record.brand.name}
                        </p>
                        <p>
                        	<FormattedMessage id="cart.product.info" defaultMessage="我的购物车"/>
                        </p>
                        
                    </div>
                </div>
		}, {
			title: <FormattedMessage id="app.category" defaultMessage="我的购物车"/>,
			width: "16%",
			className: css.table_col,
			render: (record) => <div>
                {record.category.map((item,index)=>{
                    return <div>
                        {item.name}
                    </div>
                })}
            </div>
		}, {
			title: <FormattedMessage id="product.detail.specification" defaultMessage="我的购物车"/>,
			width: "8%",
			className: css.table_col,
			dataIndex: 'attr',
			key: 'attr',
			render: (text) => <div>
				{text.map(item=>{
					return <p>
						{item.value.map(att=>{
							return <span>
								{att.value}
							</span>
						})}
					</p>
				})}
			</div>
		}, {
			title: <FormattedMessage id="cart.operation" defaultMessage="我的购物车"/>,
			width: "8%",
			className: css.table_col,
			render: (record) => <div className={css.table_operator}>
                <Tooltip title={<FormattedMessage id="cart.delete" defaultMessage="我的购物车"/>}>
                    <Icon type="delete" onClick={this.handleView.bind(this,record.id)} />
                </Tooltip>      
            </div>
		}, ]

	}

	componentWillMount() {
		console.log("componentWillMount");
		this.getProducts();
	}
	getProducts = () => {
		axios.get(`/product/get-agent-products.json?page=${this.state.current}&info=${this.state.info}`).then(res => {
			this.setState({
				products: res.data.products,
				total: res.data.total
			})
		})
	}

	handleView = () => {

	}
	handlePage = () => {

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
            <Table 
                pagination={false}
                rowKey="id"
                bordered  
                columns={this.columns}
                dataSource={this.state.products} />
            <div className={css.footer}>
                <Pagination defaultCurrent={1} total={this.state.total} onChange={this.handlePage} />
            </div>
		</div>
	}

}

export default injectIntl(AgentProduct);