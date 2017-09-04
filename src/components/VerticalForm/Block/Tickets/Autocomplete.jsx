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
		
		// So we send request only if user hasn't been typing something for a while.
		this.autocompleteTimeout = setTimeout(() => {
			autocompleteRequest(searchText, type);
		}, this.autocompleteWaitTime);
	}
	
	render() {
		// Shortcuts for some functions.
		const 
			getRef = (input) => this.inputField = input,
			focusInput = (event) => this.inputField.focus();
		
		let inputClassName = `form-control nemo-widget-form__${this.props.type} nemo-widget-form__input`;
		
		// Show loading spinner.
		if (this.props.isLoading) {
			inputClassName += ' nemo-widget-form__input_loading';
		}

		return <div className="nemo-widget-form__input__wrapper">
			<input 
				type="text" 
				className={inputClassName} 
				onChange={this.changeHandler} 
				placeholder={this.props.placeholder} 
				spellCheck={false} 
				ref={getRef}
			/>
			
			<div className="nemo-widget-icon nemo-widget-form__input__arrow" onClick={focusInput}/>
		</div>;
	}
}