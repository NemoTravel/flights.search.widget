import * as React from 'react';
import { SystemState } from './src/state';

export const init: (config: any) => void;
export const initDemo: () => void;
export const enableCache: () => void;
export const Component: React.ComponentType<SystemState>;
