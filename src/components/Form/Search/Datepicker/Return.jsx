import React from 'react';
import Datepicker from 'components/Form/Search/Datepicker';
import { i18n } from 'utils';
import PropTypes from 'prop-types';

export default class Return extends Datepicker {
	static propTypes = {
		locale: PropTypes.string.isRequired,
		date: PropTypes.object,
		isActive: PropTypes.bool,
		selectDate: PropTypes.func.isRequired,
		getRef: PropTypes.func.isRequired,
		highlightDates: PropTypes.array,
		toggleDatePicker: PropTypes.func.isRequired,
		specialDate: PropTypes.object
	};
	
	constructor(props) {
		super(props);
		this.renderInner = this.renderInner.bind(this);

		this.type = 'return';
		this.placeholder = i18n('form', 'dateBack');
		this.popperPlacement = 'top-end';
	}

	renderInner() {
		return <div>
			<div className={`widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`}>
				<div className="widget-ui-icon widget-ui-mobile__back" onClick={() => {
					if (this.nemoDatepicker) {
						if (this.props.date) {
							this.nemoDatepicker.calendar.setOpen(false);
						}
						else {
							this.nemoDatepicker.disable();
						}
					}
				}}>
				</div>

				{this.placeholder}
			</div>
			
			<div className="widget-ui-datepicker__footer">
				<div className="widget-ui-datepicker__footer__button" onClick={() => {
					if (this.nemoDatepicker) {
						this.nemoDatepicker.disable();
					}
				}}>
					{i18n('form', 'noBackTicket')}
				</div>
			</div>
		</div>;
	}
}