/**
 * Created by WF on 2017/9/8.
 */
import React from 'react';
import css from './Brand.scss';
import appcss from '../../../App.scss';
import {
    Link
} from 'react-router';
import {
    FormattedMessage
} from 'react-intl';
import {
    Card,
    Rate
} from 'antd';


class Brand extends React.Component {


    render() {
        return <Card className={this.props.className} style={this.props.style} bordered={false} bodyStyle={{ padding: 0 }}>
            <Link to={"main/brand-detail/"+this.props.brand.id}>
                <div>
                    <span className={`${appcss.custom_icon} ${this.props.brand.rz?css.icon_rz_active:css.icon_rz}`}/>
                    <span className={`${appcss.custom_icon} ${this.props.brand.hz?css.icon_hz_active:css.icon_hz}`}/>
                </div>
                <div className={css.custom_image}>
                    <img alt="example" width="100%" src={this.props.brand.img} />
                </div>
                <p className={css.name}>{this.props.brand.name}</p>
                {this.props.showStar?<p className={css.foot}>
                    <FormattedMessage id="brand.product.rate" defaultMessage="评分"/>
                    <Rate className={css.rating} allowHalf defaultValue={this.props.brand.rating} disabled />
                    <span>{this.props.brand.rating}</span>
                </p>:""}
            </Link>
        </Card>
    }
}
export default Brand;