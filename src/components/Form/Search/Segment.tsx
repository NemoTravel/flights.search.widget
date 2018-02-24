import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';

interface Props {
	segmentId: Number;
}

export default class Segment extends React.Component<Props> {
	render(): React.ReactNode {
		return <div>
			<AutocompleteContainer/>
		</div>
	}
}