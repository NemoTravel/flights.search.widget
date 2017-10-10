import React, {Component} from 'react';
import { connect } from 'react-redux';

/**
 * Websky engine requires real HTML-form submittion.
 */
class WebskyHiddenForm extends Component {
	render() {
		const { form, system } = this.props;
		
		const renderOWBlock = () => {
			return [
				<input type="hidden" name="origin-city-code[0]" value={form.autocomplete.departure.airport.IATA} />,
				<input type="hidden" name="destination-city-code[0]" value={form.autocomplete.arrival.airport.IATA} />,
				<input type="hidden" name="date[0]" value={form.dates.departure.date.format('DD.MM.YYYY')} />
			];
		};
		
		const renderRTBlock = () => {
			return [
				<input type="hidden" name="origin-city-code[1]" value={form.autocomplete.arrival.airport.IATA} />,
				<input type="hidden" name="destination-city-code[1]" value={form.autocomplete.departure.airport.IATA} />,
				<input type="hidden" name="date[1]" value={form.dates.return.date.format('DD.MM.YYYY')} />
			];
		};
		
		return <form id="webskyHiddenForm" action={`${system.baseURL}/search`} method="POST">
			<input type="hidden" name="segmentsCount" value={form.dates.return.date ? 2 : 1}/>
			<input type="hidden" name="lang" value={system.locale}/>

			{renderOWBlock()}
			
			{form.dates.return.date ? renderRTBlock() : null}
		</form>;
	}
}

export default connect(state => state)(WebskyHiddenForm);