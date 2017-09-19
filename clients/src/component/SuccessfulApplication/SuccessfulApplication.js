/**
 * Created by hp on 2017/9/16.
 */
import React from 'react';
import axios from 'axios';
import css from './SuccessfulApplication.scss';
import {
    Link
    } from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
    } from 'react-intl';
import {
    Button,
    Icon,
    } from 'antd';

class SuccessfulApplication extends React.Component{
    agent=(a)=>{
        window.location.href = "/#/main/mine/agent"
    }
    supplier=(s)=>{
        window.location.href = "/#/main/mine/supplier"
    }
    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.type = Number(this.props.params.type)
    }
    render(){
        let {
            intl: {
                formatMessage
                }
            } = this.props;
        return<div className={css.submit_success}>
            <p className={css.success}>
                <Icon className={css.smile} type="smile-o" />
                <FormattedMessage id="app.Success"
                defaultMessage="提交成功"/>
            </p>
            <p><FormattedMessage id="app.success.info"
                defaultMessage="您的申请已提交成功，我们将尽快处理，请耐心等待"/>
            </p>
            <a href="" className={css.link}><FormattedMessage id="app.why.fail"
                defaultMessage="什么原会导致申请无法通过?"/>
            </a>
            {this.type==1?<div>
                <a href="" className={css.link}>
                    <FormattedMessage id="app.agent.privileges"defaultMessage="代理商有哪些特权"/>
                </a>
                <p className={css.button_retrun}>
                     <Button type="primary" className={css.retrun} onClick={this.agent}>
                     {formatMessage({id: 'orderdetails.return'})}
                     </Button>
                </p>
            </div>
            :<div>
                <a href="" className={css.link}>
                     <FormattedMessage id="app.suppliers.privileges"defaultMessage="共应商有哪些特权"/>
                </a>
                <p className={css.button_retrun}>
                     <Button type="primary" className={css.retrun} onClick={this.supplier}>
                     {formatMessage({id: 'orderdetails.return'})}
                     </Button>
                </p>
            </div>
            }
        </div>
    }

}
export default injectIntl(SuccessfulApplication);
