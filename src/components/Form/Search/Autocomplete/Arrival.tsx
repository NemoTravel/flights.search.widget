import * as React from 'react';
import Autocomplete from '../Autocomplete';
import { i18n } from '../../../../utils';
import { AutocompleteFieldType } from '../../../../state';

class Arrival extends Autocomplete {
	protected type = AutocompleteFieldType.Arrival;
	protected placeholder = i18n('form', 'to_full');
	protected mobileTitle = i18n('form', 'to');
	protected defaultErrorText = i18n('form', 'arrivalError');

	constructor(context: any) {
		super(context);

		this.swapAirports = this.swapAirports.bind(this);
	}

	swapAirports(): void {
		this.props.swapAirports(this.props.segmentId);
	}

	renderSwitcher(): React.ReactNode {
		return <div className={'widget-ui-icon widget-form-airports__swap'} title={i18n('form', 'swapAirports')} onClick={this.swapAirports}/>;
	}
}

export default Arrival;
