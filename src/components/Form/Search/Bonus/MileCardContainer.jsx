import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TOGGLE_MILE_CARD } from 'store/actions';
import * as mileCardActions from 'store/form/mileCard/actions';
import { toggleBonusField } from 'store/form/actions';
import { isMileCardActive, getMileCardNumber, getMileCardPassword } from 'store/form/mileCard/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import InputNumberComponent from 'components/Form/Search/Bonus/MileCard/InputNumberComponent';

class MileCardContainer extends React.Component {
	render() {
		const { isActive, number, password, showErrors } = this.props;

		const toggleBonusField = () => {
			this.props.toggleBonusField(TOGGLE_MILE_CARD); // from BonusContainer
		};

		const changeMileCardPassword = e => {
			this.props.changeMileCardPassword(e.target.value); // from mileCardActions
		};

		const renderDummy = () => {
			return <div className="form-control widget-form-mileCard__dummy" onClick={toggleBonusField}>
				{i18n('form', 'mileCardDummy')}
				<i className="widget-ui-icon widget-form-mileCard__dummy__icon"/>
			</div>;
		};

		const renderWrapper = () => {
			const currentPassword = password ? password : '';
			const showNumberTooltip = showErrors && isActive && !(number && number.match(/^[\d]+$/g));
			const showPasswordTooltip = showErrors && isActive && !password;

			return <div className="widget-form-mileCard__wrapper">
				<InputNumberComponent number={number} showTooltip={showNumberTooltip}/>
				<div className="widget-form-mileCard__wrapper__block">
					<Tooltip message={i18n('form', 'mileCardPasswordError')} isActive={showPasswordTooltip}>
						<input className="form-control" value={currentPassword}
							onChange={changeMileCardPassword} placeholder={i18n('form', 'mileCardPasswordPlaceholder')} type="password"/>
					</Tooltip>
				</div>
			</div>;
		};

		return <div className="form-group widget-form-mileCard">
			{!isActive ? renderDummy() : null}
			{isActive ? renderWrapper() : null}
		</div>;
	}
}

export default connect(
	state => {
		return {
			isActive: isMileCardActive(state),
			number: getMileCardNumber(state),
			password: getMileCardPassword(state),
			showErrors: state.form.showErrors
		};
	},
	dispatch => bindActionCreators(Object.assign({}, mileCardActions, { toggleBonusField }), dispatch)
)(MileCardContainer);
