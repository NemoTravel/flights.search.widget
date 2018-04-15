import * as React from 'react';
import Form from './Form';
import { OnSearchFunction } from '../state';

interface Props {
	onSearch?: OnSearchFunction;
}

export default class Main extends React.Component<Props, any> {
	render(): React.ReactNode {
		return <section className="widget">
			<Form onSearch={this.props.onSearch}/>
		</section>;
	}
}
