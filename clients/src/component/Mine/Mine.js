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
        console.log("componentWillMount");
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        }
        this.getPremiss();
    }
    getPremiss = () => {
        let path = this.props.location.pathname;
        if (path == "/page/mine/agent" || path == "/page/mine/supplier") {
            console.log(path, this.state.user.userIdentity > 0);
            if (this.state.user.userIdentity > 0 || this.state.user.agent || this.state.supplier) {
                this.props.history.pushState(null, 'page/mine');
            }
        }
        operator.menu.map(item => {
            item.list.map(sub => {
                if (sub.url === path) {
                    if (item.code.indexOf(this.state.user.userIdentity) == -1) {
                        this.props.history.pushState(null, 'page/mine');
                    }
                }
            })
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        } else {
            this.state.user = JSON.parse(sessionStorage.user);
            this.getPremiss();
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
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.menu}>
            {operator.menu.map(menu=> {
                return menu.code.indexOf(this.state.user.userIdentity)>-1&&((menu.key!==7000&&menu.key!==8000)||(this.state.user.userIdentity == 0 && !this.state.user.agent && !this.state.user.supplier))?<div>
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