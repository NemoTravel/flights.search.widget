import React from 'react';
import Datepicker from 'components/Form/Search/Datepicker';
import { i18n } from 'utils';

export default class Return extends Datepicker {
	get type() { return 'return'; }
	get placeholder() { return i18n('form', 'dateBack'); }
	get popperPlacement() { return 'top-end'; }
	
	constructor(props) {
		super(props);
		this.disableTrigger = this.disableTrigger.bind(this);
	}

	disableTrigger(disableFunction) {
		this.onButtonClick = disableFunction;
	}

	renderInner() {
		return <div>
			{super.renderInner()}
			
			<div className="widget-ui-datepicker__footer">
				<div className="widget-ui-datepicker__footer__button" onClick={this.onButtonClick}>
					{i18n('form', 'noBackTicket')}
				</div>
			</div>
		</div>;
	}
}