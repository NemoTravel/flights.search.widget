import * as React from 'react';
import * as classnames from 'classnames';
import { FormEvent } from 'react';
import { Moment } from 'moment';
import DatePicker, { ReactDatePickerProps } from '@nemo.travel/react-datepicker';

import Tooltip from './Tooltip';
import { isIE } from '../../utils';
import { CommonThunkAction, DatepickerFieldType, RouteType } from '../../state';

interface Props {
	date: Moment;
	specialDate?: Moment;
	isDisableable: boolean;
	tooltipIsActive: boolean;
	isActive: boolean;
	tooltipText: string;
	type: DatepickerFieldType;
	inputProps: any;
	onChange: (date: Moment) => void;

	setRouteType?: (type: RouteType) => CommonThunkAction;
	selectDate: (date: Moment, segmentId: number) => any;
	getRef?: (inout: any) => any;
}

interface State {
	isActive: boolean;
	showCalendar: boolean;
}

const CALENDAR_OPENING_DELAY = 150;

type DatepickerProps = Props & ReactDatePickerProps;

export default class Datepicker extends React.Component<DatepickerProps, State> {
	public static dateFormat = 'DD.MM.YYYY';
	public static dateFormatForHeader = 'MMMM, YYYY';
	public calendar: any = null;

	state: State = {
		isActive: false,
		showCalendar: false
	};

	constructor(props: DatepickerProps) {
		super(props);

		this.state = {
			isActive: !!props.date || !props.isDisableable,
			showCalendar: false
		};

		this.enable = this.enable.bind(this);
		this.disable = this.disable.bind(this);
		this.customInputOnFocusHandler = this.customInputOnFocusHandler.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.closeDatepicker = this.closeDatepicker.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
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
	 * Activate datepicker on focus.
	 */
	enable(): void {
		if (this.props.isDisableable && !this.state.isActive) {
			this.setState({ isActive: true });
			this.props.setRouteType(RouteType.RT);
		}

		this.showCalendar();
	}

	/**
	 * Deactivate datepicker.
	 */
	disable(): void {
		if (this.props.isDisableable && this.state.isActive) {
			this.setState({ isActive: false });
			this.props.selectDate(null, 1);
			this.props.setRouteType(RouteType.OW);
		}

		this.setState({
			showCalendar: false
		});
	}

	renderCloser(): React.ReactNode {
		return this.state.isActive && this.props.isDisableable ? (
			<div className="widget-ui-input__closer" onClick={this.disable}/>
		) : null;
	}

	customInputOnFocusHandler(event: FormEvent<HTMLInputElement>): void {
		(event.target as HTMLInputElement).blur();
	}

	showCalendar(): void {
		setTimeout(() => {
			this.setState({
				showCalendar: true
			});
		}, CALENDAR_OPENING_DELAY);
	}

	closeDatepicker(): void {
		if (!this.props.date) {
			this.disable();
		}

		this.setState({
			showCalendar: false
		});
	}

	onChangeHandler(date: Moment): void {
		this.props.onChange(date);

		this.setState({
			showCalendar: false
		});
	}

	/**
	 * Custom input field with wrapper.
	 */
	renderCustomInput(): React.ReactNode {
		const { inputProps, date, isDisableable, getRef, tooltipIsActive, tooltipText } = this.props;
		const formattedDate = date ? date.format('D MMMM') : '';
		const formattedDayOfWeek = date ? date.format('dd') : '';
		const dayOfMonth = date ? date.get('date').toString() : '31';

		if (getRef) {
			inputProps.ref = getRef;
		}

		return <div className="widget-ui-input__wrapper">
			<Tooltip message={tooltipText} isActive={tooltipIsActive} isCentered={true}>
				<input
					type="text"
					className={classnames('form-control widget-ui-input', { 'widget-ui-input_disabled': !this.state.isActive })}
					ref={getRef ? getRef : null}
					onClick={this.enable}
					onFocus={this.customInputOnFocusHandler}
					placeholder={this.state.isActive ? '' : inputProps.placeholder}
					readOnly={true}
					spellCheck={false}
				/>

				{this.state.isActive ?
					<div className={classnames('widget-form-dates__caption', { 'widget-form-dates__caption_filled': !!formattedDate })} onClick={this.showCalendar}>
						{formattedDate ? (
							<span>
								{formattedDate},&nbsp;
								<span className="widget-form-dates__dayOfWeek">{formattedDayOfWeek}</span>
							</span>
						) : inputProps.placeholder}
					</div> : null}
			</Tooltip>

			{this.renderCloser()}

			{!isDisableable || !this.state.isActive ? <div className="widget-ui-datepicker__calendar"><span className="widget-ui-datepicker__calendar-inner">{dayOfMonth}</span></div> : null}
		</div>;
	}

	render(): React.ReactNode {
		const { date, locale, specialDate, type } = this.props;
		const NUM_OF_VISIBLE_MONTHS = 2;

		const specialDayClassName = (date: Moment) => {
			return specialDate && date.format('YYYY-MM-DD') === specialDate.format('YYYY-MM-DD') ? 'widget-ui-datepicker__specialDay' : null;
		};

		return <div className={classnames('react-datepicker__container', { 'react-datepicker__container_showCalendar': this.state.showCalendar })}>
			<DatePicker
				{...this.props}
				ref={(calendar: any) => (this.calendar = calendar)}
				disabled={isIE() ? false : !this.state.isActive}
				locale={locale}
				dayClassName={specialDayClassName}
				customInput={this.renderCustomInput()}
				calendarClassName={`widget-ui-datepicker widget-ui-datepicker_${type}`}
				dateFormat={Datepicker.dateFormat}
				dateFormatCalendar={Datepicker.dateFormatForHeader}
				selected={date}
				monthsShown={NUM_OF_VISIBLE_MONTHS}
				onClickOutside={this.closeDatepicker}
				onFocus={this.enable}
				onChange={this.onChangeHandler}
			>
				{this.props.children}
			</DatePicker>
		</div>;
	}
}
