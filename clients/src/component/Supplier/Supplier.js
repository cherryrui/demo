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
    }

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
      if (!err) {
        console.log('Received values of form: ', values);
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
                <div>
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
                  <Input />
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'quotation.url'})}
                        >
              {getFieldDecorator('website', {
              })(
                  <AutoComplete
                      dataSource={websiteOptions}
                      onChange={this.handleWebsiteChange}

                  >
                      <Input />
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
                  <Input />
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
                  <Input />
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
                  <Input />
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
                  <Cascader options={residences} />
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
                  <Input />
              )}
                    </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'supplier.main.products'})}
                            hasFeedback
                        >
              {getFieldDecorator('products', {

              })(
                  <TextArea rows={4} />
              )}
                        </FormItem>


                        <FormItem
                            wrapperCol={{ span: 12, offset: 6 }}
                        >
                            <p>
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
                  <Input />
              )}
                        </FormItem>
                        <FormItem
              {...formItemLayout}
                            label={formatMessage({id: 'agent.legal_no'})}
                            hasFeedback
                        >
              {getFieldDecorator('id_No', {
                  rules: [{ required: true, message: formatMessage({id: 'agent.enter.legal_no'}),

                  }],
              })(
                  <Input />
              )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id: 'cart.pay.mode'})}
                        >
              {getFieldDecorator('radio-group', {
                  valuePropName: 'checked',
              })(
                  <RadioGroup>
                      <Checkbox>{formatMessage({id: 'cart.pay.letter'})}</Checkbox>
                      <Checkbox>{formatMessage({id: 'cart.pay.check'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'cart.pay.cash'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'cart.pay.blank'})} </Checkbox>
                  </RadioGroup>
              )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={formatMessage({id: 'about.shipping.method'})}
                        >
              {getFieldDecorator('radio-group', {
                  valuePropName: 'checked',
              })(
                  <RadioGroup>
                      <Checkbox>{formatMessage({id: 'supplier.offshore'})}</Checkbox>
                      <Checkbox>{formatMessage({id: 'supplier.port'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'supplier.warehouse.China'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'supplier.warehouses.abroad'})} </Checkbox>
                  </RadioGroup>
              )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" className={css.retrun}>{formatMessage({id: 'app.cancel'})}</Button>
                            <Button type="primary" className={css.submit} onClick={this.jump} htmlType="submit">{formatMessage({id: 'app.ok'})}</Button>
                        </FormItem>
                    </Form>
                </div>


        </div>

  }
}


Supplier = Form.create()(Supplier);
export default injectIntl(Supplier);