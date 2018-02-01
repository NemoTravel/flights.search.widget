import * as React from 'react';
import * as classnames from 'classnames';
import { PassengersAction } from '../../../../store/form/passengers/actions';
import { PassengerType } from '../../../../state';

interface Props {
	addPassenger: (passengerType: PassengerType) => PassengersAction;
	removePassenger: (passengerType: PassengerType) => PassengersAction;
	title: string;
	ageTitle: string;
	code: PassengerType;
	count: number;
	canAddPassenger: boolean;
	canRemovePassenger: boolean;
}

class Counter extends React.Component<Props> {

	constructor(props: Props) {
		super(props);

		this.addPassenger = this.addPassenger.bind(this);
		this.removePassenger = this.removePassenger.bind(this);
	}

	shouldComponentUpdate(nextProps: Props): boolean {
		const { count, canAddPassenger, canRemovePassenger } = this.props;

		return count !== nextProps.count || canAddPassenger !== nextProps.canAddPassenger || canRemovePassenger !== nextProps.canRemovePassenger;
	}

	removePassenger(): void {
		const { canRemovePassenger, code } = this.props;

		if (canRemovePassenger) {
			this.props.removePassenger(code);
		}
	}

	addPassenger(): void {
		const { canAddPassenger, code } = this.props;

		if (canAddPassenger) {
			this.props.addPassenger(code);
		}
	}

	render(): React.ReactNode {
		const { title, ageTitle, count, canAddPassenger, canRemovePassenger } = this.props;
		const itemClassName = classnames(
			'widget-form-passengers__item',
			{ 'widget-form-passengers__item_disabled': !count }
		);

		const minusClassName = classnames(
			'widget-ui-icon widget-form-passengers__icon widget-form-passengers__minus',
			{ 'widget-form-passengers__icon_disabled': !canRemovePassenger }
		);

		const plusClassName = classnames(
			'widget-ui-icon widget-form-passengers__icon widget-form-passengers__plus',
			{ 'widget-form-passengers__icon_disabled': !canAddPassenger }
		);

		return <div className={itemClassName}>
			<div className="widget-form-passengers__title">
				{title}

				<span className="widget-form-passengers__title__age">
					{ageTitle}
				</span>
			</div>

			<div className="widget-form-passengers__counter">
				<div className={minusClassName} onClick={this.removePassenger}/>
				<div className="widget-form-passengers__number">{count}</div>
				<div className={plusClassName} onClick={this.addPassenger}/>
			</div>
		</div>;
	}
}

export default Counter;
