import React from 'react';
import DatePicker from '@nemo.travel/react-datepicker';
import classnames from 'classnames';
import Tooltip from 'components/UI/Tooltip';
import autobind from 'autobind-decorator';
import { isIE } from 'utils';

export default class Datepicker extends React.Component {
	constructor(props) {
		super(props);

		this.calendar = null;
		this.state = {
			isActive: !!props.date || !props.isDisableable
		};
	}

	/**
	 * Prepare internal state.
	 *
	 * @param nextProps
	 */
	componentWillReceiveProps(nextProps) {
		this.setState({
			isActive: !!nextProps.date || !nextProps.isDisableable
		});
	}

	/**
	 * Global date format.
	 *
	 * @returns {string}
	 */
	static get dateFormat() {
		return 'DD.MM.YYYY';
	}

	/**
	 * Date format for the calendar title.
	 *
	 * @returns {string}
	 */
	static get dateFormatCalendar() {
		return 'MMMM, YYYY';
	}

	/**
	 * Activate datepicker on focus.
	 */
	@autobind
	enable() {
		if (this.props.isDisableable && !this.state.isActive) {
			this.setState({ isActive: true });
		}
	}

	/**
	 * Deactivate datepicker.
	 */
	@autobind
	disable() {
		if (this.props.isDisableable && this.state.isActive) {
			this.setState({ isActive: false });
			this.props.selectDate(null, this.props.type);
		}
	}

	@autobind
	renderCloser() {
		return this.state.isActive && this.props.isDisableable ?
			<div className="widget-ui-input__closer" onClick={this.disable}/> : null;
	}

	/**
	 * Custom input field with wrapper.
	 *
	 * @returns {XML}
	 */
	renderCustomInput() {
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
					onFocus={event => event.target.blur()}
					onClick={this.enable}
				/>
			</Tooltip>

			{this.renderCloser()}

			{!isDisableable || !this.state.isActive ? <div className="widget-ui-datepicker__calendar"/> : null}
		</div>;
	}

	render() {
		const { date, locale, specialDate, type } = this.props;

		const specialDayClassName = date => {
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
