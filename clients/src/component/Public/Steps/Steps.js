import React from 'react';
import css from './Steps.scss';
import {
	FormattedMessage,
} from 'react-intl';

class Steps extends React.Component {
	constructor(props) {
		super(props);
	}
	handleClick = (index) => {
		console.log(index);
		if (this.props.current > index) {
			this.props.changeStep ? this.props.changeStep(index) : ""
		}
	}
	render() {
		let current = this.props.current ? this.props.current : 0;
		return <div className={`${this.props.className} ${css.body}`} style={this.props.style}>
			{this.props.steps.map((item,index)=>{
				return <p className={css.steps_item} onClick={this.handleClick.bind(this,index)}>
					<p className={current<index?css.icon:css.icon_active}>
						<p className={index==0?css.no_show:current==index?css.active:css.normal}></p>
						<span className={current<index?css.step:css.step_active}>{index+1}</span>
						<p className={index==this.props.steps.length-1?css.no_show:current==0?css.normal:current-1==index?css.active:css.normal}></p>
					</p>
					<p className={current<index?css.title:css.title_active}>
                        <FormattedMessage id={item.title} defaultMessage={item.default_message}/>
                    </p>
				</p>
			})}
		</div>
	}
}
export default Steps;