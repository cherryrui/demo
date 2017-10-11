/**
 * Created by 17272 on 2017/9/7.
 */
/**
 * Created by 17272 on 2017/9/6.
 */
import axios from 'axios';
import React from 'react';
import css from './RegisterComplete.scss';
import appcss from '../../App.scss';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';
import {
    Button,
    Icon
} from 'antd';


class RegisterComplete extends React.Component {

    handleClick = (type) => {
        window.location.href = "/#/page"
    };

    handleCertification = () =>{
        window.location.href = "/#/page/mine"
    }


    render() {
        return (
            <div className={css.body}>
                <div className={css.title}>
                    <p className={css.logo}>LOGO</p>
                    <p className={css.title_text}>
                        <FormattedMessage id="register.register.title" defaultMessage="用户注册"/>
                    </p>
                </div>
                <div className={css.content}>
                    <div className={css.icon}>
                        <Icon type="smile-o" /> <FormattedMessage id="regcomplt.regcomplt.Registeredsuccessfully" defaultMessage="注册成功！"/>
                    </div>
                    <div className={css.mar}>
                        <FormattedMessage id="regiater.success.info" defaultMessage="提示"/>
                    </div>
                    <div className={css.footer}>
                        <Button type="primary" onClick={this.handleClick} className={css.reqister_Button}>
                            <FormattedMessage id="register.go.login" defaultMessage="去登录"/>
                        </Button>
                        <Button type="primary" onClick={this.handleCertification} className={css.reqister_Button}>
                            <FormattedMessage id="persondata.go.certification" defaultMessage="去认证"/>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComplete;