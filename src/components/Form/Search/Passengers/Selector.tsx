import * as React from 'react';
import UIDropdown from '../../../UI/Dropdown';
import Tooltip from '../../../UI/Tooltip';
import MobileHeader from '../../../UI/MobileHeader';
import Counter from './Counter';
import ClassType from './ClassType';
import { i18n } from '../../../../utils';
import { PassengerState, PassengerType, ServiceClass } from '../../../../state';
import { PassengersCounterAvailability } from '../../../../store/form/passengers/selectors';
import { PassengersAction } from '../../../../store/form/passengers/actions';
import { SetClassAction } from '../../../../store/form/additional/actions';
import { FocusEvent } from 'react';

interface Props {
	passengers: PassengerState[];
	title: string;
	counterAvailability: PassengersCounterAvailability;
	totalPassengersCount: number;
	removePassenger: (passengerType: PassengerType) => PassengersAction;
	addPassenger: (passengerType: PassengerType) => PassengersAction;
	setClassType: (classType: ServiceClass) => SetClassAction;
	classOptions: string[];
	selectedClass: ServiceClass;
	isModeNemo: boolean;
}

class Selector extends React.Component<Props> {
	private dropdown: any = null;

	constructor(props: Props) {
		super(props);

		this.getDropdownRef = this.getDropdownRef.bind(this);
	}

	/**
	 * Render passengers counters;
	 */
	renderCounters(): React.ReactNode[] {
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

	triggerOnFocusHandler(event: FocusEvent<HTMLSpanElement>): void {
		(event.target as HTMLSpanElement).blur();
	}

	/**
	 * Render clickable input element.
	 */
	renderDropdownTrigger(): React.ReactNode {
		const { selectedClass, title, isModeNemo } = this.props;

		return <div className="widget-form-passengers__trigger widget-ui-input__wrapper">
			<span className="form-control widget-form-passengers__trigger__title" onFocus={this.triggerOnFocusHandler}>
				{title}
				{isModeNemo ?
					<span className="widget-form-passengers__class">
						<span className="widget-form-passengers__class__comma">, </span>
						{i18n('form', `class_${selectedClass}_short`)}
					</span> : null
				}
			</span>
			<div className="widget-ui-icon widget-ui-input__arrow"/>
		</div>;
	}

	/**
	 * Render dropdown block with passengers counters.
	 */
	renderDropdownContent(): React.ReactNode {
		const closeBlock = () => this.dropdown.instanceRef.handleClickOutside();
		const { setClassType, classOptions, selectedClass, isModeNemo } = this.props;

		return <div className="widget-form-passengers__content">
			<MobileHeader
				className="widget-form-passengers__header"
				title={i18n('form', 'passengersSelectHeader')}
				onClose={closeBlock}
			/>

			<div className="widget-form-passengers__items">
				{this.renderCounters()}

				{isModeNemo ? <ClassType
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

	getDropdownRef(ref: any): void {
		this.dropdown = ref;
	}

	render(): React.ReactNode {
		const { totalPassengersCount } = this.props;

		return <div className="widget-form-passengers">
			<Tooltip message={i18n('form', 'passengersError')} isActive={totalPassengersCount <= 0}>
				<UIDropdown triggerElement={this.renderDropdownTrigger()} contentElement={this.renderDropdownContent()} ref={this.getDropdownRef}/>
			</Tooltip>
		</div>;
	}
}

export default Selector;
