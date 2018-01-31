import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as couponActions from 'store/form/coupon/actions';
import { getCouponNumber } from 'store/form/coupon/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import onClickOutside from 'react-onclickoutside';
import autobind from 'autobind-decorator';

class CouponContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: !!this.props.number
		};
	}

	@autobind
	enableField() {
		this.setState({ isActive: true });
	}

	@autobind
	disableField() {
		this.props.changeCouponNumber(null);
		this.setState({ isActive: false });
	}

	@autobind
	handleClickOutside() {
		if (this.state.isActive && !this.props.number) {
			this.setState({ isActive: false });
		}
	}

	@autobind
	changeCouponNumber(e) {
		this.props.changeCouponNumber(e.target.value);
	}

	renderDummy() {
		return <div className="form-control widget-form-coupon__dummy" onClick={this.enableField}>
			{i18n('form', 'couponDummy')}
			<i className="widget-ui-icon widget-form-coupon__dummy__icon"/>
		</div>;
	}

	renderField() {
		const
			{ number, showErrors } = this.props,
			visibleNumber = number ? number : '',
			showTooltip = showErrors && this.state.isActive && !(number && number.match(/^[\d]+$/g));

		return <div className="widget-form-coupon__wrapper">
			<div className="widget-form-coupon__wrapper__block">
				<Tooltip message={i18n('form', 'couponNumberError')} isActive={showTooltip}>
					<input
						className="form-control"
						ref={input => input && input.focus()}
						value={visibleNumber}
						spellCheck={false}
						onChange={this.changeCouponNumber}
						placeholder={i18n('form', 'couponPlaceholder')}
					/>
				</Tooltip>

				<div className="widget-ui-input__closer" onClick={this.disableField}/>
			</div>
		</div>;
	}

	render() {
		return <div className="form-group widget-form-coupon">
			{this.state.isActive ? this.renderField() : this.renderDummy()}
		</div>;
	}
}

export default connect(
	state => ({
		number: getCouponNumber(state),
		showErrors: state.form.showErrors
	}),
	dispatch => bindActionCreators(couponActions, dispatch)
)(onClickOutside(CouponContainer));
