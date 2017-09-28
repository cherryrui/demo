/**
 * Created by hp on 2017/9/13.
 */
import React from 'react';
import axios from 'axios';
import css from './PersonAddress.scss';
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
    Modal,
    Cascader,
    Form
} from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {
    TextArea
} = Input;


class PersonAddress extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired,
    }
    constructor(props) {
        super(props);
        this.state = {
            my_address: [{
                id: 1,
                name: "张三",
                tel: 12344566778,
                city: "北京",
                address: "xxxxxxxxxxxxxxxx",

            }, {
                id: 2,
                name: "张三",
                tel: 12344566778,
                city: "北京",
                address: "xxxxxxxxxxxx",

            }, ],
            title: "cart.address.title",
            address: {}
        };
        this.colums_show = [{
            title: <FormattedMessage id="cart.delivery.name" defaultMessage=" 收货人"/>,
            className: css.table_col,
            width: "20%",
            className: css.table_col,
            render: (record) => <span className={css.table_namne}>{record.name}</span>
        }, {
            title: <FormattedMessage id="cart.delivery.tel" defaultMessage="联系电话 "/>,
            className: css.table_col,
            width: "18%",
            className: css.table_col,
            render: (record) => <span className={css.table_tel}>{record.tel}</span>
        }, {
            title: <FormattedMessage id="cart.delivery.address" defaultMessage="收货地址 "/>,
            className: css.table_col,
            width: "50%",
            className: css.table_col,
            render: (record) => <span className={css.table_address}>
                    <p>{record.city}&nbsp;&nbsp;{record.address}</p>
                    <p className={css.delivery}type="primary">
                        <FormattedMessage id="cart.delivery.default" defaultMessage="默认地址 "/>
                    </p>
                </span>
        }, {
            title: <FormattedMessage id="cart.operation" defaultMessage="操作"/>,
            className: css.table_col,
            width: "12%",
            className: css.table_col,
            render: (record) => <span className={css.table_operation}>
                  <a><Icon
                      onClick={this.handleEditAddress.bind(this)}
                      onmouseover="show('item')"
                      className={css.modify} type="edit" />
                  </a>
                    <Icon type="delete" className={css.delete} />
                </span>
        }, ]
    }

    handleEditAddress = (address) => {
        let title = '',
            addr;
        if (address.id) {
            addr = address;
            title = "cart.address.title";
        } else {
            title = "cart.delivery.new";
            addr = {};
        }
        this.setState({
            address: addr,
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
    handleCancel = () => {
        this.setState({
            visible: false,
            address: {},
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
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.address" defaultMessage="分类"/>

            </div>
            <div>
                     <Table
                pagination={false}
                rowKey="id"
                bordered
                columns={this.colums_show}
                dataSource={this.state.my_address} />
            </div>
            <div className={css.delivery_new}>
                <Button className={appcss.button_theme}type="primary" onClick={this.handleEditAddress}>
                    <FormattedMessage id="cart.delivery.new" defaultMessage="新增地址 "/>
                </Button>

            </div>
            <div>
                <Modal className={css.address_modal}
                    title={formatMessage({id: this.state.title})}
                    visible={this.state.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={null}
                >
        <Form onSubmit={this.handleSubmit} className={css.address_form}>
                        <FormItem 
                            label={formatMessage({id: 'cart.delivery.name'})}
                        {...formItemLayout}
                        >
                        {getFieldDecorator ('name', {
                            initialValue: this.state.address.name,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.name'}), whitespace: true }],
                        })(
                            <Input className={css.address_input}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label={formatMessage({id: 'post.company_name'})}
                        >
                        {getFieldDecorator('company_name', {
                            initialValue: this.state.address.company_name,
                        })(
                            <Input className={css.address_input}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label={formatMessage({id: 'cart.delivery.city'})}
                        >
                        {getFieldDecorator('city', {
                            initialValue: this.state.address.city?this.state.address.city.split(","):[],
                            rules: [{ type: 'array', required: true, message: formatMessage({id: 'cart.cart'}) }],
                        })(
                            <Cascader className={css.address_input}
                                options={this.state.options}
                                loadData={this.loadData}
                                changeOnSelect
                            />
                        )}
                        </FormItem>
                        <FormItem
                          {...formItemLayout}
                            label={formatMessage({id: 'cart.delivery.address'})}
                        >
                        {getFieldDecorator('address', {
                            initialValue: this.state.address.address,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.address'}) }],
                        })(
                            <Input className={css.address_input}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                            label={formatMessage({id: 'cart.delivery.tel'})}
                        >
                        {getFieldDecorator('tel', {
                            initialValue: this.state.address.tel,
                            rules: [{ required: true, message: formatMessage({id: 'cart.address.tel'}) }],
                        })(
                            <Input className={css.address_input}/>
                        )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout} style={{ marginBottom:8}}>
                        {getFieldDecorator('default', {
                            valuePropName: 'checked',
                            initialValue: this.state.address.default==1?true:false,
                        })(
                            <Checkbox className={css.address_checkbox}>{formatMessage({id: 'cart.address.default'})}</Checkbox>
                        )}
                        </FormItem>
        <FormItem {...tailFormItemLayout} style={{ marginBottom:4}}>
                            <Button type="primary" className={css.cancel} onClick={this.handleCancel}>{formatMessage({id: 'app.cancel'})}</Button>
                            <Button type="primary" className={css.submit} htmlType="submit">{formatMessage({id: 'app.ok'})}</Button>
                        </FormItem>
                    </Form>
                </Modal>

            </div>

        </div>
    }

}
PersonAddress = Form.create()(PersonAddress);
export default injectIntl(PersonAddress);