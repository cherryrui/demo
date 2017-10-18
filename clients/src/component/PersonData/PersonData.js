/**
 * Created by hp on 2017/9/14.
 */
import React from 'react';
import axios from 'axios';
import css from './PersonData.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import Util from '../../Util.js';
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
    Button,
    Input,
    Cascader,
    Form,
    Select,
    message
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
class PersonData extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            button_name: "persondata.modify",
            user: JSON.parse(sessionStorage.user),
            options: [],
        };
    }
    componentWillMount() {
        axios.get('/user/get-city-by-parent.json').then(res => {
            let address = this.convertData(JSON.parse(res.data.address.result));
            this.setState({
                options: address,
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
    handleRegion = (value, selectedOptions) => {
        console.log(value, selectedOptions);
        this.state.user.region = value;
        this.state.user.country = selectedOptions[0].label;
        this.state.user.province = selectedOptions[1].label;
        this.state.user.city = selectedOptions[2].label;
        this.state.user.district = selectedOptions[3].label;
    }
    handleChange = (name, e) => {
        this.state.user[name] = e.target.value;
    }
    handleClick = () => {
        if (this.state.edit) {
            console.log(this.state.user);
            let param = {
                realName:this.state.user.realName,
                email:this.state.user.email,
                country:this.state.user.region[0],
                province:this.state.user.region[1],
                city:this.state.user.region[2],
                district:this.state.user.region[3],
                address:this.state.user.address
            };
            axios.post('/user/updateUser.json',param).then(res=>{
                console.log(res.data);
                if(res.data.isSucc){
                    message.success(
                        res.data.message
                    );
                    console.log(this.state.user.realName)
                    let users = {
                        address:this.state.user.address,
                        agent:this.state.user.agent,
                        authImgs:this.state.user.authImgs,
                        city:this.state.user.city,
                        companyName:this.state.user.companyName,
                        country:this.state.user.country,
                        district:this.state.user.district,
                        email:this.state.user.email,
                        industry:this.state.user.industry,
                        isAuthentication:this.state.user.isAuthentication,
                        lastip:this.state.user.lastip,
                        lasttime:this.state.user.lasttime,
                        nature:this.state.user.nature,
                        province:this.state.user.province,
                        realName:this.state.user.realName,
                        region:this.state.user.region,
                        regip:this.state.user.regip,
                        regtime:this.state.user.regtime,
                        remark:this.state.user.remark,
                        status:this.state.user.status,
                        supplier:this.state.user.supplier,
                        tel:this.state.user.tel,
                        token:this.state.user.token,
                        uid:this.state.user.uid,
                        userIdentity:this.state.user.userIdentity,
                        userName:this.state.user.userName,
                        userType:this.state.user.userType,
                        websiteUrl:this.state.user.websiteUrl
                    };
                    console.log(users)
                    this.setState({
                        user:users
                    },()=>{
                        console.log(this.state.user)
                        sessionStorage.setItem('user', JSON.stringify(this.state.user));
                        /*this.props.location.reload();*/
                        location.reload() ;
                    })
                }else{
                    message.error(
                        reason:res.data.message
                    )
                }
            })
        } else {
            this.setState({
                edit: true,
                button_name: "app.save"
            })
        }
    }
    handlePicture = (info) => {
        console.log(info);
        if (info.file.status === 'done') {
            let user = this.state.user;
            user.authImgs = info.file.response.url;
            this.setState({
                user: user,
            })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
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
        return <div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.data" defaultMessage="分类" />
            </div>
            <p className={css.main_title}>
                <FormattedMessage id="persondata.basic.information" defaultMessage=""/>
            </p>
            <div className={css.basic_body}>
                <div className={css.basic_left}>
                    <Upload
                        className={css.basic_upload}
                        name="file"
                        showUploadList={false}
                        onPreview = {this.previewImg}
                        action={Util.url+"/tool/upload"}
                        multiple
                        onChange={this.handlePicture}
                    >
                        <img src={this.state.user.authImgs?this.state.user.authImgs:"../img/user_header.png"} />
                    </Upload>
                </div>
                <div className={css.basic_right}>
                    <p className={css.info}>
                        <span className={css.title}>
                            <FormattedMessage  className={css.title} id="persondata.user.style" defaultMessage="类型"/>：
                        </span>
                        <span className={css.text}>{this.state.user.userType==1?formatMessage({id: 'persondata.indivdual.user'}):formatMessage({id: 'persondata.enterprise.user'})}</span>
                    </p>
                    <p className={css.info}>
                        <span className={css.title}>
                            <FormattedMessage  id="persondata.account.number" defaultMessage="账户"/>：
                        </span>
                        <span className={css.text}>{this.state.user.uid}</span>
                    </p>
                    <p className={css.info}>
                        <span className={css.title}>
                            <FormattedMessage  id="persondata.account.number" defaultMessage="账户"/>：
                        </span>
                        <span className={css.text}>{this.state.user.userName}</span>
                    </p>
                
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.tel" defaultMessage="电话"/>：
                    </span>
                    <span className={css.text}>{this.state.user.tel}</span>
                </p>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.email" defaultMessage="邮箱"/>：
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.email}
                        />
                    </span>
                    :<span className={css.text}>{this.state.user.email}</span>
                    }
                </p>
                {this.state.edit?<p className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="certif.company.region" defaultMessage="城市"/>：
                    </span>
                    <span className={css.text}>
                        <Cascader style={{ width: '100%'}} options={this.state.options} onChange={this.handleRegion}/>
                    </span>
                </p>:""}
                <p className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.contact.address" defaultMessage="联系地址"/>：
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.address}
                            onChange={this.handleChange.bind(this,"address")}
                        />
                    </span>
                    :<span className={css.text}>
                        {!this.state.user.country?"":locale=="en"?this.state.user.address+","
                        +this.state.user.district+","
                        +this.state.user.city+","
                        +this.state.user.province+","
                        +this.state.user.country:this.state.user.country+","
                        +this.state.user.province+","
                        +this.state.user.city+","
                        +this.state.user.district+","
                        +this.state.user.address+","}
                    </span>
                    }
                </p>
                {this.state.user.userType == 1 ? <div>
                <p  className={css.info}>
                    <span className={css.title}>
                      <FormattedMessage  id="persondata.real.name" defaultMessage="真实姓名"/>：
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.realName}
                            onChange={this.handleChange.bind(this,"realName")}
                        />
                    </span>:
                     <span className={css.text}>{this.state.user.realName}</span>
                    }
                </p>
                <p className = {css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.department.position" defaultMessage="职位"/>：
                    </span>
                    {this.state.edit?<span
                         className={css.text}>
                        <Cascader
                            style={{ width: '100%'}}
                            options={this.state.options}
                        />
                    </span>
                    :<span className={css.text}>
                           {this.state.position}
                    </span>
                    }
                </p>
                </div>:""}
                <Button type="primary" className={css.button_modifye} onClick={this.handleClick}>
                    <FormattedMessage id={this.state.button_name}defaultMessage=""/>
                </Button>
                </div>
            </div>
            <p className={css.main_title}>
                <FormattedMessage id="persondata.Authentication" defaultMessage="" />
            </p>
            <p className={css.auth_body}>
                <span className={css.title}>
                    {this.state.user.userType==1?<FormattedMessage id="persondata.personal.certification" defaultMessage=""/>
                    :<FormattedMessage  id="persondata.enterprise.certification" defaultMessage="认证"/>
                    }：
                </span>
                {this.state.user.isAuthentication==0?<span className={css.text}>
                    <span  className={css.text_certification}>
                        {formatMessage({id: 'persondata.certification'})}
                    </span>
                    <Button type="primary" className={css.button_certification}>
                            <FormattedMessage  id="persondata.go.certification" defaultMessage="认证"/>
                    </Button>
                </span>
                :this.state.user.isAuthentication==1?<span
                     className={css.text} style={{ color: '#ffa300' }}>
                    {formatMessage({id: 'persondata.under.review'})}
                </span>
                :this.state.user.isAuthentication==2?<span
                     className={css.text}>
                     {formatMessage({id: 'persondata.certificationed'})}
                </span>:""
                }
            </p>
        </div>
    }

}
PersonData = Form.create()(PersonData);
export default injectIntl(PersonData);