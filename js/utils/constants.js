const FilteringInputName = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
  ANY: 'any',
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
  },
};

const RENDER_DELAY = 500;

const MARKERS_COUNT = 10;

const MapConfig = {
  TITLE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  COPYRIGHT:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ZOOM: 13,

  START_COORDINATE: {
    lat: 35.68172,
    lng: 139.75392,
  },

  ICONS_CONFIG: {
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

const MapError = {
  MESSAGE: 'Ошибка загрузки данных. Обновите страницу',
  STATE: 'error',
};

const GET_URL = 'https://29.javascript.pages.academy/keksobooking/data';

const HOUSE_TYPE = {
  bungalow: {
    minPrice: 0,
    translate: 'Бунгало',
  },
  flat: {
    minPrice: 1000,
    translate: 'Квартира',
  },
  hotel: {
    minPrice: 3000,
    translate: 'Отель',
  },
  house: {
    minPrice: 5000,
    translate: 'Дом',
  },
  palace: {
    minPrice: 10000,
    translate: 'Дворец',
  },
};

const FormRules = {
  MAX_TITLE: {
    length: 100,
    error: 'Не более 100 символов',
  },

  MIN_TITLE: {
    length: 30,
    error: 'Не менее 30 символов',
  },

  PRICE_TYPE: {
    regexpInclude: /^[0-9]+$|^$/,
    regexpExclude: /[e,+,-]/g,
    error: 'Только цифры',
  },

  MAX_PRICE: {
    value: 100000,
    error: 'Максимальная цена 100 000',
  },

  MIN_PRICE: {
    value: 0,
  },

  PRICE_TO_FIXED: 0,
};

const ROOMS_CAPACITY = {
  1: {
    quests: 1,
    message: 'Tолько для 1 гостя',
  },
  100: {
    quests: 0,
    message: 'Tолько "не для гостей"',
  },
  default: {
    message: 'Гостей от 1 до ',
  },
};

const UploadImageConfig = {
  FILE_TYPES: ['.gif', '.jpg', '.jpeg', '.png', '.webp'],
  ERROR_STATE: 'error',
  ERROR_MESSAGE: 'Выберите другой файл',
  DEFAULT_SRC: 'img/muffin-grey.svg',
};

const POST_URL = 'https://29.javascript.pages.academy/keksobooking';

const UploadFormMessage = {
  SUCCESS: {
    state: 'success',
    message: 'Ваше объявление <br> успешно размещено!',
  },

  ERROR: {
    state: 'error',
    message: 'Ошибка размещения объявления',
    buttonText: 'Попробовать снова',
  },
};

export {
  FilteringInputName,
  RENDER_DELAY,
  PRICE_FILTER,
  MARKERS_COUNT,
  MapConfig,
  DECIMALS,
  MapError,
  GET_URL,
  HOUSE_TYPE,
  FormRules,
  ROOMS_CAPACITY,
  UploadImageConfig,
  POST_URL,
  UploadFormMessage,
};
