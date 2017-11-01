import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { bindActionCreators } from 'redux';
import { vicinityDatesSelect, directFlightSelect, directFlightAction } from 'store/form/additional/selector';

class VicinityDates extends Component {
	render() {
		const {vicinityDatesAction, vicinityDatesSelect, directFlightAction, directFlightSelect} = this.props;

		return <div >
			<label className="nemo-ui-checkbox" >
				<input className="nemo-ui-checkbox__input" type="checkbox" onChange={vicinityDatesAction} checked={vicinityDatesSelect}/>
				<span className="nemo-ui-checkbox__caption">Искать +/- 3 дня</span>
			</label>
			<label className="nemo-ui-checkbox" >
				<input className="nemo-ui-checkbox__input" type="checkbox" onChange={directFlightAction} checked={directFlightSelect}/>
				<span className="nemo-ui-checkbox__caption">Без пересадок</span>
			</label>
		</div>
	}
}

function mapStateToProps(state) {
	return {
		vicinityDatesSelect: vicinityDatesSelect(state),
		directFlightSelect: directFlightSelect(state)
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(VicinityDates);