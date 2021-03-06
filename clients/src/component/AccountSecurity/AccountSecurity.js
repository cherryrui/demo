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
message.config({
    top: '40%',
    duration: 2,
});
/*const user = JSON.parse(sessionStorage.getItem("user"));*/
class AccountSecurity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(sessionStorage.getItem("user")),
        };
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
                            <div>
                                    <Link className={css.modify} to={"page/mine/change-password"}>
                                       { this.formatMessage({id:"persondata.modify"})}
                                    </Link>
                            </div>
                    </div>
            <div className={css.account}>
                <div  className={css.account_title}>
                    <Icon type={this.state.user.tel?"smile-o":"frown-o"}  className={this.state.user.tel?css.account_icon:css.frown_icon} />
                    <p  className={css.account_text}> {this.state.user.tel?this.formatMessage({id:"app.modify.phone"}): this.formatMessage({id:"app.bind.phone"})}</p>
                    <p className={css.account_grey}> {this.state.user.tel? this.formatMessage({id:"app.phone.verified_info"}):this.formatMessage({id:"app.phone.verified_infoed"}) }</p>
                    &nbsp;{this.state.user.tel?this.state.user.tel:""}
                </div>
                <div className={css.modify}>
                    <Link className={this.state.user.tel?css.modify:css.validation} to={"page/mine/phone-verifi/1"}>
                         {this.state.user.tel?this.formatMessage({id:"persondata.modify"}): this.formatMessage({id:"app.bindings"})}
                    </Link>
                </div>
            </div>
            <div className={css.account}>
                <div  className={css.account_title}>
                    <Icon type={this.state.user.email?"smile-o":"frown-o"} className={this.state.user.email?css.account_icon:css.frown_icon} />
                    <p  className={css.account_text}> {this.state.user.email? this.formatMessage({id:"app.modify.email"}):this.formatMessage({id:"app.bind.email"})}</p>
                    <p className={css.account_grey}> { this.state.user.email?this.formatMessage({id:"app.email.verifi_info"}):this.formatMessage({id:"app.email.verifi_infoed"})}</p>
                    &nbsp;{this.state.user.email?this.state.user.email:""}
                </div>
                <div className={css.modify}>
                    <Link to={"page/mine/phone-verifi/2"} className={this.state.user.email?css.modify:css.validation}>
                       {this.state.user.email? this.formatMessage({id:"persondata.modify"}): this.formatMessage({id:"app.bindings"})} 
                    </Link>
                </div>
            </div>
            </div>
    }
}


export default injectIntl(AccountSecurity);