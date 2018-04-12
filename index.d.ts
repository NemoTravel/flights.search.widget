export = SearchWidget;
export as namespace SearchWidget;

declare namespace SearchWidget {
	import { WrappedMain } from './src/main';

	const init: (config: any) => void;
	const initDemo: () => void;
	const enableCache: () => void;

	export type Component = WrappedMain;
}
