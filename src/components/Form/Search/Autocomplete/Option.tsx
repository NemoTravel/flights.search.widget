import * as React from 'react';
import * as classnames from 'classnames';

export default ({ option }: any) => {
	return <div className={classnames('widget-form-airports__suggestion', { 'widget-form-airports__suggestion_insideAggregation': option.value.airport.insideAggregationAirport })}>
		<span className={classnames('widget-form-airports__suggestion__title', { 'widget-form-airports__suggestion__title_bold': option.value.isDirect })}>
			{option.value.airport.name}
		</span>

		{option.value.airport.country ?
			<span className="widget-form-airports__suggestion__countryName">{option.value.airport.country.name}</span> : null}

		<span className="widget-form-airports__suggestion__code">
			{option.value.airport.IATA}
		</span>
	</div>;
};
