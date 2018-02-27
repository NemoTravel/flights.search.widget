import * as React from 'react';
import { connect } from 'react-redux';
import Segment from './Segment';
import {ApplicationState, RouteType, SegmentState} from '../../../state';
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {addSegment, SegmentAction} from "../../../store/form/segments/actions";

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
		const { segments } = this.props;

		return segments.map( (segment:SegmentState, index: number) => {
			return <div key={index} className="widget-form-airports__segment">
				<Segment segment={segment} segmentId={index}/>
			</div>
		});
	}

	render(): React.ReactNode {
		const { segments, routeType } = this.props;

		return <div className="form-group row widget-form-airports">

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
