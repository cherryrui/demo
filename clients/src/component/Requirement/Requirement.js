/**
 * Created by hp on 2017/9/13.
 */
import React from 'react';
import axios from 'axios';
import css from './Requirement.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import moment from 'moment';
import CusPagination from '../Public/CusPagination/CusPagination.js';
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

class Requirement extends React.Component {
    handleChange = (value) => {
        console.log(value);
    }
    static propTypes = {
        intl: intlShape.isRequired,
    }
    handleMenuClick = (item) => {
        console.log(item.key);
        this.setState({
            status: parseInt(item.key),
        }, () => {
            this.getRequmentList();
        })
    }
    handlePage = (page, pageSize) => {
        console.log(page)
        this.state.current = page;
        this.getRequmentList();
    }
    constructor(props) {
        super(props);
        this.state = {
            requirement: [],
            status: "",
            total: 0,
            pageSize: 10,
            current: 1,
        };
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        this.formatMessage = this.props.intl.formatMessage;

        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="0">
                    <FormattedMessage id="app.processing" defaultMessage=""/>
                </Menu.Item>
                <Menu.Item key="1">
                    <FormattedMessage id="app.processed" defaultMessage=""/>
                </Menu.Item>
                <Menu.Item key="-1">
                    <FormattedMessage id="app.refused" defaultMessage=""/>
                </Menu.Item>
            </Menu>
        );
        this.colums_show = [{
            title: <FormattedMessage id="post.demand.subject" defaultMessage=" 需求编号"/>,
            className: css.table_col,
            width: "40%",
            className: css.table_col,
            render: (record) => <span className={css.table_namne}>{record.demandSubject}</span>
        }, {
            title: <FormattedMessage id="orderlist.order.time" defaultMessage="联系电话 "/>,
            className: css.table_col,
            width: "20%",
            className: css.table_col,
            render: (record) => <div className={css.time_text}>
                <p>{moment(record.createTime).format('YYYY-MM-DD hh:mm:ss')}</p>
            </div>
        }, {
            title: <div>
                       <Dropdown overlay={menu}>
                              <a className="ant-dropdown-link" style={{color:"#2e2b2e"}}>
                                    <FormattedMessage id="orderlist.order.status" defaultMessage="收货地址 "/>
                                    <Icon type="down" />
                              </a>
                        </Dropdown>
            </div>,
            className: css.table_col,
            width: "15%",
            className: css.table_col,
            render: (record) => <span className={css.table_namne}>
                    {record.demandStatus=="-1"?<Icon type="close" />:(record.demandStatus=="1"?<Icon type="check" />:<Icon type="clock-circle-o" />)}
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

    componentWillMount() {
        this.getRequmentList();
    }
    getRequmentList = () => {
        console.log(this.state.status)
        let param = {
            pageNo: this.state.current,
            pageSize: this.state.pageSize,
            demandStatus: this.state.status ? this.state.status : ""
        };
        console.log(param)
        axios.post('/user/get-requirement-list.json', param).then(res => {
            /*console.log(res.data)*/
            if (res.data.isSucc) {
                console.log(res.data.result)
                this.setState({
                    requirement: res.data.result.list,
                    total: res.data.result.allRow,
                })
            } else {
                message.error(res.data.message)
            }
        })
    }
    getRequirementbystatus = () => {
        axios.post('/user/get-requirement-byststus.json').then(res => {
            /*console.log(res.data)*/
            if (res.data.isSucc) {
                console.log(res.data.result)
                this.setState({
                    requirement: res.data.result,
                })
            } else {
                message.error(res.data.message)
            }
        })
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
            <div className={css.requirement_table}>
                <Table
                    pagination={false}
                    rowKey="demandId"
                    columns={this.colums_show}
                    dataSource={this.state.requirement}/>
            </div>
            <CusPagination current={this.state.current} onChange={this.handlePage} total={this.state.total} onShowSizeChange={this.handlePage} />
        </div>
    }
}
Requirement = Form.create()(Requirement);
export default injectIntl(Requirement);