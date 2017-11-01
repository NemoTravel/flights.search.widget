import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UIDropdown from 'components/UI/Dropdown';
import MobileHeader from 'components/UI/MobileHeader';
import * as additionalActions from 'store/form/additional/actions';
import { getClassType } from 'store/form/additional/selector';
import { CLASS_TYPES, MODE_NEMO } from 'state';
import { i18n } from 'utils';

class ClassType extends Component {

	renderOptions (closeBlock) {
		let { setClassType, classOptions } = this.props;

		return classOptions.map((value, index) => {
			return <div className="widget-form-passengers__item" onClick={() => {setClassType(value); closeBlock()}} key={index}>
				<div className="widget-form-passengers__title">
					{i18n('form','class_'+value)}
				</div>
			</div>
		});
	}

	renderContent() {
		const closeBlock = () => this.dropdown.instanceRef.handleClickOutside();

		return <div className="widget-form-passengers__content">
			<MobileHeader
				className="widget-form-passengers__header"
				title={i18n('form', 'classSelectHeader')}
				onClose={closeBlock}
			/>

			<div className="widget-form-passengers__items">
				{this.renderOptions(closeBlock)}
			</div>
		</div>
	}

	renderDropdownTrigger() {
		let { classType } = this.props;

		return <div className="widget-form-passengers__trigger widget-ui-input__wrapper">
			<input type="text" className="form-control" value={i18n('form', 'class_' + classType)} readOnly={true} spellCheck={false}/>
			<div className="widget-ui-icon widget-ui-input__arrow"/>
		</div>;
	}

	render () {
		const { widgetMode } = this.props;

		if (widgetMode === MODE_NEMO) {
			return <div className="widget-form-classType">
				<UIDropdown contentElement={this.renderContent()} triggerElement={this.renderDropdownTrigger()}
							ref={ref => (this.dropdown = ref)}/>
			</div>
		}
	}

}

function mapStateToProps(state) {
	return {
		classType: getClassType(state),
		classOptions: CLASS_TYPES,
		widgetMode: state.system.mode
	}
}

function mapActionsToProps(dispatch) {
	return bindActionCreators(additionalActions, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(ClassType);