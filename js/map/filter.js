import { clearMap, renderFilteringMarker } from './render-map.js';
import { debounce } from '../utils/utils.js';

const TYPE = 'housing-type';
const PRICE = 'housing-price';
const ROOMS = 'housing-rooms';
const QUESTS = 'housing-guests';
const DEFAULT = 'any';
const RENDER_DELAY = 500;

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

const filterForm = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const initFilters = () => {
  filterForm.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });
};

const checkType = (point, formObject) =>
  formObject[TYPE] === DEFAULT || point.offer.type === formObject[TYPE];


const checkPrice = (point, formObject) =>
  formObject[PRICE] === DEFAULT ||
  (point.offer.price >= PRICE_FILTER[formObject[PRICE]].min &&
    point.offer.price <= PRICE_FILTER[formObject[PRICE]].max);


const checkRooms = (point, formObject) =>
  formObject[ROOMS] === DEFAULT ||
    point.offer.rooms === parseInt(formObject[ROOMS], 10);

const checkQuests = (point, formObject) =>
  formObject[QUESTS] === DEFAULT ||
    point.offer.guests === parseInt(formObject[QUESTS], 10);


const checkFeatures = (point, formData) => {
  const formFeatures = formData.getAll('features');
  const objectFeatures = point.offer.features;
  if (objectFeatures) {
    return formFeatures.every((formFeature) => objectFeatures.includes(formFeature));
  }
};

const filteringData = (data) => {
  const formData = new FormData(filterForm);
  const formObject = Object.fromEntries(formData);
  const newData = data.slice().filter((point) =>
    checkType(point, formObject) &&
    checkPrice(point, formObject) &&
    checkRooms(point, formObject) &&
    checkQuests(point, formObject) &&
    checkFeatures(point, formData)
  ).slice(0, 10);
  renderFilteringMarker(newData);
};

const setDelayRender = debounce((data) => {
  clearMap();
  filteringData(data);
}, RENDER_DELAY);

const onFilterFormChange = (data) => {
  setDelayRender(data);
};

const addFilters = (data) => {
  filterForm.addEventListener('change', () => onFilterFormChange(data));
};

const resetFilters = () => filterForm.reset();

export {initFilters, addFilters, resetFilters};
