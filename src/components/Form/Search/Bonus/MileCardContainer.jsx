import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mileCardActions from 'store/form/mileCard/actions';
import { isMileCardActive, getMileCardNumber, getMileCardPassword } from 'store/form/mileCard/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import InputNumberComponent from 'components/Form/Search/Bonus/MileCard/InputNumberComponent';
import onClickOutside from 'react-onclickoutside';
import autobind from 'autobind-decorator';

class MileCardContainer extends React.Component {
	@autobind
	toggleMileCard() {
		this.props.toggleMileCard(); // from mileCardActions
	}

	@autobind
	handleClickOutside() {
		if (this.props.isActive) {
			this.props.toggleMileCard(); // from mileCardActions
		}
	}

	@autobind
	changeMileCardPassword(e) {
		this.props.changeMileCardPassword(e.target.value); // from mileCardActions
	}

	@autobind
	renderDummy() {
		return <div className="form-control widget-form-mileCard__dummy" onClick={this.toggleMileCard}>
			{i18n('form', 'mileCardDummy')}
			<i className="widget-ui-icon widget-form-mileCard__dummy__icon"/>
		</div>;
	}

	@autobind
	renderWrapper() {
		const { isActive, number, password, showErrors } = this.props;
		const currentPassword = password ? password : '';
		const showNumberTooltip = showErrors && isActive && !(number && number.match(/^[\d]+$/g));
		const showPasswordTooltip = showErrors && isActive && !password;

		return <div className="widget-form-mileCard__wrapper">
			<InputNumberComponent number={number} showTooltip={showNumberTooltip}/>
			<div className="widget-form-mileCard__wrapper__block">
				<Tooltip message={i18n('form', 'mileCardPasswordError')} isActive={showPasswordTooltip}>
					<input className="form-control" value={currentPassword} spellCheck={false}
						onChange={this.changeMileCardPassword} placeholder={i18n('form', 'mileCardPasswordPlaceholder')} type="password"/>
				</Tooltip>
			</div>
		</div>;
	}

	render() {
		const { isActive } = this.props;

		return <div className="form-group widget-form-mileCard">
			{!isActive ? this.renderDummy() : null}
			{isActive ? this.renderWrapper() : null}
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
	dispatch => bindActionCreators(mileCardActions, dispatch)
)(onClickOutside(MileCardContainer));
