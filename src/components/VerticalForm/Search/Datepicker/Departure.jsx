import React from 'react';
import Datepicker from 'components/VerticalForm/Search/Datepicker';
import { i18n } from 'utils';

export default class Departure extends Datepicker {
	get type() { return 'departure'; }
	get placeholder() { return i18n('form', 'dateTo'); }
	get popperPlacement() { return 'top-start'; }
	get tooltipText() { return i18n('form', 'dateToError'); }
	get showErrors() { return true; }
}