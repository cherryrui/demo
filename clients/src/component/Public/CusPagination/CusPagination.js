import React from 'react';
import appcss from '../../../App.scss';
import css from './CusPagination.scss';
import operator from './operator.js';
import {
    Pagination
} from 'antd';

class CusPagination extends React.Component {
    constructor(props) {
        super(props);
        this.options = props.pageSizeOptions ? props.pageSizeOptions : operator.pageSizeOptions;
    }
    onShowSizeChange = (current, pageSize) => {
        this.props.onShowSizeChange ? this.props.onShowSizeChange(current, pageSize) : "";
    }
    handleChange = (page, pageSize) => {
        this.props.onChange ? this.props.onChange(page, pageSize) : "";
    }

    render() {
        return <div className={this.props.className?`${this.props.className} ${css.footer}`:css.footer}>
                    <Pagination 
                        showSizeChanger 
                        defaultCurrent={1} 
                        total={this.props.total}
                        onShowSizeChange={this.onShowSizeChange}
                        onChange={this.handleChange} 
                        defaultPageSize={Number(this.options[0])}
                        pageSizeOptions={this.options}
                        />
                </div>
    }
}
export default CusPagination;