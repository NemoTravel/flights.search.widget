import React, { Component } from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import ClassType from 'components/Form/Search/ClassType';
import VicinityDates from 'components/Form/Search/VicinityDates';
import { i18n } from 'utils';

export default class Search extends Component {
	render() {
		const { startSearch } = this.props;
		
		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>
				
				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
					</div>

					<div className="col">
						<ClassType/>
					</div>

					<div className="col">
						<VicinityDates/>
					</div>

					<div className="col">
						<input type="checkbox"/>
						Только прямые
					</div>
					
					<div className="col">
						<button className="btn btn-primary widget-form-search__startButton" onClick={startSearch}>
							{i18n('form', 'search')}
						</button>
					</div>
				</div>
	
				{/*<div className="form-group widget-form__pseudoBlocks">*/}
					{/*<a href="#" className="widget-ui-pseudoLink">{i18n('form', 'discountTitle')}</a>*/}
				{/*</div>*/}
				
				{/*<div className="form-group widget-form__pseudoBlocks">*/}
					{/*<a href="#" className="widget-ui-pseudoLink">{i18n('form', 'loyaltyCardTitle')}</a>*/}
				{/*</div>*/}
			</div>
		</div>;
	}
}