import { sendData } from '../utils/api.js';
import { renderMessage } from '../utils/messages.js';
import { validateForm, addValidator, resetPristine } from './validate-form.js';
import { clearMainMarkers, resetMap, renderMainMarker} from '../map/render-map.js';
import { resetFilters } from '../map/filter.js';
import { renderUploadImage, removeUploadImages } from './upload-image.js';
import { initSlider, restSlider } from './price-slider.js';
import { POST_URL, UploadFormMessage } from '../utils/constants.js';

const { SUCCESS, ERROR } = UploadFormMessage;

const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.ad-form__element');
const submitButton = document.querySelector('.ad-form__submit');
const formResetButton = document.querySelector('.ad-form__reset');
const avatarInput = document.querySelector('#avatar');
const imagesInput = document.querySelector('#images');

const setSubmitButtonStatus = (state) => {
  submitButton.disabled = state;
};

const resetForm = () => {
  form.reset();
  resetPristine();
  resetMap();
  resetFilters();
  clearMainMarkers();
  renderMainMarker();
  restSlider();
  removeUploadImages();
};

const onSuccess = () => {
  renderMessage(SUCCESS.state, SUCCESS.message);
  setSubmitButtonStatus(false);
  resetForm();
};

const onError = () => {
  renderMessage(ERROR.state, ERROR.message, ERROR.buttonText);
  setSubmitButtonStatus(false);
};

const onFormSubmit = (event) => {
  event.preventDefault();

  if (validateForm()) {
    setSubmitButtonStatus(true);
    sendData(POST_URL, onSuccess, onError, new FormData(event.target));
  }
};

const onFormResetButtonClick = (event) => {
  event.preventDefault();
  resetForm();
};

const onAvatarInputChange = (event) => {
  renderUploadImage(event, true);
};

const onImagesInputChange = (event) => {
  renderUploadImage(event);
};

const initUploadForm = () => {
  form.addEventListener('submit', onFormSubmit);
  initSlider();
  avatarInput.addEventListener('change', onAvatarInputChange);
  imagesInput.addEventListener('change', onImagesInputChange);
  formResetButton.addEventListener('click', onFormResetButtonClick);
  addValidator();
};

const initForm = () => {
  form.classList.remove('ad-form--disabled');
  formHeader.disabled = false;
  formElements.forEach ((formElement) => {
    formElement.disabled = false;
  });

  initUploadForm();
};

export {initForm};
