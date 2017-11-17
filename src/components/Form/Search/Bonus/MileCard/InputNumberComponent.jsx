import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import * as mileCardActions from 'store/form/mileCard/actions';

class InputNumberContainer extends React.Component {
	render() {
		const { number, showTooltip } = this.props;

		const toggleMileCard = () => {
			this.props.toggleMileCard(); // from mileCardActions
		};

		const changeMileCardNumber = e => {
			this.props.changeMileCardNumber(e.target.value); // from mileCardActions
		};

		const currentNumber = number ? number : '';

		return <div className="widget-form-mileCard__wrapper__block">
			<Tooltip message={i18n('form', 'mileCardNumberError')} isActive={showTooltip}>
				<input className="form-control" ref={input => input && input.focus()} value={currentNumber}
					onChange={changeMileCardNumber} placeholder={i18n('form', 'mileCardNumberPlaceholder')}/>
			</Tooltip>
			<div className="widget-ui-input__closer" onClick={toggleMileCard}/>
		</div>;
	}
}

export default connect(
	null, dispatch => bindActionCreators(mileCardActions, dispatch)
)(InputNumberContainer);
