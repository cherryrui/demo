/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import css from './Sort.scss';
import {
    Icon
} from 'antd';
class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: this.props.sort ? this.props.sort : 0,
        }
    }
    handleClick(sort) {
        this.setState({
            sort: sort
        });
        this.props.handleSort ? this.props.handleSort(sort) : "";
    }

    render() {
        return <div
            className={`${css.sort} ${this.props.className}`}
            style={this.props.style}
        >
            <div className={css.title}>{this.props.value}</div>
            <div className={css.icon}>
                <Icon className={this.state.sort==="asc"?`${css.active}`:""} onClick={this.handleClick.bind(this,"asc")} type="caret-up" />
                <Icon className={this.state.sort==="desc"?`${css.active}`:""} onClick={this.handleClick.bind(this,"desc")} type="caret-down" />
            </div>

        </div>
    }
}
export default Sort;