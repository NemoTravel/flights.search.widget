import React from 'react';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore } from 'store';
import { systemState } from 'state';
import { cache } from 'utils';

export default class Demo extends React.Component {
	constructor(props) {
		super(props);
		const defaultLang = 'ru';
		const defaultWebskyURL = 'http://demo.websky.aero/gru';
		const defaultNemoURL = 'http://widget.mlsd.ru';
		this.store = getStore();
		
		this.state = {
			webskyURL: defaultWebskyURL,
			nemoURL: defaultNemoURL
		};
		
		this.config = {
			...systemState,
			locale: defaultLang,
			webskyURL: defaultWebskyURL,
			nemoURL: defaultNemoURL
		};

		cache('locale', defaultLang);
		
		this.processConfig = this.processConfig.bind(this);
	}

	processConfig() {
		this.store.dispatch({
			type: 'LOAD_CONFIG',
			payload: this.config
		});
	}
	
	render() {
		return <div className="form">
			<div className="nemo-widget-demo">
				<h3>Параметры виджета</h3>

				<div className="row">
					<div className="col form-group">
						<label>
							webskyURL
							<input type="text" className="form-control" value={this.state.webskyURL} placeholder="http://demo.websky.aero/gru" onChange={e => {
								this.config.webskyURL = e.target.value;
								this.setState({
									webskyURL: e.target.value
								});
								this.processConfig();
							}}/>
						</label>
					</div>

					<div className="col form-group">
						<label>
							nemoURL
							<input type="text" className="form-control" value={this.state.nemoURL} placeholder="http://widget.mlsd.ru" onChange={e => {
								this.config.nemoURL = e.target.value;
								this.setState({
									nemoURL: e.target.value
								});
								this.processConfig();
							}}/>
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-group">
						<label>
							routingGrid
							<input type="text" className="form-control" placeholder="IATA-код авиакомпании" onChange={e => {
								this.config.routingGrid = e.target.value;
								this.processConfig();
							}}/>
						</label>
					</div>

					<div className="col form-group">
						<label>
							mode
							<select className="form-control" onChange={e => {
								this.config.mode = e.target.value;
								this.processConfig();
							}}>
								<option value="NEMO">NEMO</option>
								<option value="WEBSKY">WEBSKY</option>
							</select>
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.verticalForm = e.target.checked;
								this.processConfig();
							}}/> verticalForm
						</label>
					</div>

					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.readOnlyAutocomplete = e.target.checked;
								this.processConfig();
							}}/> readOnlyAutocomplete
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.autoFocusArrivalAirport = e.target.checked;
								this.processConfig();
							}}/> autoFocusArrivalAirport
						</label>
					</div>

					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.autoFocusReturnDate = e.target.checked;
								this.processConfig();
							}}/> autoFocusReturnDate
						</label>
					</div>
				</div>
			</div>

			<Provider store={this.store}>
				<Main/>
			</Provider>
		</div>;
	}
}