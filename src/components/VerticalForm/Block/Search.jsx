import React from 'react';
import Block from 'components/VerticalForm/Block';
import DepartureAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Departure';
import ArrivalAutocomplete from 'components/VerticalForm/Block/Search/Autocomplete/Arrival';
import Datepicker from 'components/VerticalForm/Block/Search/Datepicker';
import Passengers from 'components/VerticalForm/Block/Search/Passengers';

export default class Search extends Block {
	get type() {
		return 'search';
	}
	
	render() {
		const { state } = this.props;
		const { selectDate, toggleDatePicker } = this.props.actions;
		
		return <div className="nemo-widget-form__block nemo-widget-form__block_search">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				Купить авиабилеты
			</div>

			<div className={this.getBodyClass()}>
				<div className="form-group">
					<DepartureAutocomplete/>
					<ArrivalAutocomplete/>
				</div>

				<div className="form-group row">
					<Datepicker 
						type="departure" 
						selectDate={selectDate} 
						maxDate={state.arrival.date}
						state={state.departure} 
						placeholder="Вылет туда"
					/>
					
					<Datepicker 
						type="arrival" 
						toggleDatePicker={toggleDatePicker} 
						selectDate={selectDate} 
						minDate={state.departure.date}
						state={state.arrival}
						popperPlacement="top-end"
						placeholder="Обратно"
					/>
				</div>

				<div className="form-group">
					<Passengers/>
				</div>

				<div className="form-group nemo-widget-form__pseudoBlocks">
					<a href="#" className="nemo-ui-pseudoLink">У меня есть купон на скидку</a>
				</div>

				<div className="form-group nemo-widget-form__pseudoBlocks">
					<a href="#" className="nemo-ui-pseudoLink">Оплата милями</a>
				</div>

				<button className="btn btn-primary nemo-widget-form__searchButton">Найти</button>
			</div>
		</div>;
	}
}