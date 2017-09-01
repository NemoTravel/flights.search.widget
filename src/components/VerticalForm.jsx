import React from 'react';

export default class VerticalForm extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return <section className="nemo-widget-form nemo-widget-form_vertical">
			<div className="nemo-widget-form__item nemo-widget-form__item_tickets">
				<div className="nemo-widget-form__item__header nemo-widget-form__item__header_active">
					Купить авиабилеты
				</div>
				
				<div className="nemo-widget-form__item__body">
					<div className="form-group">
						<input type="text" className="form-control nemo-widget-form__departure" spellCheck={false}/>
						<input type="text" className="form-control nemo-widget-form__arrival" spellCheck={false}/>
					</div>
					
					<div className="form-group row">
						<div className="col nemo-widget-form__departure__date__col">
							<input type="text" className="form-control" readOnly={true} spellCheck={false}/>
						</div>
						
						<div className="col nemo-widget-form__arrival__date__col">
							<input type="text" className="form-control" readOnly={true} spellCheck={false}/>
						</div>
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
			</div>
			
			<div className="nemo-widget-form__item nemo-widget-form__item_registration">
				<div className="nemo-widget-form__item__header">
					Регистрация на рейс
				</div>
			</div>
			
			<div className="nemo-widget-form__item nemo-widget-form__item_bookings">
				<div className="nemo-widget-form__item__header">
					Бронирования
				</div>
			</div>
		</section>;
	}
}