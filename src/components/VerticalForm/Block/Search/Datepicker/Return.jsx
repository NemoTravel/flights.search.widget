import React from 'react';
import Datepicker from 'components/VerticalForm/Block/Search/Datepicker';

export default class Return extends Datepicker {
	get type() { return 'return'; }
	get placeholder() { return 'Обратно'; }
	get popperPlacement() { return 'top-end'; }
}