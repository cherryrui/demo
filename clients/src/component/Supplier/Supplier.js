/**
 * Created by hp on 2017/9/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Supplier.scss';
import appcss from '../../App.scss';

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
  AutoComplete
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

const {
  TextArea
} = Input;

const residences = [{
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


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
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
      address_option: [],
      category_onelist : [],
      category_twolist : [],
    }
    this.select_address = [];
    this.select_levelone = [];
    this.select_leveltwo = [];

  }
  componentWillMount() {
        axios.get('/user/get-city-by-parent.json').then(res => {
            console.log('get-city-parent:', JSON.parse(res.data.address.result));
            let address = this.convertData(JSON.parse(res.data.address.result));
            console.log(address);
            this.setState({
                address_option: address,
            })
        })
        axios.get('/category/get-agent-category.json').then(res =>{
            if(res.data.isSucc){
              this.setState({
                category_onelist:res.data.result
              })
            }else{
              message.error({
                reason:res.data.message
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
  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl
      }));
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err) {
        console.log('Received values of form: ', values);
        let param = values;
        /*if(this.select_address.length>0){
          param.country = this.select_address[0].label;
                    param.countryId = this.select_address[0].value;
                    param.province = this.select_address.length > 1 ? this.select_address[1].label : "";
                    param.provinceId = this.select_address.length > 1 ? this.select_address[1].value : 0;
                    param.city = this.select_address.length > 2 ? this.select_address[2].label : "";
                    param.cityId = this.select_address.length > 2 ? this.select_address[2].value : 0;
                    param.district = this.select_address.length > 3 ? this.select_address[3].label : "";
                    param.districtId = this.select_address.length > 3 ? this.select_address[3].value : 0;
        }*/
        param.country = values.residence[0];
        param.province = values.residence[1];
        param.city = values.residence[2];
        param.district = values.residence[3];
        param.supplierName = values.company_name;
        param.imgUrl = '12345.png';
        param.contactPerson = values.person;
        param.contactPhone = values.phone;
        param.email = values.person;
        param.address = values.address;
        param.website = values.website;
        param.businessLicense = '123.png';
        param.businessLicenseB = '123.png';
        param.legalPerson = values.legal_person;
        param.cardId = values.id_No;
        param.introduction = values.products;
        param.payWay = values.payWay;
        param.transportWay = values.transportWay;
        param.LevelOneProductCategorys = `${values.levelone[0]},${values.levelone[1]},${values.levelone[2]},${values.levelone[3]}`;
        param.LevelTwoProductCategorys = `${values.leveltwo[0]},${values.leveltwo[1]},${values.leveltwo[2]},${values.leveltwo[3]}`;
        
        console.log(param)
        axios.post('/user/supplier-register.json',param).then(res =>{
          console.log(res.data);
          if(res.data.isSucc){
            this.jump();
          }else{
            message.error({
              reason:res.data.message
            })
          }
        })
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
  changeLevelone = (value, selectedOptions) => {
        this.select_levelone = selectedOptions;
  }
  changeLeveltwo = (value, selectedOptions) => {
        this.select_leveltwo = selectedOptions;
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
          span: 14,
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
    let {
      intl: {
        formatMessage
      }
    } = this.props;

    return <div>
                <div className={css.prompt}>
                    <p className={css.spot_text}>
                        <FormattedMessage id={"supplier.need.conditions"}
                         defaultMessage="供应商需要具备的条件"/>
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
                            label={formatMessage({id: 'post.company_name'})}
                        >
              {getFieldDecorator('company_name', {
                  rules: [{
                      required: true, message: formatMessage({id: 'agent.enter.company'}),


                  }],
              })(
                  <Input className={css.supplier_input}/>
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'quotation.url'})}
                        >
              {getFieldDecorator('website', {
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
                            label={formatMessage({id: 'quotation.contact.name'})}
                            hasFeedback
                        >
              {getFieldDecorator('person', {
              })(
                  <Input className={css.supplier_input}/>
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'post.email'})}

                        >
              {getFieldDecorator('email', {
                  rules: [{

                  }, {
                      required: true, message: formatMessage({id: 'register.email.warn'}),
                  }],
              })(
                  <Input className={css.supplier_input}/>
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'quotation.contact.tel'})}
                        >
              {getFieldDecorator('phone', {
                  rules: [{ required: true, message: formatMessage({id: 'register.tel.warn'}),
                  }],
              })(
                  <Input className={css.supplier_input}/>
              )}
                        </FormItem>

                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'certif.company.region'})}
                        >
              {getFieldDecorator('residence', {
                  initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                  rules: [{ type: 'array', required: true, message: 'agent.select.region'
                  }],
              })(
                  <Cascader 
                    options={this.state.address_option} 
                    onChange={this.changeAddress} 
                    className={css.supplier_input}
                  />
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                        label={formatMessage({id: 'agent.detailed.address'})}
                        hasFeedback
                    >
              {getFieldDecorator('address', {
                  rules: [{ required: true, message: formatMessage({id: 'agent.enter.detailed_address'}),
                  }],
              })(
                  <Input className={css.supplier_input}/>
              )}
                    </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'supplier.main.products'})}
                            hasFeedback
                        >
              {getFieldDecorator('products', {

              })(
                  <TextArea rows={4} className={css.supplier_textarea}/>
              )}
                        </FormItem>


                        <FormItem
                            wrapperCol={{ span: 12, offset: 6 }}
                        >
                            <p className={css.credentials}>
                                    {formatMessage({id: 'agent.upload.credentials'})}
                            </p>
                            <div className={css.upload}>
                                <div className={css.uploader_div}>

                                    <Upload
                                        className={css.uploader}
                                        name="avatar"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
            {
                imageUrl ?
                    <img src={imageUrl} alt="" className="avatar" /> :
                    <Icon type="plus" className={css.avatar_icon} />
                }
                                    </Upload>
                                    <p className={css.side}>
                                    {formatMessage({id: 'agent.front'})}
                                    </p>
                                </div>
                                <div className={css.uploader_div}>

                                    <Upload
                                        className={css.uploader}
                                        name="avatar"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
            {
                imageUrl ?
                    <img src={imageUrl} alt="" className="avatar" /> :
                    <Icon type="plus" className={css.avatar_icon} />
                }
                                    </Upload>
                                    <p className={css.side}>
                                        {formatMessage({id: 'agent.back'})}
                                    </p>
                                </div>
                                <div className={css.uploader_div}>

                                    <Upload
                                        className={css.uploader}
                                        name="avatar"
                                        showUploadList={false}
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        beforeUpload={beforeUpload}
                                        onChange={this.handleChange}
                                    >
            {
                imageUrl ?
                    <img src={imageUrl} alt="" className="avatar" /> :
                    <Icon type="plus" className={css.avatar_icon} />
                }
                                    </Upload>
                                    <p className={css.side}>
                                        {formatMessage({id: 'quotation.logo'})}
                                    </p>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem
              {...formItemLayout}

                            label={formatMessage({id: 'agent.legal'})}

                            hasFeedback
                        >
              {getFieldDecorator('legal_person', {
                  rules: [{ required: true, message: formatMessage({id: 'agent.enter.legal'}),


                  }],
              })(
                  <Input className={css.supplier_input}/>
              )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                              label={formatMessage({id: 'agent.legal_no'})}
                              hasFeedback
                        >
                          {getFieldDecorator('id_No', {
                              rules: [{ required: true, message: formatMessage({id: 'agent.enter.legal_no'}),}],
                          })(
                              <Input className={css.supplier_input}/>
                          )}
                        </FormItem>

                      

                        <FormItem
                          {...formItemLayout}
                            label={formatMessage({id: 'suupplier.levelone.products.category'})}
                        >
                            {getFieldDecorator('levelone', {
                                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                rules: [{ type: 'array', required: true, message: 'agent.select.region' }],
                            })(
                                <Cascader options={this.state.address_option} 
                                    onChange={this.changeLevelone} 
                                    className={css.supplier_input}
                                />
                            )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                            label={formatMessage({id: 'suupplier.leveltwo.products.category'})}
                        >
                            {getFieldDecorator('leveltwo', {
                                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                                rules: [{ type: 'array', required: true, message: 'agent.select.region' }],
                            })(
                                <Cascader options={this.state.address_option} 
                                    onChange={this.changeLeveltwo} 
                                    className={css.supplier_input}
                                />
                            )}
                        </FormItem>



                        <FormItem  className={css.input_left}
                            {...formItemLayout}
                            label={formatMessage({id: 'cart.pay.mode'})}
                        >
              {getFieldDecorator('payWay', {
                  valuePropName: 'checked',
              })(
                  <RadioGroup>
                      <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'cart.pay.letter'})}</Checkbox>
                      <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'cart.pay.check'})} </Checkbox>
                      <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'cart.pay.cash'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'cart.pay.blank'})} </Checkbox>
                  </RadioGroup>
              )}
                        </FormItem>
                        <FormItem  className={css.checkbox_bottom}
                            {...formItemLayout}
                            label={formatMessage({id: 'about.shipping.method'})}
                        >
                            {getFieldDecorator('transportWay', {
                                valuePropName: 'checked',
                            })(
                                <RadioGroup>
                                    <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'supplier.offshore'})}</Checkbox>
                                    <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'supplier.port'})} </Checkbox>
                                    <Checkbox className={css.supplier_checkbox}>{formatMessage({id: 'supplier.warehouse.China'})} </Checkbox>
                                    <Checkbox>{formatMessage({id: 'supplier.warehouses.abroad'})} </Checkbox>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" className={css.retrun}>{formatMessage({id: 'app.cancel'})}</Button>
                            <Button type="primary" className={css.submit}  htmlType="submit">{formatMessage({id: 'app.ok'})}</Button>
                        </FormItem>
                    </Form>
                </div>


        </div>

  }
}


Supplier = Form.create()(Supplier);
export default injectIntl(Supplier);