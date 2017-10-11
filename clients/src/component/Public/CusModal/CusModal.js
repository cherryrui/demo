import axios from 'axios';
import React from 'react';
import css from './CusModal.scss';
import appcss from '../../../App.scss';
import {
	FormattedMessage,
} from 'react-intl';
import {
	Icon,
	message
} from 'antd';

class CusModal extends React.Component {

	constructor(props) {
		super(props);
	}
	handleCancel = () => {
		this.props.closeModal ? this.props.closeModal() : ""
	}

	render() {
		return <div className={css.login_modal} ref="modal" style={{display:this.props.visible?"block":"none"}}>
			<div className={css.content} style={{width:this.props.width?this.props.width:"400px"}}>
				<p className={css.modal_title} onClick={this.handleCancel}>
				<span className={css.title}>{this.props.title}</span>
				<Icon type="close" />
				</p>
				{this.props.children}
            </div>
        </div>
	}
}
export default CusModal;