import React from 'react';
import css from './AccountSecurity.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import {
	FormattedMessage,
    injectIntl
} from 'react-intl';
import {
    Link
    } from 'react-router';
import {
    Icon,
    Button,
    message
    } from 'antd';
class AccountSecurity extends React.Component {
    constructor(props) {
        super(props);
        this.formatMessage = this.props.intl.formatMessage;
    }

	render() {

		return <div>
                    <div className={basecss.child_title}>
                        { this.formatMessage({id:"mine.person.account"})}
                    </div>
                    <div className={css.account}>
                            <div  className={css.account_title}>
                                    <Icon type="smile-o"  className={css.account_icon} />
                                    <p  className={css.account_text}> { this.formatMessage({id:"app.login.password"})}</p>
                                    <p className={css.account_red}> { this.formatMessage({id:"app.login.password_info"})}</p>
                            </div>
                            <div className={css.modify}>
                                    <Link to={"page/mine/change-password"}>
                                       { this.formatMessage({id:"persondata.modify"})}
                                    </Link>
                            </div>
                    </div>
            <div className={css.account}>
                <div  className={css.account_title}>
                    <Icon type="smile-o"  className={css.account_icon} />
                    <p  className={css.account_text}> { this.formatMessage({id:"app.phone.verification"})}</p>
                    <p className={css.account_grey}> { this.formatMessage({id:"app.phone.verified_info"})}</p>
                </div>
                <div className={css.modify}>
                    <Link >
                                       { this.formatMessage({id:"persondata.modify"})}
                    </Link>
                </div>
            </div>
            <div className={css.account}>
                <div  className={css.account_title}>
                    <Icon type="frown-o" className={css.frown_icon} />
                    <p  className={css.account_text}> { this.formatMessage({id:"app.email.verification"})}</p>
                    <p className={css.account_grey}> { this.formatMessage({id:"app.email.verifi_info"})}</p>
                </div>
                <div>
                    <Link  className={css.validation}>
                                       { this.formatMessage({id:"repwd.authen"})}
                    </Link>
                </div>
            </div>
            </div>
	}
}


export default injectIntl(AccountSecurity);