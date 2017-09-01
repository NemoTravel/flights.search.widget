import React from 'react';

export default class MainComponent extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return <div className="container">
			Hello Nemo!
			<div>
				<a href="#" className="btn btn-primary">Click me</a>
			</div>
		</div>;
	}
}