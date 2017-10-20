/**
 * Created by WF on 2017/9/20.
 */
import React from 'react';
import css from './TabBar.scss';
import {
	FormattedMessage,
} from 'react-intl';
import {
	Badge
} from 'antd';

class TabBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			current: this.props.current ? this.props.current : 0,
		}

	}
	handleBar = (item, index) => {
		this.setState({
			current: index
		})
		this.props.handleBar ? this.props.handleBar(item.value) : "";
	}

	render() {
		return <div className={`${css.body} ${this.props.className}`} style={this.props.style}>
			{this.props.tabs.map((item,index)=>{
				return <div className={index!=this.state.current?css.item:index==0?css.left_active:index==this.props.tabs.length-1?css.right_active:css.active}
					onClick={this.handleBar.bind(this,item,index)}
				>	
					<Badge count={item.count&&index!=this.state.current?item.count:0} overflowCount={99}>
						{item.icon?<img src={item.icon}/>:""}
						{this.props.hiddenTest&&index!=this.state.current?"":<FormattedMessage id={item.key} defaultMessage="tabbar"/>}
					</Badge>
				</div>
			})}
		</div>

	}
}
export default TabBar