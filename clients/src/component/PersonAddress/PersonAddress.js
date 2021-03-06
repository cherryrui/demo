/**
 * Created by hp on 2017/9/13.
 */
import React from 'react';
import axios from 'axios';
import css from './PersonAddress.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
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
    Steps,
    Table,
    Select,
    Input,
    Icon,
    Tooltip,
    Checkbox,
    Button,
    Radio,
    Breadcrumb,
    message,
    Cascader,
    Form
} from 'antd';
message.config({
    top: '40%',
    duration: 2,
});
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {
    TextArea
} = Input;


class PersonAddress extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            address_list: [],
            title: "cart.address.title",
            address: {},
            telCode: [],
            citys: '',
            selectedRowKeys: [],
            select_all: false,
        };
        this.select_address = [];
        this.formatMessage = this.props.intl.formatMessage;
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        this.colums_show = [{
            title: <FormattedMessage id="cart.delivery.name" defaultMessage=" 收货人"/>,
            className: css.table_col_name,
            width: "10%",
            render: (record) => <span className={css.table_namne}>{record.name}</span>
        }, {
            title: <FormattedMessage id="cart.delivery.tel" defaultMessage="联系电话 "/>,
            className: css.table_col,
            width: "23%",
            render: (record) => <span className={css.table_tel}>{record.phoneDc+' '+record.phone}</span>
        }, {
            title: <FormattedMessage id="cart.delivery.address" defaultMessage="收货地址 "/>,
            className: css.table_col,
            width: "45%",
            render: (record) => <span className={css.table_address}>
                    <p className={css.address_detail}>{locale=="en"?record.address+","+record.district+","+record.city+","+record.province+","+record.country
                    :record.country+' '+record.province+" "+record.city+" "+record.district+" "+ record.address}</p>
                    {record.isDefault?<p className={css.delivery} type="primary">
                        <FormattedMessage id="cart.delivery.default" defaultMessage="默认地址 "/>
                    </p>:""}
                </span>
        }, {
            title: <FormattedMessage id="cart.operation" defaultMessage="操作"/>,
            className: css.table_col,
            width: "14%",
            render: (record) => <span className={css.table_operation}>
                  <a><Icon
                      onClick={this.handleEditAddress.bind(this,record)}
                      onmouseover="show('item')"
                      className={css.modify} type="edit" />
                  </a>
                    <Icon type="delete"  className={css.delete} onClick={this.handleDeladdress.bind(this,record.addressId)} />
                </span>
        }, ]
    }
    getAddressList = () => {
        axios.get('/user/get-address-list.json').then(res => {
            if (res.data.isSucc) {
                /*console.log(res.data.result)*/
                this.setState({
                    address_list: res.data.result,
                    select: this.state.select == 0 && res.data.result.length > 0 ? res.data.result[0].addressId : this.state.select,
                })
            } else if (res.data.code == 104) {
                this.props.login ? this.props.login(true) : "";
            } else {
                message.error(res.data.message);
            }
        })
    }
    componentWillMount() {
        this.getAddressList();
        axios.get('/user/get-city-by-parent.json').then(res => {
            /*console.log('get-city-parent:', JSON.parse(res.data.address.result));*/
            let address = this.convertData(JSON.parse(res.data.address.result));
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

    handleEditAddress = (address) => {
        /*console.log(address)*/
        let title = '',
            addr;
        if (address.addressId) {
            addr = JSON.parse(JSON.stringify(address));
            addr.city = [];
            addr.city.push(address.countryId);
            addr.city.push(address.provinceId);
            addr.city.push(address.cityId);
            addr.city.push(address.districtId);
            title = "cart.address.title";
        } else {
            title = "cart.delivery.new";
            addr = {};
        }
        this.select_address = [];
        this.setState({
            address: addr,
            citys: address.city,
            title: title,
            visible: true,
        }, () => {
            this.props.form.resetFields();
        })
    }

    handleAddress = (item) => {
        this.setState({
            select: item.id
        })
    }
    handleOk = () => {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            /*console.log(err, values);*/
            if (!err) {
                this.setState({
                    loading: true
                })
                let param = values;
                /*console.log(param)*/
                /*console.log(this.select_address, this.state.address)*/
                if (this.select_address.length > 0) {
                    param.country = this.select_address[0].label;
                    param.countryId = this.select_address[0].value;
                    param.province = this.select_address.length > 1 ? this.select_address[1].label : "";
                    param.provinceId = this.select_address.length > 1 ? this.select_address[1].value : 0;
                    param.city = this.select_address.length > 2 ? this.select_address[2].label : "";
                    param.cityId = this.select_address.length > 2 ? this.select_address[2].value : 0;
                    param.district = this.select_address.length > 3 ? this.select_address[3].label : "";
                    param.districtId = this.select_address.length > 3 ? this.select_address[3].value : 0;
                } else if (this.state.address.addressId) {
                    param.country = this.state.address.country;
                    param.countryId = this.state.address.countryId;
                    param.province = this.state.address.province;
                    param.provinceId = this.state.address.provinceId;
                    param.city = this.state.citys;
                    param.cityId = this.state.address.cityId;
                    param.district = this.state.address.district;
                    param.districtId = this.state.address.districtId;
                }
                param.isDefault = values.isDefault ? 1 : 0;
                this.state.telCode.map(item => {
                    if (item.id == param.phoneDcId) {
                        param.phoneDc = item.districtCode
                    }
                })
                if (this.state.address.addressId) {
                    param.addressId = this.state.address.addressId;
                    axios.post('/user/update-address.json', param).then(res => {
                        /*console.log(res.data)*/
                        if (res.data.isSucc) {
                            this.setState({
                                loading: false,
                                visible: false,
                            })
                            this.getAddressList();
                        } else if (res.data.code == 104) {
                            this.props.login ? this.props.login() : "";
                        } else {
                            message.error({
                                reason: res.data.messgae
                            })
                        }

                    })

                } else {
                    axios.post('/user/add-user-address.json', param).then(res => {
                        /*console.log('add-useraddress:', res.data);*/
                        if (res.data.isSucc) {
                            this.setState({
                                loading: false,
                                visible: false,
                            });
                            this.getAddressList();
                        } else if (res.data.code == 104) {
                            this.props.login ? this.props.login() : "";
                        } else {
                            message.error({
                                reason: res.data.messgae
                            })
                        }
                    })
                }
            }
        });
    }
    handleDeladdress = (id) => {
        /*console.log(id);*/
        let param = {
            ids: id
        }
        axios.post('/user/del-address-byids', param).then(res => {
            /*console.log(res.data)*/
            if (res.data.isSucc) {
                this.getAddressList();
            } else if (res.data.code == 104) {
                this.props.login ? this.props.login() : "";
            } else {
                message.error({
                    reason: res.data.message
                })
            }
        })
    }
    changeAddress = (value, selectedOptions) => {
        this.select_address = selectedOptions;
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            address: {},
        })
    }

    handleSelectAll = (e) => {
        let key = [];
        if (e.target.checked) {
            this.state.address_list.map(item => {
                key.push(item.addressId)
            })
        }
        /*console.log(key)*/
        this.setState({
            selectedRowKeys: key,
            select_all: !this.state.select_all,
        })
    }
    onSelectChange = (selectedRowKeys) => {
        /*console.log(selectedRowKeys)*/
        let select_all = false;
        if (selectedRowKeys.length == this.state.address_list.length) {
            select_all = true;
        }
        this.setState({
            selectedRowKeys,
            select_all: select_all
        })
    }

    handleDelete = () => {
        let id = this.state.selectedRowKeys;
        /*console.log(id);*/
        let param = {
            ids: id
        }
        axios.post('/user/del-address-byids', param).then(res => {
            /*console.log(res.data)*/
            if (res.data.isSucc) {
                this.getAddressList();
            } else if (res.data.code == 104) {
                this.props.login ? this.props.login() : "";
            } else {
                message.error({
                    reason: res.data.message
                })
            }
        })
    }


    render() {
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

        const prefixSelector = getFieldDecorator('phoneDcId', {
            initialValue: this.state.address.phoneDcId ? this.state.address.phoneDcId : this.state.telCode.length > 0 ? this.state.telCode[0].id : "",
        })(
            <Select style={{ width: 100 }}>
            {this.state.telCode.map(item=>{
                return <Option value={item.id}>{item.districtCode}</Option>
            })}
        </Select>
        );
        return <div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.address" defaultMessage="分类"/>

            </div>
            <div className={css.address_table}>
                <Table
                    rowSelection={{
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: this.onSelectChange,
                    }}
                    pagination={false}
                    rowKey="addressId"
                    scroll={{y: 700}}
                    columns={this.colums_show}
                    dataSource={this.state.address_list} />
            </div>
            <div className={css.delivery_new}>
                <p className={css.left}>
                    <Checkbox onChange={this.handleSelectAll} checked={this.state.select_all}>
                         {this.formatMessage({id: 'order.status.all'})}
                    </Checkbox>
                    <Tooltip title={this.formatMessage({id: 'cart.delete.all'})}>
                        <Icon type="delete" style={{cursor: "pointer"}} onClick={this.handleDelete} />
                    </Tooltip> 
                </p> 
                <Button className={appcss.button_blue} type="primary" onClick={this.handleEditAddress}>
                    {this.formatMessage({id: 'cart.delivery.new'})}
                </Button>
            </div>
            <CusModal width="650"
                title={this.formatMessage({id: this.state.title})}
                visible={this.state.visible}
                closeModal={this.handleCancel}
            >
                <Form className={css.modify_address} onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.name'})}
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.address.name,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.name'}), whitespace: true }],
                        })(
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'post.company_name'})}
                    >
                        {getFieldDecorator('companyName', {
                            initialValue: this.state.address.companyName,
                        })(
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.city'})}
                    >
                        {getFieldDecorator('city', {
                            initialValue: this.state.address.city?this.state.address.city:[],
                            rules: [{ type: 'array', required: true, message: this.formatMessage({id: 'cart.delivery.city'}) }],
                        })(
                            <Cascader  className={css.address_input}
                                options={this.state.options}
                                onChange={this.changeAddress}
                            />
                        )}
                    </FormItem>
                    <FormItem
                          {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.address'})}
                    >
                        {getFieldDecorator('address', {
                            initialValue: this.state.address.address,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.address'}) }],
                        })(
                            <Input  className={css.address_input}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={this.formatMessage({id: 'cart.delivery.tel'})}
                    >
                        {getFieldDecorator('phone', {
                            initialValue: this.state.address.phone,
                            rules: [{ required: true, message: this.formatMessage({id: 'cart.address.tel'}) }],
                        })(
                            <Input addonBefore={prefixSelector}  className={css.address_input_tel}/>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('isDefault', {
                            valuePropName: 'checked',
                            initialValue: this.state.address.isDefault==1?true:false,
                        })(
                            <Checkbox>{this.formatMessage({id: 'cart.address.default'})}</Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}style={{ marginBottom:14}}>
                        <Button type="primary"  style={{ marginRight:10}} className={appcss.button_theme} onClick={this.handleCancel}>{this.formatMessage({id: 'app.cancel'})}</Button>
                        <Button type="primary" className={appcss.button_black} loading={this.state.loading} htmlType="submit">{this.formatMessage({id: 'app.ok'})}</Button>
                    </FormItem>
                </Form>
            </CusModal>
        </div>
    }
}
PersonAddress = Form.create()(PersonAddress);
export default injectIntl(PersonAddress);