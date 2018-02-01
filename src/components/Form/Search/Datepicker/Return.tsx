import * as React from 'react';
import Datepicker from '../Datepicker';
import MobileHeader from '../../../UI/MobileHeader';
import { i18n } from '../../../../utils';
import { DatepickerFieldType } from '../../../../state';

export default class Return extends Datepicker<any> {
	protected type = DatepickerFieldType.Return;
	protected placeholder = i18n('form', 'dateBack');
	protected popperPlacement = 'top-end';
	protected isDisableable = true;

	closeDatepicker(): void {
		if (this.nemoDatepicker) {
			if (this.props.date) {
				this.nemoDatepicker.calendar.setOpen(false);
			}
			else {
				this.nemoDatepicker.disable();
			}
		}
	}

	renderInner(): React.ReactNode {
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
