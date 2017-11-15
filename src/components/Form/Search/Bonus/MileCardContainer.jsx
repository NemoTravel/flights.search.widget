import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TOGGLE_MILE_CARD } from 'store/actions';
import * as mileCardActions from 'store/form/mileCard/actions';
import { isMileCardActive, getMileCardNumber, getMileCardPassword } from 'store/form/mileCard/selectors';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';

class MileCardContainer extends React.Component {
	@autobind
	toggleBonusField() {
		this.props.toggleBonusField(TOGGLE_MILE_CARD); // from BonusContainer
	}

	@autobind
	toggleMileCard() {
		this.props.toggleMileCard(); // from mileCardActions
	}

	@autobind
	changeMileCardNumber(e) {
		this.props.changeMileCardNumber(e.target.value); // from mileCardActions
	}

	@autobind
	changeMileCardPassword(e) {
		this.props.changeMileCardPassword(e.target.value); // from mileCardActions
	}

	render() {
		const { isActive, number, password, showErrors } = this.props;

		const dummyClassName = classnames(
			'form-control widget-form-mileCard__dummy',
			{ 'widget-form-mileCard__dummy_hidden': isActive }
		);

		const wrapperClassName = classnames(
			'widget-form-mileCard__wrapper',
			{ 'widget-form-mileCard__wrapper_hidden': !isActive }
		);

		const currentNumber = number ? number : '';
		const currentPassword = password ? password : '';

		return <div className="form-group widget-form-mileCard">
			<div className={dummyClassName} onClick={this.toggleBonusField}>
				{i18n('form', 'mileCardDummy')}
				<i className="widget-ui-icon widget-form-mileCard__dummy__icon"/>
			</div>
			<div className={wrapperClassName}>
				<div className="widget-form-mileCard__wrapper__block">
					<Tooltip message={i18n('form', 'mileCardNumberError')} isActive={showErrors && isActive && !(number && number.match(/^[\d]+$/g))}>
						<input className="form-control" ref={input => input && input.focus()} value={currentNumber}
							onChange={this.changeMileCardNumber} placeholder={i18n('form', 'mileCardNumberPlaceholder')}/>
					</Tooltip>
					<div className="widget-ui-icon widget-form-mileCard__wrapper__block__close" onClick={this.toggleMileCard}/>
				</div>
				<div className="widget-form-mileCard__wrapper__block">
					<Tooltip message={i18n('form', 'mileCardPasswordError')} isActive={showErrors && isActive && !password}>
						<input className="form-control" value={currentPassword}
							onChange={this.changeMileCardPassword} placeholder={i18n('form', 'mileCardPasswordPlaceholder')} type="password"/>
					</Tooltip>
				</div>
			</div>
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
)(MileCardContainer);
