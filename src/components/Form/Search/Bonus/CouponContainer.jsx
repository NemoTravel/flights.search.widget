import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as couponActions from 'store/form/coupon/actions';
import { isCouponActive, getCouponNumber } from 'store/form/coupon/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import onClickOutside from 'react-onclickoutside';
import autobind from 'autobind-decorator';

class CouponContainer extends React.Component {
	@autobind
	toggleCoupon() {
		this.props.toggleCoupon(); // from couponActions
	}

	@autobind
	handleClickOutside() {
		if (this.props.isActive) {
			this.toggleCoupon();
		}
	}

	@autobind
	renderDummy() {
		return <div className="form-control widget-form-coupon__dummy" onClick={this.toggleCoupon}>
			{i18n('form', 'couponDummy')}
			<i className="widget-ui-icon widget-form-coupon__dummy__icon"/>
		</div>;
	}

	@autobind
	changeCouponNumber(e) {
		this.props.changeCouponNumber(e.target.value); // from couponActions
	}

	@autobind
	renderWrapper() {
		const { isActive, number, showErrors } = this.props;
		const currentNumber = number ? number : '';
		const showTooltip = showErrors && isActive && !(number && number.match(/^[\d]+$/g));

		return <div className="widget-form-coupon__wrapper">
			<div className="widget-form-coupon__wrapper__block">
				<Tooltip message={i18n('form', 'couponNumberError')} isActive={showTooltip}>
					<input className="form-control" ref={input => input && input.focus()} value={currentNumber}
						spellCheck={false} onChange={this.changeCouponNumber} placeholder={i18n('form', 'couponPlaceholder')}/>
				</Tooltip>
				<div className="widget-ui-input__closer" onClick={this.toggleCoupon}/>
			</div>
		</div>;
	}

	render() {
		const { isActive } = this.props;

		return <div className="form-group widget-form-coupon">
			{!isActive ? this.renderDummy() : null}
			{isActive ? this.renderWrapper() : null}
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
)(onClickOutside(CouponContainer));
