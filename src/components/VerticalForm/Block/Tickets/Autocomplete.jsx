import React, { Component } from 'react';

export default class Autocomplete extends Component {
	render() {
		const { placeholder, type } = this.props;
		const getRef = (input) => this.inputField = input;
		const focusInput = (event) => this.inputField.focus();
		
		return <div className="nemo-widget-form__input__wrapper">
			<input type="text" className={`form-control nemo-widget-form__${type}`} placeholder={placeholder} spellCheck={false} ref={getRef}/>
			<div className="nemo-widget-icon nemo-widget-form__input__arrow" onClick={focusInput}/>
		</div>;
	}
}