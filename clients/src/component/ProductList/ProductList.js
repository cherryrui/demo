/**
 * Created by WF on 2017/8/18.
 */
import React from 'react';
import appcss from '../../App.scss';
import css from './ProductList.scss';
import {Link} from 'react-router';
import {FormattedMessage} from 'react-intl';
import {Breadcrumb,Tabs,Button,Pagination,Icon,Card,Rate  } from 'antd';

import SingleSelect from '../Public/SingleSelect/SingleSelect.js';
import Sort from '../Public/Sort/Sort.js';

class ProductList extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }
    handleSort(name,key){
        console.log(name,key);
    }
    render(){
        return <div>
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
                showImg
                title={<FormattedMessage id="app.allcategroy" defaultMessage="所有分类"/>}
            />
            <SingleSelect title={<FormattedMessage id="app.allcategroy" defaultMessage="所有分类"/>}
            />
            <div className={css.header}>
                <div className={css.left}>
                    <p className={css.item}>Comprehensive</p>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Rating"/>
                    <Sort className={css.item} handleSort={this.handleSort.bind(this,"rating")} value="Sale"/>
                </div>
                <div>
                    <Pagination size="small" total={50} simple showTotal={this.showTotal} />
                </div>
            </div>
        </div>
    }
}
export default ProductList;