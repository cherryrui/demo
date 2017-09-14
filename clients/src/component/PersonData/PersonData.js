/**
 * Created by hp on 2017/9/14.
 */
import React from 'react';
import axios from 'axios';
import css from './PersonData.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';

import {
    Link
    } from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
    } from 'react-intl';
import {
    Upload,
    Icon,
    Avatar,
    Button,
    Modal
    } from 'antd';
class PersonData extends React.Component{
    constructor(props){
        super(props);
        this.state={
        person_data:{
              user_style:"企业用户",//用户类型企业用户/个人用户，
              num:4365475668,
            certification:"去认证",///去认证/正在审核，已认证，
              suer_name:"反对广泛覆盖",
              tel:123456778,
              email:"567809@qq.com",
              address:"xxxxxxxxxxxxxxxxxxxxxxxxxx",
              real_name:"张三",//真实姓名，
            department_position:"文员",
            }
        };

    }

    render(){
        return<div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.data" defaultMessage="分类"/>

            </div>

            <div className={css.cont}>

                <div className={css.avatar}>
                    <Avatar className={css.avatar_img} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </div>
              <p  className={css.info}>
                  <span className={css.title}><FormattedMessage  id="persondata.User.style" defaultMessage="类型"/>:</span>
                  <span className={css.text}>{this.state.person_data.user_style}</span>

              </p>
                <p  className={css.info}>
                    <span className={css.title}>  <FormattedMessage  id="persondata.Account.number" defaultMessage="账户"/>:</span>
                    <span className={css.text}>{this.state.person_data.num}</span>

                </p>
                <p  className={css.info}>
                    <span className={css.title}>  <FormattedMessage  id="persondata.Certification" defaultMessage="认证"/>:</span>

                    <span className={css.text}>
                        <span  className={css.text_certification}>{this.state.person_data.certification}</span>
                        <Button type="primary" className={css.button_certification}>
                            <FormattedMessage  id="persondata.Certification" defaultMessage="认证"/>
                        </Button>
                    </span>
                </p>
                <p  className={css.info}>
                    <span className={css.title}> <FormattedMessage  id="quotation.contact.tel" defaultMessage="电话"/>:</span>
                    <span className={css.text}>{this.state.person_data.tel}</span>

                </p>
                <p  className={css.info}>
                    <span className={css.title}><FormattedMessage  id="quotation.contact.email" defaultMessage="邮箱"/>:</span>
                    <span className={css.text}>{this.state.person_data.email}</span>

                </p>
                <p  className={css.info}>
                    <span className={css.title}> <FormattedMessage  id="persondata.contact.address" defaultMessage="联系地址"/>:</span>
                    <span className={css.text}>{this.state.person_data.address}</span>

                </p>
                <p  className={css.info}>
                    <span className={css.title}> <FormattedMessage  id="persondata.Real.name" defaultMessage="真实姓名"/>:</span>
                    <span className={css.text}>{this.state.person_data.real_name}</span>

                </p>
                <p  className={css.info}>
                    <span className={css.title}> <FormattedMessage  id="persondata.Department.position" defaultMessage="职位"/>:</span>
                    <span className={css.text}>{this.state.person_data.department_position}</span>

                </p>
                <p className={css.button_person}>
                    <span className={css.title}></span>
                    <Button type="primary" className={css.button_modifye}>
<FormattedMessage  id="persondata.Modify" defaultMessage="修改"/>
                    </Button>
                </p>
            </div>

        </div>
    }

}
export default PersonData;