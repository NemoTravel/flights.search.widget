import React, { PureComponent } from 'react';
import onClickOutside from 'react-onclickoutside';

class Dropdown extends PureComponent {
	constructor(props) {
		super(props);

		this.state = { isVisible: false };

		this.toggleContent = this.toggleContent.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	/**
	 * Hide dropdown content if user clicked somewhere else.
	 * 
	 * @see https://github.com/Pomax/react-onclickoutside
	 */
	handleClickOutside() {
		this.setState({
			isVisible: false
		});
	}

	/**
	 * Hide/show dropdown content.
	 */
	toggleContent() {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}
	
	render() {
		const { triggerElement, contentElement, triggerType = 'onClick' } = this.props;
		const { isVisible } = this.state;
		
		let triggerProps = {
			[triggerType]: this.toggleContent
		};
		
		return <div className="nemo-ui-dropdown">
			<div className="nemo-ui-dropdown__trigger" {...triggerProps}>{triggerElement}</div>
			<div className={`nemo-ui-dropdown__content${isVisible ? '' : ' nemo-ui-dropdown__content_hidden'}`}>{contentElement}</div>
		</div>;
	}
}

export default onClickOutside(Dropdown)