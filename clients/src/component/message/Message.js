/**
 * Created by hp on 2017/9/7.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './Message.scss';
import axios from 'axios';
import {
    Icon,
    Pagination
} from 'antd';

import {
    Link
} from 'react-router';
import {
    FormattedMessage,
    injectIntl,
    intlShape
} from 'react-intl';

function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}
class Message extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    jump = (e) => {
        this.props.history.pushState(null, "/page/mine/system-message");
    }
    constructor(props) {
        super(props);
        this.state = {
            message: {
                quotation: "aaaaaaaaaaaaaaaa啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊DVD 啊啊啊啊啊啊啊啊啊啊啊啊啊啊DVD               ",
                answer: "ffffffffffffffffffff",
                time: "2017-06-04",
                mini: "16:00"
            }
        };

    }
    render() {
        let {
            intl: {
                formatMessage
            }
        } = this.props;
        return <div className={css.my_consulting} >
                    <div className={css.title}>
                        <p className={css.title_left}>
                            <FormattedMessage
                                id="mine.message.consult" defaultMessage=""/>
                        </p>
                        <a  onClick={this.jump} className={css.title_right}>
                            <FormattedMessage
                                id="mine.message.system" defaultMessage=""/>
                        </a>

                    </div>
                    <div className={css.consulting_content}>

                        <div className={css.one}>
                            <div className={css.item}>
                                <p className={css.icon}>
                                    <Icon type="question-circle" />
                                </p>
                                <p className={css.content}>{this.state.message.quotation}</p>
                                <p className={css.time}>
                                    {this.state.message.time}&nbsp;&nbsp;
                                     {this.state.message.mini}
                                </p>
                            </div>
                            <div className={css.item}>
                                <p className={css.icon_a}>A</p>
                                <p className={css.content}> {this.state.message.answer}</p>
                                <p className={css.time}>
                                     {this.state.message.time}&nbsp;&nbsp;
                                     {this.state.message.mini}
                                </p>
                            </div>
                        </div>



                    </div>
            <div className={css.message_Pagination}>
                <div className={css.empty_message}>
                    <p>{formatMessage({id: 'systemmessage.empty.message'})}</p>
                </div>
                <div className={css.Pagination}>
                    <Pagination showSizeChanger onShowSizeChange={onShowSizeChange}
                        defaultCurrent={3} total={500} />
                </div>
            </div>


        </div>


    }



}
export default injectIntl(Message);