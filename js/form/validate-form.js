import { createEvent } from '../utils/utils.js';
import { HOUSE_TYPE, FormRules, ROOMS_CAPACITY } from '../utils/constants.js';

const { MAX_TITLE, MIN_TITLE, PRICE_TYPE, MAX_PRICE } = FormRules;

const form = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const typeSelect = document.querySelector('#type');
const timeInSelect = document.querySelector('#timein');
const timeOutSelect = document.querySelector('#timeout');
const roomSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
});

const isTitleMaxValid = () => titleInput.value.length <= MAX_TITLE.length;

const isTitleMinValid = () => titleInput.value.length >= MIN_TITLE.length;

const isPriceTypeValid = () => PRICE_TYPE.regexpInclude.test(priceInput.value);

const isPriceValid = () => priceInput.value <= MAX_PRICE.value;

const isPriceToType = () =>
  HOUSE_TYPE[typeSelect.value].minPrice <= priceInput.value;

const renderErrorForPrice = () =>
  `Цена должна быть не менее ${HOUSE_TYPE[typeSelect.value].minPrice}`;

const onPriceInputInput = () => {
  priceInput.value = priceInput.value.replace(PRICE_TYPE.regexpExclude, '');
};

const onTypeSelectChange = (evt) => {
  const value = evt.target.value;
  priceInput.placeholder = HOUSE_TYPE[value].minPrice;
  createEvent(priceInput, 'input');
};

const onTimeInSelectChange = (evt) => {
  timeOutSelect.value = evt.target.value;
};

const onTimeOutSelectChange = (evt) => {
  timeInSelect.value = evt.target.value;
};

const onRoomSelectChange = () => {
  createEvent(capacitySelect, 'input');
};

const isCapacityValid = () => {
  const element = ROOMS_CAPACITY[roomSelect.value];
  if (!element) {
    return capacitySelect.value <= roomSelect.value && capacitySelect.value > 0;
  }
  return Number(capacitySelect.value) === Number(element.quests);
};

const renderErrorForCapacity = () => {
  const element = ROOMS_CAPACITY[roomSelect.value];
  if (!element) {
    return ROOMS_CAPACITY.default.message + roomSelect.value;
  }

  return element.message;
};

const addValidator = () => {
  priceInput.placeholder = HOUSE_TYPE[typeSelect.value].minPrice;
  priceInput.addEventListener('input', onPriceInputInput);
  typeSelect.addEventListener('change', onTypeSelectChange);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  roomSelect.addEventListener('change', onRoomSelectChange);
  pristine.addValidator(titleInput, isTitleMaxValid, MAX_TITLE.error, 1, true);
  pristine.addValidator(titleInput, isTitleMinValid, MIN_TITLE.error, 1, true);
  pristine.addValidator(priceInput, isPriceTypeValid, PRICE_TYPE.error, 3, true);
  pristine.addValidator(priceInput, isPriceValid, MAX_PRICE.error, 1, true);
  pristine.addValidator(priceInput, isPriceToType, renderErrorForPrice, 1, true);
  pristine.addValidator(capacitySelect, isCapacityValid, renderErrorForCapacity, 1, true);
};

const validateForm = () => pristine.validate();

const resetPristine = () => pristine.reset();

export { addValidator, validateForm, resetPristine };
