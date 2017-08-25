/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import css from './CategoryList.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import {
    Link
} from 'react-router';
import {
    Breadcrumb
} from 'antd'
import {
    FormattedMessage
} from 'react-intl';
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "Tools",
            category: [{
                id: 1,
                name: "dasTool",
                img: "../img/cate_1.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }, {
                id: 1,
                name: "dasTool",
                img: "../img/cate_2.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }, {
                id: 1,
                name: "dasTool",
                img: "../img/cate_3.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }, {
                id: 1,
                name: "dasTool",
                img: "../img/cate_4.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }, {
                id: 1,
                name: "dasTool",
                img: "../img/cate_5.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }, {
                id: 1,
                name: "dasTool",
                img: "../img/cate_6.jpg",
                items: [{
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, {
                    id: 1,
                    name: "dasdasdas"
                }, ]
            }]
        }
    }
    componentWillMount() {
        this.getCategory();
    }
    componentDidMount() {
            this.refs.category_list.scrollIntoView(true);
        }
        /**
         * 根据一级分类id，查找其所有的子分类
         * @return {[type]} [description]
         */
    getCategory = () => {
        axios.get("").then(res => {

        })
    }

    render() {
        return <div ref="category_list" className={appcss.body}>
            <div className={css.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="/">
                            <FormattedMessage id="app.home" defaultMessage="分类"/>
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <FormattedMessage id="category.list.search" defaultMessage={this.state.search}
                            values={{search:this.state.search}}
                        />
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={css.category}>
            {this.state.category.map(item=>{
                console.log(item.img);
                return <div className={css.category_item}>
                    <div className={css.title} style={{background:`url(${item.img})`}}>{item.name}</div>
                    {item.items.map(cate=>{
                        return <p className={css.item}><Link to={"/product-list/"+item.id}>{cate.name}</Link></p>
                    })}
                </div>
            })}
            </div>

        </div>
    }
}
export default CategoryList;