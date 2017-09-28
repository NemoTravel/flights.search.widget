import React from 'react';
import Datepicker from 'components/Form/Search/Datepicker';
import { i18n } from 'utils';

export default class Return extends Datepicker {
	get type() { return 'return'; }
	get placeholder() { return i18n('form', 'dateBack'); }
	get popperPlacement() { return 'top-end'; }
	
	constructor(props) {
		super(props);
		this.renderInner = this.renderInner.bind(this);
	}

	renderInner() {
		return <div>
			<div className={`widget-ui-mobile__header widget-ui-mobile__header_visible widget-ui-datepicker__header widget-ui-datepicker__header_${this.type}`}>
				<div className="widget-ui-icon widget-ui-mobile__header__closer" onClick={() => {
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