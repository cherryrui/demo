/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import css from './CategoryList.scss';
import {Link} from 'react-router';
import {Breadcrumb } from 'antd'
import {FormattedMessage} from 'react-intl';
class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search: "Tools",
            category: [
                {id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                },{id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                },{id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                },{id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                },{id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                },{id:1,name:"dasTool",img:"../img/1.jpg",
                    items:[
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                        {id:1,name:"dasdasdas"},
                    ]
                }
            ]
        }
    }

    render(){
        console.log("category");
        return <div>
            <div className={css.navigate}>
                <Breadcrumb separator=">>">
                    <Breadcrumb.Item >
                        <Link to="/">
                            <FormattedMessage id="app.allcategroy" defaultMessage="分类"/>
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
                    <div style={{background:item.img}}>{item.name}</div>
                    {item.items.map(cate=>{
                        return <p><Link>{cate.name}</Link></p>
                    })}
                </div>
            })}
            </div>

        </div>
    }
}
export default CategoryList;