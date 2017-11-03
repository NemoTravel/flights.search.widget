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
		const { vicinityDatesAction, vicinityDatesSelect, vicinityDays, widgetMode } = this.props;

		const
			dayLabel = i18n('form', vicinityDays > 1 ? 'additional_vicinityDates_days' : 'additional_vicinityDates_day'),
			label = i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays).replace('[%-dayLabel-%]', dayLabel);

		return <Checkbox
			id='vicinity'
			label={label}
			trigger={vicinityDatesAction}
			checked={vicinityDatesSelect}
			isVisible={vicinityDays > 0 && widgetMode === MODE_NEMO}
		/>;
	}

	renderDirect() {
		const { directFlightAction, directFlightSelect, widgetMode } = this.props;
		const label = i18n('form', 'additional_directFlight');

		return <Checkbox
			id='directCheckbox'
			label={label}
			trigger={directFlightAction}
			checked={directFlightSelect}
			isVisible={widgetMode === MODE_NEMO}
		/>;
	}

	render() {
		return <div className="widget-form-additionalOptions">
			{this.renderVicinityDates()}
			{this.renderDirect()}
		</div>;
	}
}

export default connect(
	state => {
		return {
			vicinityDatesSelect: vicinityDatesSelect(state),
			directFlightSelect: directFlightSelect(state),
			vicinityDays: state.system.vicinityDays,
			widgetMode: state.system.mode
		};
	},
	dispatch => bindActionCreators(additionalActions, dispatch)
)(AdditionalOptionsContainer);
