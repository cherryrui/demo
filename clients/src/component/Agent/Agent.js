/**
 * Created by hp on 2017/9/15.
 */
import axios from 'axios';
import React from 'react';
import css from './Agent.scss';
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
class Agent extends React.Component {
  jump = (e) => {
    this.props.history.pushState(null, "page/mine/successful-application/1")
  }
  static propTypes = {
    intl: intlShape.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      address_option:[]
    }
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
                            label={formatMessage({id: 'post.company_name'})}
                        >
          {getFieldDecorator('company_name', {
              rules: [{
                  required: true, message: formatMessage({id: 'agent.enter.company'}),
              }],
          })(
              <Input className={css.agent_input}/>
          )}
                    </FormItem>
                        <FormItem className={css.input_left}
          {...formItemLayout}
                            label={formatMessage({id: 'agent.type'})}
                        >
          {getFieldDecorator('radio-group')(
              <RadioGroup>
                  <Radio value="a"  className={css.agent_checkbox}>{formatMessage({id: 'agent.company'})}</Radio>
                  <Radio value="b">{formatMessage({id: 'agent.store'})}</Radio>
              </RadioGroup>
          )}
                        </FormItem>
                        <FormItem
          {...formItemLayout}
                            label={formatMessage({id: 'quotation.contact.name'})}
                            hasFeedback
                        >
          {getFieldDecorator('person', {
          })(
              <Input className={css.agent_input}/>
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
              <Input className={css.agent_input}/>
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
              <Input className={css.agent_input}/>
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
              <Cascader options={this.state.address_option} className={css.agent_input}/>
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
              <Input className={css.agent_input}/>
          )}
                        </FormItem>

                        <FormItem
          {...formItemLayout}
                            label={formatMessage({id: 'quotation.url'})}
                        >
          {getFieldDecorator('website', {
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
              <Input className={css.agent_input}/>
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
              <Input className={css.agent_input}/>
          )}
                        </FormItem>
                        <FormItem   className={css.input_left}
                        {...formItemLayout}
                            label={formatMessage({id: 'cart.pay.mode'})}
                            >
          {getFieldDecorator('radio-group', {
              valuePropName: 'checked',
          })(
              <RadioGroup>
                      <Checkbox  className={css.agent_checkbox}>{formatMessage({id: 'cart.pay.letter'})}</Checkbox>
                      <Checkbox className={css.agent_checkbox}>{formatMessage({id: 'cart.pay.check'})} </Checkbox>
                      <Checkbox className={css.agent_checkbox}>{formatMessage({id: 'cart.pay.cash'})} </Checkbox>
                      <Checkbox>{formatMessage({id: 'cart.pay.blank'})} </Checkbox>
              </RadioGroup>
          )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary"  className={css.retrun}>{formatMessage({id: 'app.cancel'})}</Button>
                            <Button type="primary" onClick={this.jump} className={css.submit} htmlType="submit">{formatMessage({id: 'app.ok'})}</Button>
                        </FormItem>
                    </Form>
                </div>
                </div>

  }
}
Agent = Form.create()(Agent);
export default injectIntl(Agent);