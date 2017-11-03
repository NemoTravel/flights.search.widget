import React from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import ClassTypeContainer from 'components/Form/Search/ClassTypeContainer';
import AdditionalOptionsContainer from 'components/Form/Search/AdditionalOptionsContainer';
import { i18n } from 'utils';

export default class Search extends React.Component {
	render() {
		const { startSearch } = this.props;

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>

				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
						<AdditionalOptionsContainer/>
					</div>

					<div className="col">
						<ClassTypeContainer/>
						<button className="btn btn-primary widget-form-search__startButton" onClick={startSearch}>
							{i18n('form', 'search')}
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}
