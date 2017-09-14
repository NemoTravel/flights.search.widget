import React from 'react';
import Autocomplete from 'components/VerticalForm/Block/Search/Autocomplete';

export default class Departure extends Autocomplete {
	get type() { return 'departure'; }
	get placeholder() { return 'Откуда'; }
	get tooltipText() { return 'Выберите аэропорт вылета'; }
}