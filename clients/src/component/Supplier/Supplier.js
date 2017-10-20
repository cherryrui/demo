/**
 * Created by hp on 2017/9/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Supplier.scss';
import appcss from '../../App.scss';
import Util from '../../Util.js';
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
    menu,
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
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const CheckboxGroup = Checkbox.Group;
const {
    TextArea
} = Input;

class Supplier extends React.Component {
    jump = (e) => {
        this.props.history.pushState(null, "page/mine/successful-application/2");
    }
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
            category: [{
                id: 1,
                category_id: []
            }],
            categoryList: [],
            transportWay: [],
            img_front: false,
            img_back: false,
            img_logo: false,
            visible: false,
            previewVisble: false,
        }
        this.img_front = null;
        this.img_back = null;
        this.img_logo = null;
        this.formatMessage = this.props.intl.formatMessage;
    }
    componentWillMount() {
        let options = [],
            categoryList = [],
            transportWay = [];
        axios.get('/user/get-city-by-parent.json').then(res => {
            options = this.convertData(JSON.parse(res.data.address.result));
            axios.get('/category/get-agent-category.json').then(re => {
                if (re.data.isSucc) {
                    categoryList = re.data.result;
                    categoryList.map(item => {
                        item.value = item.categoryId;
                        item.label = item.categoryName;
                        item.isLeaf = false;
                    })
                    axios.get('/user/get-transport-way.json').then(r => {
                        if (r.data.isSucc) {
                            transportWay = r.data.result;
                            transportWay.map(item => {
                                item.label = item.transportName;
                                item.value = item.transportId;
                            })
                            this.setState({
                                options: options,
                                categoryList: categoryList,
                                transportWay: transportWay,
                            })
                        } else {
                            this.setState({
                                options: options,
                                categoryList: categoryList,
                            })
                            message.error(res.data.message)
                        }
                    })
                } else {
                    this.setState({
                        options: options,
                    })
                    message.error(res.data.message)
                }
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
    handleChange = (name, info) => {
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
            param[name] = true;
            this.setState(param);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    normFile = (e) => {
        if (!this.state.img_logo) {
            this.setState({
                img_logo: true
            })
        }
        if (e.file.status == "removed") {
            this.setState({
                img_logo: false,
            })
            this.img_logo = null;
        }
        if (e.file.status == "done") {
            this.img_logo = e.file.response.url;
            e.fileList[0].thumbUrl = e.file.response.url + "@132w_92h_1e_1c.png";
            e.file.thumbUrl = e.file.response.url + "@132w_92h_1e_1c.png";

        }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
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

    handleTransport = (checkedValues) => {
        return checkedValues;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.img_front && this.img_back) {
                    values.imgUrl = values.logoList[0].response.url;
                    values.country = values.residence[0];
                    values.province = values.residence[1];
                    values.city = values.residence[2];
                    values.district = values.residence[3];
                    values.LevelOneProductCategorys = [];
                    values.LevelTwoProductCategorys = [];
                    this.state.category.map(item => {
                        values.LevelOneProductCategorys.push(item.category_id[0]);
                        values.LevelTwoProductCategorys.push(item.category_id[1]);
                    })
                    values.LevelOneProductCategorys = values.LevelOneProductCategorys.join(",");
                    values.LevelTwoProductCategorys = values.LevelTwoProductCategorys.join(",");
                    let value = JSON.parse(JSON.stringify(values.transportWay));
                    values.transportWay = [];

                    value.map(item => {
                        values.transportWay.push({
                            id: item + ""
                        })
                    })
                    values.transportWay = JSON.stringify(values.transportWay);
                    values.businessLicense = this.img_front;
                    values.businessLicenseB = this.img_back;
                    axios.post('/user/become-supplier.json', values).then(res => {
                        if (res.data.code == 104) {
                            this.props.handleVisible ? this.props.handleVisible() : "";
                        } else if (res.data.isSucc) {
                            let user = JSON.parse(sessionStorage.user);
                            user.supplier = {};
                            sessionStorage.setItem('user', JSON.stringify(user));
                            this.props.history.pushState(null, "page/mine/successful-application/2");
                        } else {
                            message.error({
                                reason: res.data.message
                            })
                        }
                    })
                } else {
                    message.error(this.formatMessage({
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

    changeAddress = (value, selectedOptions) => {
        console.log(value, selectedOptions)
        this.select_address = selectedOptions;
    }

    /**
     * 保存所选择的分类id
     * @param  {[type]} value           [description]
     * @param  {[type]} selectedOptions [description]
     * @return {[type]}                 [description]
     */
    onChange = (index, value, options) => {
        this.state.category[index].category_id = value;
        this.state.category[index].category_name = options
    }

    /**
     * 删除或者添加产品分类
     */
    handleCategory = (index) => {
        let category = this.state.category;
        if (index == -1) {
            category.push({
                id: category[category.length - 1].id + 1,
            });
        } else {
            category.splice(index, 1);
        }
        this.setState({
            category: category
        })
    }
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        axios.get('/category/get-two-category.json?cid=' + targetOption.value).then(res => {
            targetOption.loading = false;
            let children = res.data.result
            children.map(item => {
                item.label = item.categoryName;
                item.value = item.categoryId;
            })
            targetOption.children = children;
            this.setState({
                categoryList: [...this.state.categoryList],
            })
        })
    }

    render() {

        const {
            getFieldDecorator
        } = this.props.form;
        const {
            autoCompleteResult
        } = this.state;
        const imageUrl = this.state.imageUrl;
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
                    span: 18
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
                    span: 18,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 60 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return <div>
        <div className={css.prompt}>
            <p className={css.spot_text}>
                <FormattedMessage id={"supplier.need.conditions"}
                    defaultMessage = "供应商需要具备的条件" />
            </p>
            <p className={css.spot_text}>
                <FormattedMessage id={"supplier.development"}
                    defaultMessage="随着建筑零售行业的飞速发展，消费者的需求也更加多元化，需求量迅猛增长。为了共享建材行业发展的成果，我们希望与您携手前进。"/>
            </p>
            <p className={css.spot_text}>
                <FormattedMessage id={"supplier.have.condition"}
                    defaultMessage=""/>
            </p>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"supplier.condition_one"}
                    defaultMessage=""/>
            </p>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"supplier.condition_two"}
                    defaultMessage=""/>
            </p>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"supplier.condition_three"}
                    defaultMessage=""/>
            </p>
            <p className={css.spot_text}>
                <i className={css.spot}>●</i>
                <FormattedMessage id={"supplier.condition_four"}
                    defaultMessage=""/>
            </p>
        </div>
        <div  className={css.supplier_form}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'post.company_name'})}
                >
                    {getFieldDecorator('supplierName', {
                        rules: [{
                            required: true, message: this.formatMessage({id: 'agent.enter.company'}),
                        }],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'quotation.url'})}
                >
                    {getFieldDecorator('website', {
                         rules: [{
                            required: true, message: this.formatMessage({id: 'certif.company.website_warn'}),
                        }],
                    })(
                        <AutoComplete className={css.supplier_input}
                            dataSource={websiteOptions}
                            onChange={this.handleWebsiteChange}
                        >
                            <Input/>
                        </AutoComplete>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'quotation.contact.name'})}
                >
                    {getFieldDecorator('contactPerson', {
                        rules: [{
                            required: true, message: this.formatMessage({id: 'post.linkman.info'}),
                        }],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'post.email'})}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true, 
                            message: this.formatMessage({id: 'register.email.warn'}),
                        }],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'quotation.contact.tel'})}
                >
                    {getFieldDecorator('contactPhone', {
                        rules: [{ required: true, message: this.formatMessage({id: 'register.tel.warn'}),}],
                    })(
                        <Input className={css.supplier_input}/>
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
                        <Cascader options={this.state.options} className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'agent.detailed.address'})}
                >
                    {getFieldDecorator('address', {
                    rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.detailed_address'}),
                        }],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem  style={{display:"flex"}}
                    {...formItemLayout}
                    label={this.formatMessage({id: 'app.company.logo'})}
                >
                    {getFieldDecorator('logoList', {
                        valuePropName: 'fileList',
                        getValueFromEvent: this.normFile,
                        rules: [{ type:"array", required: true, message: this.formatMessage({id: 'post.company.logo'}),
                            }],
                        })(
                            <Upload 
                                name="file"
                                action={Util.url+"/tool/upload"}
                                listType = "picture-card"
                                onPreview = {this.previewImg.bind(this,"img_logo")}
                                accept="image/*"
                                multiple
                                className={css.suplier_logo}
                              >
                                {this.state.img_logo ? null :<span className={css.upload_icon}>
                                    <i class="iconfont icon-jiahao"></i>
                                  </span>}
                            </Upload>
                    )}
                    <div className={css.img_text}>
                        <p><FormattedMessage id="app.img.size" defaultMessage="app.img.size"/></p>
                       <p> <FormattedMessage id="app.img.format" defaultMessage="app.img.format"/></p>
                    </div>
                </FormItem>
                {this.state.category.map((item,index)=>{
                    return <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'app.category'})+(index+1)}
                    >
                        {getFieldDecorator('category'+index, {
                            rules: [{ type: 'array', required: true, message: this.formatMessage({id:'mine.product.category_warn'}),
                                }],
                        })(
                            <Cascader 
                                options={this.state.categoryList}
                                loadData={this.loadData}
                                onChange={this.onChange.bind(this,index)}
                                className={css.supplier_input}
                            />
                        )}
                        {index==0?<Tooltip title={this.formatMessage({id:'mine.product.add_category'})}>
                                <Button icon="plus" onClick={this.handleCategory.bind(this,-1)} className={css.jiahao}/>
                            </Tooltip>
                            :<Tooltip title={this.formatMessage({id:'mine.product.del_category'})}>
                                <Button icon="minus" onClick={this.handleCategory.bind(this,index)} className={css.jiahao}/>
                            </Tooltip>}
                    </FormItem>
                })}
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'supplier.main.products'})}
                >
                    {getFieldDecorator('introduction', {
                        rules: [{ required: true, message: this.formatMessage({id: 'supplier.main.products'}),
                            }],
                    })(
                        <TextArea rows={4} className={css.supplier_textarea}/>
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
                                name = "file"
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
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'agent.legal'})}
                >
                    {getFieldDecorator('legalPerson', {
                        rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.legal'}),}],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={this.formatMessage({id: 'agent.legal_no'})}
                >
                    {getFieldDecorator('cardId', {
                        rules: [{ required: true, message: this.formatMessage({id: 'agent.enter.legal_no'}),}],
                    })(
                        <Input className={css.supplier_input}/>
                    )}
                </FormItem>
                <FormItem  className={css.checkbox_bottom}
                    {...formItemLayout}
                    label={this.formatMessage({id: 'about.shipping.method'})}
                >
                    {getFieldDecorator('transportWay', {
                        valuePropName: 'checkedValues',
                        getValueFromEvent: this.handleTransport,
                        rules: [{ type:"array", required: true, message: this.formatMessage({id: 'agent.enter.detailed_address'}),
                            }],
                    })(
                         <CheckboxGroup options={this.state.transportWay}/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" className={css.retrun}>{this.formatMessage({id: 'app.cancel'})}</Button>
                    <Button type="primary" className={css.submit}  htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>
                </FormItem>
            </Form>
        </div>
        <CusModal visible={this.state.previewVisble} closeModal={this.handleCancel.bind(this,"previewVisble")}>
            <img alt="example" style={{ width: '100%' }} src={this.state.previewImg+ "@380w_380h_1e_1c.png"}/>
        </CusModal>
    </div>
    }
}


Supplier = Form.create()(Supplier);
export default injectIntl(Supplier);