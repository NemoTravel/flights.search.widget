import { ADD_SEGMENT } from '../../actions';
import { Segment, segmentState } from "../../../state";
import {SegmentAction} from "./actions";
import {AnyAction} from "redux";

export default (state: Segment = segmentState, action: SegmentAction): any => {
	return state;
}