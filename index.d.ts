import * as React from 'react';
import { SearchInfo, SystemState } from './src/state';

export interface ComponentProps extends SystemState {
	onSearch?: (params: SearchInfo) => void;
}

interface Component<P, S = any> extends React.Component<P, S> {
	getSeachInfo(): SearchInfo;
}

export const init: (config: any) => void;
export const initDemo: () => void;
export const enableCache: () => void;
export const Component: Component<ComponentProps>;
