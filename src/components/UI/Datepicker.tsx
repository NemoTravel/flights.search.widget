import * as React from 'react';
import { FormEvent } from 'react';
import { Moment } from 'moment';
import DatePicker, { ReactDatePickerProps } from '@nemo.travel/react-datepicker';
import * as classnames from 'classnames';

import Tooltip from './Tooltip';
import { isIE } from '../../utils';
import { DatepickerFieldType } from '../../state';
import { DatepickerAction } from '../../store/form/dates/actions';

interface Props {
	date: Moment;
	specialDate?: Moment;
	isDisableable: boolean;
	tooltipIsActive: boolean;
	isActive: boolean;
	tooltipText: string;
	type: DatepickerFieldType;
	inputProps: any;

	selectDate: (date: Moment, dateType: DatepickerFieldType) => any;
	toggleDatePicker?: (isActive: boolean, dateType: DatepickerFieldType) => DatepickerAction;
	getRef?: (inout: any) => any;
}

interface State {
	isActive: boolean;
}

type DatepickerProps = Props & ReactDatePickerProps;

export default class Datepicker extends React.Component<DatepickerProps, State> {
	public calendar: any = null;

	state: State = {
		isActive: false
	};

	constructor(props: DatepickerProps) {
		super(props);

		this.state = {
			isActive: !!props.date || !props.isDisableable
		};
	}

	/**
	 * Prepare internal state.
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps: DatepickerProps): void {
		this.setState({
			isActive: !!nextProps.date || !nextProps.isDisableable
		} as State);
	}

	/**
	 * Global date format.
	 *
	 * @returns {string}
	 */
	static get dateFormat(): string {
		return 'DD.MM.YYYY';
	}

	/**
	 * Date format for the calendar title.
	 *
	 * @returns {string}
	 */
	static get dateFormatCalendar(): string {
		return 'MMMM, YYYY';
	}

	/**
	 * Activate datepicker on focus.
	 */
	enable(): void {
		if (this.props.isDisableable && !this.state.isActive) {
			this.setState({ isActive: true });
		}
	}

	/**
	 * Deactivate datepicker.
	 */
	disable(): void {
		if (this.props.isDisableable && this.state.isActive) {
			this.setState({ isActive: false });
			this.props.selectDate(null, this.props.type);
		}
	}

	renderCloser(): React.ReactNode {
		return this.state.isActive && this.props.isDisableable ?
			<div className="widget-ui-input__closer" onClick={this.disable}/> : null;
	}

	customInputOnFocusHandler(event: FormEvent<HTMLInputElement>): void {
		(event.target as HTMLInputElement).blur()
	}

	/**
	 * Custom input field with wrapper.
	 */
	renderCustomInput(): React.ReactNode {
		const { inputProps, date, isDisableable, getRef, tooltipIsActive, tooltipText } = this.props;
		const formattedDate = date ? date.format('D MMMM, dd') : '';

		if (getRef) {
			inputProps.ref = getRef;
		}

		return <div className="widget-ui-input__wrapper">
			<Tooltip message={tooltipText} isActive={tooltipIsActive}>
				<input
					type="text"
					className={classnames('form-control widget-ui-input', { 'widget-ui-input_disabled': !this.state.isActive })}
					readOnly={true}
					spellCheck={false}
					value={formattedDate}
					{...inputProps}
					onFocus={this.customInputOnFocusHandler}
					onClick={this.enable}
				/>
			</Tooltip>

			{this.renderCloser()}

			{!isDisableable || !this.state.isActive ? <div className="widget-ui-datepicker__calendar"/> : null}
		</div>;
	}

	render(): React.ReactNode {
		const { date, locale, specialDate, type } = this.props;

		const specialDayClassName = (date: Moment) => {
			return specialDate && date.format('YYYY-MM-DD') === specialDate.format('YYYY-MM-DD') ? 'widget-ui-datepicker__specialDay' : null;
		};

		return <DatePicker
			ref={calendar => (this.calendar = calendar)}
			disabled={isIE() ? false : !this.state.isActive}
			locale={locale}
			dayClassName={specialDayClassName}
			customInput={this.renderCustomInput()}
			calendarClassName={`widget-ui-datepicker widget-ui-datepicker_${type}`}
			dateFormat={Datepicker.dateFormat}
			dateFormatCalendar={Datepicker.dateFormatCalendar}
			selected={date}
			monthsShown={2}
			onClickOutside={() => date ? null : this.disable()}
			onFocus={this.enable}
			{...this.props}
		>
			{this.props.children}
		</DatePicker>;
	}
}
