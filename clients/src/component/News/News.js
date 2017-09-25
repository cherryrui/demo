import React from 'react';
import css from './News.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import {
	FormattedMessage
} from 'react-intl';

class News extends React.Component {


	render() {

		return <div className={appcss.body}>
			公司近况
		</div>
	}
}

export default News;