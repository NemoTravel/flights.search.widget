import React, { Component } from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import { i18n } from 'utils';

export default class Search extends Component {
	render() {
		const { startSearch } = this.props;
		
		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>
				<PassengersContainer/>
	
				<div className="form-group widget-form__pseudoBlocks">
					<a href="#" className="widget-ui-pseudoLink">{i18n('form', 'discountTitle')}</a>
				</div>
	
				<div className="form-group widget-form__pseudoBlocks">
					<a href="#" className="widget-ui-pseudoLink">{i18n('form', 'loyaltyCardTitle')}</a>
				</div>
			</div>
			
			<div className="widget-form-search__footer">
				<button className="btn btn-primary widget-form-search__startButton" onClick={startSearch}>{i18n('form', 'search')}</button>
			</div>
		</div>;
	}
}