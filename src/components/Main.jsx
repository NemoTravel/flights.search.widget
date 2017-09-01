import React from 'react';
import VerticalForm from './VerticalForm';

export default class MainComponent extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return <section className="nemo-widget">
			<VerticalForm/>
		</section>;
	}
}