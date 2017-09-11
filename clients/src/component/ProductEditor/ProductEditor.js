import React from 'react';
import css from './ProductEditor.scss';
import appcss from '../../App.scss';
import operator from './operator.js';
import {
	FormattedMessage
} from 'react-intl';
import Steps from '../Public/Steps/Steps.js';

class ProductEditor extends React.Component {


	render() {

		return <div className={appcss.body}>
			ProductEditor
			<Steps steps={operator.steps}/>
				
			
		</div>
	}

}
export default ProductEditor;