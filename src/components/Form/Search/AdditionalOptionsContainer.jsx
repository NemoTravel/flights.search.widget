import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from 'components/UI/Checkbox';
import * as additionalActions from 'store/form/additional/actions';
import { vicinityDatesSelect, directFlightSelect, directFlightAction } from 'store/form/additional/selector';
import { i18n } from 'utils';
import { MODE_NEMO } from 'state';

class AdditionalOptionsContainer extends Component {
	renderVicinityDates() {
		const {vicinityDatesAction, vicinityDatesSelect, vicinityDays, widgetMode} = this.props;
		let label = i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays);

		return <Checkbox
			id='vicinity'
			label={label}
			trigger={vicinityDatesAction}
			checked={vicinityDatesSelect}
			isVisible={vicinityDays > 0 && widgetMode === MODE_NEMO}
		/>
	}

	renderDirect() {
		const { directFlightAction, directFlightSelect, widgetMode } = this.props;
		let label = i18n('form', 'additional_directFlight');

		return <Checkbox
			id='directCheckbox'
			label={label}
			trigger={directFlightAction}
			checked={directFlightSelect}
			isVisible={widgetMode === MODE_NEMO}
		/>
	}

	render() {
		return <div className="widget-form-additionalOptions">
			{this.renderVicinityDates()}
			{this.renderDirect()}
		</div>
	}
}

function mapStateToProps(state) {
	return {
		vicinityDatesSelect: vicinityDatesSelect(state),
		directFlightSelect: directFlightSelect(state),
		vicinityDays: state.system.vicinityDays,
		widgetMode: state.system.mode
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(AdditionalOptionsContainer);