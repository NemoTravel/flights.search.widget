import React, { Component } from 'react';
import MobileHeader from 'components/UI/MobileHeader';
import classnames from 'classnames';
import Tooltip from 'components/UI/Tooltip';
import Select from 'react-select';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		
		this.input = null;
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 200;
		this.state = { isFocused: false };
		this.type = null;
		this.placeholder = '';
		this.mobileTitle = '';
		this.tooltipText = '';

		this.fetchSuggestions = this.fetchSuggestions.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.renderOption = this.renderOption.bind(this);
		this.selectOption = this.selectOption.bind(this);
	}

	/**
	 * Load autocomplete suggestions by given search string.
	 * 
	 * @param {String} searchText
	 */
	fetchSuggestions(searchText) {
		const { sendAutocompleteRequest, system } = this.props;
		
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
	 * @param {String} searchString
	 */
	onChangeHandler(searchString) {
		this.fetchSuggestions(searchString);
		return searchString;
	}

	/**
	 * Render option element.
	 * 
	 * @param {Object} option
	 * @returns {XML}
	 */
	renderOption(option) {
		const { airport, country, isDirect } = option.value;
		
		return <div className="widget-form-airports__suggestion">
			<span className={classnames('widget-form-airports__suggestion__title', { 'widget-form-airports__suggestion__title_bold': isDirect })}>
				{airport.name}
			</span>

			{country ? <span className="widget-form-airports__suggestion__countryName">{country.name}</span> : null}

			<span className="widget-form-airports__suggestion__code">
				{airport.IATA}
			</span>
		</div>;
	}

	/**
	 * Render airport IATA code hint.
	 * 
	 * @returns {*}
	 */
	renderAirportCode() {
		const { airport, isLoading } = this.props;
		return airport && !isLoading
			? <span className="widget-form-airports__airportCode widget-form-airports__airportCode_withArrow">{airport.IATA}</span> 
			: null;
	}

	/**
	 * Render airport swapper.
	 * 
	 * @returns {*}
	 */
	renderSwitcher() {
		return null;
	}

	/**
	 * Set selected airport to the state.
	 * 
	 * @param {Object} option
	 */
	selectOption(option) {
		if (option && option.value && option.value.airport) {
			this.props.selectAirport(option.value.airport, this.type);
		}
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		const { showErrors, suggestions, isLoading, airport } = this.props;
		
		return this.state.isFocused !== nextState.isFocused ||
			showErrors !== nextProps.showErrors ||
			suggestions !== nextProps.suggestions ||
			airport !== nextProps.airport ||
			isLoading !== nextProps.isLoading;
	}
	
	render() {
		const { suggestions, isLoading, system:config, airport, showErrors } = this.props;
		
		const selectedValue = airport ? {
			label: airport.name,
			value: airport
		} : null;
		
		const mobileHeaderClassName = classnames(
			'widget-form-airports__header',
			{ 'widget-form-airports__header_visible': this.state.isFocused }
		);
		
		return <div className="col widget-form-airports__col">
			<MobileHeader title={this.mobileTitle} className={mobileHeaderClassName}>
				<div className="widget-form-airports__underlay"/>
			</MobileHeader>
			
			<div className="widget-form-airports__select__wrapper">
				<Tooltip isActive={!airport && showErrors} isCentered={true} message={this.tooltipText}/>
				
				<Select
					clearable={false}
					autoBlur={true}
					autosize={false}
					noResultsText={null}
					openOnFocus={true}
					backspaceRemoves={false}
					className={classnames('widget-form-airports__select')}
					value={selectedValue}
					options={suggestions}
					isLoading={isLoading}
					onInputChange={this.onChangeHandler}
					placeholder={this.placeholder}
					onChange={this.selectOption}
					onFocus={() => {
						this.setState({ isFocused: true });
						this.fetchSuggestions('');
					}}
					onBlur={() => this.setState({ isFocused: false })}
					optionRenderer={this.renderOption}
					arrowRenderer={() => <div className="widget-ui-icon widget-ui-input__arrow"/>}
					inputProps={{
						spellCheck: false,
						readOnly: config.readOnlyAutocomplete && config.routingGrid,
					}}
				/>

				{this.renderAirportCode()}
				{this.renderSwitcher()}
			</div>
		</div>;
	}
}