import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NemoDropdown from 'components/UI/Dropdown';
import Tooltip from 'components/UI/Tooltip';
import Counter from 'components/VerticalForm/Block/Search/Passengers/Counter';
import * as passengersActions from 'actions/passengers';
import { getPassengersTitle, getPassengersArray, getTotalPassengersCount } from 'selectors';

class Passengers extends Component {
	constructor(props) {
		super(props);
		
		this.maxTotalPassengersCount = 6;
		this.minTotalPassengersCount = 0;
	}

	/**
	 * Render passengers counters;
	 * 
	 * @returns {Array}
	 */
	renderCounters() {
		const { array, totalCount } = this.props;
		const { addPassenger, removePassenger } = this.props.actions;
		
		return array.map((passenger, i) => {
			return <Counter
				key={i}
				addPassenger={addPassenger}
				removePassenger={removePassenger}
				title={passenger.title}
				code={passenger.code}
				count={passenger.count}
				canAddPassenger={totalCount < this.maxTotalPassengersCount}
				canRemovePassenger={passenger.count > this.minTotalPassengersCount}
			/>;
		});
	}

	/**
	 * Render clickable input element.
	 * 
	 * @returns {XML}
	 */
	renderDropdownTrigger() {
		return <div className="nemo-widget-form-passengers__trigger nemo-widget-form__input__wrapper">
			<input type="text" className="form-control" value={this.props.title} readOnly={true} spellCheck={false} ref={input => this.inputField = input}/>
			<div className="nemo-ui-icon nemo-widget-form__input__arrow"/>
		</div>;
	}

	/**
	 * Render dropdown block with passengers counters.
	 * 
	 * @returns {XML}
	 */
	renderDropdownContent() {
		return <div className="nemo-widget-form-passengers__content">{this.renderCounters()}</div>;
	}
	
	render() {
		const { totalCount } = this.props;
		
		return <div className="form-group nemo-widget-form-passengers">
			<Tooltip message="Выберите хотя бы одного пассажира" isActive={totalCount <= 0}>
				<NemoDropdown triggerElement={this.renderDropdownTrigger()} contentElement={this.renderDropdownContent()}/>
			</Tooltip>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		array: getPassengersArray(state),
		title: getPassengersTitle(state),
		totalCount: getTotalPassengersCount(state)
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(passengersActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Passengers);