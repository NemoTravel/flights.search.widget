import React from 'react';
import onClickOutside from 'react-onclickoutside';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

class Dropdown extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = { isVisible: false };
	}

	/**
	 * Hide dropdown content if user clicked somewhere else.
	 *
	 * @see https://github.com/Pomax/react-onclickoutside
	 */
	@autobind
	handleClickOutside() {
		this.setState({
			isVisible: false
		});
	}

	/**
	 * Hide/show dropdown content.
	 */
	@autobind
	toggleContent() {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}

	render() {
		const { triggerElement, contentElement, triggerType = 'onClick' } = this.props;
		const { isVisible } = this.state;

		const triggerProps = {
			[triggerType]: this.toggleContent
		};

		return <div className="widget-ui-dropdown">
			<div className="widget-ui-dropdown__trigger" {...triggerProps}>{triggerElement}</div>
			<div className={`widget-ui-dropdown__content${isVisible ? '' : ' widget-ui-dropdown__content_hidden'}`}>
				{contentElement}
			</div>
		</div>;
	}
}

Dropdown.propTypes = {
	triggerElement: PropTypes.element.isRequired,
	contentElement: PropTypes.element.isRequired,
	triggerType: PropTypes.string
};

export default onClickOutside(Dropdown);
