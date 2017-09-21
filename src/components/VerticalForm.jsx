import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';

import SearchBlock from 'components/VerticalForm/Search';
import RegistrationBlock from 'components/VerticalForm/Registration';
import BookingsBlock from 'components/VerticalForm/Bookings';

class VerticalForm extends Component {
	render() {
		const { blockVisibility } = this.props;
		const { toggleBlock } = this.props.actions;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<SearchBlock 
				isActive={blockVisibility.search}
				actions={this.props.actions}
			/>
			
			<RegistrationBlock
				isActive={blockVisibility.registration}
				actions={{toggleBlock}}
			/>
			
			<BookingsBlock
				isActive={blockVisibility.bookings}
				actions={{toggleBlock}}
			/>
		</section>;
	}
}

function mapStateToProps(state) {
	return {
		blockVisibility: state.form.blockVisibility
	}
}

function mapActionsToProps(dispatch) {
	return {
		actions: bindActionCreators(formActions, dispatch)
	};
}

export default connect(mapStateToProps, mapActionsToProps)(VerticalForm);