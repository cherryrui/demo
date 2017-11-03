/**
 * Created by WF on 2017/9/4.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './Mine.scss';
import axios from 'axios';
import operator from './operator.js';
import LoginModal from '../Public/LoginModal/LoginModal.js';
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
    Col,
    Breadcrumb
} from 'antd';
const SubMenu = Menu.SubMenu;

class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: sessionStorage.user ? JSON.parse(sessionStorage.user) : "",
            select: 0,
            visible: false,
            reload: false,
            path: ""
        }
        this.path = "";
    }
    componentWillMount() {
        console.log("componentWillMount");
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        }
        this.getPremiss();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        } else {
            this.state.user = JSON.parse(sessionStorage.user);
            if (this.path !== this.props.location.pathname) {
                this.getPremiss();
            }
        }
    }
    getPremiss = () => {
        let path = this.props.location.pathname;
        if (path == "/page/mine/agent" || path == "/page/mine/supplier") {
            if (path == "/page/mine/agent") {
                this.setState({
                    path: "mine.agent",
                    select: 7000,
                })
            } else {
                this.setState({
                    path: "mine.supplier",
                    select: 8000,
                })
            }
            if (this.state.user.userIdentity > 0 || this.state.user.agent || this.state.supplier) {
                this.props.history.pushState(null, 'page/mine');
            }
        }
        operator.menu.map(item => {
            item.list.map(sub => {
                if (sub.url === path) {
                    this.setState({
                        path: sub.title,
                        select: sub.key,
                    })
                    if (item.code.indexOf(this.state.user.userIdentity) == -1) {
                        this.props.history.pushState(null, 'page/mine');
                    }
                }
            })
        })
        if (path == "/page/mine") {
            this.setState({
                path: ""
            })
        }
        this.path = path;
    }

    //回到顶部
    goTop = () => {
        //设置定时器
        let timer = setInterval(() => {
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            var speed = Math.floor(-osTop / 6); //速度随距离动态变化，越来越小
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            let isTop = true;
            if (osTop == 0) {
                clearInterval(timer); //回到顶部时关闭定时器
            }
        }, 30)
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
    handleVisible = (status) => {
        this.setState({
            visible: true,
            reload: status == true ? true : false
        })
    }
    handleCancel = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        return <div className={appcss.body}>
            <div className={appcss.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="page/mine">
                            <FormattedMessage id="mine.person" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    {this.state.path?<Breadcrumb.Item>
                        <FormattedMessage id={this.state.path} defaultMessage="产品列表"/>
                    </Breadcrumb.Item>:""}
                </Breadcrumb>
            </div>
            <div className={css.body}>
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
                                <i class="iconfont icon-iconfonticonfontdian1"></i>&nbsp;&nbsp;
                                <FormattedMessage id={item.title} defaultMessage="分类"/>

                            </p>
                        })}
                    </div>:""
                })}
                </div>
                <div className={css.content}>
                    {this.state.user ? this.props.children && React.cloneElement(this.props.children, {handleVisible: this.handleVisible.bind(this),
                        goTop:this.goTop.bind(this), 
                        user: this.state.user}) : ''}
                </div>
            </div>
            <LoginModal visible={this.state.visible} reload={this.state.reload} closeModal={this.handleCancel}/>
        </div>
    }
}
export default Mine;