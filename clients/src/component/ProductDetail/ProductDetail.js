import React from 'react';
import appcss from '../../App.scss';
import axios from 'axios';
import moment from 'moment';
import operator from './operator.js';
import {
    VictoryChart,
    VictoryArea,
    VictoryTheme,
    VictoryAxis,
    VictoryBar,
    VictoryStack
} from 'victory';
import {
    Link
} from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import css from './ProductDetail.scss';
import Product from '../Public/Product/Product.js';
import {
    Breadcrumb,
    InputNumber,
    Icon,
    Rate,
    Tabs,
    Radio,
    Modal,
    Form,
    message,
    Input,
    Button,
    Checkbox,
} from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
import TabBar from '../Public/TabBar/TabBar.js';
import cartAction from '../../action/cartAction.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';
import {
    connect
} from 'react-redux';
/**
 * 商品详情页面，根据传递参数（id）查询商品信息并显示
 */
@connect(state => ({
    cart: state.cart
}), cartAction)
class ProductDetail extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
        addCart: React.PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            products: [], //推荐商品列表
            reviews: [], //评价列表
            product: {}, //当前商品
            curImg: '', //當前选中的图片
            index_img: 0, //選中的圖片index
            visible: false,
            current: 0,
            productInfo: [],
            properties: [],
            specs: [],
            prices: [],
            packInfo: {},
        }
    }

    componentWillMount() {
        this.getData(this.props.params.id);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id != this.props.params.id) {
            this.getData(nextProps.params.id);
            this.product_detail.scrollIntoView();
        }
    }

    componentDidMount() {
        //this.refs.product_detail.scrollIntoView();
        this.product_detail.scrollIntoView();
    }

    getData(id) {
        axios.get(`/product/get-product-byId.json?id=${id}`).then(res => {
            if (res.data.isSucc) {
                let product = res.data.result.productAndSupplier;
                product.imgs = res.data.result.imgs;
                this.setState({
                    product: product,
                    curImg: res.data.result.imgs.length > 0 ? res.data.result.imgs[0].imgUrl : "",
                    productInfo: res.data.result.productInfo,
                    properties: res.data.result.properties,
                    specs: res.data.result.specs,
                    packInfo: res.data.result.packInfo,
                })
            } else {

            }

        })
        axios.get(`/product/get-like-product.json?id=${id}`).then(res => {
            if (res.data.isSucc) {
                this.setState({
                    products: res.data.result
                })
            }
        })
    }

    handleChange = (key) => {
        this.setState({
            current: key
        })

    };
    handleNum = (value) => {
        this.state.product.productNum = value;
    };

    /**
     * [changeImg description] 切换显示商品图片
     * @return {[type]} [description]
     */
    changeImg = (index) => {
        this.setState({
            curImg: this.state.product.imgs[index].imgUrl,
            index_img: index
        })
    };
    callback = (key) => {
        console.log(key);
    };
    handleAddCart = (type) => {
        console.log(109, "handleAddCart", this.state.product)
        if (localStorage.uid) {
            let flag = true;
            this.state.specs.map(item => {
                if (!item.select_value) {
                    flag = false;
                    return;
                }
            })
            if (flag) {
                let param = {
                    itemId: this.state.product.itemId,
                    productId: this.state.product.productId,
                    productNum: this.state.product.productNum ? this.state.product.productNum : 1,
                }
                this.specify.style.border = "none";
                this.specify.style.padding = "0";
                this.props.addCart(param).then(res => {
                    message.success("成功加入购物车")
                });
            } else {
                console.log("dada", this.specify.style)
                this.specify.style.border = "2px solid #2f5ea2";
                this.specify.style.padding = "10px";

            }
        } else {
            this.setState({
                visible: true
            })
        }
    }
    handleBuy = () => {
        //console.log(109, "handleAddCart", localStorage.uid)
        if (localStorage.uid) {
            let flag = true;
            this.state.product.attr.map(item => {
                if (!item.select_value) {
                    flag = false;
                    return;
                }
            })
            if (flag) {
                console.log("加入购物车")
                this.specify.style.border = "none";
                this.specify.style.padding = "0";
                this.props.addCart(this.state.product).then(res => {
                    this.props.history.pushState(null, "page/cart");

                });
            } else {
                console.log("dada", this.specify.style)
                this.specify.style.border = "2px solid #2f5ea2";
                this.specify.style.padding = "10px";

            }
        } else {
            this.setState({
                visible: true
            })
        }
    }
    handleSubmit = (e) => {
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('/user/login.json', values).then(res => {
                    if (res.data.status) {
                        localStorage.setItem('user', JSON.stringify(res.data.result));
                        message.success(formatMessage({
                            id: 'login.login.success'
                        }))
                        this.setState({
                            visible: false
                        })
                    } else {
                        console.log("51", res.data.result)
                        message.error(formatMessage({
                            id: 'login.login.fail'
                        }, {
                            reason: res.data.result
                        }))
                    }
                })
            }
        });
    }
    handleAttr = (index, value) => {
        let specs = this.state.specs;
        specs[index].select_value = value;
        let flag = true;
        this.state.specs.map(item => {
            if (!item.select_value) {
                flag = false;
                return;
            }
        })
        if (flag) {
            let param = {
                id: this.state.product.productId,
                specs: this.state.specs,
            }
            axios.post('/product/get-attr-price.json', param).then(res => {
                if (res.data.isSucc) {
                    let product = this.state.product;
                    product.price = res.data.result.price;
                    product.inventory = res.data.result.inventory;
                    product.priceDiscounts = res.data.result.priceDiscounts;
                    product.itemId = res.data.result.itemid;
                    this.setState({
                        product: product,
                        specs: specs,
                    })
                } else {
                    message.error(res.data.message)
                    this.setState({
                        specs: specs,
                    })
                }
            })
        } else {
            this.setState({
                specs: specs,
            })
        }
    }

    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const {
            intl: {
                formatMessage
            }
        } = this.props;
        const {
            getFieldDecorator
        } = this.props.form;
        return <div ref={(product_detail)=>this.product_detail=product_detail} className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/">
                        {this.props.params.name?this.props.params.name
                            :<FormattedMessage id="app.home" defaultMessage=""/>}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <span>{this.state.product.productName}</span>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.header}>
                <div className={css.main_img}>
                    <div className={css.cus_img}>
                        <img className={css.img_main} src={this.state.curImg+"@320w_320h_1e_1c.png"}/>
                    </div>
                    <div className={css.product_img}>
                         {this.state.product.imgs?this.state.product.imgs.map((item, index)=> {
                             return <img key={"img" + index} className={index == this.state.index_img ? css.active : css.img} src={item.imgUrl+"@160w_160h_1e_1c.png"} onClick={this.changeImg.bind(this, index)}/>
                         }):""}
                    </div>
                </div>
                <div className={css.middle}>
                    <div className={css.product_name}>
	           			{this.state.product.productName}
                    </div>
                    <div className={css.product_price}>
                        <p className={css.price_info}>
                            <FormattedMessage id="product.detail.price" defaultMessage="单价"/>
                            &nbsp;:
                            <span className={css.price}>
                                ${this.state.product.price}
                            </span>
                            {this.state.product.priceDiscounts?<span className={css.off}>{this.state.product.price/this.state.product.priceDiscounts}% off
                            </span>:""}
                        </p>
                        <p className={css.sales}>
                            <span className={css.bold}>
                                <FormattedMessage id="product.detail.sales" defaultMessage="销量"/>
                                :
                            </span>
                            &nbsp;&nbsp;{this.state.product.saleVolume}&nbsp;&nbsp;&nbsp;&nbsp;
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
                        <p>{this.state.product.inventory}</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.title}>
                            <FormattedMessage id="product.detail.MOQ" defaultMessage="起订量"/>
                            :
                        </p>
                        <p>{this.state.product.moq}</p>
                    </div>
                    <div ref={(specify)=>this.specify=specify}>
                        {this.state.specs.length>0?this.state.specs.map((item,index)=>{
                            return <div key={item.id} className={css.item}>
                            <p className={css.title}>{item.specName}</p>
                            <div className={css.spec_content}> 
                                {item.specVal.map(attr=>{
                                    return <p className={item.select_value==attr.valid?css.content_active:css.content_item} onClick={this.handleAttr.bind(this,index,attr.valid)}>{attr.specValue}</p>
                                })}
                                
                            </div>
                        </div>
                        }):""}
                    </div>
                    <div className={css.bottom}>
                        <p className={css.num}>
                            <FormattedMessage id="product.detail.num" defaultMessage="数量"/>
                            :
                        </p>
                        <p>
                            {this.state.product.moq?<InputNumber size="large" min={this.state.product.moq} defaultValue={this.state.product.moq} onChange={this.handleNum} />:""}
                        </p>
                        <div className={css.bottom_right}>
                            <p className={appcss.button_green} onClick={this.handleAddCart.bind(this,1)}>
                                <Icon type="shopping-cart" />
                                &nbsp;&nbsp;
                                <FormattedMessage id="product.detail.buy" defaultMessage="立即购买"/>
                            </p>
                            <p className={appcss.button_theme} onClick={this.handleAddCart.bind(this,2)}>
                                <Icon type="shopping-cart" />
                                &nbsp;&nbsp;
                                <FormattedMessage id="product.detail.add" defaultMessage="加入购物车"/>
                            </p>
                        </div>
                    </div>
                </div>
                {this.state.product.supplierId?<div className={css.right}>
                    <div className={css.right_content}>
                        <p className={css.custom_img}>
                            <img src={this.state.product.supplierImg+"@320w_320h_1e_1c.png"}/>
                        </p>
                        <p className={css.name}>{this.state.product.supplierName}</p>
                        <p className={css.foot}>
                            <FormattedMessage id="brand.product.rate" defaultMessage="评分"/>&nbsp;&nbsp;
                            <Rate className={css.rating} allowHalf defaultValue={this.state.product.supplierLevel} disabled />
                            <span>{this.state.product.supplierLevel}</span>
                        </p>
                        <div className={css.contact}>
                            <Icon type="customer-service" />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <FormattedMessage id="product.detail.contact" defaultMessage="联系客服"/>
                        </div>
                    </div>
                </div>:""}
            </div>

            <div className={css.body}>
                <div className={css.product_list}>
                    <div className={css.list_content}>
                        <p className={css.product_list_title}>
                            <FormattedMessage id='product.like' defaultMessage="相似产品"/>
                        </p>
        				{this.state.products.map(item => {
                            return <Product product={item} className={css.product} key={item.id}/>
                        })}
                    </div>
                </div>
                <div className={css.info}>
                    <div className={css.card_container}>
                        <TabBar tabs={operator.tabs} current={this.state.current} 
                            handleBar={this.handleChange}
                        />
                        <div className={css.container_body}>
                        {this.state.current==0?<Information data={this.state.productInfo}/>
                            :this.state.current==1?<Specification data={this.state.productInfo}/>
                            :this.state.current==2?<PackageDetail data={this.state.packInfo?this.state.packInfo:{}}/>
                            :this.state.current==3?<Review data={this.state.reviews}/>
                            :this.state.current==4?<Price data={this.state.prices} />
                            :""}
                        </div>
                    </div>
                </div>
            </div>
            <LoginModal visible={this.state.visible} closeModal={this.handleCancel}/>
        </div>
    }
}
class Information extends React.Component {
    render() {
        console.log(this.props.data)
        return <div>
            {this.props.data.length>0?this.props.data.map(item=> {
                return <div>
                    <p className={css.info_title}>{item.introduceName}</p>
                    {item.contentType==1?<img src={item.content+"@800w_1e_1c.png"}/>
                    :<div dangerouslySetInnerHTML={{__html: item.content}}/>}
                </div>
            }):<div className={css.no_data}> 
                <FormattedMessage id="product.no_information" defaultMessage="暂无介绍信息"/>
            </div>}
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
            }) : <div className={css.no_data}> 
                <FormattedMessage id="product.no_review" defaultMessage="暂无提问"/>
            </div>
        }
            
        </div>
    }
}

class Price extends React.Component {

    render() {

        return <div>
            {this.props.data.length>0?<div className={css.price_body}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={1000}
                    height={300}
                >
                    <VictoryArea
                        style={{ 
                            data: { fill: "#c43a31" },
                            
                         }}
                        data={data}
                        x="create_time"  
                        labels={(datum) => "$"+datum.y}
                    />
                </VictoryChart>
                <div className={css.price_time}>
                    <p>
                        <FormattedMessage id="product.detail.month" defaultMessage="最近月" />
                    </p>
                    <p>
                        <FormattedMessage id="product.detail.three" defaultMessage="三个月" />
                    </p>
                    <p>
                        <FormattedMessage id="product.detail.six" defaultMessage="六个月" />
                    </p>
                 </div>
             </div>
             :<div className={css.no_data}>
                <FormattedMessage id='product.no_price' defaultMessage='暂无价格波动'/>
            </div>}
        </div>
    }
}
ProductDetail = Form.create()(ProductDetail);

class Specification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specification: {
                art: 1343545432245435,
                brand: "中建",
                model: "23-332",
                moq: 23,
                material: "金属"
            }
        };
    }

    render() {
        return <div className={css.productdetail_teble}>
            <div className={css.title}>
                <FormattedMessage id="mine.product.param" defaultMessage=""/>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="orderdetails.art.no" defaultMessage=""/>
                </p>
                <p>{this.state.specification.art}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="orderdetails.brand" defaultMessage=""/>
                </p>
                <p>{this.state.specification.brand}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="product.detail.model" defaultMessage=""/>
                </p>
                <p>{this.state.specification.model}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="product.detail.MOQ" defaultMessage=""/>
                </p>
                <p>{this.state.specification.moq}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="product.detail.material" defaultMessage=""/>
                </p>
                <p>{this.state.specification.material}</p>
            </div>
        </div>
    }
}

class PackageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return <div className={css.productdetail_teble}>
            <div className={css.title}>
                <FormattedMessage id="mine.product.packaging" defaultMessage=""/>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_length" defaultMessage=""/>
                </p>
                <p>{this.props.data.len}&nbsp;&nbsp;{this.props.data.lenUnit}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_width" defaultMessage=""/>
                </p>
                <p> {this.props.data.width}&nbsp;&nbsp;{this.props.data.widthUnit}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_height" defaultMessage=""/>
                </p>
                <p> {this.props.data.height}&nbsp;&nbsp;{this.props.data.heightUnit}</p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_weight" defaultMessage=""/>
                </p>
                <p>{this.props.data.weight}&nbsp;&nbsp;{this.props.data.weightUnit} </p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_pack" defaultMessage=""/>
                </p>
                <p>{this.props.data.specInfo}&nbsp;&nbsp;{this.props.data.specMeteringUnit}/{this.props.data.specVolumeUnit} </p>
            </div>
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="mine.product.instruct_special" defaultMessage=""/>
                </p>
                <p>
                    {this.props.data.type?JSON.parse(this.props.data.type).map(item=>{
                        return <span>{item.name}&nbsp;&nbsp;</span>
                    }):""}
                </p>
            </div>
            {this.props.data.customProperty?JSON.parse(this.props.data.customProperty).map(item=>{
                return <div className={css.row}>
                    <p className={css.row_title}>
                        {item.name}    
                    </p>
                    <p>
                        {item.content}&nbsp;{item.unit}
                    </p>
                </div>
            }):""}
            <div className={css.row}>
                <p className={css.row_title}>
                    <FormattedMessage id="cart.remark" defaultMessage=""/>
                </p>
                <p>{this.props.data.remark}</p>
            </div>
        </div>
    }
}
export default injectIntl(ProductDetail);