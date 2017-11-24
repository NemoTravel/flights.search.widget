import React from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import AdditionalOptionsContainer from 'components/Form/Search/AdditionalOptionsContainer';
import CouponContainer from 'components/Form/Search/Bonus/CouponContainer';
import MileCardContainer from 'components/Form/Search/Bonus/MileCardContainer';
import { i18n } from 'utils';
import autobind from 'autobind-decorator';

export default class Search extends React.Component {
	@autobind
	renderCoupon() {
		return <div key={1} className="col">
			<CouponContainer />
		</div>;
	}

	@autobind
	renderMileCard() {
		return <div key={2} className="col">
			<MileCardContainer />
		</div>;
	}

	@autobind
	renderBonuses() {
		const { isWebsky, isRenderCoupon, isRenderMileCard } = this.props;

		if (isWebsky) {
			if (isRenderCoupon && isRenderMileCard) {
				return [
					this.renderCoupon(),
					this.renderMileCard()
				];
			}
			else if (isRenderCoupon) {
				return this.renderCoupon();
			}
			else if (isRenderMileCard) {
				return this.renderMileCard();
			}
		}
		return null;
	}

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

					{this.renderBonuses()}

					<div className="col">
						<AdditionalOptionsContainer/>

						<button className="btn btn-primary widget-form-search__startButton" onClick={startSearch}>
							{i18n('form', 'search')}
						</button>
					</div>
				</div>
			</div>
		</div>;
	}
}
