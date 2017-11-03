import React from 'react';
import classnames from 'classnames';

export default ({ option }) => {
	return <div className="widget-form-airports__suggestion">
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
