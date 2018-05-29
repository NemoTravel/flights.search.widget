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

## Сохранение данных в локальное хранилище браузера

По-умолчанию, виджет автоматически сохраняет все данные формы поиска в локальное хранилище браузера. Это позволяет избежать потери данных при перезагрузке страницы.

Эту возможность можно отключить с помощью параметра `disableCaching` при вызове метода `init`. Затем, чтобы обратно включить работу с локальным хранилищем после инициализации виджета, необходимо вызвать глобальную функцию `FlightsSearchWidget.enableCache()`.

## Конфигурация

В метод `init` передается объект конфигурации виджета. Возможные параметры конфигурации:

| Название параметра | Обязательный параметр | Тип значения | Значение по умолчанию | Описание |
| :- | :- | :- | :- | :- |
| **nemoURL** | **да** | `string` | - | URL системы бронирования `Nemo.travel` |
| **rootElement** | **да** | `HTMLElement` | - | DOM-элемент в который будет встраиваться виджет |
| **webskyURL** | **да** (в режиме `WEBSKY`) | `string` | - | URL системы бронирования `Websky` |
| aggregationOnly | - | `bool` | `false` | (Только для режима `WEBSKY`) Если у агрегирующего города есть только 1 аэропорт, то показывать в автокомплите только агрегирующий город. Пример, в случае Берлин (BER) и Тегель (TXL, относится к Берлину) в автокомплите будет отображаться только Берлин. |
| autoFocusArrivalAirport | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора аэропорта прилета, после выбора аэропорта вылета. |
| autoFocusReturnDate | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора обратной даты, после выбора даты вылета. |
| defaultArrivalAirport | - | `string` или `object`  | `null` | Трехбуквенный IATA-код аэропорта или города, или объект [Airport](#Объект-airport), который будет выбран по умолчанию в качестве аэропорта прилета. |
| defaultDepartureAirport | - | `string` или `object` | `null` | Трехбуквенный IATA-код аэропорта или города, или объект [Airport](#Объект-airport), который будет выбран по умолчанию в качестве аэропорта вылета. |
| defaultDepartureDate | - | `string` | `null` | Дата вылета "туда" в строковом формате (YYYY-MM-DD). |
| defaultReturnDate | - | `string` | `null` | Дата вылета "обратно" в строковом формате (YYYY-MM-DD). |
| defaultPassengers | - | `object` | `{ ADT: 1 }` | Предуставленное кол-во пассажиров |
| defaultServiceClass | - | `string` | `Economy` | Класс обслуживания (`Economy` или `Business`) по-умолчанию |
| directOnly | - | `bool` | `false` | Искать только прямые рейсы |
| disableCaching | - | `bool` | `false` | Запрещает сохранение данных формы в локальное хранилище пользователя |
| enableCoupon | - | `boolean` | `false` | Добавляет поле `У меня есть купон на скидку` (только для `WEBSKY`) |
| highlightAvailableDates | - | `boolean` | `false` | Активирует в календаре подсветку дат, на которые есть доступные рейсы (только для `WEBSKY`) |
| locale | - | `string` | `"en"` | Язык интерфейса. Поддерживаются языки: русский (`ru`), английский (`en`), немецкий (`de`), румынский (`ro`) |
| mode | - | `string` | `"NEMO"` | Название системы бронирования, с которой предстоит работать (`NEMO` или `WEBSKY`) |
| readOnlyAutocomplete | - | `boolean` | `false` | Запретить ввод текста в поля автокомплита аэропортов (только если указан параметр `routingGrid`, или включен режим `Websky`) |
| routingGrid | - | `string` | `null` | Двухбуквенный IATA-код авиакомпании. Если указан, автокомплит аэропортов переключается в режим поиска по маршрутной сетке авиакомпании. Также, при клике в поле автокомплита, отображаются все возможные пункты назначений авиакомпании |
| useNearestAirport | - | `boolean` | `false` | Выбирать в качестве пункта вылета ближайший аэропорт, полученный на основе IP-адреса пользователя (только если не указан параметр `defaultDepartureAirport`) |
| verticalForm | - | `boolean` | `false` | Отображать ли принудительно вертикальную форму поиска, вместо горизонтальной |
| vicinityDatesMode | - | `bool` | `false` | Искать перелеты в заданной границе дат |
| vicinityDays | - | `integer` | `3` | Количество дней для "Искать ±3 дня" (только для `NEMO` при включенной настройке `vicinityDatesMode`) |

### Объект Airport
| Название параметра | Обязательный параметр | Тип значения | Описание |
| :- | :- | :- | :- |
| **IATA** | **да** | `string` | Трехбуквенный IATA-код аэропорта или города |
| **name** | **да** | `string` | Название города или аэропорта |
| **nameEn** | **да** | `string` | Название города или аэропорта на английском языке |
| country | - | `object` | Объект [Country](#Объект-country) |
| countryCode | - | `string` | Двухбуквенный код страны |
| isCity | - | `bool` | Является ли IATA объект городом |

### Объект Country
| Название параметра | Обязательный параметр | Тип значения | Описание |
| :- | :- | :- | :- |
| **code** | **да** | `string` | Двухбуквенный код страны |
| **name** | **да** | `string` | Название страны |
| **nameEn** | **да** | `string` | Название страны на английском языке |
