/**
 * Created by hp on 2017/9/14.
 */
import React from 'react';
import axios from 'axios';
import css from './PersonData.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import Util from '../../Util.js';
import operator from './operator.js';
import CusModal from '../Public/CusModal/CusModal.js';
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
    Checkbox,
    message,
    Radio
} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const natureList = [{
    natureid: '1',
    naturename: '互联网'
}, {
    natureid: '2',
    naturename: '金融'
}, {
    natureid: '3',
    naturename: '房地产'
}];
class PersonData extends React.Component {
    state = {
        loading: false,
        visible: false,
    }
    handleSelectNature = (value) => {
        console.log(`selected ${JSON.stringify(value)}`);
        this.setState({
            natureid: parseInt(value.key),
            companyNatureName: value.label
        },()=>{
            console.log(this.state.natureid,this.state.companyNatureName)
        })
    }
    handleSelectIndu = (value) => {
        console.log(`selected ${value}`);
        this.setState({
            industryid: parseInt(value.key),
            industryName: value.label
        })
    }
    handleCertification = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false
        });
    }
    static propTypes = {
        intl: intlShape.isRequired
    };
    onRadioChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
        if (e.target.value == '1') {
            this.setState({
                certificateTypeId: parseInt(e.target.value),
                certificateTypeName: 'IDCard'
            })
        } else if (e.target.value == '2') {
            this.setState({
                certificateTypeId: parseInt(e.target.value),
                certificateTypeName: 'GreenCard'
            })
        }

    }
    onChangeCheck = (e) => {
        console.log(`radio checked:${e.target.checked}`);
    }
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            button_name: "persondata.modify",
            user: JSON.parse(sessionStorage.user),
            options: [],
            check: 0,
            naturelist: operator.nature,
            industry:operator.industry,
            becoming: 4, //1代理商,2供应理商
            user: JSON.parse(sessionStorage.getItem("user")),
        };
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        this.formatMessage = this.props.intl.formatMessage;
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
        this.state.user.region = value;
        this.state.user.country = selectedOptions[0].value;
        this.state.user.province = selectedOptions[1].value;
        this.state.user.city = selectedOptions[2].value;
        this.state.user.district = selectedOptions[3].value;
        this.state.user.countryName = selectedOptions[0].label;
        this.state.user.provinceName = selectedOptions[1].label;
        this.state.user.cityName = selectedOptions[2].label;
        this.state.user.districtName = selectedOptions[3].label;
        console.log(this.state.user)
    }
    handleChange = (name, e) => {
        this.state.user[name] = e.target.value;
    }
    handleClick = () => {
        if (this.state.edit) {
            axios.post('/user/updateUser.json', this.state.user).then(res => {
                if (res.data.isSucc) {
                    message.success(
                        res.data.message
                    );
                    sessionStorage.setItem('user', JSON.stringify(this.state.user));
                    this.setState({
                        user: this.state.user,
                        edit: false,
                        button_name: "persondata.modify"
                    })
                } else if (res.data.code == 104) {
                    this.props.handleVisible ? this.props.handleVisible() : "";
                } else {
                    message.error(
                        reason: res.data.message
                    )
                }
            })
        } else {
            let user = this.state.user;
            user.region = user.region ? user.region : [];
            if (user.country && user.region.length == 0) {
                user.region.push(
                    user.country
                );
                user.region.push(
                    user.province
                );
                user.region.push(
                    user.city
                );
                user.region.push(
                    user.district
                );
            }
            this.setState({
                edit: true,
                button_name: "app.save"
            })
        }
    }
    handlePicture = (info) => {
        console.log(info);
        if (info.file.status === 'done') {
            let user = JSON.parse(sessionStorage.user);
            user.authImgs = info.file.response.url;
            axios.post('/user/updateUser.json', user).then(res => {
                if (res.data.isSucc) {
                    this.setState({
                        user: user,
                    });
                    sessionStorage.setItem('user', JSON.stringify(user));
                } else if (res.data.code == 104) {
                    this.setState({
                        user: JSON.parse(sessionStorage.user),
                    })
                    this.props.handleVisible ? this.props.handleVisible() : "";
                } else {
                    message.error(res.data.message);
                }
            })

        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    handleChangeUp = (name, info) => {
        console.log(name, info)
        if (info.file.status == 'uploading') {
            let param = {};
            param[name] = true;
            this.setState(param);
        }
        if (info.file.status === 'done') {
            info.fileList[0].thumbUrl = info.file.response.url + "@132w_92h_1e_1c.png";
            info.file.thumbUrl = info.file.response.url + "@132w_92h_1e_1c.png";
            this[name] = info.file.response.url;
            let param = {};
            param[name] = info.file.response.url;
            this.setState(param);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        console.log(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values);
            let param;
            let imgurls = JSON.stringify([{
                url: this.state.img_front
            }, {
                url: this.state.img_back
            }]);
            if (!err) {
                if (this.state.user.userType == 1) {
                    param = {
                        realName: values.relnames,
                        certificateTypeId: this.state.certificateTypeId,
                        certificateTypeName: this.state.certificateTypeName,
                        certificateNo: values.cardnumber,
                        certificateAddress: values.idaddress,
                        imgUrl: imgurls
                    };
                    axios.post('/user/person-cerification.json', param).then(res => {
                        if (res.data.isSucc) {
                            console.log(res.data)
                            message.success(this.formatMessage({
                                id: 'app.success'
                            }));
                            axios.get('user/get-userinfo-byuid.json').then(res => {
                                    console.log(res.data)
                                    if (res.data.isSucc) {
                                        localStorage.clear();
                                        sessionStorage.clear();
                                        sessionStorage.setItem('user', JSON.stringify(res.data.result));
                                        location.reload();
                                        /*this.props.history.pushState(null, "/page/mine/account");*/
                                    } else {
                                        message.error(res.data.message)
                                    }
                                })
                                /* location.reload();*/
                        } else if (res.data.code == 104) {
                            this.setState({
                                user: JSON.parse(sessionStorage.user),
                            })
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else {
                            message.error(res.data.message);
                        }
                    })
                } else if (this.state.user.userType == 2) {
                    param = {
                        companyName: values.companynames,
                        companyWebsite: values.company_websites,
                        companyNatureName: this.state.companyNatureName,
                        industryName: this.state.industryName,
                        country: this.state.user.country,
                        countryName: this.state.user.countryName,
                        province: this.state.user.province,
                        provinceName: this.state.user.provinceName,
                        city: this.state.user.city,
                        cityName: this.state.user.cityName,
                        district: this.state.user.district,
                        districtName: this.state.user.districtName,
                        address: values.contact_addresses,
                        imgUrl: imgurls,
                        companyNatureId: this.state.natureid,
                        industryId: this.state.industryid
                    }
                    console.log(param)
                    axios.post('/user/enterpriser.json', param).then(res => {
                        if (res.data.isSucc) {
                            console.log(res.data)
                            message.success(this.formatMessage({
                                id: 'app.success'
                            }));
                            axios.get('user/get-userinfo-byuid.json').then(res => {
                                console.log(res.data)
                                if (res.data.isSucc) {
                                    localStorage.clear();
                                    sessionStorage.clear();
                                    sessionStorage.setItem('user', JSON.stringify(res.data.result));
                                    location.reload();
                                    /*this.props.history.pushState(null, "/page/mine/account");*/
                                } else {
                                    message.error(res.data.message)
                                }
                            })

                        } else if (res.data.code == 104) {
                            this.setState({
                                user: JSON.parse(sessionStorage.user),
                            })
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else {
                            message.error(res.data.message);
                        }
                    })
                }
            }
        });
    }
    previewImg = (name) => {
        this.setState({
            previewImg: this[name],
            previewVisble: true,
        })
    }
    removePic = (name, file) => {
        if (name == "img_logo") {

        } else {
            let param = {}
            param[name] = false;
            this.setState(param);
            this[name] = null;
        }
    }

    handleTobind = (e) => {
        console.log(e)
        this.props.history.pushState(null, `/page/mine/phone-verifi/${e}`);
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
        const {
            visible,
            loading
        } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 7
                },
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 14
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
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
                        <img src={this.state.user.authImgs?(this.state.user.authImgs+"@110w_110h_1e_1c.png"):"../img/user_header.png"} />
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
                            <FormattedMessage  id="persondata.account" defaultMessage="账户"/>：
                        </span>
                        <span className={css.text}>{this.state.user.userName}</span>
                    </p>
                 <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.email" defaultMessage="邮箱"/>：
                    </span>
                    {this.state.user.email?<span className={css.text}>{this.state.user.email}</span>
                        :<Button type="primary" onClick={this.handleTobind.bind(this,2)}  className={appcss.button_modifye}><FormattedMessage id="app.binding" defaultMessage="绑定"/></Button>
                    } 
                </p>
                <p  className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="quotation.contact.tel" defaultMessage="电话"/>：
                    </span>
                    {this.state.user.tel?<span className={css.text}>{this.state.user.tel}</span>
                        : <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleTobind.bind(this,1)} className={css.button_modifye}><FormattedMessage id="app.binding" defaultMessage="绑定"/></Button>
                    }
                    
                </p>       
            {this.state.user.agent || this.state.user.supplier ?
                <div>
                         <p  className={css.info}>
                                <span className={css.title}>
                                    <FormattedMessage  id="post.company_name" defaultMessage="公司名字"/>：
                                </span>
                                <span className={css.text}>{this.state.user.agent?this.state.user.agent.AgentName:this.state.user.supplier.supplierName}</span>
                         </p> 

                        <p  className={css.info}>
                                <span className={css.title}>
                                    <FormattedMessage  id="post.linkman" defaultMessage="联系人"/>：
                                </span>
                                <span className={css.text}>{this.state.user.agent?this.state.user.agent.contactPerson:this.state.user.supplier.contactPerson}</span>
                         </p>
                        <p  className={css.info}>
                                <span className={css.title}>
                                    <FormattedMessage  id="quotation.url" defaultMessage="网址"/>：
                                </span>
                                <span className={css.text}>{this.state.user.agent?this.state.user.agent.website:this.state.user.supplier.website}</span>
                         </p>
                </div>:""
            }
         
               
               
                {this.state.edit?<p className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="certif.company.region" defaultMessage="城市"/>：
                    </span>
                    <span className={css.text}>
                        <Cascader defaultValue={this.state.user.region} style={{ width: '100%'}} className={appcss.form_input} options={this.state.options} onChange={this.handleRegion}/>
                    </span>
                </p>:""}
                <p className={css.info}>
                    <span className={css.title}>
                        <FormattedMessage  id="persondata.contact.address" defaultMessage="联系地址"/>：
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input className={appcss.form_input}
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.address}
                            onChange={this.handleChange.bind(this,"address")}
                        />
                    </span>
                    :<span className={css.text}>
                        {this.state.user.countryName+'-'+
                        this.state.user.provinceName+'-'+
                        this.state.user.cityName+'-'+
                        this.state.user.districtName+'-'+
                        this.state.user.address}
                    </span>
                    }
                </p>
                {this.state.user.userType == 2 ? <div>
                <p  className={css.info}>
                    <span className={css.title}>
                      <FormattedMessage  id="persondata.real.name" defaultMessage="真实姓名"/>：
                    </span>
                    {this.state.edit?<span className={css.text}>
                        <Input className={appcss.form_input}
                            style={{ width: '100%' }}
                            defaultValue={this.state.user.realName}
                            onChange={this.handleChange.bind(this,"realName")}
                        />
                    </span>:
                     <span className={css.text}>{this.state.user.realName}</span>
                    }
                </p>
                </div>:""}
                   {this.state.user.supplier?
                <div className={css.category_div}>
                     <p className={css.category_info} >
                        <p className={css.category_titile}>
                              <FormattedMessage  id="app.product_category" defaultMessage="产品分类"/>：
                        </p>
                        <p className={css.category_text} >
                        {this.state.user.supplier.productCategory?
                            this.state.user.supplier.productCategory.map(item=>{
                                return <p className={css.category_text}><span>{item.levelonename}</span>/<span>{item.leveltwoname}</span></p>
                            })
                            :''
                        }
                    </p>
                    </p>
                     <p className={css.info_profile}>
                         <span className={css.title}>
                               <FormattedMessage  id="app.profile" defaultMessage="公司简介"/>：
                        </span>
                        <span className={css.text}><div dangerouslySetInnerHTML={{__html: this.state.user.supplier.introduction}} /></span>                    
                    </p>
                </div>:""
            }
                <Button type="primary" className={appcss.button_black} style={{ marginLeft: 153,marginTop: 10}}onClick={this.handleClick}>
                    <FormattedMessage id={this.state.button_name} defaultMessage=""/>
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
                {this.state.user.status==0?(this.state.user.userType==1?<span className={css.text}>
                    <span  className={css.text_certification}>
                        {formatMessage({id: 'persondata.certification'})}
                    </span>
                    <Button type="primary"  style={{ marginLeft: 20}}className={appcss.button_blue} onClick={this.handleCertification}>
                            <FormattedMessage  id="persondata.go.certification" defaultMessage="认证"/>
                    </Button>
                    <CusModal width="800" scroll={{y: 700}}
                        title= { this.formatMessage({id:"persondata.personal.certification"})}
                        visible={visible}
                        closeModal={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit} style={{ marginTop: 20}}>
                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'persondata.real.name'})}
                            >
                                {getFieldDecorator('relnames', {
                                    rules:[{required:true, message:this.formatMessage({id:'app.input.relname'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>
                        
                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.certif.type'})}
                            >
                                {(
                                    <RadioGroup onChange={this.onRadioChange} defaultValue="1">
                                        <RadioButton value="1">{this.formatMessage({id:"certif.certif.card"})}</RadioButton>
                                        <RadioButton value="2">{this.formatMessage({id:"certif.certif.green_card"})}</RadioButton>
                                    </RadioGroup>
                                )}   
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.certif.card_number'})}
                            >
                                {getFieldDecorator('cardnumber', {
                                    rules:[{required:true, message:this.formatMessage({id:'app.input.cardnumber'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                <p className={css.credentials} >
                                    {this.formatMessage({id:'app.passport.photos'})}
                                </p>
                                <div className={appcss.upload}>
                                    <div className={appcss.uploader_div}>
                                        <Upload
                                            name="file"
                                            action={Util.url+"/tool/upload"}
                                            onChange={this.handleChangeUp.bind(this,"img_front")}
                                            onPreview={this.previewImg.bind(this,"img_front")}
                                            listType="picture-card"
                                            onRemove={this.removePic.bind(this,"img_front")}
                                            accept="image/*"
                                            multiple
                                        >
                                            {this.state.img_front ? null : <span className={appcss.upload_icon}>
                                                <i class="iconfont icon-jiahao"></i>
                                            </span>}
                                        </Upload>
                                        <p className={appcss.side}>
                                            {this.formatMessage({id: 'agent.front'})}
                                        </p>
                                    </div>
                                    <div className={appcss.uploader_div}>
                                        <Upload 
                                            name="file"
                                            action={Util.url+"/tool/upload"}
                                            onChange={this.handleChangeUp.bind(this,"img_back")}
                                            onPreview = {this.previewImg.bind(this,"img_back")}
                                            listType="picture-card"
                                            onRemove={this.removePic.bind(this,"img_back")}
                                            accept="image/*"
                                            multiple
                                        >
                                            {this.state.img_back ? null :<span className={appcss.upload_icon}>
                                                <i class="iconfont icon-jiahao"></i>
                                            </span>}
                                        </Upload>
                                        <p className={appcss.side}>
                                            {this.formatMessage({id: 'agent.back'})}
                                        </p>
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem  style={{display:"flex"}}
                                {...formItemLayout}
                                label={this.formatMessage({id: 'app.example.Photo'})}
                            >      
                                <div className={css.photo_info}>
                                    <p className={css.photo_text}>
                                    <FormattedMessage id="app.figure" defaultMessage="app.img.size"/></p>
                                    <p className={css.example_photo}>
                                     <img  className={css.example_img} src="../img/about_content.jpg" ></img> 
                                     </p>
                                   <p className={css.photo_text}>
                                        <FormattedMessage id="app.example.info" defaultMessage="app.img.format"/>
                                   </p>
                                </div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'app.idaddress'})}
                            >
                                {getFieldDecorator('idaddress', {
                                    rules:[{required:true, message:this.formatMessage({id:'app.input.idaddress'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                {getFieldDecorator('agreenotes', {
                                    rules:[{required:true, message:this.formatMessage({id:'app.input.agreenotes'})}]
                                })(
                                    <Checkbox onChange={this.onChangeCheck}>{this.formatMessage({id:'register.notes'})}</Checkbox>
                                )}   
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                <Button type="primary" className={appcss.button_black}  htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>  
                            </FormItem>

                        </Form>


                    </CusModal>
                </span>:
                <span className={css.text}>
                    <span  className={css.text_certification}>
                        {formatMessage({id: 'persondata.certification'})}
                    </span>
                    <Button type="primary" className={appcss.button_blue}  style={{ marginLeft: 20}} onClick={this.handleCertification}>
                            <FormattedMessage  id="persondata.go.certification" defaultMessage="认证"/>
                    </Button>
                    <CusModal width="800" scroll={{y: 700}}
                        title= { this.formatMessage({id:"persondata.enterprise.certification"})}
                        visible={visible}
                        closeModal={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit}  style={{ marginTop: 20}}>
                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'post.company_name'})}
                            >
                                {getFieldDecorator('companynames', {
                                    rules:[{required:true, message:this.formatMessage({id:'certif.company.name_warn'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.company.website'})}
                            >
                                {getFieldDecorator('company_websites', {
                                    rules:[{required:true, message:this.formatMessage({id:'certif.company.website_warn'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.company.nature'})}
                            >
                                {getFieldDecorator('company_natures', {
                                    rules:[{required:true, message:this.formatMessage({id:'certif.company.nature_warn'})}]
                                })(
                                    
                                    <Select labelInValue onChange={this.handleSelectNature} className={appcss.form_input}>
                                    {this.state.naturelist.map(item=>{
                                       return  <Option value={item.key}>{this.formatMessage({id: item.value})}</Option>
                                    })}
                                    </Select>
                                )}   
                            </FormItem>
                                
                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.company.industry'})}
                            >
                                {getFieldDecorator('company_industrys', {
                                    rules:[{required:true, message:this.formatMessage({id:'certif.company.industry_warn'})}]
                                })(
                                    <Select labelInValue onChange={this.handleSelectIndu} className={appcss.form_input}>
                                    {this.state.industry.map(item=>{
                                       return  <Option value={item.key}>{this.formatMessage({id: item.value})}</Option>
                                    })}
                                    </Select>
                                )}   
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'certif.company.region'})}
                            >
                                {getFieldDecorator('regionss', {
                                    initialValue: this.state.user.region?this.state.user.region:[],
                                    rules:[{type: 'array',required:true, message:this.formatMessage({id:'agent.select.region'})}]
                                })(
                                    <Cascader className={css.form_cascader} style={{ width: '100%'}} options={this.state.options} onChange={this.handleRegion}/>
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={this.formatMessage({id:'persondata.contact.address'})}
                            >
                                {getFieldDecorator('contact_addresses', {
                                    rules:[{required:true, message:this.formatMessage({id:'agent.enter.detailed_address'})}]
                                })(
                                    <Input className={appcss.form_input}/>
                                )}   
                            </FormItem>               


                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                <p className={css.credentials} >
                                    {this.formatMessage({id:'app.passport.photos'})}
                                </p>
                                <div className={appcss.upload}>
                                    <div className={appcss.uploader_div}>
                                        <Upload
                                            name="file"
                                            action={Util.url+"/tool/upload"}
                                            onChange={this.handleChangeUp.bind(this,"img_front")}
                                            onPreview={this.previewImg.bind(this,"img_front")}
                                            listType="picture-card"
                                            onRemove={this.removePic.bind(this,"img_front")}
                                            accept="image/*"
                                            multiple
                                        >
                                            {this.state.img_front ? null : <span className={appcss.upload_icon}>
                                                <i class="iconfont icon-jiahao"></i>
                                            </span>}
                                        </Upload>
                                        <p className={appcss.side}>
                                            {this.formatMessage({id: 'agent.front'})}
                                        </p>
                                    </div>
                                    <div className={appcss.uploader_div}>
                                        <Upload 
                                            name="file"
                                            action={Util.url+"/tool/upload"}
                                            onChange={this.handleChangeUp.bind(this,"img_back")}
                                            onPreview = {this.previewImg.bind(this,"img_back")}
                                            listType="picture-card"
                                            onRemove={this.removePic.bind(this,"img_back")}
                                            accept="image/*"
                                            multiple
                                        >
                                            {this.state.img_back ? null :<span className={appcss.upload_icon}>
                                                <i class="iconfont icon-jiahao"></i>
                                            </span>}
                                        </Upload>
                                        <p className={appcss.side}>
                                            {this.formatMessage({id: 'agent.back'})}
                                        </p>
                                    </div>
                                </div>
                            </FormItem>
                                <FormItem  style={{display:"flex"}}
                                {...formItemLayout}
                                label={this.formatMessage({id: 'app.example.Photo'})}
                            >      
                                <div className={css.photo_info}>
                                    <p className={css.photo_text}>
                                    <FormattedMessage id="app.figure" defaultMessage="app.img.size"/></p>
                                    <p className={css.example_photo}>
                                     <img  className={css.example_img} src="../img/about_content.jpg" ></img> 
                                     </p>
                                   <p className={css.photo_text}>
                                        <FormattedMessage id="app.example.info" defaultMessage="app.img.format"/>
                                   </p>
                                </div>
                            </FormItem>   
                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                {getFieldDecorator('agreenotes', {
                                    rules:[{ required:true,message:this.formatMessage({id:'app.input.agreenotes'})}]
                                })(
                                    <Checkbox onChange={this.onChangeCheck}>{this.formatMessage({id:'register.notes'})}</Checkbox>
                                )}   
                            </FormItem>

                            <FormItem
                                wrapperCol={{ span: 12, offset: 7 }}
                            >
                                <Button type="primary" className={appcss.button_black}  htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>  
                            </FormItem>

                        </Form>


                    </CusModal>
                </span>)
                :this.state.user.status==-1?<span
                     className={css.text} style={{ color: '#ffa300' }}>
                    {formatMessage({id: 'persondata.under.review'})}
                </span>
                :this.state.user.status==1?<span
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