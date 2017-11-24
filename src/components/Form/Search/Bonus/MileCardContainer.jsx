import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mileCardActions from 'store/form/mileCard/actions';
import { getMileCardNumber, getMileCardPassword } from 'store/form/mileCard/selectors';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import Input from 'components/Form/Search/Bonus/MileCard/Input';
import onClickOutside from 'react-onclickoutside';
import autobind from 'autobind-decorator';

class MileCardContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isActive: !!this.props.number || !!this.props.password
		};
	}

	@autobind
	enableField() {
		this.setState({ isActive: true });
	}

	@autobind
	disableField() {
		this.props.changeMileCardNumber(null);
		this.props.changeMileCardPassword(null);
		this.setState({ isActive: false });
	}

	@autobind
	handleClickOutside() {
		if (this.state.isActive && !this.props.number && !this.props.password) {
			this.disableField();
		}
	}

	@autobind
	changeMileCardNumber(e) {
		this.props.changeMileCardNumber(e.target.value);
	}

	@autobind
	changeMileCardPassword(e) {
		this.props.changeMileCardPassword(e.target.value);
	}

	renderDummy() {
		return <div className="form-control widget-form-mileCard__dummy" onClick={this.enableField}>
			{i18n('form', 'mileCardDummy')}
			<i className="widget-ui-icon widget-form-mileCard__dummy__icon"/>
		</div>;
	}

	renderField() {
		const
			{ number, password, showErrors } = this.props,
			visiblePassword = password ? password : '',
			showNumberTooltip = showErrors && this.state.isActive && !(number && number.match(/^[\d]+$/g)),
			showPasswordTooltip = showErrors && this.state.isActive && !password;

		return <div className="widget-form-mileCard__wrapper">
			<Input
				onClose={this.disableField}
				changeMileCardNumber={this.changeMileCardNumber}
				number={number}
				showTooltip={showNumberTooltip}
			/>

			<div className="widget-form-mileCard__wrapper__block">
				<Tooltip message={i18n('form', 'mileCardPasswordError')} isActive={showPasswordTooltip}>
					<input
						type="password"
						className="form-control"
						value={visiblePassword}
						spellCheck={false}
						onChange={this.changeMileCardPassword}
						placeholder={i18n('form', 'mileCardPasswordPlaceholder')}
					/>
				</Tooltip>
			</div>
		</div>;
	}

	render() {
		return <div className="form-group widget-form-mileCard">
			{this.state.isActive ? this.renderField() : this.renderDummy()}
		</div>;
	}
}

export default connect(
	state => ({
		number: getMileCardNumber(state),
		password: getMileCardPassword(state),
		showErrors: state.form.showErrors
	}),
	dispatch => bindActionCreators(mileCardActions, dispatch)
)(onClickOutside(MileCardContainer));
