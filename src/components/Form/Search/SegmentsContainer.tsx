import * as React from 'react';
import { connect } from 'react-redux';
import Segment from './Segment';
import { ApplicationState, RouteType, SegmentState, MAX_SEGMENTS_COUNT, CommonThunkAction } from '../../../state';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { continueRoute, deleteSegment, SegmentAction } from '../../../store/form/segments/actions';
import { i18n } from '../../../utils';
import * as classnames from 'classnames';
import { isCR } from '../../../store/form/selectors';

interface StateProps {
	segments: SegmentState[];
	isCR: boolean;
}

interface DispatchProps {
	continueRoute: () => CommonThunkAction;
	removeSegment: () => SegmentAction;
}

class SegmentsContainer extends React.Component<StateProps & DispatchProps> {
	constructor(props: StateProps & DispatchProps) {
		super(props);

		this.continueRoute = this.continueRoute.bind(this);
	}

	continueRoute(): void {
		this.props.continueRoute();
	}

	renderAllSegment(): React.ReactNode {
		const { segments, isCR, removeSegment } = this.props;

		if (!isCR) {
			return <Segment
				segment={segments[0]}
				segmentId={0}
				key={0}
				removeSegment={removeSegment}
				canBeRemoved={false}
				showDatesError={false}
			/>;
		}

		return segments.map((segment: SegmentState, index: number) => {
			return <Segment
				segment={segment}
				segmentId={index}
				key={index}
				removeSegment={removeSegment}
				canBeRemoved={segments.length > 1 && segments.length - 1 === index && isCR}
				showDatesError={index > 0 && segment.dates.departure.date && segment.dates.departure.date.isBefore(segments[index - 1].dates.departure.date)}
			/>;
		});
	}

	render(): React.ReactNode {
		const { segments, isCR, continueRoute } = this.props;

		return <div className={classnames('form-group row widget-form-segments', {'widget-form-segments_CR': isCR })}>

			{this.renderAllSegment()}

			{isCR && segments.length < MAX_SEGMENTS_COUNT ?
				<div className="widget-form-search__addSegment" onClick={this.props.continueRoute}>
					{i18n('form', 'continue_route')}
				</div> : null}
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		segments: state.form.segments,
		isCR: isCR(state)
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		continueRoute: bindActionCreators(continueRoute, dispatch),
		removeSegment: bindActionCreators(deleteSegment, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(SegmentsContainer);
