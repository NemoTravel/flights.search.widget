import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';
import {SegmentState} from "../../../state";

interface Props {
	segment: SegmentState;
	segmentId: number;
}

export default class Segment extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render(): React.ReactNode {
		const { segment, segmentId } = this.props;

		return <div>
			<AutocompleteContainer
				departureAutocomplete={segment.autocomplete.departure}
				arrivalAutocomplete={segment.autocomplete.arrival}
				segmentId={segmentId}/>
		</div>
	}
}