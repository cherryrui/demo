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
            time: moment("2017/11/22 19:00:00").diff(moment("2017/11/22 17:00:00")),
        }
        this.interval = null;
    }
    componentWillMount() {
        axios.get('/api/get-main-data.json').then(res => {
            let time = moment(this.state.time).toISOString();
            time = time.replace("T", ' ');
            time = time.replace(".000Z", '');
            console.log(time);
            this.setState({
                brand: res.data.brand.result,
                category: res.data.category.result,
                categoryList: res.data.categoryList.result,
                time: moment(time)
            })
            this.interval = setInterval(this.plusTime, 1000);
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    plusTime = () => {
        let time = this.state.time - 1000;
        this.setState({
            time: time
        });
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
    handleCategory = () => {

    }

    render() {
        return <div className={appcss.body} id="home">
            <div className={css.main_top}>
                <div className={css.categorys_content} >
                    {this.state.categoryList.map(item=>{
                        return <p className={css.drop_item} onClick={this.handleCategory.bind(this,item.categoryId,item.categoryName)}>
                        <img src={item.iconUrl?item.iconUrl+"@18w_18h_1e_1c.png":"../img/no_icon.png"}/>{item.categoryName}
                        </p>
                    })}
                </div>
                <Slider
                    dots={true}
                    autoplay
                    arrows={false}
                    infinite={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplaySpeed={4000}
                    rtl={false}
                    className={css.slider_play}
                >
                    <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
                    <div><img className={css.slider_img} src='../img/banner1.jpg'/></div>
                    <div><img className={css.slider_img} src='../img/banner2.jpg'/></div>
                </Slider>
                <div className={css.main_right}>
                    <img src='../img/no_picture.jpg'></img>
                    <img src='../img/no_picture.jpg'></img>
                </div>
            </div>
            <div className={css.main_activity_title}>
                <i class="iconfont icon-DYC-shijian"></i>
                <p className={css.activity_middle}>
                    <FormattedMessage id="main.activity.title" defaultMessage=""/>
                </p>
                <p className={css.activity_right}>
                    <FormattedMessage id="main.time.before" defaultMessage=""/>
                    <p className={css.main_activity_time}>{moment(this.state.time).format('HH:mm:ss').split(":").map((item,index)=>{
                        return <p className={css.main_activity_time_item}>
                        <span className={css.main_activity_time_data}>{item}</span>
                        {index==2?"":<span className={css.main_activity_time_sperator}>:</span>}</p>
                    })}</p>
                     <FormattedMessage id="main.time.after" defaultMessage=""/>
                </p>
            </div>
            <div className={css.activity_slider}>
                {this.state.brand.length>0?<Slider
                    dots={true}
                    infinite={true}
                    autoplaySpeed={3000}
                    speed={500}
                    slidesToShow={6}
                    slidesToScroll={6}
                    arrows={false}
                    autoplay={true}
                    centerPadding={10}
                >
                   {this.state.brand.map((item,index) => {
                       return <Link className={css.activity_slider_item}  target="_blank" to={"page/brand-detail/"+item.sid}>
                       <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            <div className={css.activity_body_item_header}>
                                <p>70%off</p>
                            </div>
                           <div className={css.custom_image}>
                               <img alt="example" width="100%" src={item.imgUrl+"@175w_175h_1e_1c.png"} />
                           </div>
                           <div className={css.activity_body_item_name}>{item.supplierName}</div>
                           <div className={css.activity_body_item_price}>
                               <span>$90</span>
                               <del>$165</del>
                           </div>
                       </Card>
                        <div className={css.activity_body_item_show}>
                            <p className={css.activity_body_item_show_large}>
                                <p className={css.activity_body_item_show_small}>
                                    <FormattedMessage id="main.sale.out" defaultMessage=""/>
                                </p>
                            </p>
                        </div>
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
class Category extends React.Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    /**
     * 查看更多2级分类
     * @param  {[type]} id 1级分类id
     * @return {[type]}    [description]
     */
    handleCategory = (id) => {

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
                                <Link target="_blank" to={"page/category-list/"+item.levleOneProductCategory.categoryId+"/"+item.levleOneProductCategory.categoryName}>
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