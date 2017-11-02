import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Tooltip extends React.Component {
	shouldComponentUpdate(nextProps) {
		const { isActive = false, message, children } = this.props;

		return isActive !== nextProps.isActive || message !== nextProps.message || children !== nextProps.children;
	}

	render() {
		const {
			children: innerComponent,
			message,
			isActive = false,
			isCentered = false
		} = this.props;

		return <div className="widget-ui-tooltip">
			<div className={classnames('widget-ui-tooltip__pop', {
				'widget-ui-tooltip__pop_visible': isActive,
				'widget-ui-tooltip__pop_centered': isCentered
			})}>
				{message}
			</div>

			{innerComponent}
		</div>;
	}
}

Tooltip.propsTypes = {
	isActive: PropTypes.bool,
	isCentered: PropTypes.bool,
	message: PropTypes.string.isRequired
};

export default Tooltip;
