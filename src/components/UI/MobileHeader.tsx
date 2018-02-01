import * as React from 'react';

interface Props {
	title: string;
	className?: string;
	onClose?: () => void;
}

class MobileHeader extends React.Component<Props> {
	shouldComponentUpdate(nextProps: Props): boolean {
		return this.props.title !== nextProps.title || this.props.className !== nextProps.className;
	}

	render(): React.ReactNode {
		const { className = '', onClose = null, title, children = [] } = this.props;

		return <div className={`widget-ui-mobile__header ${className}`}>
			<div className="widget-ui-icon widget-ui-mobile__back" onClick={onClose}/>
			<div className="widget-ui-mobile__title">{title}</div>
			{children}
		</div>;
	}
}

export default MobileHeader;
