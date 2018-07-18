import * as React from 'react';
import * as classnames from 'classnames';
import { Manager, Popper, Reference } from 'react-popper';

interface Props {
	isActive?: boolean;
	isCentered?: boolean;
	message: string;
	children?: React.ReactNode;
}

class Tooltip extends React.Component<Props> {
	static defaultProps: Partial<Props> = {
		isActive: false,
		isCentered: false
	};

	shouldComponentUpdate(nextProps: Props): boolean {
		const { isActive, message, children } = this.props;

		return isActive !== nextProps.isActive || message !== nextProps.message || children !== nextProps.children;
	}

	render(): React.ReactNode {
		const { children, message, isActive, isCentered } = this.props;

		return <Manager>
			<Reference>
				{
					({ ref }) => (
						<div ref={ref}>
							{children}
						</div>
					)
				}
			</Reference>
			<Popper placement="top">
				{
					({ ref, style, placement }) => (
						isActive ? <div ref={ref} style={style} data-placement={placement} className="widget-ui-tooltip__pop">
							{message}
						</div> : null
					)
				}
			</Popper>
		</Manager>;
	}
}

export default Tooltip;
