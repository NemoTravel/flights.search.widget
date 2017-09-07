import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as autocompleteActions from 'actions/autocomplete';
import Autocomplete from 'components/VerticalForm/Block/Search/Autocomplete';

class Departure extends Autocomplete {
	get type() { return 'departure'; }
	get placeholder() { return 'Откуда'; }
}

function mapStateToProps(state) {
	return {
		state: state.form.search.departure,
		system: state.system
	};
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(autocompleteActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(Departure);