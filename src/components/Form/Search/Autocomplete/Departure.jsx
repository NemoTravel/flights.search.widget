import React from 'react';
import Autocomplete from 'components/Form/Search/Autocomplete';
import { i18n } from 'utils';

export default class Departure extends Autocomplete {
	get type() { return 'departure'; }
	get placeholder() { return i18n('form', 'from_full'); }
	get mobileTitle() { return i18n('form', 'from'); }
	get tooltipText() { return i18n('form', 'departureError'); }
}