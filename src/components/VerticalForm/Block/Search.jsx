import React from 'react';
import Block from 'components/VerticalForm/Block';
import DatesContainer from 'components/VerticalForm/Block/Search/DatesContainer';
import AutocompleteContainer from 'components/VerticalForm/Block/Search/AutocompleteContainer';
import Passengers from 'components/VerticalForm/Block/Search/Passengers';

export default class Search extends Block {
	get type() {
		return 'search';
	}
	
	render() {
		return <div className="nemo-widget-form__block nemo-widget-form__block_search">
			<div className={this.getHeaderClass()} onClick={this.toggleHandler}>
				Купить авиабилеты
			</div>

			<div className={this.getBodyClass()}>
				<AutocompleteContainer/>
				<DatesContainer/>
				<Passengers/>

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