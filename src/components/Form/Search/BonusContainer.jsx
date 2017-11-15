import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouponContainer from 'components/Form/Search/Bonus/CouponContainer';
import MileCardContainer from 'components/Form/Search/Bonus/MileCardContainer';
import { toggleBonusField } from 'store/form/actions';

class BonusContainer extends React.Component {
	render() {
		return <div className="row widget-form-search__bonus">
			<div className="col">
				<CouponContainer toggleBonusField={this.props.toggleBonusField}/>
			</div>
			<div className="col">
				<MileCardContainer toggleBonusField={this.props.toggleBonusField}/>
			</div>
		</div>;
	}
}

export default connect(
	state => {
		return {
			...state
		};
	},
	dispatch => bindActionCreators({ toggleBonusField }, dispatch)
)(BonusContainer);
