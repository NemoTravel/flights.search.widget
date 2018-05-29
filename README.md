<p align="center">
    <img width="200" src="http://mjolnir.com.ua/kcfinder/upload/images/logo.jpg">
</p>

# Flights Search Widget
[![npm version](https://badge.fury.io/js/%40nemo.travel%2Fsearch-widget.svg)](https://badge.fury.io/js/%40nemo.travel%2Fsearch-widget)
[![Build Status](https://travis-ci.org/NemoTravel/flights.search.widget.svg?branch=master)](https://travis-ci.org/NemoTravel/flights.search.widget)

## Usage

Place the following code in the head section of your HTML page:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&amp;subset=cyrillic">
<link rel="stylesheet" href="flights.search.widget.min.css">
```

Place this where you want the search form to appear:

```html
<div id="nemo-widget-root"></div>
```

And add this at the very bottom of the page:
```html
<script src="flights.search.widget.min.js"></script>
<script>
    FlightsSearchWidget.init({
        webskyURL: 'http://demo.websky.aero/gru',
        nemoURL: 'http://sys.nemo.travel',
        rootElement: document.getElementById('nemo-widget-root'),
        locale: 'en'
    });
</script>
```

Files used in the example above (`flights.search.widget.min.css` and `flights.search.widget.min.js`) are located in the `dist` [folder](https://github.com/NemoTravel/flights.search.widget/tree/master/dist). You are free to keep these files wherever you like to (e.g. CDN services), but be sure to provide the correct paths in the HTML code.

Extended version of the example is available [here](https://github.com/NemoTravel/flights.search.widget/blob/master/dist/index.html).

## Nemo.travel appearance

If you want to achieve the common Nemo.travel appearance of the Search Form, just add this code to the head section of the page, right after the `flights.search.widget.min.css` file:
```html
<link rel="stylesheet" href="nemo-flights.search.widget.min.css">
```

## Configuration

В метод `init` передается объект конфигурации виджета. Возможные параметры конфигурации:

| Name | Mandatory | Type | Default | Description |
| :- | :- | :- | :- | :- |
| **nemoURL** | **yes** | `string` | - | `Nemo.travel` service URL. |
| **rootElement** | **yes** | `HTMLElement` | - | The DOM Element in which Search Form will be embedded to. |
| **webskyURL** | **yes** (`WEBSKY` mode) | `string` | - | `Websky` service URL. |
| aggregationOnly | - | `bool` | `false` | (`WEBSKY` mode) Если у агрегирующего города есть только 1 аэропорт, то показывать в автокомплите только агрегирующий город. Пример, в случае Берлин (BER) и Тегель (TXL, относится к Берлину) в автокомплите будет отображаться только Берлин. |
| autoFocusArrivalAirport | - | `boolean` | `false` | Focus the arrival airport field automatically after the choosing of the departure airport. |
| autoFocusReturnDate | - | `boolean` | `false` | Focus the return date field automatically after the choosing of the departure date. |
| defaultArrivalAirport | - | `string` or `object`  | `null` | IATA code of the airport or city, or the whole [Airport](#Airport) object, which will be used as the default arrival airport. |
| defaultDepartureAirport | - | `string` или `object` | `null` | IATA code of the airport or city, or the whole [Airport](#Airport) object, which will be used as the default departure airport. |
| defaultDepartureDate | - | `string` | `null` | Default departure date (YYYY-MM-DD). |
| defaultReturnDate | - | `string` | `null` | Default return date (YYYY-MM-DD). |
| defaultPassengers | - | `object` | `{ ADT: 1 }` | Preset of the number of passengers. |
| defaultServiceClass | - | `string` | `Economy` | Default travel class (`Economy` or `Business`). |
| directOnly | - | `bool` | `false` | Search for direct flights only. |
| disableCaching | - | `bool` | `false` | Do not save parameters of the Search Form selected by user. |
| enableCoupon | - | `boolean` | `false` | Show the discount coupon field (
`WEBSKY` mode). |
| highlightAvailableDates | - | `boolean` | `false` | Активирует в календаре подсветку дат, на которые есть доступные рейс. |
| locale | - | `string` | `"en"` | Supported languages: russian (`ru`), english (`en`), german (`de`), romanian (`ro`). |
| mode | - | `string` | `"NEMO"` | Name of the booking system used for searching: `NEMO` or `WEBSKY`. |
| readOnlyAutocomplete | - | `boolean` | `false` | Disallow text input in the airports selection fields (only if `routingGrid` is specified and the `WEBSKY` mode is turned on). |
| routingGrid | - | `string` | `null` | Main airline IATA code.  |
| useNearestAirport | - | `boolean` | `false` | Try to find out the airport closest to the user and use it as the default departure airport (only if `defaultDepartureAirport` is not specified) |
| verticalForm | - | `boolean` | `false` | Show the Search Form in the vertical appearance. |
| vicinityDatesMode | - | `bool` | `false` | Search flights in the given interval of dates. |
| vicinityDays | - | `integer` | `3` | Search flights in the given interval of dates (only if `vicinityDatesMode` and the `NEMO` mode are turned on) |

### Airport
| Name | Mandatory | Type | Description |
| :- | :- | :- | :- |
| **IATA** | **yes** | `string` | Airport or city IATA code. |
| **name** | **yes** | `string` | Display name of the airport or city. |
| **nameEn** | **yes** | `string` | English name of the airport or city. |
| country | - | `object` | [Country](#Country) object |
| countryCode | - | `string` | Country code ISO 3166-1 alpha-2. |
| isCity | - | `bool` | Is city or airport object. |

### Country
| Name | Mandatory | Type | Description |
| :- | :- | :- | :- |
| **code** | **yes** | `string` | Country code ISO 3166-1 alpha-2. |
| **name** | **yes** | `string` | Display name of the country. |
| **nameEn** | **yes** | `string` | English name of the country. |

## Сохранение данных в локальное хранилище браузера

По-умолчанию, виджет автоматически сохраняет все данные формы поиска в локальное хранилище браузера. Это позволяет избежать потери данных при перезагрузке страницы.

Эту возможность можно отключить с помощью параметра `disableCaching` при вызове метода `init`. Затем, чтобы обратно включить работу с локальным хранилищем после инициализации виджета, необходимо вызвать глобальную функцию `FlightsSearchWidget.enableCache()`.
