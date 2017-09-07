import React, { Component } from 'react';
import classnames from 'classnames';

export default class Counter extends Component {
	constructor(props) {
		super(props);
		
		this.removePassenger = this.removePassenger.bind(this);
		this.addPassenger = this.addPassenger.bind(this);
		this.props.calculateTitle();
	}
	
	removePassenger() {
		const { count, code } = this.props;
		
		if (count) {
			this.props.removePassenger(code);
			this.props.calculateTitle();
		}
	}

	addPassenger() {
		const { code } = this.props;
		this.props.addPassenger(code);
		this.props.calculateTitle();
	}
	
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
				<div className={minusClassName} onClick={this.removePassenger}/>
				<div className="nemo-widget-form-passengers__number">{count}</div>
				<div className="nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus" onClick={this.addPassenger}/>
			</div>
		</div>;
	}
}