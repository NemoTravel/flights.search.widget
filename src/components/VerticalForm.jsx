import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';

import SearchBlock from 'components/VerticalForm/Search';
import RegistrationBlock from 'components/VerticalForm/Registration';
import BookingsBlock from 'components/VerticalForm/Bookings';

class VerticalForm extends Component {
	render() {
		const { blockVisibility, toggleBlock, showErrors, startSearch } = this.props;
		
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<SearchBlock 
				isActive={blockVisibility.search}
				showErrors={showErrors}
				toggleBlock={toggleBlock}
				startSearch={startSearch}
			/>
			
			<RegistrationBlock
				isActive={blockVisibility.registration}
				toggleBlock={toggleBlock}
			/>
			
			<BookingsBlock
				isActive={blockVisibility.bookings}
				toggleBlock={toggleBlock}
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
	return bindActionCreators(formActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(VerticalForm);