/**
 * Created by WF on 2017/9/5.
 */
import React from 'react';
import axios from 'axios';
import appcss from '../../App.scss';
import css from './OrderList.scss';
class OrderList extends React.Component{

    render(){
        return<div className={css.orderlist}>
            <div className={css.title}>
                <p className={css.title_left}>System Message</p>
                <p className={css.title_right}>My consulting</p>

            </div>
        </div>
    }
}
export default OrderList;
