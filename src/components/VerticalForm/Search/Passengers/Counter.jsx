import React, { Component } from 'react';
import classnames from 'classnames';

export default class Counter extends Component {
	constructor(props) {
		super(props);
		
		this.removePassenger = this.removePassenger.bind(this);
		this.addPassenger = this.addPassenger.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		return this.props.count !== nextProps.count;
	}
	
	removePassenger() {
		const { canRemovePassenger, code } = this.props;
		
		if (canRemovePassenger) {
			this.props.removePassenger(code);
		}
	}

	addPassenger() {
		const { canAddPassenger, code } = this.props;

		if (canAddPassenger) {
			this.props.addPassenger(code);
		}
	}
	
	render() {
		const { title, count, canAddPassenger, canRemovePassenger } = this.props;
		const itemClassName = classnames(
			'nemo-widget-form-passengers__item',
			{ 'nemo-widget-form-passengers__item_disabled': !count }
		);
		
		const minusClassName = classnames(
			'nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__minus',
			{ 'nemo-widget-form-passengers__icon_disabled': !canRemovePassenger }
		);
		
		const plusClassName = classnames(
			'nemo-ui-icon nemo-widget-form-passengers__icon nemo-widget-form-passengers__plus',
			{ 'nemo-widget-form-passengers__icon_disabled': !canAddPassenger }
		);

		return <div className={itemClassName}>
			<div className="nemo-widget-form-passengers__title">{title}</div>
			<div className="nemo-widget-form-passengers__counter">
				<div className={minusClassName} onClick={this.removePassenger}/>
				<div className="nemo-widget-form-passengers__number">{count}</div>
				<div className={plusClassName} onClick={this.addPassenger}/>
			</div>
		</div>;
	}
}