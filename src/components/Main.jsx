import React from 'react';
import { connect } from 'react-redux';
// import VerticalForm from 'components/VerticalForm';

class Main extends React.Component {
	constructor(props) {
		super(props);
	}
	
	// render() {
	// 	return <section className="nemo-widget">
	// 		<VerticalForm/>
	// 	</section>;
	// }
	
	render() {
		return <div>Test</div>
	}
}

function mapStateToProps(state) {
	return {
		form: state.form
	}
}

export default connect(mapStateToProps)(Main);