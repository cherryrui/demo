/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import css from './SingleSelect.scss';
import axios from 'axios';
import {
    FormattedMessage
} from 'react-intl';
import {
    Button,
    Icon
} from 'antd';

class SingleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            more: true,
            showIndex: 0,
            showMore: true,
        }
        this.length = 0;
    }
    componentDidMount() {
        this.length = this.props.data.length;
        this.getShowIndex();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data.length != nextProps.data.length) {
            this.state.showIndex = 0;
        }
    }
    componentDidUpdate() {
        if (this.length != this.props.data.length) {
            this.length = this.props.data.length;
            this.getShowIndex();
        }
    }

    getShowIndex() {
        let clientWidth = this.refs.middle.clientWidth;
        let width = 0,
            showIndex = 0;
        if (this.props.all) {
            width += this.refs.item.clientWidth;
        }
        this.props.data.map((item, index) => {
            let name = "item_" + index;
            /*console.log(this.refs[name]);*/
            width += this.refs[name].clientWidth;
            if (width > clientWidth && showIndex == 0) {
                showIndex = index;
            }
        })
        if (showIndex == 0) {
            showIndex = this.props.data.length;
        }
        this.setState({
            showIndex: showIndex,
        })
    }
    handleClick = () => {
        if (this.refs.middle.style.flexWrap === "wrap") {
            this.refs.middle.style.flexWrap = "nowrap";
            this.setState({
                showMore: true,
            })
        } else {
            this.refs.middle.style.flexWrap = "wrap";
            this.setState({
                showMore: false,
            })
        }
    }
    handleSelect(key) {
        this.props.onSelect ? this.props.onSelect(key) : "";
    }

    render() {
        let current = this.props.current ? this.props.current : 0;
        return <div className={css.body}>
            <div className={css.left}>
                <p>
                    {this.props.title}
                </p>
            </div>
            <div ref="middle" className={css.middle}>
                {this.props.all?<div className={css.single} ref="item"
                        onClick={this.handleSelect.bind(this,0)}>
                        {this.props.showImg?<p className={current==0?css.active_img:css.item_img}>
                            <img style={{width:"32px",height:"32px",margin: "17px"}} src="../img/DYC-22.png"/>
                        </p>
                        :<p className={current==0?css.active:css.item}>
                            <FormattedMessage id="app.all" defaultMessage="所有"/>
                        </p>}
                    </div>:""}
                {this.props.data.map((item,index)=>{
                    let ref= "item_"+index;
                    return (!this.state.showMore||this.state.showIndex>index||this.state.showIndex==0)?<div className={css.single} ref={ref}
                        onClick={this.handleSelect.bind(this,item[this.props.key_id])}
                    >
                    {this.props.showImg?<img src={item[this.props.key_name]} className={current==item[this.props.key_id]?css.active_img:css.item_img}/>
                        :<p className={current==item[this.props.key_id]?css.active:css.item}>
                        {item[this.props.key_name]}</p>}
                    </div>:""
                })}
            </div> 
            {this.state.showIndex<this.props.data.length ?
                <Button type="primary" ghost size="small" className={css.right} onClick={this.handleClick}>
                    <FormattedMessage id="app.more" defaultMessage="更多"/>
                    {this.state.showMore?<Icon type="down"/>:<Icon type="up" />}
                </Button> : ""
            } 
        </div>
    }
}
export default SingleSelect;