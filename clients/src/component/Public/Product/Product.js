/**
 * Created by WF on 2017/8/17.
 */
import React from 'react';
import css from './Product.scss';

import {FormattedMessage} from 'react-intl';

class Product extends React.Component{

    static propTypes={
        product: React.PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return <Card style={{ width: this.props.width }} bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
                <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </div>
            <p>{this.props.product.name}</p>
            <p>
                <span>{this.props.product.price}</span>
                <Icon type="line-chart" />
            </p>
            <div>
                <p><Icon type={true?"star-o":"star"} /></p>
                <p><Icon type="shopping-cart" />
                    <FormattedMessage id="product.addtocart" defaultMessage="加入购物车"/>
                </p>
            </div>
        </Card>
    }
}
export default Product;