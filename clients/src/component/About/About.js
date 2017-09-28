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
import {
    Menu,
    Icon,
    Col
} from 'antd';
const SubMenu = Menu.SubMenu;


class About extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        console.log(localStorage.user);
        this.state = {
            user: {},
            select: 0,
        }
    }
    componentDidMount() {
        this.about.scrollIntoView();
    }

    handleClick = (e) => {
        console.log('click ', e);
    }
    handleMenu = (key) => {
        console.log(key);
        this.setState({
            select: key
        })
    }

    render() {
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        console.log(column.menu, this.props.children);
        return <div className={`${appcss.body} ${css.body}`} ref={(about)=>{this.about= about}}>
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
                    <p> <FormattedMessage  id="about.company.profile.info" defaultMessage=""/></p>
                </div>
                <div className={css.list}>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="customer-service" /></p>
                        <p className={css.text_title}>
                            <FormattedMessage  id="about.tools" defaultMessage=""/>
                        </p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="pushpin" /></p>
                        <p className={css.text_title}>
                            <FormattedMessage  id="about.buliding.materials" defaultMessage=""/>
                        </p>
                    </div>
                    <div className={css.item}>
                        <p className={css.icon}> <Icon type="chrome" /></p>
                        <p className={css.text_title}>
                            <FormattedMessage  id="about.labor.protection" defaultMessage=""/>
                        </p>
                    </div>
                </div>
                <div className={css.culture}>
                    <p className={css.culture_title}>
                        <FormattedMessage  id="about.company.culture" defaultMessage=""/>
                    </p>
                    <div className={css.culture_img}>
                        <div className={css.culture_content} style={{background: `url("../img/about_mission.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.mission" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.mission.info" defaultMessage=""/>
                                </p>
                            </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_vision.jpg")`}}>
                           <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.vision" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.vision.info" defaultMessage=""/>
                                </p>
                           </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_positoning.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.positioning" defaultMessage=""/>
                                </p>
                                <p>
                                    <FormattedMessage  id="about.positioning.info" defaultMessage=""/>
                                </p>
                            </div>
                        </div>
                        <div className={css.culture_content} style={{background: `url("../img/about_values.jpg")`}}>
                            <div>
                                <p className={css.content_title}>
                                    <FormattedMessage  id="about.values" defaultMessage=""/>
                                </p>
                                <p>

                                    <FormattedMessage  id="about.values.info" defaultMessage=""/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={css.information}>
                    <div className={css.map}><img className={css.map_img}src='../img/about_map.jpg'/></div>
                    <div className={css.information_text}>
                        <h2 className={css.information_title}>
                            <FormattedMessage  id="about.contact.information" defaultMessage=""/>
                        </h2>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.headquarter.adress" defaultMessage=""/>:</span>
                            <span>8/f,building2,fortune tower,dubal</span>
                        </p>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.contact.number" defaultMessage=""/> :</span>
                            <span>400-5588-8866</span>
                        </p>
                        <p><span className={css.information_tems}>
                            <FormattedMessage  id="about.contact.email" defaultMessage=""/> :</span>
                            <span>info@ehsy.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    }
}
export default injectIntl(About);