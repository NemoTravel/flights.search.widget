import React, { Component } from 'react';

export default class Datepicker extends Component {
	render() {
		const { placeholder, type } = this.props;
		const getRef = (input) => this.inputField = input;
		const focusInput = (event) => this.inputField.focus();

		return <div className={`col nemo-widget-form__${type}__date__col`}>
			<div className="nemo-widget-form__input__wrapper">
				<input type="text" className="form-control" placeholder={placeholder} readOnly={true} spellCheck={false} ref={getRef}/>
				<div className="nemo-widget-icon nemo-widget-form__input__calendar" onClick={focusInput}/>
			</div>
		</div>;
	}
}