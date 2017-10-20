/**
 * Created by hp on 2017/9/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Agent.scss';
import appcss from '../../App.scss';
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
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Upload,
    Button,
    Steps,
    Radio,
    AutoComplete,
    message
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
import Util from '../../Util.js';
const {
    TextArea
} = Input;


class Agent extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
            options: [],
            telCode: [],
            img_front: false,
            img_back: false,
            visible: false,
            previewVisble: false,
        }
        this.img_front = null;
        this.img_back = null;
        this.formatMessage = this.props.intl.formatMessage;
    }
    componentWillMount() {
        axios.get('/user/get-city-by-parent.json').then(res => {
            let address = this.convertData(JSON.parse(res.data.address.result));
            console.log(address);
            this.setState({
                options: address,
            })
        })
        axios.get('/user/get-tel-code.json').then(res => {
            if (res.data.isSucc) {
                this.setState({
                    telCode: res.data.result
                })
            }
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.img_front && this.img_back) {
                    console.log('Received values of form: ', values);
                    let param = values;
                    param.country = values.residence[0];
                    param.province = values.residence[1];
                    param.city = values.residence[2];
                    param.district = values.residence[3];
                    param.businessLicense = this.img_front;
                    param.businessLicenseB = this.img_back;
                    axios.post('/user/become-agent.json', param).then(res => {
                        if (res.data.code == 104) {
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else if (res.data.isSucc) {
                            let user = JSON.parse(sessionStorage.user);
                            user.agent = {};
                            sessionStorage.setItem('user', JSON.stringify(user));
                            this.props.history.pushState(null, "page/mine/successful-application/1");
                        } else {
                            message.error(res.data.message);
                        }
                    })
                } else {
                    message.warn(this.formatMessage({
                        id: "agent.upload.credentials"
                    }))
                }
            }
        });
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        });
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {
                force: true
            });
        }
        callback();
    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({
            autoCompleteResult
        });
    }
    handleChange = (name, info) => {
        console.log(name, info);
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
            param[name] = true;
            this.setState(param);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    removePic = (name) => {
        this[name] = null;
        let param = {};
        param[name] = false;
        this.setState(param);
    }
    previewImg = (name) => {
        this.setState({
            previewImg: this[name],
            previewVisble: true,
        })
    }
    handleCancel = (name) => {
        let param = {};
        param[name] = false;
        this.setState(param);
    }
    render() {
        console.log(this.state.front_show);
        const {
            getFieldDecorator
        } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 6
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: this.state.telCode.length > 0 ? this.state.telCode[0].id : 0,
        })(
            <Select style={{ width: 60 }}>
            {this.state.telCode.map(item=>{
                return <Option value={item.id}>{item.districtCode}</Option>
            })}
      </Select>
        );
        const websiteOptions = this.state.autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return <div>
        <div className={css.prompt}>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"agent.condition_one"}
                defaultMessage="具有合法有效的签约资格和持续可靠的履约能力"/>
            </p>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"agent.condition_two"} defaultMessage=""/>
            </p>
        </div>
        <div className={css.agent_form}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'post.company_name'})}
                >
                    {getFieldDecorator('AgentName', {
                        rules: [{
                            required: true, message: this.formatMessage({id: 'agent.enter.company'}),
                        }],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'quotation.contact.name'})}
                    >
                        {getFieldDecorator('contactPerson',{
                            rules: [{
                              required: true, message: this.formatMessage({id: 'quotation.contact.name'}),
                            }],
                        })(
                            <Input className={css.agent_input}/>
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'quotation.contact.tel'})}
                >
                    {getFieldDecorator('contactPhone', {
                        rules: [{ required: true, message: this.formatMessage({id: 'register.tel.warn'}),
                        }],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'post.email'})}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            }, {
                            required: true, message: this.formatMessage({id: 'register.email.warn'}),
                        }],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'certif.company.region'})}
                >
                    {getFieldDecorator('residence', {
                        rules: [{ type: 'array', required: true, message: this.formatMessage({id:'agent.select.region'}),
                    }],
                    })(
                        <Cascader options={this.state.options} className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'agent.detailed.address'})}
                >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.detailed_address'}),}],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                        label={this.formatMessage({id: 'quotation.url'})}
                >
                    {getFieldDecorator('website', {
                        rules: [{ required: true, message: this.formatMessage({id: 'certif.company.website_warn'}),
                        }],
                    })(
                        <AutoComplete className={css.agent_input}
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                        >
                            <Input className={css.agent_input}/>
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    wrapperCol={{ span: 12, offset: 6 }}
                >
                    <p className={css.credentials}>
                        {this.formatMessage({id: 'agent.upload.credentials'})}
                    </p>
                    <div className={appcss.upload}>
                        <div className={appcss.uploader_div}>
                            <Upload 
                                name="file"
                                action={Util.url+"/tool/upload"}
                                onChange={this.handleChange.bind(this,"img_front")}
                                onPreview = {this.previewImg.bind(this,"img_front")}
                                listType="picture-card"
                                onRemove={this.removePic.bind(this,"img_front")}
                                accept="image/*"
                                multiple
                              >
                                {this.state.img_front ? null :<span className={appcss.upload_icon}>
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
                                onChange={this.handleChange.bind(this,"img_back")}
                                onPreview = {this.previewImg.bind(this,"img_back")}
                                listType="picture-card"
                                onRemove={this.removePic.bind(this,"img_back")}
                                accept="image/*"
                                multiple
                              >
                                {this.state.img_back ? null :
                                  <span className={appcss.upload_icon}>
                                    <i class="iconfont icon-jiahao"></i>
                                  </span>
                                }
                            </Upload>
                            <p className={appcss.side}>
                                {this.formatMessage({id: 'agent.back'})}
                            </p>
                        </div>
                    </div>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'agent.legal'})}
                >
                    {getFieldDecorator('legalPerson', {
                        rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.legal'}),
                        }],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                      label={this.formatMessage({id: 'agent.legal_no'})}
                >
                    {getFieldDecorator('cardId', {
                        rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.legal_no'}),
                        }],
                    })(
                        <Input className={css.agent_input}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" className={css.retrun}>{this.formatMessage({id: 'app.cancel'})}</Button>
                    <Button type="primary" className={css.submit} htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>
                </FormItem>
            </Form>
        </div>
        <CusModal visible={this.state.previewVisble} closeModal={this.handleCancel.bind(this,"previewVisble")}>
            <img alt="example" style={{ width: '100%' }} src={this.state.previewImg+ "@380w_380h_1e_1c.png"}/>
        </CusModal>
    </div>
    }
}
Agent = Form.create()(Agent);
export default injectIntl(Agent);