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
                    <h1>
                        <FormattedMessage  id="app.profile" defaultMessage=""/>
                    </h1>
                    <p> company specialized in materials and related products for the chemical composition, physical performance analysis, testing instruments and equipment suppliers and service providers. Since its inception in 1995, has hundreds of business units, research institutes, laboratories and equipment to provide professional quality service. User base includes iron and steel metallurgy, nonferrous metals, metal recycling, aerospace, rail transportation, hardware, automotive electronics, home appliances and other fields. After years of development, the company has created a wealth of experience in sales and after-sales service team. </p>
                </div>
                <div className={css.list}>
                    <div className={css.item}>
                    <p className={css.icon}> <Icon type="customer-service" /></p>
                    <p className={css.text_title}>
                        <FormattedMessage  id="about.Tools" defaultMessage=""/>
                    </p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="pushpin" /></p>
                        <p className={css.text_title}>
                            <FormattedMessage  id="about.Buliding.Materials" defaultMessage=""/>
                        </p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="chrome" /></p>
                        <p className={css.text_title}>
                            <FormattedMessage  id="about.Labor.protection" defaultMessage=""/>
                           </p>
                    </div>
                </div>
                <div className={css.culture}>
                    <p className={css.culture_title}>
                        <FormattedMessage  id="about.Company.culture" defaultMessage=""/>
                    </p>
                    <div className={css.culture_img}>
                        <div className={css.culture_content} style={{background: `url("../img/about_mission.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.Mission" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.link.to.all.core.needs.of.the.entersprise" defaultMessage=""/>
                                </p>
                             </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_vision.jpg")`}}>
                           <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.Vision" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.Become.an.industry.leader" defaultMessage=""/>
                                </p>
                           </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_positoning.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.Positioning" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.Professional.industrial.supermarket" defaultMessage=""/>
                                </p>
                            </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_values.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.Values" defaultMessage=""/>
                                </p>
                                <p>

                                    <FormattedMessage  id="about.Professional.industrial.supermarket" defaultMessage=""/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.information}>
                    <div className={css.map}><img className={css.map_img}src='../img/about_map.jpg'/></div>
                    <div className={css.information_text}>
                        <h2 className={css.information_title}>
                            <FormattedMessage  id="about.Contact.information" defaultMessage=""/>
                        </h2>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.Headquarter.adress" defaultMessage=""/>:</span>
                            <span>8/f,building2,fortune tower,dubal</span>
                        </p>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.Contact.number" defaultMessage=""/> :</span>
                            <span>400-5588-8866</span>
                        </p>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.Contact.email" defaultMessage=""/> :</span>
                            <span>info@ehsy.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default About;