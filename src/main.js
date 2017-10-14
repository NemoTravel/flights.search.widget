import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'components/Main';
import { Provider } from 'react-redux';
import { getStore, cacheState } from 'store';
import { systemState } from 'state';
import { cache } from 'utils';
import './css/main.scss';
import 'whatwg-fetch';

/**
 * This will be exported to the global scope as `AirlinesSearchWidget.init`.
 */
export function init(config = {}) {
	if (!config.rootElement) { throw Error('Please specify `rootElement` parameter in the configuration object.'); }
	if (!config.baseURL) { throw Error('Please specify `baseURL` parameter in the configuration object.'); }
	
	const store = getStore(config);

	ReactDOM.render(
		<Provider store={store}>
			<Main/>
		</Provider>,
		config.rootElement
	);

	// Subscribe to new state updates and cache new state.
	store.subscribe(() => cacheState(store.getState()));
}

export function initDemo() {
	const defaultLang = 'ru';
	const store = getStore();
	const config = { 
		...systemState,
		locale: defaultLang
	};

	cache('locale', defaultLang);
	
	const processConfig = () => {
		store.dispatch({
			type: 'LOAD_CONFIG',
			payload: config
		});
	};

	ReactDOM.render(
		<div className="form">
			<div className="nemo-widget-demo">
				<h3>Параметры виджета</h3>
				
				<div className="row">
					<div className="col form-group">
						<label>
							baseURL
							<input type="text" className="form-control" placeholder="http://widget.mlsd.ru" onChange={e => {
								config.baseURL = e.target.value;
								processConfig();
							}}/>
						</label>
					</div>

					<div className="col form-group">
						<label>
							nemoURL
							<input type="text" className="form-control" placeholder="http://widget.mlsd.ru" onChange={e => {
								config.nemoURL = e.target.value;
								processConfig();
							}}/>
						</label>
					</div>
				</div>
				
				<div className="row">
					<div className="col form-group">
						<label>
							routingGrid
							<input type="text" className="form-control" placeholder="IATA-код авиакомпании" onChange={e => {
								config.routingGrid = e.target.value;
								processConfig();
							}}/>
						</label>
					</div>
	
					<div className="col form-group">
						<label>
							mode
							<input type="text" className="form-control" placeholder="NEMO или WEBSKY" onChange={e => {
								config.mode = e.target.value;
								processConfig();
							}}/>
						</label>
					</div>
				</div>
				
				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								config.verticalForm = e.target.checked;
								processConfig();
							}}/> verticalForm
						</label>
					</div>
					
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								config.readOnlyAutocomplete = e.target.checked;
								processConfig();
							}}/> readOnlyAutocomplete
						</label>
					</div>
				</div>
				
				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								config.autoFocusArrivalAirport = e.target.checked;
								processConfig();
							}}/> autoFocusArrivalAirport
						</label>
					</div>
					
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								config.autoFocusReturnDate = e.target.checked;
								processConfig();
							}}/> autoFocusReturnDate
						</label>
					</div>
				</div>
			</div>
			
			<Provider store={store}>
				<Main/>
			</Provider>
		</div>,
		document.getElementById('root')
	);
}