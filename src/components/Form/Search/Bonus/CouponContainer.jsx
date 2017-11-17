import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TOGGLE_COUPON } from 'store/actions';
import * as couponActions from 'store/form/coupon/actions';
import { toggleBonusField } from 'store/form/actions';
import { isCouponActive, getCouponNumber } from 'store/form/coupon/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';

class CouponContainer extends React.Component {
	render() {
		const { isActive, number, showErrors } = this.props;

		const toggleBonusField = () => {
			this.props.toggleBonusField(TOGGLE_COUPON); // from BonusContainer
		};

		const toggleCoupon = () => {
			this.props.toggleCoupon(); // from couponActions
		};

		const changeCouponNumber = e => {
			this.props.changeCouponNumber(e.target.value); // from couponActions
		};

		const renderDummy = () => {
			return <div className="form-control widget-form-coupon__dummy" onClick={toggleBonusField}>
				{i18n('form', 'couponDummy')}
				<i className="widget-ui-icon widget-form-coupon__dummy__icon"/>
			</div>;
		};

		const renderWrapper = () => {
			const currentNumber = number ? number : '';
			const showTooltip = showErrors && isActive && !(number && number.match(/^[\d]+$/g));

			return <div className="widget-form-coupon__wrapper">
				<div className="widget-form-coupon__wrapper__block">
					<Tooltip message={i18n('form', 'couponNumberError')} isActive={showTooltip}>
						<input className="form-control" ref={input => input && input.focus()} value={currentNumber}
							onChange={changeCouponNumber} placeholder={i18n('form', 'couponPlaceholder')}/>
					</Tooltip>
					<div className="widget-ui-input__closer" onClick={toggleCoupon}/>
				</div>
			</div>;
		};

		return <div className="form-group widget-form-coupon">
			{!isActive ? renderDummy() : null}
			{isActive ? renderWrapper() : null}
		</div>;
	}
}

export default connect(
	state => {
		return {
			isActive: isCouponActive(state),
			number: getCouponNumber(state),
			showErrors: state.form.showErrors
		};
	},
	dispatch => bindActionCreators(Object.assign({}, couponActions, { toggleBonusField }), dispatch)
)(CouponContainer);
