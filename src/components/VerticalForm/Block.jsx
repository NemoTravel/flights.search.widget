import React from 'react';

export default class Block extends React.Component {
	constructor(props) {
		super(props);

		this.inactiveHeaderClass = 'nemo-widget-form__block__header';
		this.activeHeaderClass = 'nemo-widget-form__block__header nemo-widget-form__block__header_active';

		this.inactiveBodyClass = 'nemo-widget-form__block__body';
		this.activeBodyClass = 'nemo-widget-form__block__body nemo-widget-form__block__body_active';
		
		this.toggleHandler = this.toggleHandler.bind(this);
	}
	
	get type() {
		return null;
	}

	toggleHandler() {
		return this.props.toggleBlock(this.type);
	}
	
	getHeaderClass() {
		return this.props.isActive ? this.activeHeaderClass : this.inactiveHeaderClass;
	}
	
	getBodyClass() {
		return this.props.isActive ? this.activeBodyClass : this.inactiveBodyClass;
	}
	
	render() {
		return null;
	}
}