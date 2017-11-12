import React from 'react';
import UIDropdown from 'components/UI/Dropdown';
import Tooltip from 'components/UI/Tooltip';
import Counter from 'components/Form/Search/Passengers/Counter';
import MobileHeader from 'components/UI/MobileHeader';
import ClassType from 'components/Form/Search/Passengers/ClassType';
import { i18n } from 'utils';
import { MODE_NEMO } from 'state';

export default class Selector extends React.Component {
	/**
	 * Render passengers counters;
	 *
	 * @returns {Array}
	 */
	renderCounters() {
		const { passengers, addPassenger, removePassenger, counterAvailability } = this.props;

		return passengers.map((passenger, i) => {
			let canIncrease = true;
			let canDecrease = true;

			if (counterAvailability[passenger.code]) {
				canIncrease = counterAvailability[passenger.code].canIncrease;
				canDecrease = counterAvailability[passenger.code].canDecrease;
			}

			return <Counter
				key={i}
				addPassenger={addPassenger}
				removePassenger={removePassenger}
				title={i18n('form', passenger.title)}
				ageTitle={i18n('form', passenger.ageTitle)}
				code={passenger.code}
				count={passenger.count}
				canAddPassenger={canIncrease}
				canRemovePassenger={canDecrease}
			/>;
		});
	}

	/**
	 * Render clickable input element.
	 *
	 * @returns {XML}
	 */
	renderDropdownTrigger() {
		return <div className="widget-form-passengers__trigger widget-ui-input__wrapper">
			<input type="text" className="form-control" value={this.props.title} readOnly={true} spellCheck={false} onFocus={event => event.target.blur()}/>
			<div className="widget-ui-icon widget-ui-input__arrow"/>
		</div>;
	}

	/**
	 * Render dropdown block with passengers counters.
	 *
	 * @returns {XML}
	 */
	renderDropdownContent() {
		const closeBlock = () => this.dropdown.instanceRef.handleClickOutside();
		const { setClassType, classOptions, selectedClass, widgetMode } = this.props;

		return <div className="widget-form-passengers__content">
			<MobileHeader
				className="widget-form-passengers__header"
				title={i18n('form', 'passengersSelectHeader')}
				onClose={closeBlock}
			/>

			<div className="widget-form-passengers__items">
				{this.renderCounters()}

				{widgetMode === MODE_NEMO ? <ClassType
					setClassType={setClassType}
					classOptions={classOptions}
					classType={selectedClass}
				/> : null}
			</div>

			<div className="widget-form-passengers__footer">
				<div className="widget-form-passengers__footer__button" onClick={closeBlock}>
					{i18n('form', 'passengers_done')}
				</div>
			</div>
		</div>;
	}

	render() {
		const { totalPassengersCount } = this.props;

		return <div className="form-group widget-form-passengers">
			<Tooltip message={i18n('form', 'passengersError')} isActive={totalPassengersCount <= 0}>
				<UIDropdown triggerElement={this.renderDropdownTrigger()} contentElement={this.renderDropdownContent()} ref={ref => (this.dropdown = ref)}/>
			</Tooltip>
		</div>;
	}
}
