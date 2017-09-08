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
    Avatar
} from 'antd';



class PersonCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            message_list: [],
            products: [],
            brands: [],

        }

    }
    componentWillMount() {
        this.state.user = JSON.parse(localStorage.user);
        axios.get("/user/get-recent-message.json").then(res_m => {
            axios.get('/product/get-like-product.json').then(res_P => {
                axios.get('/brand/get-like-brand.json').then(res_b => {
                    this.setState({
                        message_list: res_m.data.message,
                        products: res_P.data.products,
                        brands: res_b.data.brands
                    })
                })
            })
        })
    }

    render() {

        return <div class={css.center}>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person" defaultMessage="分类"/>
            </div>
            <div className={css.user}>
                <div className={css.user_info}>
                    <Avatar size="large" icon="user" />
                    <div className={css.user_name}>
                        <p>{this.state.user.name}</p>
                        <p></p>
                    </div>
                </div>
                <div className={css.user_message}>
                    <div className={css.user_message_title}>
                        <FormattedMessage id="mine.my.message" defaultMessage="分类"/>
                        <Button type="primary" size="small">
                            <FormattedMessage id="app.more" defaultMessage="分类"/>
                        </Button>
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
                        return <div className={css.order_item}>
                            <Avatar className={css.icon} icon={item.icon} />
                            <div>
                                <p>
                                    <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                </p>
                                <p className={css.order_num}>30</p>
                            </div>
                        </div>
                    })}
                </div>    
            </div>
            <div style={{display: "flex"}}>
                <div className={css.demand}>
                    <p className={css.title_item}>
                        <FormattedMessage id="mine.order" defaultMessage="分类"/>
                    </p>
                    <div className={css.demand_content}>
                        {operator.demand_menu.map(item=>{
                            return <div className={css.order_item}>
                                <Avatar className={css.icon} icon={item.icon} />
                                <div>
                                    <p>
                                        <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                    </p>
                                    <p className={css.order_num}>30</p>
                                </div>
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
                            return <div className={css.order_item}>
                                <Avatar className={css.icon} icon={item.icon} />
                                <div>
                                    <p>
                                        <FormattedMessage id={item.value_id} defaultMessage="分类"/>
                                    </p>
                                    <p className={css.order_num}>30</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>               
            </div>
            <div className={css.like}>
                <div className={css.like_title}>
                    <FormattedMessage id="mine.my.message" defaultMessage="分类"/>
                    <Button type="primary" size="small">
                        <FormattedMessage id="app.more" defaultMessage="分类"/>
                    </Button>    
                </div>
                <div className={css.like_content}>
                    <div className={css.like_product}>
                        {this.state.products.map(item=>{
                            return <Product no_price product={item} className={css.like_item}/>
                        })}
                    </div>
                    <div className={css.like_brand}>
                        {this.state.brands.map(item=>{
                            return <Brand brand={item} className={css.like_item}/>
                        })}
                    </div>  
                </div>                 
            </div>
        </div>
    }
}
export default PersonCenter;