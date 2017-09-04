import React from 'react';
import Block from 'components/VerticalForm/Block';

export default class Registration extends Block {
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_registration">
			<div className={this.getHeaderClass()} onClick={this.props.toggle}>
				Регистрация на рейс
			</div>
		</div>;
	}
}