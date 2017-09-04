import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 200;

		this.fetchSuggestions = this.fetchSuggestions.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	fetchSuggestions({ value }) {
		const { sendAutocompleteRequest, type } = this.props;
		const searchText = value;
		
		// We don't want to harass servers too much.
		clearTimeout(this.autocompleteTimeout);
		
		// So we send request only if user hasn't been typing something for a while.
		this.autocompleteTimeout = setTimeout(() => {
			sendAutocompleteRequest(searchText, type);
		}, this.autocompleteWaitTime);
	}
	
	onChangeHandler(event, { newValue }) {
		this.props.changeAutocompleteValue(newValue, this.props.type);
	}
	
	render() {
		const { isLoading, placeholder, autocomplete, type } = this.props;
		const inputClassName = `form-control nemo-widget-form__${type} nemo-widget-form__input`;
		
		// Shortcuts for some functions.
		// const 
		// 	getRef = (input) => this.inputField = input,
		// 	focusInput = (event) => this.inputField.focus();
		
		return <div className="nemo-widget-form__input__wrapper">
			<Autosuggest
				suggestions={autocomplete.suggestions}
				onSuggestionsFetchRequested={this.fetchSuggestions}
				onSuggestionsClearRequested={() => null}
				getSuggestionValue={(item) => item.IATA}
				renderSuggestion={(item) => <div>{item.IATA}</div>}
				inputProps={{
					className: isLoading ? inputClassName + ' nemo-widget-form__input_loading' : inputClassName,
					spellCheck: false,
					placeholder,
					value: autocomplete.value,
					onChange: this.onChangeHandler
				}}
			/>
			
			<div className="nemo-widget-icon nemo-widget-form__input__arrow"/>
		</div>;
	}
}