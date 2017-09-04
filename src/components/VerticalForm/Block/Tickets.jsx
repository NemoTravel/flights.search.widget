import React from 'react';
import Block from 'components/VerticalForm/Block';

export default class Tickets extends Block {
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_tickets">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				Купить авиабилеты
			</div>

			<div className={this.getBodyClass()}>
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
	}
}