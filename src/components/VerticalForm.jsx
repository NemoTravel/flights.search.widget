import React, { Component } from 'react';

import TicketsBlock from 'components/VerticalForm/Block/Tickets';
import RegistrationBlock from 'components/VerticalForm/Block/Registration';
import BookingsBlock from 'components/VerticalForm/Block/Bookings';

export default class VerticalForm extends Component {
	render() {
		const { blockIsActive, toggleBlock } = this.props;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<TicketsBlock type="tickets" isActive={blockIsActive.tickets} toggleHandler={toggleBlock}/>
			<RegistrationBlock type="registration" isActive={blockIsActive.registration} toggleHandler={toggleBlock}/>
			<BookingsBlock type="bookings" isActive={blockIsActive.bookings} toggleHandler={toggleBlock}/>
		</section>;
	}
}