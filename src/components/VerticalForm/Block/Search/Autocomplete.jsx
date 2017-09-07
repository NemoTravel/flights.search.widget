import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 200;

		this.fetchSuggestions = this.fetchSuggestions.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.clearSuggestions = this.clearSuggestions.bind(this);
		this.clearAirport = this.clearAirport.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.renderInputField = this.renderInputField.bind(this);
		this.selectSuggestion = this.selectSuggestion.bind(this);
	}

	/**
	 * Clear loaded autocomplete suggestions.
	 */
	clearSuggestions() {
		this.props.changeAutocompleteSuggestions([], this.props.type);
	}

	/**
	 * Reset selected airport.
	 */
	clearAirport() {
		this.props.selectAirport(null, this.props.type);
		this.props.changeAutocompleteInputValue('', this.props.type);
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
	 * @param {Object} event
	 * @param {String} searchString
	 */
	onChangeHandler(event, { newValue: searchString }) {
		this.props.changeAutocompleteInputValue(searchString, this.props.type);
	}

	/**
	 * Render element from suggestions (autocomplete) list.
	 * 
	 * @param {Object} item
	 * @returns {XML}
	 */
	renderSuggestion(item) {
		const { name: airportName, IATA: airportIATA } = item;
		
		return <div className="nemo-widget-form__input__suggestion">
			<span className="nemo-widget-form__input__suggestion__title">{airportName}</span>
			<span className="nemo-widget-form__input__suggestion__code">{airportIATA}</span>
		</div>;
	}

	/**
	 * Render airport IATA code hint.
	 * 
	 * @returns {*}
	 */
	renderAirportCode() {
		const { isLoading, airport } = this.props.state;
		const isActive = this.props.system.form.showAirportIATA && !isLoading && airport;
		let className = classnames(
			'nemo-widget-form__input__airportCode',
			{ 'nemo-widget-form__input__airportCode_withArrow': this.props.system.airline }
		);
		
		return isActive ? <span className={className}>{airport.IATA}</span> : null;
	}

	/**
	 * Render airport switcher.
	 * 
	 * @returns {*}
	 */
	renderSwitcher() {
		let className = classnames(
			'nemo-ui-icon nemo-widget-form__input__switcher',
			{ 'nemo-ui-icon nemo-widget-form__input__switcher_withArrow': this.props.system.airline }
		);
		
		return this.props.switchAirports ? <div className={className} onClick={this.props.switchAirports}/> : null;
	}

	/**
	 * Render select-like arrow.
	 * Enabled if `airline` config parameter has been specified.
	 * 
	 * Sets focus on autocomplete input field and runs autocomplete request.
	 * 
	 * @returns {*}
	 */
	renderArrow() {
		return this.props.system.airline ? <div className="nemo-ui-icon nemo-widget-form__input__arrow" onClick={() => this.inputField.focus()}/> : null;
	}

	/**
	 * Render autocomplete input field.
	 * 
	 * @param {Object} inputProps
	 * @returns {XML}
	 */
	renderInputField(inputProps) {
		return <input type="text" {...inputProps} ref={input => this.inputField = input} />
	}

	/**
	 * Set selected airport to the state.
	 * 
	 * @param {Object} event
	 * @param {Object} airport
	 */
	selectSuggestion(event, { suggestion: airport }) {
		this.props.selectAirport(airport, this.props.type);
	}
	
	render() {
		const { placeholder, state, type, system:config } = this.props;
		let inputClassName = classnames(
			`form-control nemo-widget-form__${type} nemo-widget-form__input`,
			{ 'nemo-widget-form__input_loading': state.isLoading },
			{ 'nemo-widget-form__input_pointer': config.form.readOnlyAutocomplete }
		);
		
		return <div className="nemo-widget-form__input__wrapper">
			<Autosuggest
				id={type}
				suggestions={state.suggestions}
				onSuggestionsFetchRequested={this.fetchSuggestions}
				onSuggestionsClearRequested={this.clearSuggestions}
				getSuggestionValue={(item) => item.name}
				renderSuggestion={this.renderSuggestion}
				onSuggestionSelected={this.selectSuggestion}
				focusInputOnSuggestionClick={false}
				shouldRenderSuggestions={(value) => {
					return config.airline || (value && (!state.airport || state.airport.name !== value));
				}}
				renderInputComponent={this.renderInputField}
				inputProps={{
					className: inputClassName,
					spellCheck: false,
					readOnly: config.form.readOnlyAutocomplete,
					placeholder,
					value: state.inputValue,
					onChange: this.onChangeHandler,
					onFocus: this.clearAirport
				}}
			/>
			
			{this.renderAirportCode()}
			{this.renderSwitcher()}
			{this.renderArrow()}
		</div>;
	}
}