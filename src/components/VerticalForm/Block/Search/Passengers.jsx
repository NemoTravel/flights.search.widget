import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NemoDropdown from 'components/UI/Dropdown';
import Counter from 'components/VerticalForm/Block/Search/Passengers/Counter';
import * as passengersActions from 'actions/passengers';

class Passengers extends Component {

	/**
	 * Render passengers counters;
	 * 
	 * @returns {Array}
	 */
	renderCounters() {
		const { passengers } = this.props;
		const { addPassenger, removePassenger } = this.props.actions;
		const counters = [];

		for (const passType in passengers) {
			if (passengers.hasOwnProperty(passType)) {
				const passenger = passengers[passType];

				if (passenger.isActive) {
					counters.push(
						<Counter 
							addPassenger={() => addPassenger(passenger.code)} 
							removePassenger={() => removePassenger(passenger.code)} 
							title={passenger.title} 
							code={passenger.code} 
							count={passenger.count}
						/>
					);
				}
			}
		}
		
		return counters;
	}

	/**
	 * Render clickable input element.
	 * 
	 * @returns {XML}
	 */
	renderDropdownTrigger() {
		return <div className="nemo-widget-form-passengers__trigger nemo-widget-form__input__wrapper">
			<input type="text" className="form-control" value="1 Пассажир" readOnly={true} spellCheck={false} ref={input => this.inputField = input}/>
			<div className="nemo-ui-icon nemo-widget-form__input__arrow" onClick={() => this.inputField.focus()}/>
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
		return <div className="nemo-widget-form-passengers">
			<NemoDropdown triggerElement={this.renderDropdownTrigger()} contentElement={this.renderDropdownContent()}/>
		</div>;
	}
}

function mapStateToProps(state) {
	return {
		passengers: state.form.search.passengers
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(passengersActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Passengers);