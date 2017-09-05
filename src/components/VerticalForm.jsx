import React, { Component } from 'react';

import SearchBlock from 'components/VerticalForm/Block/Search';
import RegistrationBlock from 'components/VerticalForm/Block/Registration';
import BookingsBlock from 'components/VerticalForm/Block/Bookings';

export default class VerticalForm extends Component {
	render() {
		const { blockIsActive, search } = this.props.state;
		const { toggleBlock } = this.props.actions;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<SearchBlock 
				isActive={blockIsActive.search} 
				search={search}
				actions={this.props.actions}
				system={this.props.system}
			/>
			
			<RegistrationBlock 
				isActive={blockIsActive.registration}
				actions={{toggleBlock}}
			/>
			
			<BookingsBlock 
				isActive={blockIsActive.bookings}
				actions={{toggleBlock}}
			/>
		</section>;
	}
}