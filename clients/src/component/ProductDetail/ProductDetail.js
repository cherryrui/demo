import React from 'React';
import appcss from '../../App.scss';
import moment from 'moment';
import {
    Link
} from 'react-router';
import {
    FormattedMessage
} from 'react-intl';
import css from './ProductDetail.scss';
import Product from '../Public/Product/Product.js';
import {
    Breadcrumb,
    InputNumber,
    Icon,
    Rate,
    Tabs
} from 'antd';

const TabPane = Tabs.TabPane;

/**
 * 商品详情页面，根据传递参数（id）查询商品信息并显示
 */

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "product",
            products: [], //推荐商品列表
            reviews: [], //评价列表
            product: {}, //当前商品
            curImg: '', //當前选中的图片
            index_img: 0 //選中的圖片index
        }
    }

    componentWillMount() {
        console.log("ComponentWillMonut", this.props.params.id);
        let products = [{
            id: 1,
            name: "Tools",
            price: 90,
            img: "../img/product.jpg"
        }, {
            id: 2,
            name: "Tools",
            price: 90,
            img: "../img/product.jpg"
        }, {
            id: 3,
            name: "Tools",
            price: 90,
            img: "../img/product.jpg"
        }, {
            id: 4,
            name: "Tools",
            price: 90,
            img: "../img/product.jpg"
        }, ];
        let reviews = [{
            id: 1,
            create_time: "2017-09-12 12:12:14",
            question: "asdasdasdasdasdasdasda",
            answer: "dsdsadas da ProductDetail.js"
        }, {
            id: 2,
            create_time: "2017-09-12 12:12:14",
            question: "asdasdasdasdasdasdasda你打大時代按時大大大大薩達阿薩德薩達阿薩德阿斯頓撒大大大大薩達奧術大師打手打手大大大薩達撒大薩達奧術大師大薩達薩達阿薩德撒大聲地",
            answer: "dsdsadas da ProductDetail.js"
        }, {
            id: 3,
            create_time: "2017-09-12 12:12:14",
            question: "asdasdasdasdasdasdasda",
            answer: "dsdsadas da ProductDetail.js"
        }, {
            id: 4,
            create_time: "2017-09-12 12:12:14",
            question: "asdasdasdasdasdasdasda",
            answer: "dsdsadas da ProductDetail.js"
        }, ];
        let product = {
            id: 1,
            price: 200,
            name: "年底萨达撒大萨达撒",
            sales: 2000,
            imgs: ["../img/product.jpg", "../img/product.jpg", "../img/product.jpg", "../img/product.jpg"],
            branch: {
                id: 1,
                name: "SUPPLY NAME",
                img: '../img/br_main.jpg',
                rating: 4.5
            }
        }
        this.setState({
            products: products,
            reviews: reviews,
            product: product,
            curImg: product.imgs[0]
        })
    }

    componentDidMount() {
        console.log(this.product_detail);
        //this.refs.product_detail.scrollIntoView();
        this.product_detail.scrollIntoView();
    }

    handleChange = (key) => {
        console.log(114, key);
        switch (Number(key)) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                this.setState({
                    content: <Review data={this.state.reviews}/>
                })
                break;
            case 4:
                break;
        }

    };
    handleNum = (value) => {
        console.log('changed', value);
    };

    /**
     * [changeImg description] 切换显示商品图片
     * @return {[type]} [description]
     */
    changeImg = (index) => {
        this.setState({
            curImg: this.state.product.imgs[index],
            index_img: index
        })
    };
    callback = (key) => {
        console.log(key);
    };

    render() {
        return <div ref={(product_detail)=>this.product_detail=product_detail} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="main/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search: this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.header}>
                <div className={css.main_img}>
                    <img  src={this.state.curImg}/>
                </div>
                <div className={css.middle}>
                    <div className={css.product_name}>
	           			{this.state.product.name}
                    </div>
                    <div className={css.product_price}>
                        <p className={css.price_info}>
                            <FormattedMessage id="product.detail.price" defaultMessage="单价"/>
                            :
                            <span className={css.price}>
                                ${this.state.product.price}
                            </span>
                            <span className={css.off}>20% off
                            </span>
                        </p>
                        <p className={css.sales}>
                            <span className={css.bold}>
                                <FormattedMessage id="product.detail.sales" defaultMessage="销量"/>
                                :
                            </span>
                        &nbsp;&nbsp;{this.state.product.sales}&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className={css.bold}>
                                <FormattedMessage id="product.detail.collect" defaultMessage="收藏"/>
                                :
                            </span>
                        &nbsp;&nbsp;
                            <Icon type="star" />
                        </p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>
                            <FormattedMessage id="product.detail.inventory" defaultMessage="库存"/>
                            :
                        </p>
                        <p>3232</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>
                            <FormattedMessage id="product.detail.delivery" defaultMessage="送达时效"/>
                            :
                        </p>
                        <p>3232</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>
                            <FormattedMessage id="product.detail.MOQ" defaultMessage="起订量"/>
                            :
                        </p>
                        <p>3232</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>
                            <FormattedMessage id="product.detail.specification" defaultMessage="产品规格"/>
                            :
                        </p>
                        <p>3232</p>
                    </div>
                    <div className={css.bottom}>
                        <p className={css.num}>
                            <FormattedMessage id="product.detail.num" defaultMessage="数量"/>
                            :
                        </p>
                        <p>
                            <InputNumber size="large" min={1} defaultValue={3} onChange={this.handleNum} />
                        </p>
                        <p className={css.add_cart}>
                            <Icon type="shopping-cart" />
                        &nbsp;&nbsp;
                            <FormattedMessage id="product.detail.add" defaultMessage="加入购物车"/>
                        </p>
                    </div>
                </div>
                <div className={css.left}>
                    <img src={this.state.product.branch.img}/>
                    <p className={css.name}>{this.state.product.branch.name}</p>
                    <p className={css.foot}>
                        <FormattedMessage id="branch.product.rate" defaultMessage="评分"/>
                        <Rate className={css.rating} allowHalf defaultValue={this.state.product.branch.rating} disabled />
                        <span>{this.state.product.branch.rating}</span>
                    </p>
                    <div className={css.contact}>
                        <Icon type="customer-service" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <FormattedMessage id="product.detail.contact" defaultMessage="联系客服"/>
                    </div>
                </div>
            </div>
            <div className={css.product_img}>
             {this.state.product.imgs.map((item, index)=> {
                 return <img key={"img" + index} className={index == this.state.index_img ? css.active : css.img} src={item} onClick={this.changeImg.bind(this, index)}/>
             })}
            </div>
            <div className={css.body}>
                <div className={css.product_list}>
				{this.state.products.map(item => {
                    return <Product product={item} className={css.product} key={item.id}/>
                })}
                </div>
                <div className={css.info}>
                    <div className={css.card_container}>
                        <Tabs type="card" onChange={this.handleChange}>
                            <TabPane
                                tab={<FormattedMessage id="product.detail.information" defaultMessage="详情"/>}
                                key={0}>
                                <div>dsada </div>
                            </TabPane>
                            <TabPane
                                tab={<FormattedMessage id="product.detail.specification" defaultMessage="规格"/>}
                                key={1}>
                                <div>dsada </div>
                            </TabPane>
                            <TabPane
                                tab={<FormattedMessage id="product.detail.package" defaultMessage="套餐详情"/>}
                                key={2}>
                                <div>dsada </div>
                            </TabPane>
                            <TabPane
                                tab={<FormattedMessage id="product.detail.review" defaultMessage="评价"/>}
                                key={3}>
                                <Review data={this.state.reviews}/>
                            </TabPane>
                            <TabPane
                                tab={<FormattedMessage id="product.detail.price.move" defaultMessage="价格趋势"/>}
                                key={4}>
                                <div>dsada </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    }
}
class Review extends React.Component {

    render() {
        return <div key={this.props.data.id} className={css.review}>
		{
            this.props.data.length > 0 ? this.props.data.map(item => {
                return <div className={css.one}>
                    <div className={css.item}>
                        <p className={css.icon}>
                            <Icon type="question-circle" />
                        </p>
                        <p className={css.content}>{item.question}</p>
                        <p className={css.time}>{moment(item.create_time).format('YYYY-MM-DD HH:DD')}</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon_a}>A</p>
                        <p className={css.content}>{item.answer}</p>
                        <p className={css.time}>{moment(item.create_time).format('YYYY-MM-DD HH:DD')}</p>
                    </div>
                </div>
            }) : <div></div>
            }
        </div>
    }
}

class Price extends React.Component {

    render() {

        return <div>
            dsadasda
        </div>
    }
}
export default ProductDetail;