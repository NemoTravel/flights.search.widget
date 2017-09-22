import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import classnames from 'classnames';
import Tooltip from 'components/UI/Tooltip';

export default class Autocomplete extends Component {
	get type() { return null; }
	get placeholder() { return ''; }
	get tooltipText() { return ''; }
	
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
	 * Select all text in input when focused.
	 * 
	 * @param {Object} event
	 */
	onFocusHandler(event) {
		if (event.target && event.target.value) {
			event.target.setSelectionRange(0, event.target.value.length);
		}
	}

	/**
	 * Render element from suggestions (autocomplete) list.
	 * 
	 * @param {Object} item
	 * @returns {XML}
	 */
	renderSuggestion(item) {
		const { name: airportName, IATA: airportIATA } = item;
		
		return <div className="widget-form-airports__suggestion">
			<span className="widget-form-airports__suggestion__title">{airportName}</span>
			<span className="widget-form-airports__suggestion__code">{airportIATA}</span>
		</div>;
	}

	/**
	 * Render airport IATA code hint.
	 * 
	 * @returns {*}
	 */
	renderAirportCode() {
		const { isLoading, airport } = this.props;
		const isActive = this.props.system.showAirportIATA && !isLoading && airport;
		let className = classnames(
			'widget-form-airports__airportCode',
			{ 'widget-form-airports__airportCode_withArrow': this.props.system.routingGrid }
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
		return this.props.system.routingGrid ? <div className="widget-ui-icon widget-ui-input__arrow"/> : null;
	}

	/**
	 * Render autocomplete input field.
	 * 
	 * @param {Object} inputProps
	 * @returns {XML}
	 */
	renderInputField(inputProps) {
		const { showErrors, airport } = this.props;
		
		if (this.props.getRef) {
			inputProps.ref = this.props.getRef;
		}
		
		return <Tooltip isActive={!airport && showErrors} isCentered={true} message={this.tooltipText}>
			<input type="text" {...inputProps}/>
		</Tooltip>;
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
	
	shouldComponentUpdate(nextProps, nextState) {
		const { showErrors, suggestions, isLoading, inputValue, airport } = this.props;
		
		return showErrors !== nextProps.showErrors ||
			suggestions !== nextProps.suggestions ||
			inputValue !== nextProps.inputValue ||
			airport !== nextProps.airport ||
			isLoading !== nextProps.isLoading;
	}
	
	render() {
		const { suggestions, isLoading, inputValue, system:config } = this.props;
		let inputClassName = classnames(
			`form-control widget-ui-input`,
			{ 'widget-ui-input_loading': isLoading },
			{ 'widget-ui-input_pointer': config.readOnlyAutocomplete && config.routingGrid }
		);
		
		return <div className="col widget-form-airports__col">
			<div className="widget-ui-input__wrapper">
				<Autosuggest
					id={this.type}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.fetchSuggestions}
					onSuggestionsClearRequested={this.clearSuggestions}
					getSuggestionValue={(item) => item.name}
					renderSuggestion={this.renderSuggestion}
					onSuggestionSelected={this.selectSuggestion}
					highlightFirstSuggestion={true}
					focusInputOnSuggestionClick={false}
					shouldRenderSuggestions={(value) => {
						return config.routingGrid || (value && value.length > 1);
					}}
					renderInputComponent={this.renderInputField}
					inputProps={{
						className: inputClassName,
						spellCheck: false,
						readOnly: config.readOnlyAutocomplete && config.routingGrid,
						placeholder: this.placeholder,
						value: inputValue,
						onChange: this.onChangeHandler,
						onFocus: this.onFocusHandler
					}}
				/>
				
				{this.renderAirportCode()}
				{this.renderSwitcher()}
				{this.renderArrow()}
			</div>
		</div>;
	}
}