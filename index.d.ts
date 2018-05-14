import * as React from 'react';
import { SearchInfo, SystemState, SearchInfoPassenger, SearchInfoSegment } from './src/state';

export interface ComponentProps extends SystemState {
	onSearch?: (params: SearchInfo) => void;
}

export { SearchInfo, SearchInfoPassenger, SearchInfoSegment };

export const init: (config: any) => void;
export const initDemo: () => void;
export const enableCache: () => void;

export class Component extends React.Component<ComponentProps> {
	getSeachInfo(): SearchInfo;
}
