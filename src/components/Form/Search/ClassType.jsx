import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { bindActionCreators } from 'redux';
import {getClassType} from 'store/form/additional/selector';
import {CLASS_TYPES} from 'state';

class ClassType extends Component {

	renderOptions () {
		let {setClassType, classOptions} = this.props;

		return classOptions.map((value, index) => {
			return <div onClick={() => setClassType(value)} key={index}>
				{value}
			</div>
		});
	}

	renderContent() {

		return <div className="widget-form-passengers__content">
			<div className="widget-form-passengers__items">
				{this.renderOptions()}
			</div>
		</div>

	}

	renderDropdownTrigger() {
		return <div className="widget-form-passengers__trigger widget-ui-input__wrapper">
			<input type="text" className="form-control" value={this.props.classType} defaultValue={this.props.classType} readOnly={true} spellCheck={false}/>
			<div className="widget-ui-icon widget-ui-input__arrow"/>
		</div>;
	}

	render () {
		return <div>
			<UIDropdown contentElement={this.renderContent()} triggerElement={this.renderDropdownTrigger()} />
		</div>
	}

}

function mapStateToProps(state) {
	return {
		classType: getClassType(state),
		classOptions: CLASS_TYPES
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(ClassType);