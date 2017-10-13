/**
 * Created by WF on 2017/9/4.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './PersonCenter.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import operator from './operator.js';
import Brand from '../Public/Brand/Brand.js';
import Product from '../Public/Product/Product.js';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Button,
    Icon,
    Tooltip,
    Progress,
    Pagination,
    Avatar
} from 'antd';

class PersonCenter extends React.Component {
    jump = (e) => {
        this.props.history.pushState(null, "page/mine/system-message")
    }
    constructor(props) {
        super(props);
        this.state = {
            user: {
                type: 2, //用户类型，1：供应商，2：代理商 3：个人
            },
            message_list: [],
            products: [],
            brands: [],

        }

    }
    componentWillMount() {
        if (sessionStorage.user) {
            /*this.state.user = JSON.parse(sessionStorage.user);*/
            axios.get("/user/get-recent-message.json").then(res_m => {
                axios.get('/product/get-like-product.json').then(res_P => {
                    axios.get('/brand/get-like-brand.json').then(res_b => {
                        this.setState({
                            message_list: res_m.data.message,

                            brands: res_b.data.brands
                        })
                    })
                })
            })
        } else {
            window.location.href = '/#/login'
        }
    }
    handleMenu = (key, url) => {
        console.log(key, url);
        this.setState({
            select: key
        });
        if (url)
            this.props.history.pushState(null, url);
    }
    render() {
        console.log(this.state.user.type,this.state.user.type==1)
        return <div class={css.center}>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person" defaultMessage="分类"/>
            </div>
            <div className={css.user}>
                <div className={css.user_info}>
                    <Avatar size="large" icon="user" className={css.user_avatar}/>
                    <div className={css.user_name}>
                        <p  style={{ fontSize:18,fontWeight:"bold"}}>
                             {this.state.user.name}dddddddd
                             <Icon type="user"  className={css.name_icon}/></p>
                        <p>
                            <Icon type="safety" className={css.member_icon}/>
                            fvvdddddd
                        </p>
                        <p>
                            <FormattedMessage id="app.account.security" defaultMessage="分类"/>:
                            <div style={{ width: 100,paddingLeft:5}}>

                                <Progress type="line" percent={50} format={() => 'middle'}  strokeWidth={10} strokeHeigth={12} status="active" style={{ color: "#ff9a2c"}} />

                            </div>
                        </p>
                    </div>
                </div>
                <div className={css.user_message}>
                    <div className={css.user_message_title}>
                        <FormattedMessage id="mine.my.message" defaultMessage="分类"/>
                        <p className={css.message_more} onClick={this.jump}>
                            <FormattedMessage id="app.more" defaultMessage="分类" />
                        </p>
                    </div>
                    {this.state.message_list.map(item=>{
                        return <div className={css.user_message_item}>
                            <i>●</i>【
                            {item.type==0?<FormattedMessage id="mine.message.system" defaultMessage="分类"/>
                            :<FormattedMessage id="mine.message.consult" defaultMessage="分类"/>}】
                            {item.info}
                        </div>
                    })}
                </div>               
            </div>
            <div className={css.order}>
                <p className={css.title_item}>
                    <FormattedMessage id="mine.order" defaultMessage="分类"/>
                </p>
                <div className={css.order_content}>
                    {operator.order_menu.map(item=>{
                        return <div className={css.order_item}
                        onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <img src={item.icon}/>
                            <Tooltip placement="top"
                                arrowPointAtCenter
                                title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                            >
                                <p className={css.order_text}>
                                    <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                </p>
                            </Tooltip>
                            <p className={css.order_num}>30</p>
                        </div>
                    })}
                </div>    
            </div>
            <div style={{display: "flex"}}>
                <div className={css.demand}>
                    <p className={css.title_item}>
                        <FormattedMessage id="app.demand.management" defaultMessage="分类"/>
                    </p>
                    <div className={css.demand_content}>
                        {operator.demand_menu.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                        arrowPointAtCenter
                                        title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                        <p className={css.order_text}>
                                            <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                        </p>
                                 </Tooltip>
                                    <p className={css.order_num}>30</p>
                            </div>
                    })}
                    </div>                    
                </div>
                <div className={css.favorite}>
                    <p className={css.title_item}>
                        <FormattedMessage id="mine.favorite" defaultMessage="分类"/>
                    </p>
                    <div className={css.favorite_content}>
                        {operator.favorite_menu.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                    arrowPointAtCenter
                                    title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                        <p className={css.order_text}>
                                            <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                        </p>
                                </Tooltip>
                                    <p className={css.order_num} >30</p>
                            </div>
                        })}
                    </div>
                </div>
                {this.state.user.type==2?
                <div className={css.quotation}>
                    <p className={css.title_item}>
                        <FormattedMessage id="quotation.quotation" defaultMessage="分类"/>
                    </p>
                    <div className={css.quotation_content}>
                        {operator.quotation_menu.map(item=>{
                            return <div className={css.order_item}
                                onClick={this.handleMenu.bind(this,item.key,item.url)}
                            >
                                <img src={item.icon}/>
                                <Tooltip placement="top"
                                    arrowPointAtCenter
                                    title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                                >
                                        <p className={css.order_text}>
                                            <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                        </p>
                                </Tooltip>
                                    <p className={css.order_num}>30</p>

                            </div>
                        })}
                    </div>
                </div>
                    :this.state.user.type==1?
                    <div></div>
                    :this.state.user.type==3?
                    <div></div>:""
                    }
            </div>
            {this.state.user.type==1?<div className={css.management}>
                    <p className={css.title_item}>
                        <FormattedMessage id="mine.product.management" defaultMessage="分类"/>
                    </p>
                    <div className={css.management_content}>
                    {operator.management_menu.map(item=>{
                        return <div className={css.order_item}
                            onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <img src={item.icon}/>
                            <Tooltip placement="top"
                                arrowPointAtCenter
                                title={<FormattedMessage id={item.value_id} defaultMessage="分类"/>}
                            >
                                    <p className={css.order_text}>
                                        <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                    </p>
                            </Tooltip>
                                <p className={css.order_num}>30</p>

                        </div>
                    })}
                    </div>
                </div>
                :this.state.user.type==2?
                <div></div>
                :this.state.user.type==3?
            <div></div>:""
                }
            <div className={css.like_title}>
                <FormattedMessage id="app.like" defaultMessage="分类"/>

            </div>
            <div className={css.like}>
                <div className={css.like_content}>
                    <div className={css.like_product}>
                        <div className={css.product_title}>
                            <FormattedMessage id="app.products" defaultMessage="分类"/>
                            <Pagination simple defaultCurrent={2} total={50} />
                        </div>
                        <div  className={css.product_list}>
                            {this.state.products.map(item=>{
                                return <Product no_price product={item} className={css.like_item}/>
                            })}
                        </div>
                    </div>

                </div>                 
            </div>
            <div className={css.like}>
                <div className={css.like_content}>
                    <div className={css.like_brand}>
                        <div className={css.brand_title}>
                            <FormattedMessage id="app.products" defaultMessage="分类"/>
                            <Pagination simple defaultCurrent={2} total={50} />
                        </div>
                        <div  className={css.brand_list}>
                                    {this.state.brands.map(item=>{
                                        return <Brand brand={item} className={css.like_item}/>
                                    })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default PersonCenter;