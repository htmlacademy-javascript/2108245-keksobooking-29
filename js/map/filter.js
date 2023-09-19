import { clearMarkers, createMarkers } from './render-map.js';
import { debounce, createEvent } from '../utils/utils.js';
import {
  FilteringInputName,
  RENDER_DELAY,
  PRICE_FILTER,
  MARKERS_COUNT,
} from '../utils/constants.js';

const { TYPE, PRICE, ROOMS, GUESTS, ANY } = FilteringInputName;

const filterForm = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelector('.map__features');

const setFilterFieldsetsDisabled = (isDisabled) => {
  mapFilters.forEach((mapFilter) => {
    mapFilter.disabled = isDisabled;
  });
};

const disableFiltersForm = () => {
  filterForm.classList.add('ad-form--disabled');
  mapFeatures.disabled = true;
  setFilterFieldsetsDisabled(true);
};

const initFilters = () => {
  filterForm.classList.remove('ad-form--disabled');
  mapFeatures.disabled = false;
  setFilterFieldsetsDisabled(false);
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

const checkFeatures = (point, features) => {
  const objectFeatures = point.offer.features;
  if (objectFeatures) {
    return features.every((formFeature) =>
      objectFeatures.includes(formFeature)
    );
  }
  return false;
};

const filteringData = (data) => {
  const formData = new FormData(filterForm);
  const formObject = Object.fromEntries(formData);
  const features = formData.getAll('features');
  const newData = data
    .slice()
    .filter(
      (point) =>
        checkType(point, formObject) &&
        checkPrice(point, formObject) &&
        checkRooms(point, formObject) &&
        checkQuests(point, formObject) &&
        (features.length > 0 ? checkFeatures(point, features) : true)
    )
    .slice(0, MARKERS_COUNT);
  createMarkers(newData);
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

export { initFilters, addFilters, disableFiltersForm, resetFilters };
