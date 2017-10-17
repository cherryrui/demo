import React from 'react';
import css from './ProductItem.scss';
import {
    Link
} from 'react-router';
import {
    FormattedMessage,
} from 'react-intl';

class ProductItem extends React.Component {
    render() {
        return <div className={this.props.className}>
			<Link to={"page/product-detail/"+this.props.product.productId} className={css.table_product}>
                <img src={this.props.product.coverUrl?this.props.product.coverUrl+"@100w_100h_1e_1c.png":"../img/no_product.jpg"}/>
                <div className={css.info}>
                    <p className={css.name}>{this.props.product.productName}</p>
                    <p>
                        <FormattedMessage id="app.brand" defaultMessage="我的购物车"/>：
                        {locale=="en"?this.props.product.brandNameEn:this.props.product.brandNameCn}
                    </p>
                    {this.props.hiddenMoq?"":<p>
                        <FormattedMessage id="product.detail.MOQ" defaultMessage="我的购物车"/>
                        ：{this.props.product.moq}
                    </p>}
                    <p>
                        <FormattedMessage id="mine.product.No" defaultMessage="我的购物车"/>
                        ：{this.props.product.productNo}</p>
                </div>
            </Link>
		</div>
    }
}

export default ProductItem;