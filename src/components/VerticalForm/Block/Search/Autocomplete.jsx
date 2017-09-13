import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';

export default class Autocomplete extends Component {
	get type() { return null; }
	get placeholder() { return ''; }
	
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
		if (!this.props.system.routingGrid) {
			this.props.changeAutocompleteSuggestions([], this.type);
		}
	}

	/**
	 * Reset selected airport.
	 */
	clearAirport() {
		this.props.selectAirport(null, this.type);
		this.props.changeAutocompleteInputValue('', this.type);
	}

	/**
	 * Load autocomplete suggestions by given search string.
	 * 
	 * @param value
	 */
	fetchSuggestions({ value }) {
		const { sendAutocompleteRequest, system } = this.props;
		const searchText = value;
		
		if (searchText || system.routingGrid) {
			// We don't want to harass servers too much.
			clearTimeout(this.autocompleteTimeout);
			
			// So we send request only if user hasn't been typing something for a while.
			this.autocompleteTimeout = setTimeout(() => {
				sendAutocompleteRequest(searchText, this.type);
			}, this.autocompleteWaitTime);
		}
	}

	/**
	 * Change autocomplete value.
	 * 
	 * @param {Object} event
	 * @param {String} searchString
	 */
	onChangeHandler(event, { newValue: searchString }) {
		this.props.changeAutocompleteInputValue(searchString, this.type);
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
		const isActive = this.props.system.showAirportIATA && !isLoading && airport;
		let className = classnames(
			'nemo-widget-form__input__airportCode',
			{ 'nemo-widget-form__input__airportCode_withArrow': this.props.system.routingGrid }
		);
		
		return isActive ? <span className={className}>{airport.IATA}</span> : null;
	}

	/**
	 * Render airport switcher.
	 * 
	 * @returns {*}
	 */
	renderSwitcher() {
		return null;
	}

	/**
	 * Render select-like arrow.
	 * Enabled if `routingGrid` config parameter has been specified.
	 * 
	 * Sets focus on autocomplete input field and runs autocomplete request.
	 * 
	 * @returns {*}
	 */
	renderArrow() {
		return this.props.system.routingGrid ? <div className="nemo-ui-icon nemo-widget-form__input__arrow" onClick={() => this.inputField.focus()}/> : null;
	}

	/**
	 * Render autocomplete input field.
	 * 
	 * @param {Object} inputProps
	 * @returns {XML}
	 */
	renderInputField(inputProps) {
		const getRef = (input) => {
			this.inputField = input;
			
			if (this.props.getRef) {
				this.props.getRef(input);
			}
		};
		
		return <input type="text" {...inputProps} ref={getRef} />
	}

	/**
	 * Set selected airport to the state.
	 * 
	 * @param {Object} event
	 * @param {Object} airport
	 */
	selectSuggestion(event, { suggestion: airport }) {
		this.props.selectAirport(airport, this.type);
	}
	
	render() {
		const { state, system:config } = this.props;
		let inputClassName = classnames(
			`form-control nemo-widget-form__${this.type} nemo-widget-form__input`,
			{ 'nemo-widget-form__input_loading': state.isLoading },
			{ 'nemo-widget-form__input_pointer': config.readOnlyAutocomplete }
		);
		
		return <div className="nemo-widget-form__input__wrapper">
			<Autosuggest
				id={this.type}
				suggestions={state.suggestions}
				onSuggestionsFetchRequested={this.fetchSuggestions}
				onSuggestionsClearRequested={this.clearSuggestions}
				getSuggestionValue={(item) => item.name}
				renderSuggestion={this.renderSuggestion}
				onSuggestionSelected={this.selectSuggestion}
				focusInputOnSuggestionClick={false}
				shouldRenderSuggestions={(value) => {
					return config.routingGrid || (value && value.length > 1);
				}}
				renderInputComponent={this.renderInputField}
				inputProps={{
					className: inputClassName,
					spellCheck: false,
					readOnly: config.readOnlyAutocomplete,
					placeholder: this.placeholder,
					value: state.inputValue,
					onChange: this.onChangeHandler
				}}
			/>
			
			{this.renderAirportCode()}
			{this.renderSwitcher()}
			{this.renderArrow()}
		</div>;
	}
}