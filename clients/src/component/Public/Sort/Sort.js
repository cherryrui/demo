/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import css from './Sort.scss';
import {
    Icon
} from 'antd';
import {
    FormattedMessage,
} from 'react-intl';

class Sort extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: this.props.sort ? this.props.sort : 0,
        }
    }
    handleClick=()=> {
        let sort = this.state.sort;
        if(sort == 0||sort=='asc'){
            sort = "desc";
        } else{
            sort = "asc";
        }
        this.setState({
            sort: sort
        });
        console.log(31,sort);
        this.props.handleSort ? this.props.handleSort(sort) : "";
    }

    render() {
        return <div
            className={`${css.sort} ${this.props.className}`}
            style={this.props.style}

        >
            <div className={css.title} onClick={this.handleClick}>
                <FormattedMessage id={this.props.id} defaultMessage={this.props.default}/>
            </div>
            <div className={css.icon} onClick={this.handleClick}>
                <Icon className={this.state.sort==="asc" && this.props.is_select?`${css.active}`:""}  type="caret-up" />
                <Icon className={this.state.sort==="desc" && this.props.is_select?`${css.active}`:""}  type="caret-down" />
            </div>
        </div>
    }
}
export default Sort;