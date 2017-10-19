import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MobileHeader extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		className: PropTypes.string,
		onClose: PropTypes.func
	};

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.title !== nextProps.title || this.props.className !== nextProps.className;
	}

	render() {
		const { className = '', onClose = null, title, children = [] } = this.props;
		
		return <div className={`widget-ui-mobile__header ${className}`}>
			<div className="widget-ui-icon widget-ui-mobile__back" onClick={onClose}/>
			<div className="widget-ui-mobile__title">{title}</div>
			{children}
		</div>
	}
}