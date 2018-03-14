import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';
import DatesContainer from './DatesContainer';
import { SegmentState } from '../../../state';
import { SegmentAction } from '../../../store/form/segments/actions';

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

	shouldComponentUpdate(nextProps: Props): boolean {
		const { canBeRemoved, showDatesError, segment } = this.props;

		return canBeRemoved !== nextProps.canBeRemoved ||
			showDatesError !== nextProps.showDatesError ||
			segment !== nextProps.segment;
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

			<DatesContainer
				segmentId={segmentId}
				departureDatepicker={segment.dates.departure}
				returnDatepicker={segment.dates.return}
				datesIsNotOrder={showDatesError}/>

			{ canBeRemoved ? <div className="widget-form-airports__segment__drop" onClick={this.deleteSegment}></div> : null }
		</div>;
	}
}
