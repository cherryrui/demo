/**
 * Created by WF on 2017/9/20.
 */
import React from 'react';
import css from './TabBar.scss';
import {
	FormattedMessage,
} from 'react-intl';

class TabBar extends React.Component {

	constructor(props) {
		super(props);

	}
	handleBar = (index) => {
		console.log(index)
		this.props.handleBar ? this.props.handleBar(index) : "";
	}

	render() {
		console.log(this.props.current)
		return <div className={`${css.body} ${this.props.className}`} style={this.props.style}>
			{this.props.tabs.map((item,index)=>{
				return <div className={index==this.props.current?css.active:css.item}
					onClick={this.handleBar.bind(this,index)}
				>
					<FormattedMessage id={item.key} defaultMessage="tabbar"/>
				</div>
			})}
		</div>

	}
}
export default TabBar