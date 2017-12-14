/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Main.scss';
import appcss from '../../App.scss';
import moment from 'moment';
import {
    Router,
    Route,
    IndexRoute,
    hashHistory,
    Link
} from 'react-router';
import {
    Input,
    Icon,
    Button,
    Card
} from 'antd';
import {
    FormattedMessage
} from 'react-intl';

import {
    Anchor
} from 'antd';
const AnchorLink = Anchor.Link;
const Search = Input.Search;
import Slider from 'react-slick';
import Product from '../Public/Product/Product.js';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: [],
            category: [],
            categoryList: [],
            time: null,
            categoryChild: [], //选中的一级分类的所有子分类集合
            showCategoryDetail: false,
            activity: null,
            ads: []
        }
        this.interval = null;
    }
    componentWillMount() {
        axios.get('/api/get-main-data.json').then(res => {
            this.setState({
                brand: res.data.brand.result,
                category: res.data.category.result,
                categoryList: res.data.categoryList.result,
                activity: res.data.activity,
                ads: res.data.ads,
            }, () => {
                console.log("goto top");
                document.documentElement.scrollTop = document.body.scrollTop = 0;
            })
        })
    }
    handleCategory = (index) => {
        let categoryList = this.state.categoryList;
        if (categoryList[index].children) {
            this.setState({
                categoryChild: categoryList[index].children,
            })
        } else {
            axios.get(`/category/get-child-category.json?cid=${categoryList[index].categoryId}`).then(res => {
                if (res.data.isSucc) {
                    categoryList[index].children = res.data.result
                    this.setState({
                        categoryChild: res.data.result,
                        categoryList: categoryList,
                    })
                } else {
                    message.error(res.data.message);
                }
            })
        }
    }
    handleClick = (name) => {
        //设置定时器
        let element = document.getElementById(name);
        let top = 0;
        if (element) {
            top = element.offsetTop;
        }
        if (top > 0) {
            top = top - 130;
        }
        document.documentElement.scrollTop = document.body.scrollTop = top;
    }
    handleShow = (status) => {
        this.setState({
            showCategoryDetail: status
        })
    }
    onMouse = (e, index) => {
        if (e === 'enter') {
            this.handleShow(true)
            this.handleCategory(index);
            if (this.timer) {
                clearTimeout(this.timer);
            }
        }
        if (e == 'leave') {
            this.timer = setTimeout(() => {
                if (this.state.showCategoryDetail && !this.cate_enter) {
                    this.handleShow(false);
                }
            }, 1000);
        }

        if (e == "cate_enter") {
            this.cate_enter = true;
        }
        if (e == "cate_leave" && this.state.showCategoryDetail) {
            this.cate_enter = false;
            this.handleShow(false)
        }
    }
    handleBlue = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.handleShow(false);
    }
    render() {
        return <div className={appcss.body} id="home">
            <div className={css.main_top} onMouseLeave={this.handleBlue}>
                <div className={css.categorys_content} onMouseLeave={this.onMouse.bind(this,"leave")}>
                    {this.state.categoryList.map((item,index)=>{
                        return index<10?<p className={css.drop_item} onMouseEnter={this.onMouse.bind(this,'enter',index)} onClick={this.onMouse.bind(this,'enter',index)}>
                        <img src={item.iconUrl?item.iconUrl+"@18w_18h_1e_1c.png":"../img/no_icon.png"}/>{item.categoryName}
                        </p>:""
                    })}
                </div>
                <Slider
                    dots={true}
                    autoplay={true}
                    arrows={false}
                    infinite={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplaySpeed={3000}
                    speed={1000}
                    rtl={false}
                    className={css.slider_play}
                >
                    <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
                    <div><img className={css.slider_img} src='../img/banner1.jpg'/></div>
                    <div><img className={css.slider_img} src='../img/banner2.jpg'/></div>
                </Slider>
                <div className={css.main_right}>
                    {this.state.ads.map(item=>{
                        return<Link target="_blank" to={item.adsOutsideLink.slice(item.adsOutsideLink.indexOf("#")+1)}>
                        <img src={item.imgUrl+"@200w_200h_1e_1c.png"}/>
                        </Link>
                    })}
                </div>
                {this.state.showCategoryDetail?<div onMouseEnter={this.onMouse.bind(this,"cate_enter")} onMouseLeave={this.onMouse.bind(this,"cate_leave")} className={css.category_detail}>
                    {this.state.categoryChild.map((item,index)=>{
                        return <div className={index==0?css.category_detail_item_first:css.category_detail_item}>
                            <div className={css.category_detail_item_title}>{item.categoryName}</div>
                            <div className={css.category_detail_item_sperator}>></div>
                            <div className={css.category_detail_item_body}>
                                {item.childProductCategoryList.map((cate,cate_index)=>{
                                    return <p className={cate_index==item.childProductCategoryList.length-1?css.category_detail_item_body_item_last:css.category_detail_item_body_item}>
                                    <Link target="_blank" to={"page/product-list/"+cate.categoryId+"/"+cate.categoryName}>{cate.categoryName}</Link></p>
                                })}
                            </div>
                        </div>
                    })}
                </div>:""}
            </div>
            {this.state.activity?<LimitSale activity={this.state.activity} />:""}
            <div className={css.activity_slider}>
                {this.state.activity&&this.state.activity.product.length>0?<Slider
                    dots={true}
                    infinite={true}
                    autoplaySpeed={3000}
                    speed={1000}
                    slidesToShow={6}
                    slidesToScroll={6}
                    arrows={false}
                    autoplay={true}
                >
                   {this.state.activity.product.map((item,index) => {
                       return <Link className={css.activity_slider_item}  target="_blank" to={"page/product-detail/"+item.productId}>
                       <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            <div className={css.activity_body_item_header}>
                                <p>{100-item.discount*10}%off</p>
                            </div>
                           <div className={css.custom_image}>
                               <img alt="example" style={{width:"175px",height:"175px"}}  src={item.coverUrl+"@175w_175h_1e_1c.png"} />
                           </div>
                           <div className={css.activity_body_item_name}>{item.productName}</div>
                           <div className={css.activity_body_item_price}>
                               <span>${item.newPricr}</span>
                               <del>${item.price}</del>
                           </div>
                       </Card>
                        {item.inventory==0?<div className={css.activity_body_item_show}>
                            <p className={css.activity_body_item_show_large}>
                                <p className={css.activity_body_item_show_small}>
                                    <FormattedMessage id="main.sale.out" defaultMessage=""/>
                                </p>
                            </p>
                        </div>:""}
                    </Link>
                   })}
                </Slider>:""}
            </div>
            <div id="dingzhi" className={css.img_right}><img src='../img/post.png'/> </div>
            <div className={css.text_left} style={{backgroundImage:`url("../img/map.png")`}}>
                <div className={css.info_left}>
                    <p className={css.title} style={{textAlign: "left",paddingBottom: 0}}>
                        <i class="iconfont icon-dingzhi"></i>
                        <FormattedMessage id="main.post" defaultMessage="提交采购需求"/></p>
                    <p className={css.descrip}>
                        <FormattedMessage id="main.post.descrip" defaultMessage="提交采购需求说明"/>
                    </p>
                </div>
                <div className={`${css.right} ${css.brand_button}`}>
                    <Link target="_blank" to="page/post-want">
                        <FormattedMessage id="main.post" defaultMessage="更多"/>
                    </Link>
                </div>
            </div>
            <div id="suppliers" className={css.icon}>
                <i class="iconfont icon-DYC-14"></i>
            </div>
            <div className={css.title}>
                <FormattedMessage id="app.supplier" defaultMessage="供应商"/>
            </div>
            <div className={css.slip}>
                {this.state.brand.length>0?<Slider
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows={true}
                    nextArrow={<Icon className={css.slider_icon} type="right-circle-o" />}
                    prevArrow={<Icon className={css.slider_icon} type="left-circle-o" />}

                >
                   {this.state.brand.map(item => {
                       return <Link className={css.slider_item} target="_blank" to={"page/brand-detail/"+item.sid}>
                       <Card className={css.slider_card} >
                           <div className={css.custom_image}>
                               <img alt="example" width="30%" src={item.imgUrl+"@100w_100h_1e_1c.png"} />
                           </div>
                           <div>
                               <h3>{item.supplierName}</h3>
                               <p className={css.brand_intro}>
                                <div dangerouslySetInnerHTML={{__html: item.introduction}} />
                               </p>
                           </div>
                       </Card>
                    </Link>
                   })}
                </Slider>:""}
            </div>
            <div className={css.brand_button} >
                <Link target="_blank" to="page/brand-list">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <div className={css.icon}>
                <i class="iconfont icon-dailishangtubiao-"></i>
            </div>
            <div className={css.title}>
                <FormattedMessage id="app.product_category" defaultMessage="产品分类"/>
            </div>
            {this.state.category.length>0?<Category category={this.state.category}/>:""}
            <div className={css.fixed_right}>
                <p className={css.fixed_item} onClick={this.handleClick.bind(this,"home")}>
                    <i class="iconfont icon-dingbu"></i>
                </p>
                <p className={css.fixed_item} onClick={this.handleClick.bind(this,"dingzhi")}>
                    <i class="iconfont icon-dingzhi"></i>
                </p>
                <p className={css.fixed_item} onClick={this.handleClick.bind(this,"suppliers")}>
                    <i class="iconfont icon-DYC-14"></i>
                </p>
                {this.state.category.map((item,index)=>{
                    return<p className={css.fixed_item} onClick={this.handleClick.bind(this,"category_"+index)}>
                        <img src={item.levleOneProductCategory.iconUrl?item.levleOneProductCategory.iconUrl+"@40w_40h_1e_1c.png":"../img/no_icon.png"}/>
                    </p>
                })}
            </div>
        </div>
    }
}
class LimitSale extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            activity: {},
            status: 0,
        }
    }
    componentWillMount() {
        let activity = this.props.activity;
        let time = 0;
        if (moment(activity.time) - moment(activity.startTime) >= 0 && moment(activity.time) - moment(activity.endTime) < 0) {
            activity.status = 1; //进行中
            time = moment(activity.endTime).diff(moment(activity.time));
        } else if (moment(activity.time) - moment(activity.startTime) < 0) {
            activity.status = 0; //未开始
            /*time = moment(moment(activity.startTime) - moment(activity.time));*/
            time = moment(activity.startTime).diff(moment(activity.time));
        } else if (moment(activity.time) - moment(activity.endTime) > 0) {
            activity.status = 2; //已结束
            time = 0;
        }
        time = time;
        console.log(moment(time).utc().format('DD HH:mm:ss'));
        console.log(moment(time).dayOfYear());
        this.setState({
            time: time,
            status: activity.status,
        })
    }
    componentDidMount() {
        this.interval = setInterval(this.plusTime, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    plusTime = () => {
        let activity = this.state.activity;
        if (this.state.time - 1000 > 0) {
            let time = this.state.time - 1000;
            this.setState({
                time: time
            });
        } else if (this.state.status == 0) { //即将开始
            let time = moment(activity.endTime).diff(moment(activity.startTime));
            this.setState({
                status: 1,
                time: time,
            })
        } else if (this.state.activity.status == 1) {
            this.setState({
                status: 2,
                time: 0
            })
        }
    }
    render() {
        return <div className={css.main_activity_title}>
            <i class="iconfont icon-DYC-shijian"></i>
            <p className={css.activity_middle}>
                <FormattedMessage id="main.activity.title" defaultMessage=""/>
            </p>
            <p className={css.activity_right} style={{fontSize:"16px",fontWeight:"bold"}}>
                <FormattedMessage id="main.time.before" defaultMessage=""/>
                <p className={css.main_activity_time}>
                    {moment(this.state.time).utc().format('HH:mm:ss').split(":").map((item,index)=>{
                        return <p className={css.main_activity_time_item}>
                        <span className={css.main_activity_time_data}>{index==0&&moment(this.state.time).dayOfYear()>1?((moment(this.state.time).dayOfYear()-1)*24+parseInt(item)):item}</span>
                        {index==2?"":<span className={css.main_activity_time_sperator}>:</span>}</p>
                    })}</p>
                 <FormattedMessage id={this.state.status==0?"main.time.start.after":"main.time.end.after"} defaultMessage=""/>
            </p>
        </div>
    }
}
class Category extends React.Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return <div className={css.category}>
        {this.props.category.map((item,index)=>{
            return <div id={"category_"+index}>
                <div className={css.category_top}>
                    <p>{item.levleOneProductCategory.categoryName}</p>
                </div>
                <div className={css.category_item} >
                    <div className={css.left}>
                        <div className={css.cate_title} >
                            <img src={item.levleOneProductCategory.iconUrl?item.levleOneProductCategory.iconUrl+"@50w_50h_1e_1c.png":"../img/no_icon.png"}/>
                        </div>
                        <div className={css.left_content}>
                            <div className={css.left_category}>
                                {item.levleTwoProductCategory.map(cate=>{
                                    return <Link target="_blank" to={"page/product-list/"+cate.categoryId+"/"+cate.categoryName}>
                                        <p className={css.cate}>{cate.categoryName}</p>
                                    </Link>
                                })}
                            </div>
                            <div className={css.brand_button}>
                                <Link target="_blank" to={"page/category-list/"+item.levleOneProductCategory.categoryId+"/"+index}>
                                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                                </Link>
                            </div>
                        </div>
                        <div className={css.cate_bottom} >
                            <img style={{width:"100%"}} src={item.levleOneProductCategory.imgUrl+"@140w_140h_1e_1c.png"}/>
                        </div>
                    </div>
                    <div className={css.middle}>
                        {item.products.map((goods,index)=>{
                            return <Product className={css.product}  product={goods}/>
                        })}
                    </div>
                    {item.suppliers.length>0?
                    <div className={css.right}>
                        <Link to={"page/brand-detail/"+item.suppliers[0].sid}>
                            <img className={css.right_img} src={item.suppliers[0].imgUrl+"@120w_120h_1e_1c.png"}/>
                            <p className={css.right_title} style={{paddingBottom: 0}}>{item.suppliers[0].supplierName}</p>
                            <p className={css.right_content}>
                                <div dangerouslySetInnerHTML={{__html: item.suppliers[0].introduction}} />
                            </p>
                        </Link>
                        <div className={css.right_brand}>
                            {item.suppliers.map((brand,index)=>{
                                return (index>0&&index<7?<Link target="_blank" to={"page/brand-detail/"+brand.sid}>
                                    <img className={css.right_img_item} src={brand.imgUrl+"@70w_70h_1e_1c.png"}/>
                                </Link>:"")
                            })}
                        </div>
                    </div>:""}
                </div>
            </div>
        })}
        </div>
    }
}
export default Main