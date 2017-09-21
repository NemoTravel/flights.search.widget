import React from 'react';
import Block from 'components/VerticalForm/Block';
import { i18n } from 'utils';

export default class Registration extends Block {
	get type() {
		return 'registration';
	}

	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_registration">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				{i18n('form', 'registrationTitle')}
			</div>
		</div>;
	}
}