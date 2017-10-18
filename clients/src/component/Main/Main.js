/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Main.scss';
import appcss from '../../App.scss';
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
        }
    }
    componentWillMount() {
        axios.get('/api/get-main-data.json').then(res => {
            this.setState({
                brand: res.data.brand.result,
                category: res.data.category.result
            })
        })
    }
    handleClick = (name) => {
        //设置定时器
        let element = document.getElementById(name);
        console.log(element);
        let top = 0;
        if (element) {
            top = element.offsetTop;
        }
        if (top > 0) {
            top = top - 130;
        }
        document.documentElement.scrollTop = document.body.scrollTop = top;
    }

    render() {
        return <div className={appcss.body} id="home">
            <Slider
                dots={true}
                autoplay
                infinite={true}
                slidesToShow={1}
                slidesToScroll={1}
                autoplaySpeed={2000}
                className={css.slider_play}
            >
                <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
                <div><img className={css.slider_img} src='../img/banner1.jpg'/></div>
                <div><img className={css.slider_img} src='../img/banner2.jpg'/></div>
            </Slider>
            
            <div className={css.icon}>
                <i class="iconfont icon-icon"></i>
            </div>
            <div className={css.title}><FormattedMessage id="main.welcome" defaultMessage="欢迎来到DBUY"/></div>
            <div className={css.content}>
                <FormattedMessage id="main.welcome.info" defaultMessage="欢迎信息"/>
            </div>
            <div className={css.brand_button}>
                <Link  to="page/about">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <div id="dingzhi">
                <div className={css.img_right}><img src='../img/post.png'/> </div>
                <div className={css.text_left}>
                    <div className={css.info_left}>
                        <p className={css.title} style={{textAlign: "left",paddingBottom: 0}}>
                            <i class="iconfont icon-dingzhi"></i>
                            <FormattedMessage id="main.post" defaultMessage="提交采购需求"/></p>
                        <p className={css.descrip}>
                            <FormattedMessage id="main.post.descrip" defaultMessage="提交采购需求说明"/>
                        </p>
                    </div>
                    <div className={`${css.right} ${css.brand_button}`}>
                        <Link  to="page/post-want">
                            <FormattedMessage id="main.post" defaultMessage="更多"/>
                        </Link>
                    </div>
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
                       return <Link className={css.slider_item} to={"page/brand-detail/"+item.sid}>
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
                <Link  to="page/brand-list">
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
                <p className={css.fixed_item_grey} onClick={this.handleClick.bind(this,"category_0")}>
                    <i class="iconfont icon-DYC-13"></i>
                </p>
                <p className={css.fixed_item_grey} onClick={this.handleClick.bind(this,"category_1")}>
                    <i class="iconfont icon-DYC-15"></i>
                </p>
                <p className={css.fixed_item_grey} onClick={this.handleClick.bind(this,"category_2")}>
                    <i class="iconfont icon-DYC-11"></i>
                </p>
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
            return <div className={css.category_item} id={"category_"+index}>
                <div className={css.left}>
                    <div className={css.cate_title} >
                        <img style={{width:"100%"}} src={item.levleOneProductCategory.imgUrl+"@170w_140h_1e_1c.png"}/>
                    </div>
                    <div className={css.left_content}>
                        <div>
                            {item.levleTwoProductCategory.map(cate=>{
                                return <Link to={"page/product-list/"+cate.categoryId+"/"+cate.categoryName}>
                                    <p className={css.cate}>{cate.categoryName}</p>
                                </Link>
                            })}
                        </div>
                        <div className={css.brand_button}>
                            <Link  to={"page/category-list/"+item.levleOneProductCategory.categoryId+"/"+item.levleOneProductCategory.categoryName}>
                                <FormattedMessage id="app.more" defaultMessage="更多"/>
                            </Link>
                        </div>
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
                        <img className={css.right_img} src={item.suppliers[0].imgUrl+"@280w_280h_1e_1c.png"}/>
                        <p className={css.right_title} style={{paddingBottom: 0}}>{item.suppliers[0].supplierName}</p>
                        <p className={css.right_content}>
                            <div dangerouslySetInnerHTML={{__html: item.suppliers[0].introduction}} />
                        </p>
                    </Link>
                    <div className={css.right_brand}>
                        {item.suppliers.map((brand,index)=>{
                            return (index>0&&index<7?<Link to={"page/brand-detail/"+brand.sid}>
                                <img className={css.right_img_item} src={brand.imgUrl+"@70w_70h_1e_1c.png"}/>
                            </Link>:"")
                        })}
                    </div>
                </div>:""}
            </div>
        })}
        </div>
    }
}
export default Main