import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NemoDropdown from 'components/UI/Dropdown';
import Counter from 'components/VerticalForm/Block/Search/Passengers/Counter';
import * as passengersActions from 'actions/passengers';
import { getPassengersTitle, getPassengersArray } from 'selectors';

class Passengers extends Component {

	/**
	 * Render passengers counters;
	 * 
	 * @returns {Array}
	 */
	renderCounters() {
		const { array } = this.props;
		const { addPassenger, removePassenger } = this.props.actions;
		
		return array.map((passenger, i) => {
			return <Counter
				key={i}
				addPassenger={addPassenger}
				removePassenger={removePassenger}
				title={passenger.title}
				code={passenger.code}
				count={passenger.count}
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
		array: getPassengersArray(state),
		title: getPassengersTitle(state)
	};
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(passengersActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(Passengers);