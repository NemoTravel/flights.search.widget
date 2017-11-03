import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ClassType from 'components/Form/Search/ClassType';
import * as additionalActions from 'store/form/additional/actions';
import { getClassType } from 'store/form/additional/selector';
import { CLASS_TYPES, MODE_NEMO } from 'state';
import { i18n } from 'utils';

class ClassTypeContainer extends Component {

	render () {
		const { setClassType, classOptions, selectedClass, widgetMode } = this.props;

		return <ClassType
			setClassType={setClassType}
			classOptions={classOptions}
			classType={selectedClass}
			widgetMode={widgetMode}
		/>
	}
}

function mapStateToProps(state) {
	return {
		selectedClass: getClassType(state),
		classOptions: CLASS_TYPES,
		widgetMode: state.system.mode
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(ClassTypeContainer);