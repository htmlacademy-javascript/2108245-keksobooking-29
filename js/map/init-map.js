import { renderMap, createMarkers } from './render-map.js';
import { initForm, disableForm } from '../form/init-form.js';
import { getData } from '../utils/api.js';
import { renderMessage } from '../utils/messages.js';
import { initFilters, addFilters, disableFiltersForm } from './filter.js';
import { MapError, GET_URL } from '../utils/constants.js';

const { MESSAGE, STATE } = MapError;

const onSuccess = (points) => {
  createMarkers(points);
  initFilters();
  addFilters(points);
};

const onError = () => {
  renderMessage(STATE, MESSAGE);
};

const initMap = () => {
  disableForm();
  disableFiltersForm();
  renderMap()
    .then(() => {
      initForm();
      getData(GET_URL, onSuccess, onError);
    })
    .catch(onError);
};

export { initMap };
