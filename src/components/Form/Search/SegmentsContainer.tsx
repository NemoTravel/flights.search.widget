import * as React from 'react';
import { connect } from 'react-redux';
import Segment from './Segment';
import { ApplicationState, RouteType, SegmentState, MAX_SEGMENTS_COUNT, CommonThunkAction } from '../../../state';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { continueRoute, deleteSegment, SegmentAction } from '../../../store/form/segments/actions';
import * as classnames from 'classnames';

interface StateProps {
	segments: SegmentState[];
	routeType: RouteType;
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
		const { segments, routeType, removeSegment } = this.props;

		return segments.map((segment: SegmentState, index: number) => {
			return <Segment
				segment={segment}
				segmentId={index}
				key={index}
				removeSegment={removeSegment}
				canBeRemoved={segments.length > 1 && segments.length - 1 === index && routeType === RouteType.CR}
				showDatesError={index > 0 && segment.dates.departure.date && segment.dates.departure.date.isBefore(segments[index - 1].dates.departure.date)}
			/>;
		});
	}

	render(): React.ReactNode {
		const { segments, routeType, continueRoute } = this.props;

		return <div className={classnames('form-group row widget-form-airports', {'widget-form-airports_CR': routeType === RouteType.CR })}>

			{this.renderAllSegment()}

			{routeType === RouteType.CR && segments.length < MAX_SEGMENTS_COUNT ?
				<div className="widget-form__addSegment" onClick={this.props.continueRoute}>
					Продолжить маршрут
				</div> : null}
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		segments: state.form.segments,
		routeType: state.form.routeType
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		continueRoute: bindActionCreators(continueRoute, dispatch),
		removeSegment: bindActionCreators(deleteSegment, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(SegmentsContainer);
