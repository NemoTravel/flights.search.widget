import * as React from 'react';
import { Action, AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from '../../UI/Checkbox';
import { vicinityDatesSelect, directFlightSelect } from '../../../store/form/additional/selector';
import { i18n } from '../../../utils';
import { ApplicationMode, ApplicationState, ServiceClass } from '../../../state';
import {
	BooleanAction, SetClassAction, setClassType,
	vicinityDatesAction,
	directFlightAction,
	setVicinityDatesCheckbox,
	setDirectFlightCheckbox
} from '../../../store/form/additional/actions';

interface StateProps {
	vicinityDatesSelect: boolean;
	directFlightSelect: boolean;
	vicinityDays: number;
	widgetMode: ApplicationMode;
}

interface DispatchProps {
	setClassType: (classType: ServiceClass) => SetClassAction;
	vicinityDatesAction: () => Action;
	directFlightAction: () => Action;
	setVicinityDatesCheckbox: (checked: boolean) => BooleanAction;
	setDirectFlightCheckbox: (checked: boolean) => BooleanAction;
}

class AdditionalOptionsContainer extends React.Component<StateProps & DispatchProps> {
	renderVicinityDates(): React.ReactNode {
		const { vicinityDatesAction, vicinityDatesSelect, vicinityDays } = this.props;
		let dayLabel: string;

		if (vicinityDays > 1) {
			dayLabel = i18n('form', (vicinityDays < 5 ? 'additional_vicinityDates_days' : 'additional_vicinityDates_days_5'));
		}
		else {
			dayLabel = i18n('form', 'additional_vicinityDates_day');
		}

		const label = i18n('form', 'additional_vicinityDates').replace('[%-days-%]', vicinityDays.toString()).replace('[%-dayLabel-%]', dayLabel);

		return <Checkbox
			id='vicinity'
			label={label}
			trigger={vicinityDatesAction}
			checked={vicinityDatesSelect}
		/>;
	}

	renderDirect(): React.ReactNode {
		const { directFlightAction, directFlightSelect } = this.props;
		const label = i18n('form', 'additional_directFlight');

		return <Checkbox
			id='directCheckbox'
			label={label}
			trigger={directFlightAction}
			checked={directFlightSelect}
		/>;
	}

	render(): React.ReactNode {
		const { widgetMode } = this.props;

		return widgetMode === ApplicationMode.NEMO ? <div className="form-group widget-form-additionalOptions">
			{this.renderVicinityDates()}
			{this.renderDirect()}
		</div> : null;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		vicinityDatesSelect: vicinityDatesSelect(state),
		directFlightSelect: directFlightSelect(state),
		vicinityDays: state.system.vicinityDays,
		widgetMode: state.system.mode
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		setClassType: bindActionCreators(setClassType, dispatch),
		vicinityDatesAction: bindActionCreators(vicinityDatesAction, dispatch),
		directFlightAction: bindActionCreators(directFlightAction, dispatch),
		setVicinityDatesCheckbox: bindActionCreators(setVicinityDatesCheckbox, dispatch),
		setDirectFlightCheckbox: bindActionCreators(setDirectFlightCheckbox, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(AdditionalOptionsContainer);
