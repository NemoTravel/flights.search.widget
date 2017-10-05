import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MobileHeader extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { title, onClose } = this.props;
		return title !== nextProps.title || onClose !== nextProps.onClose;
	}

	render() {
		return <div className="widget-form-passengers__header">
			<div className="widget-ui-icon widget-ui-mobile__back" onClick={this.props.onClose}/>
			{this.props.title}
		</div>
	}
}