import React, { Component } from 'react';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import * as additionalActions from 'store/form/additional/actions';
import { bindActionCreators } from 'redux';
import {getClassType} from 'store/form/additional/selector';
import initialState from 'state';

class ClassType extends Component {
	renderContent() {
		let {setClassType, classType} = this.props;

		return <div className="widget-form-passengers__content">
			<div className="widget-form-passengers__items">
				<div onClick={() => setClassType('Ecomon')}>
					Эконом
				</div>
				<div onClick={() => setClassType('Business')}>
					Бизнес
				</div>
				<div onClick={() => setClassType('First')}>
					Первый
				</div>
			</div>
		</div>

	}

	componentDidMount() {
		console.log(this.props);
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
		classType: getClassType(state)
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(ClassType);