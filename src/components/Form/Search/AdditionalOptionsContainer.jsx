import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from 'components/UI/Checkbox';
import * as additionalActions from 'store/form/additional/actions';
import { vicinityDatesSelect, directFlightSelect } from 'store/form/additional/selector';
import { i18n } from 'utils';
import { MODE_NEMO } from 'state';

class AdditionalOptionsContainer extends Component {
	renderVicinityDates() {
		const { vicinityDatesAction, vicinityDatesSelect, vicinityDays } = this.props;
		let dayLabel, label = '';

		if (vicinityDays > 1) {
			dayLabel = i18n('form', (vicinityDays < 5 ? 'additional_vicinityDates_days' : 'additional_vicinityDates_days_5'));
		}
		else {
			dayLabel = i18n('form', 'additional_vicinityDates_day');
		}

		label = i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays).replace('[%-dayLabel-%]', dayLabel);

		return <Checkbox
			id='vicinity'
			label={label}
			trigger={vicinityDatesAction}
			checked={vicinityDatesSelect}
		/>;
	}

	renderDirect() {
		const { directFlightAction, directFlightSelect } = this.props;
		const label = i18n('form', 'additional_directFlight');

		return <Checkbox
			id='directCheckbox'
			label={label}
			trigger={directFlightAction}
			checked={directFlightSelect}
		/>;
	}

	render() {
		const { widgetMode } = this.props;

		return widgetMode === MODE_NEMO ? <div className="widget-form-additionalOptions">
			{this.renderVicinityDates()}
			{this.renderDirect()}
		</div> : null;
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
