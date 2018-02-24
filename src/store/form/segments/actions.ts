import { Action } from 'redux';

export interface SegmentAction extends Action {
	segmentId: number;
	type: string;
}