import React from 'react';
import css from './Requirement.scss';
import appcss from '../../App.scss';
import basecss from '../Mine/Mine.scss';
import axios from 'axios';
import {
	FormattedMessage
} from 'react-intl';

class Requirement extends React.Component {


	render() {

		return <div className={basecss.child_title}>
			需求列表
		</div>
	}
}

export default Requirement;