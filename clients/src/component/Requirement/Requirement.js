/**
 * Created by hp on 2017/9/13.
 */
import React from 'react';
import axios from 'axios';
import css from './Requirement.scss';
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
    Table,
    Steps,
    Select,
    Icon,
    Button,
    Radio,
    message,
    Input,
    Menu,
    Dropdown,
    Form
    } from 'antd';
const Step = Steps.Step;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {
    TextArea
    } = Input;


const data = [{
    key: '1',
    name: "F G ",
    timeday: "2017-05-05",
    time: "08:05:00",
    status: 1,
}, {
    key: '2',
    name: "xxxxxxx ",
    timeday: "2017-05-05",
    time: "08:05:00",
    status: 1,
}, {
    key: '3',
    name: "F G ",
    timeday: "2017-05-05",
    time: "08:05:00",
    status: 1,
}, {
    key: '4',
    name: "F G ",
    timeday: "2017-05-05",
    time: "08:05:00",
    status: 1,
}];


class Requirement extends React.Component {
    handleChange = (value) =>{
        console.log(value);
    }
    static propTypes = {
        intl: intlShape.isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            name: "F G ",
            time: "g",
            status: 1,
            requirement:data,
        };
        let {
            intl: {
                formatMessage
                }
            } = this.props;
        this.formatMessage = this.props.intl.formatMessage;

        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="">
            { this.formatMessage({id:"app.processing"})}
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="">
            { this.formatMessage({id:"app.processed"})}
                        </a>
                </Menu.Item>
            </Menu>
        );
        this.colums_show = [{
            title: <FormattedMessage id="post.company_name" defaultMessage=" 收货人"/>,
            className: css.table_col,
            width: "40%",
            className: css.table_col,
            render: (record) =><span className={css.table_namne}>{record.name}</span>
        }, {
            title: <FormattedMessage id="orderlist.order.time" defaultMessage="联系电话 "/>,
            className: css.table_col,
            width: "20%",
            className: css.table_col,
            render: (record) => <div className={css.time_text}>
                <p>{record.timeday}</p>
                <p>{record.time}</p>
            </div>
        }, {
            title: <div>
                       <Dropdown overlay={menu}>
                              <a className="ant-dropdown-link" href="#" style={{color:"#2e2b2e"}}>
                                    <FormattedMessage id="orderlist.order.status" defaultMessage="收货地址 "/>
                                    <Icon type="down" />
                              </a>
                        </Dropdown>
            </div>,
            className: css.table_col,
            width: "15%",
            className: css.table_col,
            render: (record) => <span className={css.table_namne}>
                       <Icon type="file-text" />
            </span>
        }, {
            title: <FormattedMessage id="cart.operation" defaultMessage="操作"/>,
            className: css.table_col,
            width: "15%",
            className: css.table_col,
            render: (record) => <span className={css.table_operation}>
                <Link className={css.operation_text}>
                    <i class="iconfont icon-DYC-23"/>
                    <FormattedMessage id="orderlist.order.view" defaultMessage="查看"/>
                </Link>

            </span>
        }, ]
    }

    render() {
        const {
            intl: {
                formatMessage
                }
            } = this.props;

        return <div>
            <div className={basecss.child_title}>
                <FormattedMessage id="mine.person.requirement" defaultMessage="分类"/>

            </div>
            <div>
                <Table
                    pagination={false}
                    rowKey="addressId"
                    bordered
                    columns={this.colums_show}
                    dataSource={this.state.requirement}/>
            </div>
        </div>
    }
}
Requirement = Form.create()(Requirement);
export default injectIntl(Requirement);