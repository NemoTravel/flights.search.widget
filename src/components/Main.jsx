import React from 'react';
import VerticalForm from 'components/VerticalForm';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return <section className="nemo-widget">
			<VerticalForm/>
		</section>;
	}
}