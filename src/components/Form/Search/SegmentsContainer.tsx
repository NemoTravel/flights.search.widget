import * as React from 'react';
import { connect } from 'react-redux';
import Segment from './Segment';
import {ApplicationState, SegmentState} from "../../../state";

interface StateProps {
	segments: Array<SegmentState>;
}

interface Props {
	segments: Array<SegmentState>;
}

class SegmentsContainer extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	render(): React.ReactNode {
		const { segments } = this.props;

		return <div>
			<Segment segment={segments[0]} segmentId={0}/>
		</div>;
	};
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		segments: state.form.segments
	}
};

export default connect(mapStateToProps)(SegmentsContainer);