/**
 * 使用例子
 *
 * < Modal visible = {true}
        width = {
            this.state.width
        }
        title = { < ModalHeader width = {
             this.state.width
        } * setWidth = {
        this.handleState
        }
        title = "模态框标题" / >
 }
 />
 * props: width 模态框默认宽度 setWidth 设置模态框宽度(改变state)
 */
import React from 'react';

import css from './ModalHeader.scss';

import {
    Icon
} from 'antd';

class ModalHeader extends React.Component {
    constructor(props) {
        super(props);
        this.width = props.width;
    }
    setWidth = () => {
        if (this.props.width == '100%') {
            this.props.setWidth(this.width);
        } else {
            this.props.setWidth('100%')
        }
    };
    export = () => {
        this.props.export ? this.props.export() : "";
    }
    render() {
        return <div>
            <div className={css.title}>
                {this.props.title}
                <p>
                    <Icon className={css.icon} type="download" onClick={this.export}/>
                    <Icon className={css.icon} onClick={this.setWidth} type="scan" /> 
                </p>
            </div>
        </div>;
    }
}
export default ModalHeader;