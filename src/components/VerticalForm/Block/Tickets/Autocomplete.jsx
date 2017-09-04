import React, { Component } from 'react';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 150;

		this.changeHandler = this.changeHandler.bind(this);
	}
	
	changeHandler(event) {
		const { autocompleteRequest, type } = this.props;
		const searchText = event.target.value;
		
		// We don't want to harass servers too much.
		clearTimeout(this.autocompleteTimeout);
		
		this.autocompleteTimeout = setTimeout(() => {
			autocompleteRequest(searchText, type);
		}, this.autocompleteWaitTime);
	}
	
	render() {
		const 
			{ placeholder, type, isLoading } = this.props,
			getRef = (input) => this.inputField = input,
			focusInput = (event) => this.inputField.focus();

		return <div className="nemo-widget-form__input__wrapper">
			<input 
				type="text" 
				className={`form-control nemo-widget-form__${type} nemo-widget-form__input ${isLoading ? 'nemo-widget-form__input_loading' : ''}`} 
				onChange={this.changeHandler} 
				placeholder={placeholder} 
				spellCheck={false} 
				ref={getRef}
			/>
			<div className="nemo-widget-icon nemo-widget-form__input__arrow" onClick={focusInput}/>
		</div>;
	}
}