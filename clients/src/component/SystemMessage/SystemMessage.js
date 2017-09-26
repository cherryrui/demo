/**
 * Created by hp on 2017/9/7.
 */
/**
 * Created by hp on 2017/9/7.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './SystemMessage.scss';
import basecss from '../Mine/Mine.scss';
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

class SystemMessage extends React.Component {
    static propTypes = {
        intl: intlShape.isRequired
    };
    jump = (e) => {
        this.props.history.pushState(null, "page/mine/message");

    }
    constructor(props) {
        super(props);
        this.state = {
            system: {
                message: "gbfg bfg g",
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
                     <p  className={css.title_left}>
                         <FormattedMessage
                             id="mine.message.system" defaultMessage="系统信息"/>
                     </p>
                     <a href="" onClick={this.jump} className={css.title_right}>
                         <FormattedMessage
                             id="mine.message.consult" defaultMessage="疑难解答"/>
                     </a>

                 </div>
                 <div className={css.consulting_content}>
                     <div className={css.consulting_list}>
                         <div className={css.item_question}>
                             <p className={css.icon}> ●</p>
                             <p className={css.text}>【{formatMessage({id: 'mine.message.system'})}】</p>
                             <p className={css.spacing}></p>
                             <p className={css.date}>
                                 <span className={css.year}>{this.state.system.time}</span>
                                 <span>{this.state.system.mini}</span>
                             </p>
                         </div>
                         <div className={css.item_answer}>
                             <p className={css.text}>{this.state.system.message}</p>
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

export default injectIntl(SystemMessage);