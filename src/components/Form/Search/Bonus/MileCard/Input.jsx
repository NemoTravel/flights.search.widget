import React from 'react';
import Tooltip from 'components/UI/Tooltip';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

class Input extends React.Component {
	propTypes = {
		number: PropTypes.number,
		showTooltip: PropTypes.bool
	};

	shouldComponentUpdate(nextProps) {
		return this.props.number !== nextProps.number || this.props.showTooltip !== nextProps.showTooltip;
	}

	render() {
		const
			{ number, showTooltip, onClose, changeMileCardNumber } = this.props,
			visibleNumber = number ? number : '';

		return <div className="widget-form-mileCard__wrapper__block">
			<Tooltip message={i18n('form', 'mileCardNumberError')} isActive={showTooltip}>
				<input
					className="form-control"
					ref={input => input && input.focus()}
					value={visibleNumber}
					onChange={changeMileCardNumber}
					placeholder={i18n('form', 'mileCardNumberPlaceholder')}
					spellCheck={false}
				/>
			</Tooltip>

			<div className="widget-ui-input__closer" onClick={onClose}/>
		</div>;
	}
}

export default Input;
