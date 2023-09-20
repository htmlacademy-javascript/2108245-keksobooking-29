import { createCustomPopup } from './create-balloon.js';
import { MapConfig, DECIMALS } from '../utils/constants.js';

const { TITLE_LAYER, COPYRIGHT, ZOOM, START_COORDINATE, ICONS_CONFIG } =
  MapConfig;

const inputAddress = document.querySelector('#address');
const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);
const mainMarkerGroup = L.layerGroup().addTo(map);

const setIcon = (icon) =>
  L.icon({
    iconUrl: icon.url,
    iconSizes: [icon.width, icon.height],
    iconAnchors: [icon.anchorX, icon.anchorY],
  });

const setValue = (coordinate) => {
  inputAddress.value = `${coordinate.lat.toFixed(
    DECIMALS
  )}, ${coordinate.lng.toFixed(DECIMALS)}`;
};

const onMarkerMove = (evt) => {
  const coordinate = evt.target.getLatLng();
  setValue(coordinate);
};

const createMarker = (isMain, location, item) => {
  const marker = L.marker(location || START_COORDINATE, {
    icon: setIcon(isMain ? ICONS_CONFIG.main : ICONS_CONFIG.default),
    draggable: isMain,
  }).addTo(isMain ? mainMarkerGroup : markerGroup);

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

const clearMarkers = (isMain) =>
  isMain ? mainMarkerGroup.clearLayers() : markerGroup.clearLayers();

const resetMap = () => {
  map.setView(START_COORDINATE, ZOOM);
  map.closePopup();
};

const renderMainMarker = () => {
  createMarker(true);
  setValue(START_COORDINATE);
};

const renderMap = () =>
  new Promise((resolve) => {
    map
      .on('load', () => {
        resolve(true);
        renderMainMarker();
      })
      .setView(START_COORDINATE, ZOOM);
    L.tileLayer(TITLE_LAYER, {
      attribution: COPYRIGHT,
    }).addTo(map);
  });

export { renderMap, createMarkers, clearMarkers, renderMainMarker, resetMap };
