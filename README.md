<p align="center">
    <img width="200" src="http://mjolnir.com.ua/kcfinder/upload/images/logo.jpg">
</p>

# Flights Search Widget
[![npm version](https://badge.fury.io/js/%40nemo.travel%2Fsearch-widget.svg)](https://badge.fury.io/js/%40nemo.travel%2Fsearch-widget)
[![Build Status](https://travis-ci.org/NemoTravel/flights.search.widget.svg?branch=master)](https://travis-ci.org/NemoTravel/flights.search.widget)

## Установка виджета

Для работы виджета необходимо любым удобным способом подключить на страницу файлы из папки `dist`:
* файл стилизации виджета: `flights.search.widget.min.css`
* файл с JavaScript-кодом виджета: `flights.search.widget.min.js`
* в той же папке, где будет расположен файл стилизации, следует разместить папку `images`, необходимую для корректного отображения изображений

## Инициализация виджета на странице

При подключении файла `flights.search.widget.min.js`, на странице становится доступен JavaScript-объект `FlightsSearchWidget` с единственным методом `init`, запускающим инициализацию виджета:

```html
<div id="root"></div>
<link rel="stylesheet" href="flights.search.widget.min.css">
<script src="flights.search.widget.min.js"></script>
<script>
    FlightsSearchWidget.init({
        webskyURL: 'http://demo.websky.aero/gru',
        nemoURL: 'http://sys.nemo.travel',
        rootElement: document.getElementById('root'),
        locale: 'ru'
    });
</script>
```

Также, пример инициализации виджета приведен в файле `/dist/index.html`.

## Конфигурация

В метод `init` передается объект конфигурации виджета. Возможные параметры конфигурации:

| Название параметра | Обязательный параметр | Тип значения | Значение по умолчанию | Описание |
| :- | :- | :- | :- | :- |
| **nemoURL** | **да** | `string` | - | URL системы бронирования `Nemo.travel` |
| **rootElement** | **да** | `HTMLElement` | - | DOM-элемент в который будет встраиваться виджет |
| **webskyURL** | **да** (в режиме `WEBSKY`) | `string` | - | URL системы бронирования `Websky` |
| autoFocusArrivalAirport | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора аэропорта прилета, после выбора аэропорта вылета. |
| autoFocusReturnDate | - | `boolean` | `false` | Автоматически фокусироваться на поле выбора обратной даты, после выбора даты вылета. |
| defaultArrivalAirport | - | `string` | `null` | Трехбуквенный IATA-код аэропорта или города, который будет выбран по умолчанию в качестве аэропорта прилета. |
| defaultArrivalAirport | - | `object` | `null` | Объект [Airport](#airport) |
| defaultDepartureDate | - | `string` | `null` | Дата вылета "туда" в строковом формате (YYYY-MM-DD). |
| defaultReturnDate | - | `string` | `null` | Дата вылета "обратно" в строковом формате (YYYY-MM-DD). |
| defaultDepartureAirport | - | `string` | `null` | Трехбуквенный IATA-код аэропорта или города, который будет выбран по умолчанию в качестве аэропорта вылета. |
| defaultDepartureAirport | - | `object` | `null` | Объект [Airport](#airport) |
| defaultPassengers | - | `object` | `{ ADT: 1 }` | Предуставленное кол-во пассажиров |
| defaultServiceClass | - | `string` | `Economy` | Класс обслуживания (`Economy` или `Business`) по-умолчанию |
| vicinityDatesMode | - | `bool` | `false` | Искать перелеты в заданной границе дат |
| directOnly | - | `bool` | `false` | Искать только прямые рейсы |
| highlightAvailableDates | - | `boolean` | `false` | Активирует в календаре подсветку дат, на которые есть доступные рейсы (только для `WEBSKY`) |
| locale | - | `string` | `"en"` | Язык интерфейса |
| mode | - | `string` | `"NEMO"` | Название системы бронирования, с которой предстоит работать (`NEMO` или `WEBSKY`) |
| readOnlyAutocomplete | - | `boolean` | `false` | Запретить ввод текста в поля автокомплита аэропортов (только если указан параметр `routingGrid`, или включен режим `Websky`) |
| routingGrid | - | `string` | `null` | Двухбуквенный IATA-код авиакомпании. Если указан, автокомплит аэропортов переключается в режим поиска по маршрутной сетке авиакомпании. Также, при клике в поле автокомплита, отображаются все возможные пункты назначений авиакомпании |
| useNearestAirport | - | `boolean` | `false` | Выбирать в качестве пункта вылета ближайший аэропорт, полученный на основе IP-адреса пользователя (только если не указан параметр `defaultDepartureAirport`) |
| verticalForm | - | `boolean` | `false` | Отображать ли принудительно вертикальную форму поиска, вместо горизонтальной |
| vicinityDays | - | `integer` | `3` | Количество дней для "Искать ±3 дня" (только для `NEMO`) |

## Команды для разработки

* `npm run build` — генерирует минифицированные CSS и JavaScript пакеты в папку `/dist/`
* `npm run build-dev` — генерирует полноразмерные CSS и JavaScript пакеты, и Webpack начинает отслеживать изменения в файлах (`watch: true`)
* `npm run server` — запускает Express-сервер в корне проекта и сразу же открывает браузер на `http://localhost:5555`
* `npm run dev` — **использовать для разработки**: запускает Express-сервер, открывает браузер и запускает Webpack в `dev` режиме (аналогично `npm run server && npm run build-dev`)


## Airport
| Название параметра | Обязательный параметр | Тип значения | Описание |
| :- | :- | :- | :- |
| **IATA** | **да** | `string` | Трехбуквенный IATA-код аэропорта или города |
| **name** | **да** | `string` | Название города или аэропорта |
| **nameEn** | **да** | `string` | Название города или аэропорта на английском языке |
| country | - | `object` | Объект [Country](#country) |
| countryCode | - | `string` | Двухбуквенный код страны |
| isCity | - | `bool` | Является ли IATA объект городом |

## Country
| Название параметра | Обязательный параметр | Тип значения | Описание |
| :- | :- | :- | :- |
| code | да | `string` | Двухбуквенный код страны |
| name | да | `string` | Название страны |
| nameEn | да | `string` | Название страны на английском языке |

