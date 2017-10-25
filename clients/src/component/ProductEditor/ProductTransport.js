import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';

class ProductTransport extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.formatMessage = this.props.intl.formatMessage;
	}

	render() {
		return <div>
			<div>
				<FormattedMessage id="mine.product.transport" defaultMessage="运输要求"/>
			</div>
			<div className={css.product_footer}>
				<Button type="primary">
					<FormattedMessage id="app.before" defaultMessage=""/>
				</Button>
				<Button type="primary" onClick={this.handleSave} className={appcss.button_black}>
					<FormattedMessage id="app.save" defaultMessage=""/>
				</Button>
			</div>
		</div>
	}


}
ProductTransport = injectIntl(ProductTransport);
export default ProductTransport;