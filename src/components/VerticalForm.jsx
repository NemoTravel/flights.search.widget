import React, { Component } from 'react';

import TicketsBlock from 'components/VerticalForm/Block/Tickets';
import RegistrationBlock from 'components/VerticalForm/Block/Registration';
import BookingsBlock from 'components/VerticalForm/Block/Bookings';

export default class VerticalForm extends Component {
	render() {
		const { blockIsActive, search } = this.props.state;
		const { toggleBlock, sendAutocompleteRequest, changeAutocompleteInputValue, changeAutocompleteSuggestions, selectAirport } = this.props.actions;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<TicketsBlock 
				isActive={blockIsActive.tickets} 
				toggleBlock={toggleBlock}
				search={search}
				sendAutocompleteRequest={sendAutocompleteRequest}
				changeAutocompleteInputValue={changeAutocompleteInputValue}
				changeAutocompleteSuggestions={changeAutocompleteSuggestions}
				selectAirport={selectAirport}
			/>
			
			<RegistrationBlock 
				isActive={blockIsActive.registration} 
				toggleBlock={toggleBlock}
			/>
			
			<BookingsBlock 
				isActive={blockIsActive.bookings} 
				toggleBlock={toggleBlock}
			/>
		</section>;
	}
}