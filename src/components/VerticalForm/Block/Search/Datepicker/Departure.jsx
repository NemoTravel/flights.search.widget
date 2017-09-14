import React from 'react';
import Datepicker from 'components/VerticalForm/Block/Search/Datepicker';

export default class Departure extends Datepicker {
	get type() { return 'departure'; }
	get placeholder() { return 'Вылет туда'; }
	get popperPlacement() { return 'top-start'; }
	get tooltipText() { return 'Выберите дату вылета'; }
	get showErrors() { return true; }
}