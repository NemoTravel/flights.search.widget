import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { changeCouponNumber, CouponAction } from '../../../../store/form/coupon/actions';
import { getCouponNumber } from '../../../../store/form/coupon/selectors';
import Tooltip from '../../../UI/Tooltip';
import { i18n } from '../../../../utils';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';
import { ApplicationState } from '../../../../state';
import { FormEvent } from 'react';

interface StateProps {
	number: string;
	showErrors: boolean;
}

interface DispatchProps {
	changeCouponNumber: (newValue: string) => CouponAction;
}

interface State {
	isActive: boolean;
}

type Props = StateProps & DispatchProps & InjectedOnClickOutProps;

class CouponContainer extends React.Component<Props, State> {
	state: State = {
		isActive: false
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			isActive: !!this.props.number
		};

		this.enableField = this.enableField.bind(this);
		this.disableField = this.disableField.bind(this);
		this.changeCouponNumber = this.changeCouponNumber.bind(this);
	}

	enableField(): void {
		this.setState({ isActive: true } as State);
	}

	disableField(): void {
		this.props.changeCouponNumber(null);
		this.setState({ isActive: false } as State);
	}

	handleClickOutside(): void {
		if (this.state.isActive && !this.props.number) {
			this.setState({ isActive: false } as State);
		}
	}

	changeCouponNumber(event: FormEvent<HTMLInputElement>): void {
		this.props.changeCouponNumber((event.target as HTMLInputElement).value);
	}

	renderDummy(): React.ReactNode {
		return <div className="form-control widget-form-coupon__dummy" onClick={this.enableField}>
			{i18n('form', 'couponDummy')}
			<i className="widget-ui-icon widget-form-coupon__dummy__icon"/>
		</div>;
	}

	renderField(): React.ReactNode {
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

	render(): React.ReactNode {
		return <div className="form-group widget-form-coupon">
			{this.state.isActive ? this.renderField() : this.renderDummy()}
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		number: getCouponNumber(state),
		showErrors: state.form.showErrors
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		changeCouponNumber: bindActionCreators(changeCouponNumber, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(onClickOutside(CouponContainer));
