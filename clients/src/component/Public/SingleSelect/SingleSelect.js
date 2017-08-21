/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import css from './SingleSelect.scss';
import {FormattedMessage} from 'react-intl';
import {Button,Icon} from 'antd';

class SingleSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            category: [
                {id:1,img:"../img/1.jpg",name:"Tools",rating:4.5},
                {id:2,img:"../img/1.jpg",name:"Building Materials",rating:4.5},
                {id:3,img:"../img/1.jpg",name:"Machinery",rating:4.5},
                {id:4,img:"../img/1.jpg",name:"Mechanical components",rating:4.5},
                {id:5,img:"../img/1.jpg",name:"Labor protection",rating:4.5},
                {id:6,img:"../img/1.jpg",name:"Torque tools",rating:4.5},
                {id:7,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:8,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:9,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:10,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:11,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:12,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:13,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:14,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:15,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:16,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
                {id:17,img:"../img/1.jpg",name:"dsadasdsa",rating:4.5},
            ],
            select_id: 1,
            subcategory_id: 2,
            more: this.props.more?this.props.more:false
        }
    }
    handleClick=()=>{
        if(this.refs.middle.style.flexWrap === "wrap"){
            this.refs.middle.style.flexWrap = "nowrap";
        }else {
            this.refs.middle.style.flexWrap = "wrap"
        }
    }
    handleSelect(item){
        this.setState({select_id: item.id});
        this.props.onSelect?this.props.onSelect(item):"";
    }

    render(){
        return <div className={css.body}>
            <div className={css.left}>
                <p>
                {this.props.title}
                </p>
            </div>
            <div ref="middle" className={css.middle}>
                {this.state.category.map(item=>{
                    return <div className={css.single}
                        onClick={this.handleSelect.bind(this,item)}
                    >
                    {this.props.showImg?<img src={item.img} className={this.state.select_id==item.id?css.active_img:css.item_img}/>
                        :<p className={this.state.select_id==item.id?css.active:css.item}>{item.name}</p>}
                    </div>
                })}
            </div>
            {this.state.more?
            <Button className={css.right} onClick={this.handleClick}>
                <FormattedMessage id="app.more" defaultMessage="更多"/>
                <Icon type="down"/>
            </Button>:""}
        </div>
    }
}
export default SingleSelect;