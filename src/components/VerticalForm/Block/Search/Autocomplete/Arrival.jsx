import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import Autocomplete from 'components/VerticalForm/Block/Search/Autocomplete';
import classnames from 'classnames';

class Arrival extends Autocomplete {
	get type() { return 'arrival'; }
	get placeholder() { return 'Куда'; }

	renderSwitcher() {
		let className = classnames(
			'nemo-ui-icon nemo-widget-form__input__switcher',
			{ 'nemo-ui-icon nemo-widget-form__input__switcher_withArrow': this.props.system.routingGrid }
		);

		return <div className={className} onClick={this.props.switchAirports}/>;
	}
}

function mapStateToProps(state) {
	return {
		state: state.form.search.arrival,
		system: state.system
	};
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(autocompleteActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Arrival);