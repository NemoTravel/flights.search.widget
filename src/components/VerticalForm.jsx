import React, { Component } from 'react';

import TicketsBlock from 'components/VerticalForm/Block/Tickets';
import RegistrationBlock from 'components/VerticalForm/Block/Registration';
import BookingsBlock from 'components/VerticalForm/Block/Bookings';

export default class VerticalForm extends Component {
	render() {
		const { isLoading, blockIsActive } = this.props.state;
		const { toggleBlock, autocompleteRequest } = this.props.actions;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<TicketsBlock 
				isActive={blockIsActive.tickets} 
				isLoading={isLoading} 
				toggleBlock={toggleBlock} 
				autocompleteRequest={autocompleteRequest}
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