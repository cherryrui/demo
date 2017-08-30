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
            cards: [{
                id: 1,
                img: "../img/1.jpg",
                value: "dasdsad"
            }, {
                id: 1,
                img: "../img/1.jpg",
                value: "dasdsad"
            }, {
                id: 1,
                img: "../img/1.jpg",
                value: "dasdsad"
            }, {
                id: 1,
                img: "../img/1.jpg",
                value: "dasdsad"
            }, {
                id: 1,
                img: "../img/1.jpg",
                value: "dasdsad"
            }, ],
            supply: [{
                id: 1,
                name: "SUPPLIER NAME",
                img: '../img/branch_1.jpg',
                dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors "
            }, {
                id: 1,
                name: "SUPPLIER NAME",
                img: '../img/branch_1.jpg',
                dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
            }, {
                id: 1,
                name: "SUPPLIER NAME",
                img: '../img/branch_1.jpg',
                dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
            }, {
                id: 1,
                name: "SUPPLIER NAME",
                img: '../img/branch_1.jpg',
                dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
            }, {
                id: 1,
                name: "SUPPLIER NAME",
                img: '../img/branch_1.jpg',
                dscrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors"
            }, ]

        }
    }
    render() {
        console.log("main");
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
            <div className={css.content}>施蒂利克粉丝带拿到赛道上大大打算打打大
            萨达阿萨德阿萨德阿斯顿撒大大大大萨达萨达啊实打实大阿萨德啊实打实范德萨发答
            复安抚第三方安抚按时发达时</div>
            <div className={css.brand_button}>
                <Link  to="main/about">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <div>
                <div className={css.img_right}><img src='../img/post.png'/> </div>
                <div className={css.text_left}>
                    <div className={css.info_left}>
                        <p className={css.title} style={{textAlign: "left",paddingBottom: 0}}><span>fgfd</span><FormattedMessage id="main.post" defaultMessage="提交采购需求"/></p>
                        <p className={css.descrip}><FormattedMessage id="main.post.descrip" defaultMessage="提交采购需求说明"/></p>
                    </div>
                    <div className={css.right}>
                        <Button className={css.theme_button} type="primary" size="large">
                            <FormattedMessage id="main.post" defaultMessage="购买"/>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={css.icon}><Icon type="safety" /></div>
            <div className={css.title}>
                <FormattedMessage id="app.brand" defaultMessage="品牌"/>
            </div>
            <div className={css.slip}>
                <Slider
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows={true}
                    nextArrow={<Icon type="right-circle-o" />}
                    prevArrow={<Icon type="left-circle-o" />}

                >
                   {this.state.supply.map(item => {
                       return <Link className={css.slider_item} to={"main/branch-detail/"+item.id}>
                       <Card className={css.slider_card} >
                           <div className={css.custom_image}>
                               <img alt="example" width="30%" src={item.img} />
                           </div>
                           <div>
                               <h2>{item.name}</h2>
                               <p style={{textAlign: "left"}}>{item.dscrip}</p>
                           </div>
                       </Card>
                    </Link>
                   })}
                </Slider>
            </div>
            <div className={css.brand_button}>
                <Link  to="main/branch-list">
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                </Link>
            </div>
            <Category/>
            <div className={css.fixed_right}>
                <p className={css.fiexed_item}><Icon type="to-top" /></p>
                <p className={css.fiexed_item}><Icon type="to-top" /></p>
                <p className={css.fiexed_item}><Icon type="to-top" /></p>
                <p className={css.fiexed_item}><Icon type="to-top" /></p>
                <p className={css.fiexed_item}><Icon type="to-top" /></p>
            </div>

        </div>
    }
}
class Category extends React.Component {


    constructor(props) {
            super(props)
            this.state = {
                category: [{
                    id: 1,
                    name: "tools",
                    img: "../img/cate_bg_1.jpg",
                    cate: [{
                        id: 1,
                        name: "Electric tools"
                    }, {
                        id: 2,
                        name: "Hardware tools"
                    }, {
                        id: 3,
                        name: "Torque tools"
                    }, {
                        id: 4,
                        name: "Wrench"
                    }, {
                        id: 5,
                        name: "Electric tools"
                    }, {
                        id: 6,
                        name: "Hardware tools"
                    }, ],
                    goods: [{
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
                }, {
                    id: 2,
                    name: "tools",
                    img: "../img/cate_bg_2.jpg",
                    cate: [{
                        id: 1,
                        name: "Electric tools"
                    }, {
                        id: 2,
                        name: "Hardware tools"
                    }, {
                        id: 3,
                        name: "Torque tools"
                    }, {
                        id: 4,
                        name: "Wrench"
                    }, {
                        id: 5,
                        name: "Electric tools"
                    }, {
                        id: 6,
                        name: "Hardware tools"
                    }, ],
                    goods: [{
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
                }, {
                    id: 3,
                    name: "tools",
                    img: "../img/cate_bg_3.jpg",
                    cate: [{
                        id: 1,
                        name: "Electric tools"
                    }, {
                        id: 2,
                        name: "Hardware tools"
                    }, {
                        id: 3,
                        name: "Torque tools"
                    }, {
                        id: 4,
                        name: "Wrench"
                    }, {
                        id: 5,
                        name: "Electric tools"
                    }, {
                        id: 6,
                        name: "Hardware tools"
                    }, ],
                    goods: [{
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
                }, {
                    id: 1,
                    name: "tools",
                    img: "../img/cate_bg_3.jpg",
                    cate: [{
                        id: 1,
                        name: "Electric tools"
                    }, {
                        id: 2,
                        name: "Hardware tools"
                    }, {
                        id: 3,
                        name: "Torque tools"
                    }, {
                        id: 4,
                        name: "Wrench"
                    }, {
                        id: 5,
                        name: "Electric tools"
                    }, {
                        id: 6,
                        name: "Hardware tools"
                    }, ],
                    goods: [{
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
                }],
                branch: [{
                    id: 0,
                    name: "SUPPLIER NAME",
                    descrip: "cc crowm in windows and doors cd..LTD is a independent research and development,production and sales of doors",
                    img: "../img/br_main.jpg",
                }, {
                    id: 1,
                    name: "dasdaadsa",
                    img: "../img/br_bg_1.jpg"
                }, {
                    id: 2,
                    name: "dasdaadsa",
                    img: "../img/br_bg_2.jpg"
                }, {
                    id: 3,
                    name: "dasdaadsa",
                    img: "../img/br_bg_3.jpg"
                }, {
                    id: 4,
                    name: "dasdaadsa",
                    img: "../img/br_bg_1.jpg"
                }, {
                    id: 5,
                    name: "dasdaadsa",
                    img: "../img/br_bg_1.jpg"
                }, {
                    id: 6,
                    name: "dasdaadsa",
                    img: "../img/br_bg_1.jpg"
                }, ]
            }
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
        {this.state.category.map(item=>{
            return <div className={css.category_item}>
                <div className={css.left}>
                    <div className={css.cate_title} style={{background: `url(${item.img})`}}>
                        <div>
                            <p><Icon type="left-circle-o" /></p>
                            <p className={css.cate_name}>{item.name}</p>
                        </div>
                    </div>
                    {item.cate.map(cate=>{
                        return <Link to={"main/product-list/"+cate.id}>
                            <p className={css.cate}>{cate.name}</p>
                        </Link>
                    })}
                    <div className={css.brand_button}>
                        <Link  to={"main/category-list/"+item.id}>
                            <FormattedMessage id="app.more" defaultMessage="更多"/>
                        </Link>
                    </div>
                </div>
                <div className={css.middle}>
                    <Card bordered={false} noHovering>
                        {item.goods.map((goods,index)=>{
                            return (index<6?<Link to={"main/product-detail/"+goods.id}><Card.Grid className={css.card}>
                                <img src={goods.img}/>
                                <p className={css.name}>{goods.name}</p>
                                <p className={css.price}>
                                    <span>{goods.price}</span>
                                    <Icon type="line-chart" />
                                </p>

                        </Card.Grid></Link>:"")
                        })}
                    </Card>
                </div>
                <div className={css.right}>
                    <Link to={"main/branch-detail/"+this.state.branch[0].id}>
                        <img style={{width: "60%",margin: "0 20%"}} src={this.state.branch[0].img}/>
                        <p className={css.title} style={{paddingBottom: 0}}>{this.state.branch[0].name}</p>
                        <p className={css.content} style={{padding: "10px"}}>{this.state.branch[0].descrip}</p>
                    </Link>
                    <Card bordered={false} noHovering>
                        {this.state.branch.map((branch,index)=>{
                            return (index>0&&index<7?<Link to={"main/branch-detail/"+branch.id}>
                                <Card.Grid className={css.card} style={{padding:"5px"}}>
                                    <img style={{width:"100%"}} src={branch.img}/>
                            </Card.Grid>
                        </Link>:"")
                        })}
                    </Card>
                </div>
            </div>
        })}
        </div>
    }
}
export default Main