import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MobileHeader extends Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { title, type, onClose } = this.props;
		return title !== nextProps.title || type !== nextProps.type || onClose !== nextProps.onClose;
	}

	render() {
		return <div className={`widget-ui-datepicker__header widget-ui-datepicker__header_${this.props.type}`}>
			<div className="widget-ui-icon widget-ui-mobile__back" onClick={this.props.onClose}/>
			{this.props.title}
		</div>
	}
}