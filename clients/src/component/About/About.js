/**
 * Created by WF on 2017/9/4.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './About.scss';
import axios from 'axios';
import column from './column.js';

import {
    Link
    } from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
    } from 'react-intl';
import { Menu, Icon,Col }from 'antd';
const SubMenu = Menu.SubMenu;


class About extends React.Component {
    constructor(props) {
        super(props);
        console.log(localStorage.user);
        this.state = {
            user: {},
            select: 0,
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
    }
    handleMenu=(key)=>{
        console.log(key);
        this.setState({select:key})
    }

    render() {
        console.log(column.menu,this.props.children);
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.menu}>
            {column.menu.map(menu=> {
                console.log(45,menu,menu.title);
                return <div>

                    <p className={css.menu_title}>
                         <FormattedMessage id={menu.title} defaultMessage="关于我们"/>
                    </p>
                    {menu.list.map(item=>{
                        return  <p className={this.state.select == item.key ? css.active : css.item}
                            onClick={this.handleMenu.bind(this,item.key)}
                        ><i className={css.spot}>●</i>
                             <FormattedMessage id={item.title} defaultMessage="分类"/>

                        </p>
                    })}
                </div>
            })}
            </div>
            <div className={css.content}>
            {this.state.user ? this.props.children : ''}
                <div className={css.img}><img className={css.content_img}src='../img/about_content.jpg'/></div>
                <div className={css.text}>
                    <h1>company frofile</h1>
                    <p> company specialized in materials and related products for the chemical composition, physical performance analysis, testing instruments and equipment suppliers and service providers. Since its inception in 1995, has hundreds of business units, research institutes, laboratories and equipment to provide professional quality service. User base includes iron and steel metallurgy, nonferrous metals, metal recycling, aerospace, rail transportation, hardware, automotive electronics, home appliances and other fields. After years of development, the company has created a wealth of experience in sales and after-sales service team. </p>
                </div>
                <div className={css.list}>
                    <div className={css.item}>
                    <p className={css.icon}> <Icon type="customer-service" /></p>
                    <p className={css.text_title}>Tolls</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="pushpin" /></p>
                        <p className={css.text_title}>Buliding Materials</p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="chrome" /></p>
                        <p className={css.text_title}>Larbor protection</p>
                    </div>
                </div>
                <div className={css.culture}>
                    <p className={css.culture_title}>Company culture</p>
                    <div className={css.culture_img}>
                        <div className={css.culture_content} style={{background: `url("../img/about_mission.jpg")`}}>
                            <div>
                                <p className={css.content_title}>Mission</p>
                                <p>link to all core needs of the entersprise</p>
                             </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_vision.jpg")`}}>
                           <div>
                                <p className={css.content_title}>Vision</p>
                                <p>Become an industry leader</p>
                           </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_positoning.jpg")`}}>
                            <div>
                                <p className={css.content_title}>Positioning</p>
                                <p>Professional industrial supermarket</p>
                            </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_values.jpg")`}}>
                            <div>
                                <p className={css.content_title}>Values</p>
                                <p>Customer first,Team work</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.information}>
                    <div className={css.map}><img className={css.map_img}src='../img/about_map.jpg'/></div>
                    <div className={css.information_text}>
                        <h2 className={css.information_title}>Contact information</h2>
                        <p><span className={css.information_tems}>Headquarter adress:</span><span>8/f,building2,fortune tower,dubal</span></p>
                        <p><span className={css.information_tems}>Contact number:</span><span>400-5588-8866</span></p>
                        <p><span className={css.information_tems}>Contact email:</span><span>info@ehsy.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default About;