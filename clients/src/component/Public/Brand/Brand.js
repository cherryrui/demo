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
    Rate,
    Checkbox
} from 'antd';


class Brand extends React.Component {

    onChange = () => {
        this.props.onCheck ? this.props.onCheck(this.props.brand) : "";
    }

    render() {
        return <Card className={this.props.className} style={this.props.style} bordered={false} bodyStyle={{padding: "0"}}>
            <div className={css.icon}>
                <p className={css.left_icon}>
                    <i class="iconfont icon-DYC-1"></i>
                    <i class="iconfont icon-DYC-"></i>
                </p>
                {this.props.check ? <Checkbox checked={this.props.brand.checked ? true : false} onChange={this.onChange}>
                </Checkbox> : ""}
            </div>
            <Link to={"page/brand-detail/" + this.props.brand.sid}>
                <div className={css.custom_image}>
                    <img alt="example" src={this.props.brand.imgUrl?this.props.brand.imgUrl+"@150w_150h_1e_1c.png":"../img/no_picture.jpg"} />
                </div>

                <p className={css.name}>{this.props.brand.supplierName}</p>
                {this.props.showStar ? <p className={css.foot}>
                    <FormattedMessage id="brand.product.rate" defaultMessage="评分"/>:
                    <Rate className={css.rating} allowHalf defaultValue={this.props.brand.level} disabled />
                    <span>{this.props.brand.level}</span>
                </p> : ""}
            </Link>
        </Card>
    }
}
export default Brand;