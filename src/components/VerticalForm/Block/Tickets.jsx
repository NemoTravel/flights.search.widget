import React from 'react';
import Block from 'components/VerticalForm/Block';
import Autocomplete from 'components/VerticalForm/Block/Tickets/Autocomplete';
import Datepicker from 'components/VerticalForm/Block/Tickets/Datepicker';

export default class Tickets extends Block {
	get type() {
		return 'tickets';
	}
	
	render() {
		const { sendAutocompleteRequest, isLoading, autocomplete, changeAutocompleteValue } = this.props;
		
		return <div className="nemo-widget-form__block nemo-widget-form__block_tickets">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				Купить авиабилеты
			</div>

			<div className={this.getBodyClass()}>
				<div className="form-group">
					<Autocomplete 
						type="departure" 
						placeholder="Откуда" 
						changeAutocompleteValue={changeAutocompleteValue} 
						isLoading={isLoading.departure} 
						autocomplete={autocomplete.departure}
						sendAutocompleteRequest={sendAutocompleteRequest}
					/>
					
					<Autocomplete 
						type="arrival" 
						placeholder="Куда" 
						changeAutocompleteValue={changeAutocompleteValue} 
						isLoading={isLoading.arrival} 
						autocomplete={autocomplete.arrival}
						sendAutocompleteRequest={sendAutocompleteRequest}
					/>
				</div>

				<div className="form-group row">
					<Datepicker type="departure" placeholder="Вылет туда"/>
					<Datepicker type="arrival" placeholder="Обратно"/>
				</div>

				<div className="form-group">
					<input type="text" className="form-control" readOnly={true} spellCheck={false}/>
				</div>

				<div className="form-group nemo-widget-form__pseudoBlocks">
					<a href="#" className="nemo-widget-pseudoLink">У меня есть купон на скидку</a>
				</div>

				<div className="form-group nemo-widget-form__pseudoBlocks">
					<a href="#" className="nemo-widget-pseudoLink">Оплата милями</a>
				</div>

				<button className="btn btn-primary nemo-widget-form__searchButton">Найти</button>
			</div>
		</div>;
	}
}