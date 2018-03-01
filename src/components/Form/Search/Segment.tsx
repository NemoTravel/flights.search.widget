import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';
import DatesContainer from './DatesContainer';
import {SegmentState} from '../../../state';
import {SegmentAction} from '../../../store/form/segments/actions';
import Tooltip from "../../UI/Tooltip";

interface Props {
	segment: SegmentState;
	segmentId: number;
	removeSegment: () => SegmentAction;
	canBeRemoved: boolean;
	showDatesError: boolean;
}

export default class Segment extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		this.deleteSegment = this.deleteSegment.bind(this);
	}

	deleteSegment(): void {
		this.props.removeSegment();
	}

	render(): React.ReactNode {
		const { segment, segmentId, canBeRemoved, showDatesError } = this.props;

		return <div className="widget-form-airports__segment">
			<AutocompleteContainer
				departureAutocomplete={segment.autocomplete.departure}
				arrivalAutocomplete={segment.autocomplete.arrival}
				segmentId={segmentId}/>

			<Tooltip message="Даты должны идти по порядку" isActive={showDatesError}/>
			<DatesContainer
				segmentId={segmentId}
				departureDatepicker={segment.dates.departure}
				returnDatepicker={segment.dates.return}/>

			{ canBeRemoved ? <div className="widget-form-airports__segment__drop" onClick={this.deleteSegment}> X </div> : null }
		</div>;
	}
}
