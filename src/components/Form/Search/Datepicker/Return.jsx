import React from 'react';
import Datepicker from 'components/Form/Search/Datepicker';
import MobileHeader from 'components/UI/MobileHeader';
import { i18n } from 'utils';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

export default class Return extends Datepicker {
	static propTypes = {
		locale: PropTypes.string.isRequired,
		date: PropTypes.object,
		openToDate: PropTypes.object,
		isActive: PropTypes.bool,
		selectDate: PropTypes.func.isRequired,
		getRef: PropTypes.func.isRequired,
		highlightDates: PropTypes.array,
		toggleDatePicker: PropTypes.func.isRequired,
		specialDate: PropTypes.object
	};
	
	constructor(props) {
		super(props);

		this.type = 'return';
		this.placeholder = i18n('form', 'dateBack');
		this.popperPlacement = 'top-end';
	}
	
	@autobind
	closeDatepicker() {
		if (this.nemoDatepicker) {
			if (this.props.date) {
				this.nemoDatepicker.calendar.setOpen(false);
			}
			else {
				this.nemoDatepicker.disable();
			}
		}
	}

	@autobind
	renderInner() {
		const mobileHeaderClassName = `widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`;
		
		return <div>
			<MobileHeader className={mobileHeaderClassName} title={this.placeholder} onClose={this.closeDatepicker}/>
			
			<div className="widget-ui-datepicker__footer">
				<div className="widget-ui-datepicker__footer__button" onClick={() => {
					if (this.nemoDatepicker) {
						this.nemoDatepicker.disable();
						this.nemoDatepicker.calendar.setOpen(false);
					}
				}}>
					{i18n('form', 'noBackTicket')}
				</div>
			</div>
		</div>;
	}
}