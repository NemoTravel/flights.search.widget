import * as React from 'react';
import DatesContainer from './Search/DatesContainer';
import AutocompleteContainer from './Search/AutocompleteContainer';
import PassengersContainer from './Search/PassengersContainer';
import AdditionalOptionsContainer from './Search/AdditionalOptionsContainer';
import CouponContainer from './Search/Bonus/CouponContainer';
import MileCardContainer from './Search/Bonus/MileCardContainer';
import { i18n } from '../../utils';
import { CommonThunkAction } from '../../state';

interface Props {
	startSearch: () => CommonThunkAction;
	showCouponField: boolean;
	showMileCardField: boolean;
}

export default class Search extends React.Component<Props> {
	startSearchHandler() {
		this.props.startSearch();
	}

	render(): React.ReactNode {
		const { showCouponField, showMileCardField } = this.props;

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>

				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
					</div>

					{showCouponField ? <div className="col"><CouponContainer /></div> : null}
					{showMileCardField ? <div className="col"><MileCardContainer /></div> : null}

					<div className="col">
						<AdditionalOptionsContainer/>

						<button className="btn btn-primary widget-form-search__startButton" onClick={this.startSearchHandler}>
							{i18n('form', 'search')}
							<span className="widget-form-search__tickets">
								{(i18n('form', 'search_tickets'))}
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}
