import * as React from 'react';
import { SearchInfo, SystemState } from './src/state';

export interface ComponentProps extends SystemState {
	onSearch?: (params: SearchInfo) => void;
}
export const init: (config: any) => void;
export const initDemo: () => void;
export const enableCache: () => void;
export const Component: React.ComponentType<ComponentProps>;
