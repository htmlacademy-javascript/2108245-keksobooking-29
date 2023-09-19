import { HOUSE_TYPE } from '../utils/constants.js';

const createAvatar = (avatar) =>
  `<img src=${avatar} class="popup__avatar" width="70" height="70" alt="Аватар пользователя">`;

const createMainPart = ({
  title,
  address,
  price,
  type,
  rooms,
  guests,
  checkin,
  checkout,
}) =>
  `<h3 class="popup__title">${title}</h3>
    <p class="popup__text popup__text--address">${address}</p>
    <p class="popup__text popup__text--price">${price} <span>₽/ночь</span></p>
    <h4 class="popup__type">${HOUSE_TYPE[type].translate}</h4>
    <p class="popup__text popup__text--capacity">${rooms} комнаты для ${guests} гостей</p>
    <p class="popup__text popup__text--time">Заезд после ${checkin}, выезд до ${checkout}</p>`;

const createFeaturesString = (features) => {
  let string = '';
  features.forEach((feature) => {
    string += `<li class="popup__feature popup__feature--${feature}"></li>`;
  });
  return string;
};

const createFeatures = (features) => {
  let string = '';
  if (features) {
    string = `<ul class="popup__features">
        ${createFeaturesString(features)}
  </ul>`;
  }
  return string;
};

const createDescription = (description) => {
  let string = '';
  if (description) {
    string = `<p class="popup__description">${description}</p>`;
  }
  return string;
};

const createPhotoString = (photos) => {
  let string = '';
  photos.forEach((photo) => {
    string += `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`;
  });
  return string;
};

const createPhoto = (photos) => {
  let string = '';
  if (photos) {
    string = `<div class="popup__photos">
        ${createPhotoString(photos)}
  </div>`;
  }
  return string;
};

const createCustomPopup = (item) =>
  `<article class="popup">
    ${createAvatar(item.author.avatar)}
    ${createMainPart(item.offer)}
    ${createFeatures(item.offer.features)}
    ${createDescription(item.offer.description)}
    ${createPhoto(item.offer.photos)}
  </article>`;

export { createCustomPopup };
