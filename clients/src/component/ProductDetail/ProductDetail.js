import React from 'react';
import appcss from '../../App.scss';
import axios from 'axios';
import moment from 'moment';
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
import cartAction from '../../action/cartAction.js';
import { connect } from 'react-redux';
/**
 * 商品详情页面，根据传递参数（id）查询商品信息并显示
 */
@connect(state=>({cart: state.cart}),cartAction)
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
        }
    }

    componentWillMount() {
        console.log("ComponentWillMonut", this.props.params.id);
        axios.get(`/product/get-product-byId.json?id=${this.props.params.id}`).then(res => {
            this.setState({
                products: res.data.products,
                reviews: res.data.reviews,
                product: res.data.product,
                curImg: res.data.product.imgs[0]
            })
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
    handleAddCart = () => {
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
                this.props.addCart(this.state.product);
                //axios.post('/cart/add-cart.json',this.state.product).then(res=>{
                //    console.log("添加成功！")
                //})
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
    handleAttr=(index,e)=>{
        this.state.product.attr[index].select_value = e.target.value;
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
                        <Link to="main/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search: this.state.product.name?this.state.product.name:"null"}}
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
                    <div ref={(specify)=>this.specify=specify}>
                        {this.state.product.attr?this.state.product.attr.map((item,index)=>{
                            return <div key={item.id} className={css.item}>
                            <p className={css.title}>{item.name}</p>
                            <p>
                                <RadioGroup onChange={this.handleAttr.bind(this,index)}>
                                    {item.value.map(attr=>{
                                        return <RadioButton key={attr.id} value={attr.id}>{attr.value}</RadioButton>
                                    })}
                                </RadioGroup>
                            </p>
                        </div>
                        }):""}
                    </div>
                    
                    <div className={css.bottom}>
                        <p className={css.num}>
                            <FormattedMessage id="product.detail.num" defaultMessage="数量"/>
                            :
                        </p>
                        <p>
                            <InputNumber size="large" min={1} defaultValue={3} onChange={this.handleNum} />
                        </p>
                        <p className={css.add_cart} onClick={this.handleAddCart}>
                            <Icon type="shopping-cart" />
                            &nbsp;&nbsp;
                            <FormattedMessage id="product.detail.add" defaultMessage="加入购物车"/>
                        </p>
                    </div>
                </div>
                {this.state.product.brand?<div className={css.left}>
                    <img src={this.state.product.brand.img}/>
                    <p className={css.name}>{this.state.product.brand.name}</p>
                    <p className={css.foot}>
                        <FormattedMessage id="branch.product.rate" defaultMessage="评分"/>
                        <Rate className={css.rating} allowHalf defaultValue={this.state.product.brand.rating} disabled />
                        <span>{this.state.product.brand.rating}</span>
                    </p>
                    <div className={css.contact}>
                        <Icon type="customer-service" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                        <FormattedMessage id="product.detail.contact" defaultMessage="联系客服"/>
                    </div>
                </div>:""}
            </div>
            <div className={css.product_img}>
             {this.state.product.imgs?this.state.product.imgs.map((item, index)=> {
                 return <img key={"img" + index} className={index == this.state.index_img ? css.active : css.img} src={item} onClick={this.changeImg.bind(this, index)}/>
             }):""}
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
            <Modal
                title={formatMessage({id: 'login.login.title'})}
                visible={this.state.visible}
                footer={null}
            >
            <div className={css.form}>
                <Form onSubmit={this.handleSubmit} className={css.login_form}>
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.name'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} 
                        placeholder= {formatMessage({id: 'login.input.name'})} />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: formatMessage({id: 'login.input.password'}) }],
                    })(
                        <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} 
                        type="password" placeholder= {formatMessage({id: 'login.input.password'})} />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>
                            <FormattedMessage id="login.remember" defaultMessage="记住密码"/>
                        </Checkbox>
                    )}
                        <a className={css.forgot} href="">
                            <FormattedMessage id="login.forget" defaultMessage="用户登录"/>
                        </a>
                        <Button size="large" type="primary" htmlType="submit" className={css.button}>
                            <FormattedMessage id="login.login" defaultMessage="登录"/>
                        </Button>
                        <Button size="large" type="primary" htmlType="submit" className={css.button}>
                            <FormattedMessage id="login.registor" defaultMessage="注册"/>
                    </Button>
                    </FormItem>
                </Form>
            </div>

            </Modal>
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
ProductDetail = Form.create()(ProductDetail);
export default injectIntl(ProductDetail);