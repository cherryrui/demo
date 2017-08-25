/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import css from './Product.scss';
import {
    FormattedMessage
} from 'react-intl';
import {
    Link
} from 'react-router';
import {
    Card,
    Icon
} from 'antd';

class Product extends React.Component {

    static propTypes = {
        product: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleStar = () => {
        this.props.handleStar ? this.props.handleStar() : "";
    }

    render() {
        return <Card className={`${css.product} ${this.props.className}`}bodyStyle={{ padding: 0 }}>
            <Link to={"/product-detail/"+this.props.product.id}>
            <div className={css.custom_image}>
                <img alt="example" width="100%" src={this.props.product.img}/>
            </div>
            <p className={css.name}>{this.props.product.name}</p>
            <p className={css.item}>
                <span>
                {this.props.product.price}$
                </span>
                <Icon type="line-chart" />
            </p>
        {
            this.props.addCart ? <div className={css.footer}>
                <p className={this.props.product.star?css.icon_active:css.icon} onClick={this.handleStar}><Icon type="star" /></p>
                <p className={css.add_cart}><Icon type="shopping-cart" />&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormattedMessage id="product.detail.add" defaultMessage="加入购物车"/>
                </p>
            </div>:""}
            </Link>
        </Card>
    }
}
export default Product;