import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { bindActionCreators } from 'redux';
import {getClassType} from 'store/form/additional/selector';

class VicinityDates extends Component {
	render() {
		const {vicinityDatesAction} = this.props;

		return <div>
			<input type="checkbox" onClick={vicinityDatesAction}/>
			Искать +/- 3 дня
		</div>
	}
}

function mapStateToProps(state) {
	return {

	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(VicinityDates);