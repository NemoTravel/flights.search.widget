import React, { Component } from 'react';
import UIDropdown from 'components/UI/Dropdown';
import MobileHeader from 'components/UI/MobileHeader';
import PropTypes from 'prop-types';
import { i18n } from 'utils';
import { MODE_NEMO } from 'state';

export default class ClassType extends Component {
	static propTypes = {
		setClassType: PropTypes.func.isRequired,
		classOptions: PropTypes.array.isRequired,
		classType: PropTypes.string.isRequired,
		widgetMode: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);

		this.classSelectHeader = i18n('form', 'classSelectHeader');
	}

	renderOptions () {
		const closeBlock = () => this.dropdown.instanceRef.handleClickOutside();
		let { setClassType, classOptions } = this.props;

		return classOptions.map((value, index) => {
			return <div className="widget-form-classType__item" onClick={() => {setClassType(value); closeBlock()}} key={index}>
				<div className="widget-form-classType__title">
					{i18n('form','class_'+value)}
				</div>
			</div>
		});
	}

	renderContent() {
		const closeBlock = () => this.dropdown.instanceRef.handleClickOutside();

		return <div className="widget-form-classType__content">
			<MobileHeader
				className="widget-form-classType__header"
				title={this.classSelectHeader}
				onClose={closeBlock}
			/>

			<div className="widget-form-classType__items">
				{this.renderOptions()}
			</div>
		</div>
	}

	renderDropdownTrigger() {
		let { classType } = this.props;

		return <div className="widget-form-classType__trigger widget-ui-input__wrapper">
			<input type="text" className="form-control" value={i18n('form', 'class_' + classType)} readOnly={true} spellCheck={false}/>
			<div className="widget-ui-icon widget-ui-input__arrow"/>
		</div>;
	}

	render() {
		const { widgetMode } = this.props;

		return (widgetMode === MODE_NEMO) ? <div className="widget-form-classType">
			<UIDropdown
				contentElement={this.renderContent()}
				triggerElement={this.renderDropdownTrigger()}
				ref={ref => (this.dropdown = ref)}/>
		</div> : null;
	}
}