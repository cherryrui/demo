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

const Search = Input.Search;
import Slider from 'react-slick'

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
            //console.log(res.data)
            this.setState({
                brand: res.data.brand.result,
                category: res.data.category.result
            })
        })
    }

    render() {
        console.log(this.state.category);
        return <div className={appcss.body}>
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
                <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
                <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
                <div><img className={css.slider_img} src='../img/autoSlide.jpg'/></div>
            </Slider>
            
            <div className={css.icon}><Icon type="smile-o" /></div>
            <div className={css.title}><FormattedMessage id="main.welcome" defaultMessage="欢迎来到DBUY"/></div>
            <div className={css.content}>
                <FormattedMessage id="main.welcome.info" defaultMessage="欢迎信息"/>
            </div>
            <div className={css.brand_button}>
                <Link  to="main/about">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <div>
                <div className={css.img_right}><img src='../img/post.png'/> </div>
                <div className={css.text_left}>
                    <div className={css.info_left}>
                        <p className={css.title} style={{textAlign: "left",paddingBottom: 0}}><span></span><FormattedMessage id="main.post" defaultMessage="提交采购需求"/></p>
                        <p className={css.descrip}>
                            <FormattedMessage id="main.post.descrip" defaultMessage="提交采购需求说明"/>
                        </p>
                    </div>
                    <div className={`${css.right} ${css.brand_button}`}>
                        <Link  to="main/post-want">
                            <FormattedMessage id="main.post" defaultMessage="更多"/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={css.icon}><Icon type="safety" /></div>
            <div className={css.title}>
                <FormattedMessage id="app.brand" defaultMessage="品牌"/>
            </div>
            <div className={css.slip}>
                {this.state.brand.length>0?<Slider
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows={true}
                    nextArrow={<Icon type="right-circle-o" />}
                    prevArrow={<Icon type="left-circle-o" />}

                >
                   {this.state.brand.map(item => {
                       return <Link className={css.slider_item} to={"main/brand-detail/"+item.sid}>
                       <Card className={css.slider_card} >
                           <div className={css.custom_image}>
                               <img alt="example" width="30%" src={item.imgUrl} />
                           </div>
                           <div>
                               <h2>{item.supplierName}</h2>
                               <p style={{textAlign: "center"}}>{item.introduction}</p>
                           </div>
                       </Card>
                    </Link>
                   })}
                </Slider>:""}
            </div>
            <div className={css.brand_button}>
                <Link  to="main/brand-list">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <div className={css.icon}>
            </div>
            <div className={css.title}>
                <FormattedMessage id="app.product_category" defaultMessage="产品分类"/>
            </div>
            {this.state.category.length>0?<Category category={this.state.category}/>:""}
            <div className={css.fixed_right}>
                <p className={css.fixed_item}>
                <Icon type="to-top" /></p>
                <p className={css.fixed_item}>
                    <i class="iconfont icon-set"></i>
                </p>
                <p className={css.fixed_item}><Icon type="to-top" /></p>
                <p className={css.fixed_item_grey}><Icon type="to-top" /></p>
                <p className={css.fixed_item_grey}><Icon type="to-top" /></p>
                <p className={css.fixed_item_grey}>
                    <i class="iconfont icon-set"></i>
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
        {this.props.category.map(item=>{
            return <div className={css.category_item}>
                <div className={css.left}>
                    <div className={css.cate_title} style={{background: `url(${item.img})`}}>
                        <div>
                            <p><Icon type="left-circle-o" /></p>
                            <p className={css.cate_name}>{item.levleOneProductCategory.categoryName}</p>
                        </div>
                    </div>
                    <div>
                    {item.levleTwoProductCategory.map(cate=>{
                        return <Link to={"main/product-list/"+cate.categoryId}>
                            <p className={css.cate}>{cate.categoryName}</p>
                        </Link>
                    })}
                    <div className={css.brand_button}>
                        <Link  to={"main/category-list/"+item.id}>
                            <FormattedMessage id="app.more" defaultMessage="更多"/>
                        </Link>
                    </div>
                    </div>
                </div>
                <div className={css.middle}>
                    <Card bordered={false} noHovering>
                        {item.products.map((goods,index)=>{
                            return (index<6?<Link to={"main/product-detail/"+goods.productId}><Card.Grid className={css.card}>
                                <img src={goods.img}/>
                                <p className={css.name}>{goods.productName}</p>
                                <p className={css.price}>
                                    <span>{goods.price}</span>
                                    <Icon type="line-chart" />
                                </p>

                        </Card.Grid></Link>:"")
                        })}
                    </Card>
                </div>
                {item.suppliers.length>0?
                <div className={css.right}>
         
                    <Link to={"main/brand-detail/"+item.suppliers.sid}>
                        <img style={{width: "60%",margin: "0 20%"}} src={item.suppliers[0].imgUrl}/>
                        <p className={css.title} style={{paddingBottom: 0}}>{item.suppliers[0].supplierName}</p>
                        <p className={css.content} style={{padding: "10px",textAlign: "center"}}>{item.suppliers[0].introduction}</p>
                    </Link>{console.log(item.suppliers.supplierName)}
                    <Card bordered={false} noHovering>
                        {item.suppliers.map((brand,index)=>{
                            return (index>0&&index<7?<Link to={"main/brand-detail/"+brand.sid}>
                                <Card.Grid className={css.card} style={{padding:"5px"}}>
                                    <img style={{width:"100%"}} src={brand.imgUrl}/>
                            </Card.Grid>
                        </Link>:"")
                        })}
                    </Card>:""
                </div>:""}
            </div>
        })}
        </div>
    }
}
export default Main