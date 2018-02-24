import * as React from 'react';
import AutocompleteContainer from './AutocompleteContainer';

interface Props {
	segmentId: number;
}

export default class Segment extends React.Component<Props> {
	render(): React.ReactNode {
		const { segmentId } = this.props;

		return <div>
			<AutocompleteContainer segmentId={segmentId}/>
		</div>
	}
}