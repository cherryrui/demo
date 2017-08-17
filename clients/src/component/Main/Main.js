/**
 * Created by WF on 2017/8/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Main.scss';
import {Input,Icon,Button,Card} from 'antd';
const Search = Input.Search;
import Slider from 'react-slick'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cards: [
                {id:1,img:"../img/1.jpg",value: "dasdsad"},
                {id:1,img:"../img/1.jpg",value: "dasdsad"},
                {id:1,img:"../img/1.jpg",value: "dasdsad"},
                {id:1,img:"../img/1.jpg",value: "dasdsad"},
                {id:1,img:"../img/1.jpg",value: "dasdsad"},
            ],
            supply: [
                {id:1,name:"supply1",img:'../img/1.jpg',dscrip:"dsadsads"},
                {id:1,name:"supply2",img:'../img/2.jpg',dscrip:"dsadsads"},
                {id:1,name:"supply3",img:'../img/3.jpg',dscrip:"dsadsads"},
                {id:1,name:"supply4",img:'../img/1.jpg',dscrip:"dsadsads"},
                {id:1,name:"supply5",img:'../img/2.jpg',dscrip:"dsadsads"},
            ]

        }
    }
    render(){
        return <div className={css.main}>
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.title}>LOGO</p>
                    <p className={css.title}>Home</p>
                    <p className={css.title}>Brand</p>
                    <p className={css.title}>News</p>
                    <p className={css.title}>About Us</p>
                </div>
                <div className={css.right}>
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                    <Button type="primary" icon="shopping-cart">My Cart</Button>
                </div>
            </div>
            <Slider
                dots={true}
                autoplay
                infinite={true}
                slidesToShow={1}
                slidesToScroll={1}
                autoplaySpeed={2000}
            >
                <div><img className={css.slider_img} src='../img/1.jpg'/></div>
                <div><img className={css.slider_img} src='../img/2.jpg'/></div>
                <div><img className={css.slider_img} src='../img/3.jpg'/></div>
                <div><img className={css.slider_img} src='../img/1.jpg'/></div>
            </Slider>
            <div>
                <div>大时代</div>
                <p>Welcome to buy</p>
                <p></p>
            </div>
            <div className={css.slip}>
                <Slider
                    infinite={true}
                    speed={500}
                    slidesToShow={4}
                    slidesToScroll={1}
                    arrows={true}
                >
                   {this.state.supply.map(item => {
                       return <div className={css.slider_item}><Card className={css.slider_card} bodyStyle={{ padding: 0 }}>
                           <div className="custom-image">
                               <img alt="example" width="100%" src={item.img} />
                           </div>
                           <div className="custom-card">
                               <h3>Europe Street beat</h3>
                               <p>www.instagram.com</p>
                           </div>
                       </Card>
                       </div>
                   })}
                </Slider>
            </div>
            <Category/>
            <div className={css.footer}>
                <div className={css.item}>
                    <img src='../img/1.jpg'/>
                    <p>AUTHORITY</p>
                </div>
                <div className={css.item}>
                    <img src='../img/1.jpg'/>
                    <p>AUTHORITY</p>
                </div>
                <div className={css.item}>
                    <img src='../img/1.jpg'/>
                    <p>AUTHORITY</p>
                </div>
                <div className={css.item}>
                    <img src='../img/1.jpg'/>
                    <p>AUTHORITY</p>
                </div>

            </div>

        </div>
    }
}
class Category extends React.Component{


    constructor(props){
        super(props)
        this.state = {
            category: [
                {id:1,name:"tools",
                    cate:[
                        {id:1,name:"d"},
                        {id:2,name:"d"},
                        {id:3,name:"d"},
                        {id:4,name:"d"},
                        {id:5,name:"d"},
                        {id:6,name:"d"},
                    ],
                goods:[
                    {id:1,name:"a撒大声地萨达大大大打算打打大萨达萨达奥术大师的撒旦是 第三个发的滚动个地方股份第三个",price:2132,img:'../img/1.jpg'},
                    {id:2,name:"dsds",price:2132,img:'../img/1.jpg'},
                    {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                ]},{id:2,name:"tools",
                    cate:[
                        {id:1,name:"d"},
                        {id:2,name:"d"},
                        {id:3,name:"d"},
                        {id:4,name:"d"},
                        {id:5,name:"d"},
                        {id:6,name:"d"},
                    ],
                    goods:[
                        {id:1,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:2,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    ]},{id:3,name:"tools",
                    cate:[
                        {id:1,name:"d"},
                        {id:2,name:"d"},
                        {id:3,name:"d"},
                        {id:4,name:"d"},
                        {id:5,name:"d"},
                        {id:6,name:"d"},
                    ],
                    goods:[
                        {id:1,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:2,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:4,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:5,name:"dsds",price:2132,img:'../img/1.jpg'},
                    ]},{id:1,name:"tools",
                    cate:[
                        {id:1,name:"d"},
                        {id:2,name:"d"},
                        {id:3,name:"d"},
                        {id:4,name:"d"},
                        {id:5,name:"d"},
                        {id:6,name:"d"},
                    ],
                    goods:[
                        {id:1,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:2,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                        {id:3,name:"dsds",price:2132,img:'../img/1.jpg'},
                    ]}
            ]
        }
    }

    render(){
        return <div className={css.category}>
        {this.state.category.map(item=>{
            return <div className={css.category_item}>
                <div className={css.left}>
                    <div className={css.cate_title} style={{background:'../img/1.jpg'}}>
                        <p><Icon type="left-circle-o" /></p>
                        <p>{item.name}</p>
                    </div>
                    {item.cate.map(cate=>{
                        return <p className={css.cate}>{cate.name}</p>
                    })}
                    <div className={css.more}>
                        <span>LearnMore</span>
                    </div>
                </div>
                <div className={css.middle}>
                    <Card bordered={false}>
                {item.goods.map((goods,index)=>{
                    return (index<6?<Card.Grid className={css.card}>
                        <img src={goods.img}/>
                        <p className={css.name}>{goods.name}</p>
                        <p className={css.price}>
                            <span>{goods.price}</span>
                            <Icon type="line-chart" />
                        </p>
                    </Card.Grid>:"")
                })}
                </Card>
                </div>
                <div className={css.right}>
                    <p>dasdasdasd</p>
                </div>
            </div>
        })}
        </div>
    }
}
export default Main