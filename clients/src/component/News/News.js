import React from 'react';
import css from './News.scss';
import appcss from '../../App.scss';
import axios from 'axios';
import TextEditor from '../Public/TextEditor/TextEditor.js';
import {
	FormattedMessage
} from 'react-intl';
import {
	Button
} from 'antd';

class News extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "<p>欢迎光临</p>"
		}
	}

	save = () => {
		/*console.log(UE.getEditor('content').getContent())*/

		this.setState({
			content: "<p>欢迎再次光临</p>"
		})
	}

	render() {

		return <div className={appcss.body}>
			公司近况
			<TextEditor  id="content" content={this.state.content} height="200" />
			<div>
				<Button onClick={this.save}>保存</Button>
			</div>
		</div>
	}
}

export default News;