/**
 * Created by WF on 2017/8/21.
 */
import React from 'react';
import css from './ShoppingCart.scss';
import {
    FormattedMessage
} from 'react-intl';

import {
    Button,
    Table
} from 'antd';

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.columns = [{
            title: '产品信息',
            dataIndex: 'name'
        }, {
            title: '价格',
            dataIndex: 'price'
        }, {
            title: '数量',
            dataIndex: 'num'
        }, {
            title: '总价',
            dataIndex: 'total'
        }, {
            title: '操作',
            render: (record) => <div><Button>删除</Button></div>
        }, ]
    }

    componentWillMount() {
        let data = []
        for (let i = 0; i < 46; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                price: 32,
                num: 2,
                total: 64
            });
        }
        this.setState({
            data: data
        });

    }

    handleChange = (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
    }
    drawFooter = () => {
        return <div>this is footer</div>
    }
    render() {
        let rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
        };

        return <div>
            <div>
                <FormattedMessage id="shopping.cart" defaultMessage="购物车"/>
            </div>
            <div>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    dataSource={this.state.data}
                    footer={this.drawFooter}
                    
                >
                    <div>dasd</div>
                </Table>
            </div>

        </div>
    }
}
export default ShoppingCart;