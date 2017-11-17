import React from 'react';
import DatesContainer from 'components/Form/Search/DatesContainer';
import AutocompleteContainer from 'components/Form/Search/AutocompleteContainer';
import PassengersContainer from 'components/Form/Search/PassengersContainer';
import CouponContainer from 'components/Form/Search/Bonus/CouponContainer';
import MileCardContainer from 'components/Form/Search/Bonus/MileCardContainer';
import { i18n } from 'utils';

export default class Search extends React.Component {
	render() {
		const { startSearch, isWebsky, isRenderCoupon, isRenderMileCard } = this.props;

		const renderCoupon = () => {
			return <div key={1} className="col">
				<CouponContainer />
			</div>;
		};

		const renderMileCard = () => {
			return <div key={2} className="col">
				<MileCardContainer />
			</div>;
		};

		const renderBonuses = () => {
			if (isWebsky) {
				if (isRenderCoupon && isRenderMileCard) {
					return [
						renderCoupon(),
						renderMileCard()
					];
				}
				else if (isRenderCoupon) {
					return renderCoupon();
				}
				else if (isRenderMileCard) {
					return renderMileCard();
				}
			}
			return null;
		};

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<AutocompleteContainer/>
				<DatesContainer/>

				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
					</div>

					{renderBonuses()}

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
