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
            user: {},
            select: 0,
        }
    }
    componentWillMount() {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        }
    }
    componentDidMount() {
        console.log("componentDidMount");
    }
    componentDidUpdate(prevProps, prevState) {
        if (!sessionStorage.user) {
            this.props.history.pushState(null, '/login');
        }
    }

    handleClick = (e) => {
        //console.log('click ', e);
    }
    handleMenu = (key, url) => {
        console.log(key, url);
        this.setState({
            select: key
        });
        this.props.history.pushState(null, url);
    }

    render() {
        //console.log(operator.menu,this.props.children);
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.menu}>
            {operator.menu.map(menu=> {
                return <div>
                    <p className={css.menu_title}>
                        <FormattedMessage id={menu.name} defaultMessage="分类"/>
                    </p>
                    {menu.list.map(item=> {
                        return <p className={this.state.select == item.key ? css.active : css.item}
                            onClick={this.handleMenu.bind(this,item.key,item.url)}
                        >
                            <i>●</i>&nbsp;&nbsp;
                            <FormattedMessage id={item.title} defaultMessage="分类"/>

                        </p>
                    })}
                </div>
            })}
            </div>
            <div className={css.content}>
            {this.state.user ? this.props.children : ''}
            </div>
        </div>
    }
}
export default Mine;