import * as React from 'react';
import * as classnames from 'classnames';

interface Props {
	isActive?: boolean;
	isCentered?: boolean;
	message: string;
}

class Tooltip extends React.Component<Props> {
	static defaultProps: Partial<Props> = {
		isActive: false,
		isCentered: false
	};

	shouldComponentUpdate(nextProps): boolean {
		const { isActive, message, children } = this.props;

		return isActive !== nextProps.isActive || message !== nextProps.message || children !== nextProps.children;
	}

	render(): React.ReactNode {
		const { children, message, isActive, isCentered } = this.props;

		return <div className="widget-ui-tooltip">
			<div className={classnames('widget-ui-tooltip__pop', {
				'widget-ui-tooltip__pop_visible': isActive,
				'widget-ui-tooltip__pop_centered': isCentered
			})}>
				{message}
			</div>

			{children}
		</div>;
	}
}

export default Tooltip;
