import React from 'react';
import css from './Steps.scss';
import {
    FormattedMessage,
    } from 'react-intl';

class Steps extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current: this.props.current?this.props.current:0,
		}
	}
	render() {

		return <div className={css.body}>
			{this.props.steps.map((item,index)=>{
				return <p className={css.steps_item}>
					<p className={css.icon}>
						<p className={index==0?css.no_show:this.state.current==index?css.active:css.normal}></p>
						<span className={this.state.current<index?css.step:css.step_active}>{index+1}</span>
						<p className={index==this.props.steps.length-1?css.no_show:this.state.current==0?css.normal:this.state.current-1==index?css.active:css.normal}></p>
					</p>
					<p className={this.state.current<index?css.title:css.title_active}>
                        <FormattedMessage id={item.title} defaultMessage={item.default_message}/>
                    </p>
				</p>
			})}
		</div>
	}
}
export default Steps;