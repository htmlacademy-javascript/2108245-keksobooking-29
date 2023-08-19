import { clearMarkers, renderFilteringMarker } from './render-map.js';
import { debounce, createEvent } from '../utils/utils.js';
import { FilteringInputName, RENDER_DELAY, PRICE_FILTER, MARKERS_COUNT } from '../utils/constants.js';

const {TYPE, PRICE, ROOMS, GUESTS, ANY} = FilteringInputName;

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
  formObject[TYPE] === ANY || point.offer.type === formObject[TYPE];


const checkPrice = (point, formObject) =>
  formObject[PRICE] === ANY ||
  (point.offer.price >= PRICE_FILTER[formObject[PRICE]].min &&
    point.offer.price <= PRICE_FILTER[formObject[PRICE]].max);


const checkRooms = (point, formObject) =>
  formObject[ROOMS] === ANY ||
    point.offer.rooms === parseInt(formObject[ROOMS], 10);

const checkQuests = (point, formObject) =>
  formObject[GUESTS] === ANY ||
    point.offer.guests === parseInt(formObject[GUESTS], 10);


const checkFeatures = (point, formData) => {
  const formFeatures = formData.getAll('features');
  const objectFeatures = point.offer.features;
  if (objectFeatures) {
    return formFeatures.every((formFeature) => objectFeatures.includes(formFeature));
  }
  return ANY;
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
  ).slice(0, MARKERS_COUNT);
  renderFilteringMarker(newData);
};

const setDelayRender = debounce((data) => {
  clearMarkers();
  filteringData(data);
}, RENDER_DELAY);

const onFilterFormChange = (data) => {
  setDelayRender(data);
};

const addFilters = (data) => {
  filterForm.addEventListener('change', () => onFilterFormChange(data));
};

const resetFilters = () => {
  filterForm.reset();
  createEvent(filterForm, 'change');
};

export {initFilters, addFilters, resetFilters};
