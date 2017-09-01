import React from 'react';
import { verticalFormReducer, defaultState } from '../reducers/VerticalFormReducer';
import { createStore } from 'redux';

import TicketsBlock from './VerticalForm/Block/Tickets';
import RegistrationBlock from './VerticalForm/Block/Registration';
import BookingsBlock from './VerticalForm/Block/Bookings';

export default class VerticalForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = defaultState;
		this.store = createStore(verticalFormReducer);
		
		this.store.subscribe(() => {
			this.setState(this.store.getState());
		});
	}
	
	toggleBlockTickets() {
		this.store.dispatch({ type: `TOGGLE_BLOCK`, blockName: 'tickets' })
	}
	
	toggleBlockRegistration() {
		this.store.dispatch({ type: `TOGGLE_BLOCK`, blockName: 'registration' })
	}
	
	toggleBlockBookings() {
		this.store.dispatch({ type: `TOGGLE_BLOCK`, blockName: 'bookings' })
	}
	
	render() {
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<TicketsBlock isActive={this.state.blockIsActive.tickets} toggle={this.toggleBlockTickets.bind(this)}/>
			<RegistrationBlock isActive={this.state.blockIsActive.registration} toggle={this.toggleBlockRegistration.bind(this)}/>
			<BookingsBlock isActive={this.state.blockIsActive.bookings} toggle={this.toggleBlockBookings.bind(this)}/>
		</section>;
	}
}