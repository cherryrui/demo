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
    Icon,
    Checkbox
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
    onChange = () => {
        this.props.onCheck ? this.props.onCheck(this.props.product.id) : "";
    }

    render() {
        return <Card className={`${css.product} ${this.props.className}`}bodyStyle={{ padding: 0 }}>
            {this.props.check?<Checkbox checked={this.props.product.checked?true:false}onChange={this.onChange}></Checkbox>:""}
            <Link to={"main/product-detail/"+this.props.product.id}>
                <div className={css.custom_image}>
                    <img alt="example" width="100%" src={this.props.product.coverUrl+"@320w_320h_1e_1c.png"}/>
                </div>
            </Link>
            <p className={css.name}>{this.props.product.productName}</p>
            {this.props.no_price?"":<p className={css.item}>
                <span>
                {this.props.product.price}$
                </span>
                <Icon className={this.props.product.lastPrice-this.props.product.price>0?css.price_down:css.price_up} type="line-chart" />
            </p>}
            {this.props.addCart ? <div className={css.footer}>
                <p className={this.props.product.star?css.icon_active:css.icon} onClick={this.handleStar}><Icon type="star" /></p>
                <p className={css.add_cart}>
                    <Link to={"/main/product/"+this.props.product.productId}>
                        <Icon type="shopping-cart" />&nbsp;&nbsp;&nbsp;&nbsp;
                        <FormattedMessage id="product.detail.see" defaultMessage="加入购物车"/>
                    </Link>
                </p>
            </div>:""}
        </Card>
    }
}
export default Product;