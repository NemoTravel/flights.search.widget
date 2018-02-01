import Datepicker from '../Datepicker';
import { i18n } from '../../../../utils';
import { DatepickerFieldType } from '../../../../state';
import { Moment } from 'moment';

export default class Departure extends Datepicker {
	protected type = DatepickerFieldType.Departure;
	protected placeholder = i18n('form', 'dateTo');
	protected popperPlacement = 'top-start';
	protected tooltipText = i18n('form', 'dateToError');
	protected showErrors = true;
}
