import { createCustomPopup } from './create-balloon.js';
import { getData } from '../utils/api.js';
import { initFilters, addFilters } from './filter.js';
import { renderMessage } from '../utils/messages.js';
import { initForm } from '../form/init-form.js';
import { MapConfig, DECIMALS, MapError, GET_URL } from '../utils/constants.js';

const {TITLE_LAYER, COPYRIGHT, ZOOM, START_COORDINATE, ICONS_CONFIG} = MapConfig;
const {ERROR_MESSAGE, ERROR_STATE} = MapError;

const inputAddress = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup();
const mainMarkerGroup = L.layerGroup();

const setIcon = (icon) => L.icon({
  iconUrl: icon.url,
  iconSize: [icon.width, icon.height],
  iconAnchor: [icon.anchorX, icon.anchorY],
});

const setValue = (coordinate) => {
  inputAddress.value = `${coordinate.lat.toFixed(DECIMALS)}, ${coordinate.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => {
  const coordinate = evt.target.getLatLng();
  setValue(coordinate);
};

const createMarker = (isMain, location, item) => {
  const marker = L.marker(location || START_COORDINATE,
    {
      icon: setIcon(isMain ? ICONS_CONFIG.main : ICONS_CONFIG.default),
      draggable: isMain,
    },
  ).addTo(isMain ? mainMarkerGroup : markerGroup);

  if (!isMain) {
    marker.bindPopup(createCustomPopup(item));
    return;
  }

  marker.on('moveend', onMarkerMove);
};

const createMarkers = (points) => {
  const newPoints = points.slice(0, 10);
  newPoints.forEach((point) => createMarker(false, point.location, point));
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const clearMainMarkers = () => {
  mainMarkerGroup.clearLayers();
};

const resetMap = () => {
  map.setView(START_COORDINATE, ZOOM);
  map.closePopup();
};

const onSuccess = (points) => {
  createMarkers(points);
  initFilters();
  addFilters(points);
};

const onError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE);
};

const renderFilteringMarker = (points) => {
  createMarkers(points);
  markerGroup.addTo(map);
};

const renderMainMarker = () => {
  createMarker(true);
  setValue(START_COORDINATE);
  mainMarkerGroup.addTo(map);
};


const initMap = () => {
  map.on('load', () => {
    initForm();
    getData(GET_URL, onSuccess, onError);
    renderMainMarker();
    markerGroup.addTo(map);
  })
    .setView(START_COORDINATE, ZOOM);
  L.tileLayer(TITLE_LAYER, {
    attribution: COPYRIGHT})
    .addTo(map);
};

export {initMap, clearMarkers, clearMainMarkers, renderMainMarker, resetMap, renderFilteringMarker};
