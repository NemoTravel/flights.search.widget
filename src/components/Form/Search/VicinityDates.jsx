import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { bindActionCreators } from 'redux';
import {vicinityDatesSelect} from 'store/form/additional/selector';

class VicinityDates extends Component {
	render() {
		const {vicinityDatesAction, vicinityDatesSelect} = this.props;

		return <div >
			<label className="nemo-ui-checkbox" >
				<input className="nemo-ui-checkbox__input" type="checkbox" onChange={vicinityDatesAction} checked={vicinityDatesSelect}/>
				<span className="nemo-ui-checkbox__caption">text</span>
			</label>
		</div>
	}

	render2() {
		return <label className="nemo-ui-checkbox">
			<input className="nemo-ui-checkbox__input" type="checkbox"/>
				<span className="nemo-ui-checkbox__caption">text</span>
		</label>
	}
}

function mapStateToProps(state) {
	return {
		vicinityDatesSelect: vicinityDatesSelect(state)
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(VicinityDates);