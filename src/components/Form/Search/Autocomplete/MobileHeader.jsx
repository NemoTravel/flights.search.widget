import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export default class MobileHeader extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		isActive: PropTypes.bool.isRequired
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { title, isActive } = this.props;
		return title !== nextProps.title || isActive !== nextProps.isActive;
	}
	
	render() {
		return <div className={classnames('widget-form-airports__header', { 'widget-form-airports__header_visible': this.props.isActive })}>
			<div className="widget-ui-icon widget-ui-mobile__back"/>
			{this.props.title}
			<div className="widget-form-airports__underlay"/>
		</div>
	}
}