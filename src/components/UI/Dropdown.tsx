import * as React from 'react';
import onClickOutside, { InjectedOnClickOutProps } from 'react-onclickoutside';

interface Props {
	triggerElement: React.ReactNode;
	contentElement: React.ReactNode;
	triggerType?: string;
}

interface State {
	isVisible: boolean;
}

class Dropdown extends React.PureComponent<Props & InjectedOnClickOutProps, State> {
	static defaultProps: Partial<Props> = {
		triggerType: 'onClick'
	};

	state: State = {
		isVisible: false
	};

	/**
	 * Hide dropdown content if user clicked somewhere else.
	 *
	 * @see https://github.com/Pomax/react-onclickoutside
	 */
	handleClickOutside(): void {
		this.setState({
			isVisible: false
		});
	}

	/**
	 * Hide/show dropdown content.
	 */
	toggleContent(): void {
		this.setState({
			isVisible: !this.state.isVisible
		});
	}

	render(): React.ReactNode {
		const { triggerElement, contentElement, triggerType } = this.props;
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

export default onClickOutside<Props>(Dropdown);
