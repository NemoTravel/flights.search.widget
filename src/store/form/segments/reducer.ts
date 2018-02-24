import { ADD_SEGMENT } from '../../actions';
import { SegmentState, segmentState } from "../../../state";
import {SegmentAction} from "./actions";
import {AnyAction} from "redux";

export default (state: SegmentState = segmentState, action: SegmentAction): SegmentState => {
	return state;
}