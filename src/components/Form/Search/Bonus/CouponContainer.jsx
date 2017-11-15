import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TOGGLE_COUPON } from 'store/actions';
import * as couponActions from 'store/form/coupon/actions';
import { isCouponActive, getCouponNumber } from 'store/form/coupon/selectors';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';

class CouponContainer extends React.Component {
	@autobind
	toggleBonusField() {
		this.props.toggleBonusField(TOGGLE_COUPON); // from BonusContainer
	}

	@autobind
	toggleCoupon() {
		this.props.toggleCoupon(); // from couponActions
	}

	@autobind
	changeCouponNumber(e) {
		this.props.changeCouponNumber(e.target.value); // from couponActions
	}

	render() {
		const { isActive, number, showErrors } = this.props;

		const dummyClassName = classnames(
			'form-control widget-form-coupon__dummy',
			{ 'widget-form-coupon__dummy_hidden': isActive }
		);

		const wrapperClassName = classnames(
			'widget-form-coupon__wrapper',
			{ 'widget-form-coupon__wrapper_hidden': !isActive }
		);

		const currentNumber = number ? number : '';

		return <div className="form-group widget-form-coupon">
			<div className={dummyClassName} onClick={this.toggleBonusField}>
				{i18n('form', 'couponDummy')}
				<i className="widget-ui-icon widget-form-coupon__dummy__icon"/>
			</div>
			<div className={wrapperClassName}>
				<div className="widget-form-coupon__wrapper__block">
					<Tooltip message={i18n('form', 'couponNumberError')} isActive={showErrors && isActive && !(number && number.match(/^[\d]+$/g))}>
						<input className="form-control" ref={input => input && input.focus()} value={currentNumber}
							onChange={this.changeCouponNumber} placeholder={i18n('form', 'couponPlaceholder')}/>
					</Tooltip>
					<div className="widget-ui-icon widget-form-coupon__wrapper__block__close" onClick={this.toggleCoupon}/>
				</div>
			</div>
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
	dispatch => bindActionCreators(couponActions, dispatch)
)(CouponContainer);
