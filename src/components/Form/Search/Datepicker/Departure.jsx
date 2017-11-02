import Datepicker from 'components/Form/Search/Datepicker';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

export default class Departure extends Datepicker {
	static propTypes = {
		showErrors: PropTypes.bool.isRequired,
		locale: PropTypes.string.isRequired,
		date: PropTypes.object,
		isActive: PropTypes.bool,
		selectDate: PropTypes.func.isRequired,
		highlightDates: PropTypes.array,
		specialDate: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.type = 'departure';
		this.placeholder = i18n('form', 'dateTo');
		this.popperPlacement = 'top-start';
		this.tooltipText = i18n('form', 'dateToError');
		this.showErrors = true;
	}
}
