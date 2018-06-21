import * as React from 'react';
import PassengersContainer from './Search/PassengersContainer';
import AdditionalOptionsContainer from './Search/AdditionalOptionsContainer';
import CouponContainer from './Search/Bonus/CouponContainer';
import MileCardContainer from './Search/Bonus/MileCardContainer';
import SegmentsContainer from './Search/SegmentsContainer';
import { i18n } from '../../utils';
import { CommonThunkAction, OnSearchFunction } from '../../state';

interface Props {
	onSearch?: OnSearchFunction;
	startSearch: (onSearch?: OnSearchFunction) => CommonThunkAction;
	showCouponField: boolean;
	showMileCardField: boolean;
}

export default class Search extends React.Component<Props> {

	constructor(props: Props) {
		super(props);

		this.startSearchHandler = this.startSearchHandler.bind(this);
	}

	startSearchHandler(): void {
		this.props.startSearch(this.props.onSearch);
	}

	render(): React.ReactNode {
		const { showCouponField, showMileCardField } = this.props;

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<SegmentsContainer/>

				<div className="widget-form-search-footer">
					<div className="widget-form-search-footer__col">
						<PassengersContainer/>
					</div>

					{showCouponField ? <div className="widget-form-search-footer__col"><CouponContainer /></div> : null}
					{showMileCardField ? <div className="widget-form-search-footer__col"><MileCardContainer /></div> : null}

					<div className="widget-form-search-footer__col">
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
