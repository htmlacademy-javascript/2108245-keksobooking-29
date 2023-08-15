import {sendData} from '../utils/api.js';
import { renderMessage } from '../utils/messages.js';
import { validateForm, addValidator, resetPristine } from './validate-form.js';
import { clearMap, resetMap, renderFilteringMarker } from '../map/render-map.js';

const POST_URL = 'https://29.javascript.pages.academy/keksobooking';
const SUCCESS_STATE = 'success';
const SUCCESS_MESSAGE = 'Ваше объявление <br> успешно размещено!';
const ERROR_STATE = 'error';
const ERROR_MESSAGE = 'Ошибка размещения объявления';
const ERROR_BUTTON_TEXT = 'Попробовать снова';

const form = document.querySelector('.ad-form');
const formHeader = document.querySelector('.ad-form-header');
const formElements = document.querySelectorAll('.ad-form__element');
const submitButton = document.querySelector('.ad-form__submit');

const setSubmitButtonStatus = (state) => {
  submitButton.disabled = state;
};

const initForm = () => {
  form.classList.remove('ad-form--disabled');
  formHeader.disabled = false;
  formElements.forEach ((formElement) => {
    formElement.disabled = false;
  });
};

const onSuccess = () => {
  renderMessage(SUCCESS_STATE, SUCCESS_MESSAGE);
  setSubmitButtonStatus(false);
};

const onError = () => {
  renderMessage(ERROR_STATE, ERROR_MESSAGE, ERROR_BUTTON_TEXT);
};

const onFormSubmit = (event) => {
  event.preventDefault();

  if (validateForm()) {
    setSubmitButtonStatus(true);
    sendData(POST_URL, onSuccess, onError, new FormData(event.target));
  }
};

const onFormReset = () => {
  resetPristine();
  resetMap();
};

const initUploadForm = () => {
  form.addEventListener('submit', onFormSubmit);
  form.addEventListener('reset', onFormReset);
  addValidator();
};

export {initForm, initUploadForm};
