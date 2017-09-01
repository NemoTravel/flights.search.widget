import React from 'react';
import Block from '../Block';

export default class Bookings extends Block {
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_bookings">
			<div className={this.getHeaderClass()} onClick={this.props.toggle}>
				Бронирования
			</div>
		</div>;
	}
}