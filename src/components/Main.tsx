import * as React from 'react';
import Form from './Form';

export default class Main extends React.Component<any, any> {
	render(): React.ReactNode {
		return <section className="widget">
			<Form/>
		</section>;
	}
}
