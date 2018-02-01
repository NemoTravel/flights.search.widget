import Datepicker from '../Datepicker';
import { i18n } from '../../../../utils';
import { DatepickerFieldType } from '../../../../state';
import { Moment } from 'moment';

interface Props {
	selectDate: (date: Moment, dateType: DatepickerFieldType) => any;
}

export default class Departure extends Datepicker<Props> {
	protected type = DatepickerFieldType.Departure;
	protected placeholder = i18n('form', 'dateTo');
	protected popperPlacement = 'top-start';
	protected tooltipText = i18n('form', 'dateToError');
	protected showErrors = true;
}
