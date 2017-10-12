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
    Input,
    Cascader,
    Form,
    Select

    } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];
const positions = [{
    value: '媒体',
    label: '媒体',
    children: [{
        value: '文艺',
        label: '文艺',
        children: [{
            value: '艺术总监',
            label: '艺术总监',
        }],
    }],
}, {
    value: '互联网',
    label: '互联网',
    children: [{
        value: '互联网',
        label: '互联网',
        children: [{
            value: '互联网',
            label: '互联网',
        }],
    }],
}];
class PersonData extends React.Component{
    static propTypes = {
        intl: intlShape.isRequired
    };

    constructor(props){
        super(props);
        this.state={
            edit: false,
            button_name: "persondata.modify",
            user: JSON.parse(sessionStorage.user),
            address_option: [],
        };console.log(this.state.user)

    }
    componentWillMount() {
        axios.get('/user/get-city-by-parent.json').then(res => {
            console.log('get-city-parent:', JSON.parse(res.data.address.result));
            let address = this.convertData(JSON.parse(res.data.address.result));
            console.log(address);
            let person_data = this.state.person_data;
            /*person_data.options = address;*/
            this.setState({
                address_option: address,
            })
        })
    }
    convertData(data) {
            data.map(item => {
                item.value = item.v;
                item.label = item.n;
                item.children = item.s;
                if (item.children && item.children.length > 0) {
                    this.convertData(item.children);
                } else {
                    return data;
                }
            })
            return data;
        }
    handleClick = () => {
        if(this.state.edit){
            console.log("baocun")
        }else {
            this.setState({
                edit: true,
                button_name: "app.save"
            })
        }
    }
    render() {
        const {
            getFieldDecorator
            } = this.props.form;
        let {
            intl: {
                formatMessage
                }
            } = this.props;
        return<div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.data" defaultMessage="分类"/>
            </div>
            <div className={css.cont}>
                <div className={css.avatar}>
                    <Avatar className={css.avatar_img} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                </div>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  className={css.title} id="persondata.user.style" defaultMessage="类型"/>:
                    </span>
                    {this.state.user.userType==1? <span
                        className={css.text}>{formatMessage({id: 'persondata.enterprise.user'})}
                    </span>
                    :<span
                        className={css.text}>{formatMessage({id: 'indivdual.user'})}
                    </span>}
                </p>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.account.number" defaultMessage="账户"/>:
                    </span>
                    <span className={css.text}>{this.state.user.uid}</span>
                </p>
                <p className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.certification" defaultMessage="认证"/>:
                    </span>
                    {this.state.user.isAuthentication==1?
                    <span className={css.text}>
                            <span  className={css.text_certification}>
                                {formatMessage({id: 'persondata.go.certification'})}
                            </span>
                            <Button type="primary" className={css.button_certification}>
                                    <FormattedMessage  id="persondata.certification" defaultMessage="认证"/>
                            </Button>
                    </span>
                            :this.state.user.isAuthentication==2?<span
                                 className={css.text} style={{ color: '#ffa300' }}>
                                {formatMessage({id: 'persondata.under.review'})}
                            </span>
                            :this.state.user.isAuthentication==3?<span
                                 className={css.text}>
                                 {formatMessage({id: 'persondata.certificationed'})}
                            </span>:""
                    }
                </p>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.tel" defaultMessage="电话"/>:
                    </span>
                    <span className={css.text}>{this.state.user.tel}</span>
                </p>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.email" defaultMessage="邮箱"/>:
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.email}
                        />
                    </span>
                    :<span className={css.text}>{this.state.user.email}
                    </span>
                    }
                </p>
                {this.state.edit?
                <p className={css.info}>
                        <span className={css.title}>
                            <FormattedMessage  id="certif.company.region" defaultMessage="城市"/>:
                        </span>
                        <span className={css.text}>
                            <Cascader style={{ width: '100%'}} options={this.state.address_option}
                            />
                        </span>
                </p>:
                <p></p>
                }
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.contact.address" defaultMessage="联系地址"/>:
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.address}
                        />
                    </span>
                    :<span className={css.text}>
                        {this.state.address_option}&nbsp;&nbsp;
                        {this.state.user.address}
                    </span>
                    }
                </p>
                {this.state.user.userType == 1 ? <div>
                <p  className={css.info}>
                    <span className={css.title}>
                      <FormattedMessage  id="persondata.real.name" defaultMessage="真实姓名"/>:
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.realName}
                        />
                    </span>:
                     <span className={css.text}>
                         {this.state.user.realName}
                     </span>
                    }
                </p>
                <p className = {css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.department.position" defaultMessage="职位"/>:
                    </span>
                    {this.state.edit?<span
                         className={css.text}>
                        <Cascader
                            style={{ width: '100%'}}
                            options={positions}
                        />
                    </span>
                    :<span className={css.text}>
                           {this.state.position}
                    </span>
                    }
                </p>
                </div>
                :this.state.user.userType == 2 ?
                <div></div>:""
                }
                <p className={css.button_person}>
                    <span className={css.title}></span>
                    <Button type="primary" className={css.button_modifye} onClick={this.handleClick}>
                        <FormattedMessage id={this.state.button_name}defaultMessage=""/>
                    </Button>
                </p>
            </div>
        </div>
    }

}
PersonData = Form.create()(PersonData);
export default injectIntl(PersonData);