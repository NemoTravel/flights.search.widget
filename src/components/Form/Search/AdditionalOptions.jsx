import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { vicinityDatesSelect, directFlightSelect, directFlightAction } from 'store/form/additional/selector';
import { i18n } from 'utils';
import { MODE_NEMO } from 'state';

class AdditionalOptions extends Component {
	renderVicinityDates() {
		const {vicinityDatesAction, vicinityDatesSelect, vicinityDays} = this.props;

		if (vicinityDays > 0) {
			return <label className="nemo-ui-checkbox">
				<input className="nemo-ui-checkbox__input" type="checkbox" onChange={vicinityDatesAction} checked={vicinityDatesSelect}/>
				<span className="nemo-ui-checkbox__caption">
					{i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays)}
				</span>
			</label>
		}
	}

	renderDirect() {
		const { directFlightAction, directFlightSelect } = this.props;

		return <label className="nemo-ui-checkbox">
			<input className="nemo-ui-checkbox__input" type="checkbox" onChange={directFlightAction} checked={directFlightSelect}/>
			<span className="nemo-ui-checkbox__caption">
					{i18n('form', 'additional_directFlight')}
				</span>
		</label>
	}

	render() {
		const { widgetMode } = this.props;

		if (widgetMode === MODE_NEMO) {
			return <div className="widget-form-additionalOptions">
				{this.renderVicinityDates()}
				{this.renderDirect()}
			</div>
		}
		else {
			return null;
		}
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

export default connect(mapStateToProps, mapActionsToProps)(AdditionalOptions);