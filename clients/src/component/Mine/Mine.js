/**
 * Created by WF on 2017/9/4.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './Mine.scss';
import axios from 'axios';
import operator from './operator.js';
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


class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.user ? JSON.parse(sessionStorage.user) : "",
            select: 0,
        }
    }
    componentWillMount() {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        }
    }
    componentDidMount() {}
    componentDidUpdate(prevProps, prevState) {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        } else {
            this.state.user = JSON.parse(sessionStorage.user);
        }
    }

    handleClick = (e) => {}
    handleMenu = (key, url) => {
        console.log(key, url);
        this.setState({
            select: key
        });
        if (url)
            this.props.history.pushState(null, url);
    }

    render() {
        console.log(this.state.user);
        let menu = JSON.parse(JSON.stringify(operator.menu));
        if (this.state.user.userIdentity == 0 && !this.state.user.agent && !this.state.supplier) {
            menu.push({
                name: "mine.agent",
                code: [0],
                key: 7000,
                url: 'page/mine/agent',
                list: []
            })
            menu.push({
                name: "mine.supplier",
                code: [0],
                key: 8000,
                url: 'page/mine/supplier',
                list: []
            })
        }
        console.log(menu);
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.menu}>
            {menu.map(menu=> {
                return menu.code.indexOf(this.state.user.userIdentity)>-1?<div>
                    {menu.list.length>0?<p className={css.menu_title_show}>
                        <FormattedMessage id={menu.name} defaultMessage="分类"/>       
                    </p>:<p className={this.state.select == menu.key?css.menu_active:css.menu_title} onClick={this.handleMenu.bind(this,menu.key,menu.url)} >
                        <FormattedMessage id={menu.name} defaultMessage="分类"/>
                    </p>}
                    {menu.list.map(item=> {
                        return <p className={this.state.select == item.key ? css.active : css.item}
                            onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <i>●</i>&nbsp;&nbsp;
                            <FormattedMessage id={item.title} defaultMessage="分类"/>

                        </p>
                    })}
                </div>:""
            })}
            </div>
            <div className={css.content}>
            {this.state.user ? this.props.children : ''}
            </div>
        </div>
    }
}
export default Mine;