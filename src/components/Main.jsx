import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerticalForm from 'components/VerticalForm';
import * as formActions from 'actions/form';

class Main extends React.Component {
	render() {
		const { form } = this.props;
		const { toggleBlock } = this.props.formActions;
		
		return <section className="nemo-widget">
			<VerticalForm {...form} toggleBlock={toggleBlock}/>
		</section>;
	}
}

function mapStateToProps(state) {
	return {
		form: state.form
	}
}

function mapDispatchToProps(dispatch) {
	return {
		formActions: bindActionCreators(formActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);