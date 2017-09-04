import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 200;

		this.fetchSuggestions = this.fetchSuggestions.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.clearSuggestions = this.clearSuggestions.bind(this);
	}

	/**
	 * Clear loaded autocomplete suggestions.
	 */
	clearSuggestions() {
		this.props.changeAutocompleteSuggestions([], this.props.type);
	}

	/**
	 * Load autocomplete suggestions by given search string.
	 * 
	 * @param value
	 */
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

	/**
	 * Change autocomplete value.
	 * 
	 * @param event
	 * @param newValue
	 */
	onChangeHandler(event, { newValue }) {
		this.props.changeAutocompleteValue(newValue, this.props.type);
	}
	
	render() {
		const { placeholder, autocomplete, type } = this.props;
		const inputClassName = `form-control nemo-widget-form__${type} nemo-widget-form__input`;
		
		// Shortcuts for some functions.
		// const 
		// 	getRef = (input) => this.inputField = input,
		// 	focusInput = (event) => this.inputField.focus();
		
		return <div className="nemo-widget-form__input__wrapper">
			<Autosuggest
				suggestions={autocomplete.suggestions}
				onSuggestionsFetchRequested={this.fetchSuggestions}
				onSuggestionsClearRequested={this.clearSuggestions}
				getSuggestionValue={(item) => item.name}
				renderSuggestion={(item) => <div>{item.name}</div>}
				inputProps={{
					className: autocomplete.isLoading ? inputClassName + ' nemo-widget-form__input_loading' : inputClassName,
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