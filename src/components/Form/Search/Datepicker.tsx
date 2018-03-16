import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';

import UIDatepicker from '../../UI/Datepicker';
import MobileHeader from '../../UI/MobileHeader';
import { DatepickerFieldType, Language } from '../../../state';
import { HighlightedDatesGroup } from '../../../store/form/segments/dates/selectors';
import { i18n } from '../../../utils';

interface Props {
	showErrors?: boolean;
	locale: Language;
	date: Moment;
	isActive: boolean;
	openToDate?: Moment;
	highlightDates: HighlightedDatesGroup[];
	specialDate: Moment;
	segmentId: number;
	popperPlacement: string;
	wrongDatesOrder?: boolean;

	selectDate: (date: Moment, dateType: DatepickerFieldType, segmentId: number) => any;
	getRef?: (input: any) => any;
}

export default class Datepicker extends React.Component<Props> {
	static defaultProps: Partial<Props> = {
		showErrors: false,
		highlightDates: [],
		popperPlacement: 'top-start'
	};

	protected type: DatepickerFieldType = null;
	protected nemoDatepicker: any = null;
	protected placeholder = '';
	protected tooltipText = '';
	protected showErrors = false;
	protected isDisableable = false;

	constructor(props: Props) {
		super(props);

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.closeDatepicker = this.closeDatepicker.bind(this);
	}

	/**
	 * Select date.
	 *
	 * @param {Moment} date
	 */
	onChangeHandler(date: Moment): void {
		this.props.selectDate(date, this.type, this.props.segmentId);
	}

	shouldComponentUpdate(nextProps: Props): boolean {
		const { isActive, date, highlightDates, specialDate, showErrors, locale, popperPlacement } = this.props;

		return isActive !== nextProps.isActive ||
			date !== nextProps.date ||
			locale !== nextProps.locale ||
			specialDate !== nextProps.specialDate ||
			showErrors !== nextProps.showErrors ||
			highlightDates !== nextProps.highlightDates ||
			popperPlacement !== nextProps.popperPlacement;
	}

	closeDatepicker(): void {
		if (this.nemoDatepicker && this.nemoDatepicker.calendar) {
			this.nemoDatepicker.calendar.setOpen(false);
		}
	}

	renderInner(): React.ReactNode {
		const mobileHeaderClassName = `widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`;

		return <MobileHeader className={mobileHeaderClassName} title={this.placeholder} onClose={this.closeDatepicker}/>;
	}

	render(): React.ReactNode {
		const {
			selectDate,
			getRef,
			locale,
			date,
			isActive,
			showErrors,
			specialDate,
			openToDate,
			highlightDates,
			popperPlacement,
			wrongDatesOrder
		} = this.props;

		const
			minDate = moment(),
			maxDate = moment().add(1, 'years'),
			datesIsNotInOrderText = i18n('form', 'datesNotInOrderError');

		return <div className="col widget-form-dates__col">
			<UIDatepicker
				isDisableable={this.isDisableable}
				ref={(calendar: any) => (this.nemoDatepicker = calendar)}
				type={this.type}
				isActive={isActive}
				onChange={this.onChangeHandler}
				locale={locale}
				date={date}
				openToDate={openToDate}
				minDate={minDate}
				maxDate={maxDate}
				getRef={getRef}
				highlightDates={highlightDates}
				selectDate={selectDate}
				popperPlacement={popperPlacement}
				specialDate={specialDate}
				tooltipIsActive={this.showErrors && showErrors && (!date || wrongDatesOrder)}
				tooltipText={wrongDatesOrder ? datesIsNotInOrderText : this.tooltipText}
				inputProps={{ placeholder: this.placeholder }}
			>
				{this.renderInner()}
			</UIDatepicker>
		</div>;
	}
}
