import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';
import DatesContainer from './DatesContainer';
import {RouteType, SegmentState} from '../../../state';

interface Props {
	segment: SegmentState;
	segmentId: number;
	routeType: RouteType;
}

export default class Segment extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render(): React.ReactNode {
		const { segment, segmentId, routeType } = this.props;

		return <div className="widget-form-airports__segment">
			<AutocompleteContainer
				departureAutocomplete={segment.autocomplete.departure}
				arrivalAutocomplete={segment.autocomplete.arrival}
				segmentId={segmentId}/>

			<DatesContainer/>

			{ routeType === RouteType.CR ? <span> X </span> : null }
		</div>;
	}
}
