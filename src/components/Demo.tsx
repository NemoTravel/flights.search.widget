import * as React from 'react';
import autobind from 'autobind-decorator';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import Main from './Main';
import { getStore } from '../store';
import { ApplicationMode, SystemState, systemState } from '../state';
import * as Cache from '../cache';
import CodeBlock from './UI/CodeBlock';
import 'css/nemo/main.scss';
import { Language } from '../state';
import { MouseEvent } from 'react';

interface DemoFormState {
	webskyURL: string;
	nemoURL: string;
	generatedConfig: string;
	nemoStyles: boolean;
}

const defaultLang = Language.Russian;
const defaultWebskyURL = 'http://demo.websky.aero/gru';
const defaultNemoURL = 'http://sys.nemo.travel';

export default class Demo extends React.Component<any, DemoFormState> {
	public config: SystemState = {
		...systemState,
		locale: defaultLang,
		webskyURL: defaultWebskyURL,
		nemoURL: defaultNemoURL
	};

	public store: Store<SystemState> = getStore({
		locale: defaultLang
	});

	public state: DemoFormState = {
		webskyURL: defaultWebskyURL,
		nemoURL: defaultNemoURL,
		generatedConfig: '',
		nemoStyles: false
	};

	@autobind
	toggleNemoStyles() {
		this.setState({
			nemoStyles: !this.state.nemoStyles
		});
	}

	componentDidMount() {
		Cache.set(Cache.KEY_LOCALE, defaultLang);

		this.store.subscribe(() => {
			this.setState({
				generatedConfig: JSON.stringify(this.config)
			});
		});

		this.processConfig();
	}

	@autobind
	processConfig() {
		this.store.dispatch({
			type: 'LOAD_CONFIG',
			payload: this.config
		});
	}

	@autobind
	textAreaClickHandler(event: MouseEvent<HTMLTextAreaElement>) {
		if (event.target instanceof HTMLTextAreaElement) {
			event.target.select();
		}
	}

	render() {
		return <div className="widget-demo">
			{this.state.nemoStyles ? <link rel="stylesheet" href="/nemo-flights.search.widget.min.css"/> : null}

			<div className="form widget-demo-config">
				<h3>Параметры виджета</h3>

				<div className="widget-demo-config__information row">
					<div className="col">
						<p>Ниже представлены элементы управления, позволяющие в режиме реального времени изменять
							конфигурацию виджета.</p>
						<p>
							Полный перечень параметров конфигурации представлен в описании к репозиторию виджета:&nbsp;
							<a href="https://github.com/NemoTravel/flights.search.widget#Конфигурация">https://github.com/NemoTravel/flights.search.widget#Конфигурация</a>
						</p>
					</div>
				</div>

				<div className="row widget-demo-config__inputBlock">
					<div className="col form-group">
						<label>
							<div className="widget-demo-config__description">
								Конфиг виджета для инициализации:
								<CodeBlock>FlightsSearchWidget.init(...конфиг)</CodeBlock>
							</div>

							<textarea className="form-control" rows={10} value={this.state.generatedConfig} onClick={this.textAreaClickHandler}/>
						</label>
					</div>
				</div>

				<div className="row widget-demo-config__inputBlock">
					<div className="col form-group">
						<label>
							<div className="widget-demo-config__description">
								<CodeBlock>webskyURL</CodeBlock>: URL системы Websky
							</div>

							<input type="text" className="form-control" value={this.state.webskyURL} placeholder="http://demo.websky.aero/gru" onChange={e => {
								this.config.webskyURL = e.target.value;
								this.setState({
									webskyURL: e.target.value
								});
								this.processConfig();
							}}/>
						</label>
					</div>
				</div>

				<div className="row widget-demo-config__inputBlock">
					<div className="col form-group">
						<label>
							<div className="widget-demo-config__description">
								<CodeBlock>nemoURL</CodeBlock>: URL системы Nemo
							</div>

							<input type="text" className="form-control" value={this.state.nemoURL} placeholder="http://sys.nemo.travel" onChange={e => {
								this.config.nemoURL = e.target.value;
								this.setState({
									nemoURL: e.target.value
								});
								this.processConfig();
							}}/>
						</label>
					</div>
				</div>

				<div className="row widget-demo-config__inputBlock">
					<div className="col form-group">
						<label>
							<div className="widget-demo-config__description">
								<CodeBlock>routingGrid</CodeBlock>: авиакомпания для получения маршрутной сетки (только
								для режима Nemo)
							</div>

							<input type="text" className="form-control" placeholder="IATA-код авиакомпании" onChange={e => {
								this.config.routingGrid = e.target.value;
								this.processConfig();
							}}/>
						</label>
					</div>
				</div>

				<div className="row widget-demo-config__inputBlock">
					<div className="col form-group">
						<label>
							<div className="widget-demo-config__description">
								<CodeBlock>mode</CodeBlock>: режим работы виджета
							</div>

							<select className="form-control" onChange={e => {
								this.config.mode = e.target.value as ApplicationMode;
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
							}}/>
							<CodeBlock>verticalForm</CodeBlock>: режим вертикальной формы
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.readOnlyAutocomplete = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>readOnlyAutocomplete</CodeBlock>: выбор аэропорта из списка, без возможности
							ручного ввода; для режима Websky, или Nemo + указанный параметр
							<CodeBlock>routingGrid</CodeBlock>
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.autoFocusArrivalAirport = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>autoFocusArrivalAirport</CodeBlock>: автоматически фокусироваться на поле выбора
							пункта прилета, после выбора пункта вылета
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.autoFocusReturnDate = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>autoFocusReturnDate</CodeBlock>: автоматически фокусироваться на поле выбора
							обратной даты вылета, после выбора даты вылета
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.highlightAvailableDates = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>highlightAvailableDates</CodeBlock>: подсвечивать в календаре даты с доступными
							рейсами (для режима Websky)
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.enableCoupon = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>enableCoupon</CodeBlock>: Добавляет поле `У меня есть купон на скидку` (для режима Websky)
						</label>
					</div>
				</div>

				<div className="row" style={{ display: 'none' }}>
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.enableMileCard = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>enableMileCard</CodeBlock>: Добавляет поле `Оплата милями` (для режима Websky)
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={this.toggleNemoStyles}/>
							<CodeBlock>Включить стилизацию Nemo</CodeBlock>
						</label>
					</div>
				</div>

				<div className="row">
					<div className="col form-check">
						<label className="form-check-label">
							<input type="checkbox" className="form-check-input" onChange={e => {
								this.config.aggregationOnly = e.target.checked;
								this.processConfig();
							}}/>
							<CodeBlock>aggregationOnly</CodeBlock>: (Только для режима `WEBSKY`) Если у агрегирующего города есть только 1 аэропорт,
							то показывать в автокомплите только агрегирующий город.
							Пример, в случае Берлин (BER) и Тегель (TXL, относится к Берлину) в автокомплите будет отображаться только Берлин.
						</label>
					</div>
				</div>
			</div>

			<div className="widget-demo-content">
				<Provider store={this.store}>
					<Main/>
				</Provider>
			</div>
		</div>;
	}
}
