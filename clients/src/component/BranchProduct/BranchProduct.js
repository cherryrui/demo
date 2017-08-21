/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './BranchProduct.scss';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {Breadcrumb,Tabs,Button,Pagination,Icon,Card,Rate  } from 'antd';

import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';
const TabPane = Tabs.TabPane;

class BranchProduct extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            category: [
                {id:1,name:"Tools",rating:4.5},
                {id:2,name:"Building Materials",rating:4.5},
                {id:3,name:"Machinery",rating:4.5},
                {id:4,name:"Mechanical components",rating:4.5},
                {id:5,name:"Labor protection",rating:4.5},
                {id:6,name:"Torque tools",rating:4.5},
                {id:7,name:"dsadasdsa",rating:4.5},
                {id:8,name:"dsadasdsa",rating:4.5},
            ],
            search: "Branch",
            category_id: 1,
            subcategory_id: 2,
            total: 50
        }
    }

    onShowSizeChange=(current, pageSize)=>{
        console.log(current, pageSize);
    }
    handleSort(name,key){
        console.log(name,key);
    }

    render(){
        return<div>
            <div className={appcss.navigate}>
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
            <SingleSelect
                more
                title={<FormattedMessage id="app.category" defaultMessage="所有分类"/>}
            />
            <SingleSelect
                title={<FormattedMessage id="app.category" defaultMessage="子分类"/> }
            />

            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.item}>Comprehensive</p>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Rating"/>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Sale"/>
                </div>
                <div className={css.right}>
                    <FormattedMessage id="branch.product.sum" defaultMessage="共{total}商品"
                        values={{total:this.state.total}}
                    />
                    <Pagination size="small" simple total={50} showTotal={this.showTotal} />
                </div>
            </div>
            <div className={css.branch}>
            {this.state.category.map(item=>{
                return <Branch branch={item} className={css.item}/>
            })}
            </div>
            <div className={css.footer}>
                <Pagination showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />
            </div>
        </div>
    }
}
class Branch extends React.Component{


    render() {
        console.log(this.props.branch)
        return <Card className={this.props.className} style={this.props.style} bodyStyle={{ padding: 0 }}>
            <div><Icon type="lock" /><Icon type="lock" /></div>
            <div className="custom-image">
                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <p className={css.name}>{this.props.branch.name}</p>
            <p className={css.foot}>
                <FormattedMessage id="branch.product.rate" defaultMessage="评分"/>
                <Rate className={css.rating} allowHalf defaultValue={this.props.branch.rating} disabled />
                <span>{this.props.branch.rating}</span>
            </p>
        </Card>
    }
}
export default BranchProduct;