import React from 'react';
import Block from 'components/VerticalForm/Block';

export default class Bookings extends Block {
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_bookings">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				Бронирования
			</div>
		</div>;
	}
}