import React, {Component} from 'react';
import { connect } from 'react-redux';
import { webskyPassengers } from 'selectors/websky';

/**
 * Websky engine requires real HTML-form submittion.
 */
class WebskyHiddenForm extends Component {
	render() {
		const { form, system, passengersArray } = this.props;
		
		const renderOWBlock = () => {
			return [
				<input key={1} type="hidden" name="origin-city-code[0]" value={form.autocomplete.departure.airport.IATA} />,
				<input key={2} type="hidden" name="destination-city-code[0]" value={form.autocomplete.arrival.airport.IATA} />,
				<input key={3} type="hidden" name="date[0]" value={form.dates.departure.date.format('DD.MM.YYYY')} />
			];
		};
		
		const renderRTBlock = () => {
			if (form.dates.return.date) {
				return [
					<input key={1} type="hidden" name="origin-city-code[1]" value={form.autocomplete.arrival.airport.IATA}/>,
					<input key={2} type="hidden" name="destination-city-code[1]" value={form.autocomplete.departure.airport.IATA}/>,
					<input key={3} type="hidden" name="date[1]" value={form.dates.return.date.format('DD.MM.YYYY')}/>
				];
			}
			else {
				return null;
			}
		};
		
		return <form id="webskyHiddenForm" action={`${system.baseURL}/search`} method="POST">
			<input type="hidden" name="segmentsCount" value={form.dates.return.date ? 2 : 1}/>
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
		</form>;
	}
}

export default connect(
	state => {
		return {
			...state,
			passengersArray: webskyPassengers(state)
		};
	}
)(WebskyHiddenForm);