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
import { Menu, Icon,Col }from 'antd';
const SubMenu = Menu.SubMenu;


class Mine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.user),
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
    }

    render() {
        console.log(operator.menu);
        return <div className={`${appcss.body} ${css.body}`}>
            <div className={css.menu}>
            {operator.menu.map(menu=> {
                return <div>
                    <p>
                        <Link to="main/">
                            <FormattedMessage id="app.category" defaultMessage="分类"/>
                        </Link>
                    </p>
                    {menu.list.map(item=> {
                        return <p>
                            <Link to="main/">
                                <FormattedMessage id="app.category" defaultMessage="分类"/>
                            </Link>
                        </p>
                    })}
                </div>
            })}
            </div>
            <div className={css.content}>Main</div>
        </div>
    }
}
export default Mine;