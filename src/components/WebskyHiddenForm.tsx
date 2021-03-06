import * as React from 'react';
import { connect } from 'react-redux';
import { webskyPassengers } from '../store/form/passengers/selectors';
import { ApplicationState, RouteType } from '../state';

interface WebskyPassengerState {
	title: string;
	ageTitle: string;
	code: string;
	count: number;
}

interface Props extends ApplicationState {
	passengersArray: WebskyPassengerState[];
}

/**
 * Websky engine requires real HTML-form submittion.
 */
class WebskyHiddenForm extends React.Component<Props> {
	render(): React.ReactNode {
		const { form, system, passengersArray } = this.props;

		const renderOWBlock = (): React.ReactNode => {
			return [
				<input key="1" type="hidden" name="origin-city-code[0]" value={form.segments[0].autocomplete.departure.airport ? form.segments[0].autocomplete.departure.airport.IATA : ''}/>,
				<input key="2" type="hidden" name="destination-city-code[0]" value={form.segments[0].autocomplete.arrival.airport ? form.segments[0].autocomplete.arrival.airport.IATA : ''}/>,
				<input key="3" type="hidden" name="date[0]" value={form.segments[0].departureDate.date ? form.segments[0].departureDate.date.format('DD.MM.YYYY') : ''}/>
			];
		};

		const renderRTBlock = (): React.ReactNode => {
			if (form.routeType === RouteType.RT) {
				return [
					<input key="1" type="hidden" name="origin-city-code[1]" value={form.segments[0].autocomplete.arrival.airport ? form.segments[0].autocomplete.arrival.airport.IATA : ''}/>,
					<input key="2" type="hidden" name="destination-city-code[1]" value={form.segments[0].autocomplete.departure.airport ? form.segments[0].autocomplete.departure.airport.IATA : ''}/>,
					<input key="3" type="hidden" name="date[1]" value={form.segments[1].departureDate.date ? form.segments[1].departureDate.date.format('DD.MM.YYYY') : ''}/>
				];
			}

			return null;
		};

		const renderCouponBlock = (): React.ReactNode => {
			if (form.coupon.number && form.coupon.number.match(/^[\d]+$/g)) {
				return <input type="hidden" name="promoCode" value={form.coupon.number}/>;
			}

			return null;
		};

		const renderMileCardBlock = (): React.ReactNode => {
			if (form.mileCard.number && form.mileCard.password && form.mileCard.number.match(/^[\d]+$/g)) {
				return [
					<input key="1" type="hidden" name="cardNumber" value={form.mileCard.number}/>,
					<input key="2" type="hidden" name="cardPassword" value={form.mileCard.password}/>
				];
			}

			return null;
		};

		const MULTIPLE_SEGMENTS_NUM = 2;

		return <form id="webskyHiddenForm" action={`${system.webskyURL}/search`} method="POST">
			<input type="hidden" name="segmentsCount" value={form.routeType === RouteType.RT ? MULTIPLE_SEGMENTS_NUM : 1}/>
			<input type="hidden" name="lang" value={system.locale}/>

			{renderOWBlock()}
			{renderRTBlock()}

			{passengersArray.map((passConfig, index) =>
				<input
					key={index}
					type="hidden"
					name={`count-${passConfig.code}`}
					value={passConfig.count}
				/>)
			}

			{renderCouponBlock()}
			{renderMileCardBlock()}
		</form>;
	}
}

export default connect(
	(state: ApplicationState) => {
		return {
			...state,
			passengersArray: webskyPassengers(state)
		};
	}
)(WebskyHiddenForm);
