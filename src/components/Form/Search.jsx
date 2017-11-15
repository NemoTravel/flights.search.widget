import React from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import BonusContainer from 'components/Form/Search/BonusContainer';
import { i18n } from 'utils';

export default class Search extends React.Component {
	render() {
		const { startSearch, isWebsky, isBonusFields } = this.props;

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>

				{isWebsky && isBonusFields ? <BonusContainer/> : null}

				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
					</div>

					<div className="col">
						<button className="btn btn-primary widget-form-search__startButton" onClick={startSearch}>
							{i18n('form', 'search')}
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}
