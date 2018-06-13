import * as React from 'react';
import * as moment from 'moment';

export interface Country {
	code: string;
	name: string;
	nameEn: string;
}

export interface CityResponseAirportItem {
	IATA: string;
}

export interface City {
	IATA: string;
	airports: CityResponseAirportItem[];
	countryCode: string;
	id: number;
	name: string;
	nameEn: string;
}

export interface PassengersConfig {
	[passengerType: string]: number;
}

export interface SystemState {
	rootElement?: HTMLElement;
	nemoURL?: string;
	webskyURL?: string;
	routingGrid?: string;
	locale?: Language;
	verticalForm?: boolean;
	readOnlyAutocomplete?: boolean;
	autoFocusArrivalAirport?: boolean;
	autoFocusReturnDate?: boolean;
	mode?: ApplicationMode;
	defaultDepartureAirport?: string | Airport;
	defaultArrivalAirport?: string | Airport;
	defaultDepartureDate?: string;
	defaultReturnDate?: string;
	defaultPassengers?: PassengersConfig;
	defaultServiceClass?: ServiceClass;
	directOnly?: boolean;
	vicinityDatesMode?: boolean;
	useNearestAirport?: boolean;
	highlightAvailableDates?: boolean;
	vicinityDays?: number;
	enableCoupon?: boolean;
	enableMileCard?: boolean;
	aggregationOnly?: boolean;
	disableCaching?: boolean;
	isComplexRoute?: boolean;
}

export interface Airport {
	IATA: string;
	airportRating: string;
	isAggregation: boolean;
	name: string;
	nameEn: string;
	properName: string;
	properNameEn: string;
	city: City;
	country: Country;
	isCity?: boolean;
	insideAggregationAirport?: boolean;
}

export interface SearchInfoSegment {
	departure: Airport;
	arrival: Airport;
	departureDate: moment.Moment;
	returnDate?: moment.Moment;
}

export enum Language {
	English = 'en',
	Russian = 'ru'
}

export enum ApplicationMode {
	NEMO = 'NEMO',
	WEBSKY = 'WEBSKY'
}

export enum ServiceClass {
	Economy = 'Economy',
	Business = 'Business'
}

export enum RouteType {
	OW = 'OW',
	RT = 'RT',
	CR = 'CR'
}

export enum PassengerType {
	Adult = 'ADT',
	Child = 'CLD',
	Infant = 'INF',
	InfantWithSeat = 'INS'
}

export interface SearchInfoPassenger {
	type: PassengerType;
	count: number;
}

export interface SearchInfo {
	segments: SearchInfoSegment[];
	routeType: RouteType;
	passengers: SearchInfoPassenger[];
	serviceClass: ServiceClass;
}

export interface ComponentProps extends SystemState {
	onSearch?: (params: SearchInfo) => void;
}

export const init: (config: any) => void;
export const enableCache: () => void;

export class Component extends React.Component<ComponentProps> {
	getSeachInfo(): SearchInfo;
}
