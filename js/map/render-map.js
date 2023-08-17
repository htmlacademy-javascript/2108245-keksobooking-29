import { createCustomPopup } from './create-balloon.js';
import { getData } from '../utils/api.js';
import { initFilters, addFilters } from './filter.js';
import { renderMessage } from '../utils/messages.js';
import { initForm } from '../form/init-form.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const GET_URL = 'https://29.javascript.pages.academy/keksobooking/data';
const ZOOM = 13;
const DECIMALS = 5;
const ERROR_MESSAGE = 'Ошибка загрузки данных. Обновите страницу';
const ERROR_STATE = 'error';

const START_COORDINATE = {
  lat: 35.68172,
  lng: 139.75392,
};

const ICONS_CONFIG = {
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
  }
};

const inputAddress = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup();
const mainMarkerGroup = L.layerGroup();

const setIcon = (type) => {
  const icon = ICONS_CONFIG[type];
  return L.icon({
    iconUrl: icon.url,
    iconSize: [icon.width, icon.height],
    iconAnchor: [icon.anchorX, icon.anchorY],
  });
};

const setValue = (type) => {
  inputAddress.value = `${type.lat.toFixed(DECIMALS)}, ${type.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => {
  const coordinate = evt.target.getLatLng();
  setValue(coordinate);
};

const createMarker = (type = 'default', location, item) => {
  const marker = L.marker(location || START_COORDINATE,
    {
      icon: setIcon(type),
      draggable: type === 'main',
    },
  ).addTo(type === 'main' ? mainMarkerGroup : markerGroup);

  if (type === 'default') {
    marker.bindPopup(createCustomPopup(item));
    return;
  }

  marker.on('moveend', onMarkerMove);
};

const createMarkers = (points) => {
  const newPoints = points.slice().slice(0, 10);
  newPoints.forEach((point) => createMarker('default', point.location, point));
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
  initForm();
};

const onError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE);
};

const renderFilteringMarker = (points) => {
  createMarkers(points);
  markerGroup.addTo(map);
};

const renderMainMarker = (type) => {
  createMarker(type);
  setValue(START_COORDINATE);
  mainMarkerGroup.addTo(map);
};


const initMap = () => {
  map.on('load', () => {
    getData(GET_URL, onSuccess, onError);
    renderMainMarker('main');
    markerGroup.addTo(map);
  })
    .setView(START_COORDINATE, ZOOM);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT})
    .addTo(map);
};

export {initMap, clearMarkers, clearMainMarkers, renderMainMarker, resetMap, renderFilteringMarker};
