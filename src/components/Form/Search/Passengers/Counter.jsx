import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class Counter extends Component {
	static propTypes = {
		addPassenger: PropTypes.func.isRequired,
		removePassenger: PropTypes.func.isRequired,
		title: PropTypes.string.isRequired,
		ageTitle: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
		count: PropTypes.number.isRequired,
		canAddPassenger: PropTypes.bool.isRequired,
		canRemovePassenger: PropTypes.bool.isRequired,
	};
	
	constructor(props) {
		super(props);
		
		this.removePassenger = this.removePassenger.bind(this);
		this.addPassenger = this.addPassenger.bind(this);
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		const { count, canAddPassenger, canRemovePassenger } = this.props;
		
		return count !== nextProps.count || canAddPassenger !== nextProps.canAddPassenger || canRemovePassenger !== nextProps.canRemovePassenger;
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
		const { title, ageTitle, count, canAddPassenger, canRemovePassenger } = this.props;
		const itemClassName = classnames(
			'widget-form-passengers__item',
			{ 'widget-form-passengers__item_disabled': !count }
		);
		
		const minusClassName = classnames(
			'widget-ui-icon widget-form-passengers__icon widget-form-passengers__minus',
			{ 'widget-form-passengers__icon_disabled': !canRemovePassenger }
		);
		
		const plusClassName = classnames(
			'widget-ui-icon widget-form-passengers__icon widget-form-passengers__plus',
			{ 'widget-form-passengers__icon_disabled': !canAddPassenger }
		);

		return <div className={itemClassName}>
			<div className="widget-form-passengers__title">
				{title}
				
				<span className="widget-form-passengers__title__age">
					{ageTitle}
				</span>
			</div>
			
			<div className="widget-form-passengers__counter">
				<div className={minusClassName} onClick={this.removePassenger}/>
				<div className="widget-form-passengers__number">{count}</div>
				<div className={plusClassName} onClick={this.addPassenger}/>
			</div>
		</div>;
	}
}