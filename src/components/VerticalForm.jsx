import React, { Component } from 'react';

import SearchBlock from 'components/VerticalForm/Block/Search';
import RegistrationBlock from 'components/VerticalForm/Block/Registration';
import BookingsBlock from 'components/VerticalForm/Block/Bookings';

export default class VerticalForm extends Component {
	render() {
		const { search, registration, bookings, blockVisibility } = this.props.state;
		const { toggleBlock } = this.props.actions;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<SearchBlock 
				isActive={blockVisibility.search}
				state={search}
				actions={this.props.actions}
			/>
			
			<RegistrationBlock
				isActive={blockVisibility.registration}
				state={registration}
				actions={{toggleBlock}}
			/>
			
			<BookingsBlock
				isActive={blockVisibility.bookings}
				state={bookings}
				actions={{toggleBlock}}
			/>
		</section>;
	}
}