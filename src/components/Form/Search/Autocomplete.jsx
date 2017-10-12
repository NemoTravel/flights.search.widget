import React, { Component } from 'react';
import MobileHeader from 'components/UI/MobileHeader';
import classnames from 'classnames';
import Tooltip from 'components/UI/Tooltip';
import Option from 'components/Form/Search/Autocomplete/Option';
import Value from 'components/Form/Search/Autocomplete/Value';
import Select from 'react-select';
import { i18n } from 'utils';
import { MODE_WEBSKY } from 'state';

export default class Autocomplete extends Component {
	constructor(props) {
		super(props);
		
		this.input = null;
		this.autocompleteTimeout = null;
		this.autocompleteWaitTime = 200;
		this.state = { isFocused: false };
		this.type = null;
		this.isGridMode = props.system.routingGrid || props.system.mode === MODE_WEBSKY;
		this.placeholder = '';
		this.mobileTitle = '';
		this.defaultErrorText = '';
		this.sameAirportsErrorText = i18n('form', 'sameAirportsError');

		this.fetchSuggestions = this.fetchSuggestions.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onFocusHandler = this.onFocusHandler.bind(this);
		this.selectOption = this.selectOption.bind(this);
	}

	/**
	 * Load autocomplete suggestions by given search string.
	 * 
	 * @param {String} searchText
	 */
	fetchSuggestions(searchText = '') {
		const { sendAutocompleteRequest } = this.props;
		
		if (searchText || this.isGridMode) {
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
		if (!this.isGridMode) {
			this.fetchSuggestions(searchString);
		}
		
		return searchString;
	}
	
	onFocusHandler() {
		this.setState({ isFocused: true });
		this.fetchSuggestions();
	}

	/**
	 * Render airport IATA code hint.
	 * 
	 * @returns {*}
	 */
	renderAirportCode() {
		const { airport, isLoading } = this.props;
		
		const className = classnames(
			'widget-form-airports__airportCode',
			{ 'widget-form-airports__airportCode_withArrow': this.isGridMode }
		);
		
		return airport && !isLoading ? <span className={className}>{airport.IATA}</span> : null;
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
		const { showErrors, suggestions, isLoading, airport, sameAirportsError } = this.props;
		
		return this.state.isFocused !== nextState.isFocused ||
			showErrors !== nextProps.showErrors ||
			sameAirportsError !== nextProps.sameAirportsError ||
			suggestions !== nextProps.suggestions ||
			airport !== nextProps.airport ||
			isLoading !== nextProps.isLoading;
	}
	
	render() {
		const { suggestions, isLoading, system:config, airport, showErrors, sameAirportsError } = this.props;
		
		const selectedValue = airport ? {
			label: airport.name,
			value: airport
		} : null;
		
		const mobileHeaderClassName = classnames(
			'widget-form-airports__header',
			{ 'widget-form-airports__header_visible': this.state.isFocused }
		);
		
		const errorText = sameAirportsError ? this.sameAirportsErrorText : this.defaultErrorText;
		
		return <div className="col widget-form-airports__col">
			<MobileHeader title={this.mobileTitle} className={mobileHeaderClassName}>
				<div className="widget-form-airports__underlay"/>
			</MobileHeader>
			
			<div className="widget-form-airports__select__wrapper">
				<Tooltip isActive={(!airport || sameAirportsError) && showErrors} isCentered={true} message={errorText}/>
				
				<Select
					clearable={false}
					autoBlur={true}
					autosize={false}
					noResultsText={i18n('form', 'noResults')}
					openOnFocus={true}
					backspaceRemoves={false}
					className="widget-form-airports__select"
					value={selectedValue}
					options={suggestions}
					isLoading={isLoading}
					onInputChange={this.onChangeHandler}
					placeholder={this.placeholder}
					onChange={this.selectOption}
					onFocus={this.onFocusHandler}
					onBlur={() => {
						this.props.changeAutocompleteSuggestions([], this.type);
						this.setState({ isFocused: false });
					}}
					optionRenderer={option => <Option option={option}/>}
					valueRenderer={value => <Value value={value} placeholder={this.placeholder}/>}
					arrowRenderer={() => this.isGridMode ? <div className="widget-ui-icon widget-ui-input__arrow"/> : null}
					inputProps={{
						spellCheck: false,
						readOnly: config.readOnlyAutocomplete && this.isGridMode,
					}}
				/>

				{this.renderAirportCode()}
				{this.renderSwitcher()}
			</div>
		</div>;
	}
}