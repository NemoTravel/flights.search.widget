import React, { Component } from 'react';
import classnames from 'classnames';

export default class Counter extends Component {
	render() {
		const { title, count } = this.props;
		const itemClassName = classnames(
			'nemo-widget-form-passengers__item',
			{ 'nemo-widget-form-passengers__item_disabled': !count }
		);
		
		const minusClassName = classnames(
			'nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__minus',
			{ 'nemo-widget-form-passengers__icon_disabled': !count }
		);

		return <div className={itemClassName}>
			<div className="nemo-widget-form-passengers__title">{title}</div>
			<div className="nemo-widget-form-passengers__counter">
				<div className={minusClassName} onClick={this.props.removePassenger}/>
				<div className="nemo-widget-form-passengers__number">{count}</div>
				<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus" onClick={this.props.addPassenger}/>
			</div>
		</div>;
	}
}