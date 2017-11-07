import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClassType from 'components/Form/Search/ClassType';
import * as additionalActions from 'store/form/additional/actions';
import { getClassType } from 'store/form/additional/selector';
import { CLASS_TYPES } from 'state';
import { MODE_NEMO } from 'state';

class ClassTypeContainer extends Component {
	render() {
		const { setClassType, classOptions, selectedClass, widgetMode } = this.props;

		return <ClassType
			setClassType={setClassType}
			classOptions={classOptions}
			classType={selectedClass}
			isVisible={widgetMode === MODE_NEMO}
		/>;
	}
}

export default connect(
	state => {
		return {
			selectedClass: getClassType(state),
			classOptions: CLASS_TYPES,
			widgetMode: state.system.mode
		};
	},
	dispatch => bindActionCreators(additionalActions, dispatch)
)(ClassTypeContainer);
