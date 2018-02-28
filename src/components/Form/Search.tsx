import * as React from 'react';
import DatesContainer from './Search/DatesContainer';
import AutocompleteContainer from './Search/AutocompleteContainer';
import PassengersContainer from './Search/PassengersContainer';
import AdditionalOptionsContainer from './Search/AdditionalOptionsContainer';
import CouponContainer from './Search/Bonus/CouponContainer';
import MileCardContainer from './Search/Bonus/MileCardContainer';
import SegmentsContainer from './Search/SegmentsContainer';
import { i18n } from '../../utils';
import {CommonThunkAction, RouteType} from '../../state';

interface Props {
	startSearch: () => CommonThunkAction;
	showCouponField: boolean;
	showMileCardField: boolean;
	isComplexRoute: RouteType;
	setRouteType: (type: RouteType) => CommonThunkAction;
}

export default class Search extends React.Component<Props> {

	constructor(props: Props) {
		super(props);

		this.startSearchHandler = this.startSearchHandler.bind(this);
		this.changeRouteType = this.changeRouteType.bind(this);
	}

	startSearchHandler(): void {
		this.props.startSearch();
	}

	changeRouteType(): void {
		const routeType = this.props.isComplexRoute;

		if (routeType === RouteType.CR) {
			this.props.setRouteType(RouteType.OW);
		}
		else {
			this.props.setRouteType(RouteType.CR);
		}
	}

	render(): React.ReactNode {
		const { showCouponField, showMileCardField, isComplexRoute, setRouteType } = this.props;

		return <div className="widget-form-search">
			<div className="widget-form-search__wrapper">
				<SegmentsContainer routeType={isComplexRoute}/>

				<div className="row widget-form-search__footer">
					<div className="col">
						<PassengersContainer/>
					</div>

					{showCouponField ? <div className="col"><CouponContainer /></div> : null}
					{showMileCardField ? <div className="col"><MileCardContainer /></div> : null}

					<div className="col">
						<AdditionalOptionsContainer/>

						<span onClick={this.changeRouteType} className="widget-form__routeTypeSwitch">
							{isComplexRoute !== RouteType.CR ? <span>Сложный маршрут</span>: <span>Простой маршрут</span>}
						</span>

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
