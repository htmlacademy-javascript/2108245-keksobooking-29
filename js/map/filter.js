import { clearMarkers, renderFilteringMarker } from './render-map.js';
import { debounce } from '../utils/utils.js';
import { FILTERING_INPUT_NAME, RENDER_DELAY, PRICE_FILTER, MARKERS_COUNT } from '../utils/constants.js';

const {type, price, rooms, quests, any} = FILTERING_INPUT_NAME;

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
  formObject[type] === any || point.offer.type === formObject[type];


const checkPrice = (point, formObject) =>
  formObject[price] === any ||
  (point.offer.price >= PRICE_FILTER[formObject[price]].min &&
    point.offer.price <= PRICE_FILTER[formObject[price]].max);


const checkRooms = (point, formObject) =>
  formObject[rooms] === any ||
    point.offer.rooms === parseInt(formObject[rooms], 10);

const checkQuests = (point, formObject) =>
  formObject[quests] === any ||
    point.offer.guests === parseInt(formObject[quests], 10);


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

const resetFilters = () => filterForm.reset();

export {initFilters, addFilters, resetFilters};
