import * as React from 'react';
import { connect } from 'react-redux';
import Segment from './Segment';
import {ApplicationState, RouteType, SegmentState} from '../../../state';
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {addSegment, SegmentAction} from "../../../store/form/segments/actions";
import * as classnames from 'classnames';

interface StateProps {
	segments: SegmentState[];
}

interface DispatchProps {
	addSegment: () => SegmentAction;
}

interface Props {
	segments: SegmentState[];
	routeType: RouteType;
}

class SegmentsContainer extends React.Component<StateProps & DispatchProps & Props> {
	constructor(props: StateProps & DispatchProps & Props) {
		super(props);

		this.continueRoute = this.continueRoute.bind(this);
	}

	continueRoute(): void {
		this.props.addSegment();
	}

	renderAllSegment(): React.ReactNode {
		const { segments, routeType } = this.props;

		return segments.map( (segment:SegmentState, index: number) => {
			return <Segment segment={segment} segmentId={index} key={index} routeType={routeType}/>

		});
	}

	render(): React.ReactNode {
		const { segments, routeType } = this.props;

		return <div className={classnames('form-group row widget-form-airports', {'widget-form-airports_CR': routeType === RouteType.CR })}>

			{ this.renderAllSegment() }

			{ routeType === RouteType.CR ?
				<div className="widget-form__addSegment" onClick={this.continueRoute}>
					Продолжить маршрут
				</div> : null }
		</div>;
	}
}

const mapStateToProps = (state: ApplicationState): StateProps => {
	return {
		segments: state.form.segments
	};
};

const mapActionsToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => {
	return {
		addSegment: bindActionCreators(addSegment, dispatch)
	};
};

export default connect(mapStateToProps, mapActionsToProps)(SegmentsContainer);
