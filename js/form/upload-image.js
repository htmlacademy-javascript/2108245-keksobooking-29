import { renderMessage } from '../utils/messages.js';
import { UploadImageConfig } from '../utils/constants.js';

const { FILE_TYPES, ERROR_STATE, ERROR_MESSAGE, DEFAULT_SRC } =
  UploadImageConfig;

const preview = document.querySelector('.ad-form-header__preview img');
const photoContainer = document.querySelector('.ad-form__photo');

const createPhoto = (url, isTypeAvatar) => {
  if (isTypeAvatar) {
    preview.src = url;
    return;
  }

  if (photoContainer.querySelector('img')) {
    photoContainer.innerHTML = '';
  }

  const img = document.createElement('img');
  img.src = url;
  img.alt = 'Фотография жилья';
  img.width = 70;
  img.height = 70;
  photoContainer.appendChild(img);
};

const renderUploadImage = ({ target }, isTypeAvatar) => {
  const file = target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const url = URL.createObjectURL(file);
    createPhoto(url, isTypeAvatar);
    return;
  }

  renderMessage(ERROR_STATE, ERROR_MESSAGE);
};

const removeUploadImages = () => {
  photoContainer.innerHTML = '';
  preview.src = DEFAULT_SRC;
};

export { renderUploadImage, removeUploadImages };
