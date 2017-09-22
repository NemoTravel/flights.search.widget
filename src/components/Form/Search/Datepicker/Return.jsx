import React from 'react';
import Datepicker from 'components/Form/Search/Datepicker';
import { i18n } from 'utils';

export default class Return extends Datepicker {
	get type() { return 'return'; }
	get placeholder() { return i18n('form', 'dateBack'); }
	get popperPlacement() { return 'top-end'; }
}