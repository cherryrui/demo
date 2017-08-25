/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import css from './SingleSelect.scss';
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
            category: [{
                id: 1,
                img: "../img/br_bg_1.jpg",
                name: "Tools",
                rating: 4.5
            }, {
                id: 2,
                img: "../img/br_bg_1.jpg",
                name: "Building Materials",
                rating: 4.5
            }, {
                id: 3,
                img: "../img/br_bg_1.jpg",
                name: "Machinery",
                rating: 4.5
            }, {
                id: 4,
                img: "../img/br_bg_1.jpg",
                name: "Mechanical components",
                rating: 4.5
            }, {
                id: 5,
                img: "../img/br_bg_1.jpg",
                name: "Labor protection",
                rating: 4.5
            }, {
                id: 6,
                img: "../img/br_bg_1.jpg",
                name: "Torque tools",
                rating: 4.5
            }, {
                id: 7,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 8,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 9,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 10,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 11,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 12,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 13,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 14,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 15,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 16,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, {
                id: 17,
                img: "../img/br_bg_1.jpg",
                name: "dsadasdsa",
                rating: 4.5
            }, ],
            select_id: 1,
            subcategory_id: 2,
            more: this.props.more ? this.props.more : false,
            showIndex: 0,
            showMore: true,

        }
    }
    componentDidMount() {
        this.getShowIndex();
    }
    getShowIndex() {
        let clientWidth = this.refs.middle.clientWidth;
        let width = 0,
            showIndex = 0;
        this.state.category.map((item, index) => {
            let name = "item_" + index;
            width += this.refs[name].clientWidth;
            if (width > clientWidth && showIndex == 0) {
                showIndex = index;
            }
        })
        if (showIndex == 0) {
            showIndex = this.state.category.length - 1;
        }
        this.setState({
            showIndex: showIndex,
            showMore: false,
        })
    }
    handleClick = () => {
        if (this.refs.middle.style.flexWrap === "wrap") {
            this.refs.middle.style.flexWrap = "nowrap";
            this.setState({
                showMore: false,
            })
        } else {
            this.refs.middle.style.flexWrap = "wrap";
            this.setState({
                showMore: true,
            })
        }
    }
    handleSelect(item) {
        this.setState({
            select_id: item.id
        });
        this.props.onSelect ? this.props.onSelect(item) : "";
    }

    render() {
        let widths = 0;
        return <div className={css.body}>
            <div className={css.left}>
                <p>
                    {this.props.title}
                </p>
            </div>
            <div ref="middle" className={css.middle}>
                {this.state.category.map((item,index)=>{
                    let ref= "item_"+index;
                    return this.state.showMore||(this.state.showIndex>index)?<div className={css.single} ref={ref}
                        onClick={this.handleSelect.bind(this,item)}
                    >
                    {this.props.showImg?<img src={item.img} className={this.state.select_id==item.id?css.active_img:css.item_img}/>
                        :<p className={this.state.select_id==item.id?css.active:css.item}>{item.name}</p>}
                    </div>:""
                })}
            </div> {
            this.state.more ?
                <Button className={css.right} onClick={this.handleClick}>
                <FormattedMessage id="app.more" defaultMessage="更多"/>
                <Icon type="down"/>
            </Button> : ""
        } </div>
    }
}
export default SingleSelect;