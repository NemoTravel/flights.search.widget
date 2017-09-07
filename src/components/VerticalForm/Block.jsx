import React from 'react';
import classnames from 'classnames';

export default class Block extends React.Component {
	constructor(props) {
		super(props);
		this.toggleHandler = this.toggleHandler.bind(this);
	}
	
	get type() {
		return null;
	}

	toggleHandler() {
		return this.props.actions.toggleBlock(this.type);
	}
	
	getHeaderClass() {
		return classnames('nemo-widget-form__block__header', { 'nemo-widget-form__block__header_active': this.props.isActive });
	}
	
	getBodyClass() {
		return classnames('nemo-widget-form__block__body', { 'nemo-widget-form__block__body_active': this.props.isActive });
	}
	
	render() {
		return null;
	}
}