/**
 * Created by hp on 2017/9/7.
 */
/**
 * Created by hp on 2017/9/7.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './SystemMessage.scss';
import axios from 'axios';
import {Icon,Pagination} from 'antd';


function onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
}

class SystemMessage extends React.Component{
 render(){

     return<div className={css.my_consulting} >
         <div className={css.title}>
             <p className={css.title_left}>System Message</p>
             <p className={css.title_right}>My consulting</p>

         </div>
         <div className={css.consulting_content}>
             <div className={css.consulting_list}>
                 <div className={css.item_question}>
                     <p className={css.icon}> ●</p>
                     <p className={css.text}>【System Message】</p>
                     <p className={css.spacing}></p>
                     <p className={css.date}> <span className={css.year}>2017-07-08</span><span>18:00</span></p>
                 </div>
                 <div className={css.item_answer}>
                     <p className={css.text}>Dongfeng Motor Corporation (hereafter referred to as D</p>

                 </div>

             </div>

             <div className={css.consulting_list}>
                 <div className={css.item_question}>
                     <p className={css.icon}> ●</p>
                     <p className={css.text}>【System Message】</p>
                     <p className={css.spacing}></p>
                     <p className={css.date}> <span className={css.year}>2017-07-08</span><span>18:00</span></p>
                 </div>
                 <div className={css.item_answer}>
                     <p className={css.text}>Dongfeng Motor Corporation (hereafter referred to as D</p>

                 </div>

             </div>

         </div>
         <div className={css.message_Pagination}>
             <div className={css.empty_message}><p>Empty message</p></div>
             <div className={css.Pagination}> <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} /></div>


         </div>


     </div>
 }

}

export default SystemMessage;