import React from 'react';
import css from './TextEditor.scss';
import ReactQuill from 'react-quill';
import operator from './operator.js';
import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';

class TextEditor extends React.Component {
	static propTypes = {
		intl: intlShape.isRequired,

	}
	constructor(props) {
		super(props)
		this.state = {
			editorHtml: ''
		}
		this.modules = {
			toolbar: [
				[{
					'header': '1'
				}, {
					'header': '2'
				}, {
					'font': []
				}],
				[{
					size: []
				}],
				[{
					color: operator.color
				}, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{
					'list': 'ordered'
				}, {
					'list': 'bullet'
				}, {
					'indent': '-1'
				}, {
					'indent': '+1'
				}],

				['link', 'image', 'video'],
				['clean']
			]
		};
		this.formats = [
			'header', 'font', 'size',
			"color", 'bold', 'italic', 'underline', 'strike', 'blockquote',
			'list', 'bullet', 'indent',
			'link', 'image',
		]
	}
	componentWillReceiveProps(nextProps) {
		//console.log(nextProps);
		this.setState({
			editorHtml: nextProps.value
		})
	}

	handleChange = (html) => {
		this.setState({
			editorHtml: html
		});
		this.props.onChange ? this.props.onChange(html) : "";
	}

	render() {
		const {
			intl: {
				formatMessage
			}
		} = this.props;
		return (
			<div className={this.props.className} style={this.props.style}>
		        <ReactQuill 
		          onChange={this.handleChange}
		          value={this.state.editorHtml}
		          modules={this.modules}
		          formats={this.formats}
		          bounds={'.app'}
		          placeholder={this.props.placeholder?this.props.placeholder:formatMessage({id: 'mine.product.name'})}
		         />
       </div>
		)
	}
}
export default injectIntl(TextEditor);