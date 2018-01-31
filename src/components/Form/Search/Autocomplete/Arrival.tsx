import * as React from 'react';
import Autocomplete from '../Autocomplete';
import { i18n } from '../../../../utils';
import { AutocompleteFieldType } from '../../../../state';

interface Props {
	selectAirport: (airport: any, autocompleteType: AutocompleteFieldType) => void;
}

class Arrival extends Autocomplete<Props> {
	protected type = AutocompleteFieldType.Arrival;
	protected placeholder = i18n('form', 'to_full');
	protected mobileTitle = i18n('form', 'to');
	protected defaultErrorText = i18n('form', 'arrivalError');

	renderSwitcher(): React.ReactNode {
		return <div className={'widget-ui-icon widget-form-airports__swap'} title={i18n('form', 'swapAirports')} onClick={this.props.swapAirports}/>;
	}
}

export default Arrival;
