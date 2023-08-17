const FILTERING_INPUT_NAME = {
  type: 'housing-type',
  price: 'housing-price',
  rooms: 'housing-rooms',
  quests: 'housing-guests',
  any: 'any',
};

const PRICE_FILTER = {
  low: {
    min: 0,
    max: 9999,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50001,
    max: Infinity,
  }
};

const RENDER_DELAY = 500;

const MARKERS_COUNT = 10;

const MAP_CONFIG = {
  titleLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  copyright: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  zoom: 13,

  startCoordinate: {
    lat: 35.68172,
    lng: 139.75392,
  },

  iconConfig: {
    main: {
      url: './img/main-pin.svg',
      width: 52,
      height: 52,
      anchorX: 26,
      anchorY: 52,
    },

    default: {
      url: './img/pin.svg',
      width: 40,
      height: 40,
      anchorX: 20,
      anchorY: 40,
    },
  },
};

const DECIMALS = 5;

const MAP_ERROR = {
  message: 'Ошибка загрузки данных. Обновите страницу',
  state: 'error'
};

export {FILTERING_INPUT_NAME, RENDER_DELAY, PRICE_FILTER, MARKERS_COUNT, MAP_CONFIG, DECIMALS, MAP_ERROR};
