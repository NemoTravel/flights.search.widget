import Autocomplete from '../Autocomplete';
import { i18n } from '../../../../utils';
import { AutocompleteFieldType } from '../../../../state';

class Departure extends Autocomplete {
	protected type = AutocompleteFieldType.Departure;
	protected placeholder = i18n('form', 'from_full');
	protected mobileTitle = i18n('form', 'from');
	protected defaultErrorText = i18n('form', 'departureError');
}

export default Departure;
