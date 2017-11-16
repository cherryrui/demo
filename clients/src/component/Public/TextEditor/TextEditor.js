import React from 'react';
import css from './TextEditor.scss';

import {
	FormattedMessage,
	injectIntl,
	intlShape
} from 'react-intl';

class TextEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.initEditor()
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		UE.getEditor('content').setContent(nextProps.content);
	}
	componentWillUnmount() {
		// 组件卸载后，清除放入库的id
		UE.delEditor(this.props.id);
	}
	initEditor() {
		const id = this.props.id;
		const ueEditor = UE.getEditor(this.props.id, {
			toolbars: [
				[
					'fullscreen', 'source', '|', 'undo', 'redo', '|',
					'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
					'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
					'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
					'directionalityltr', 'directionalityrtl', 'indent', '|',
					'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
					'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
					'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'pagebreak', 'template', 'background', '|',
					'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
					'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
					'searchreplace', 'drafts', 'help'
				]
			],
			initialContent: this.props.content,
			zIndex: 0,
		});
		const self = this;
		ueEditor.ready((ueditor) => {
			if (!ueditor) {
				UE.delEditor(id);
				self.initEditor();
			}
		})
	}
	render() {
		return (
			<div className={this.props.className} style={this.props.style} id={this.props.id} name="content" type="text/plain"></div>
		)
	}
}
export default injectIntl(TextEditor);