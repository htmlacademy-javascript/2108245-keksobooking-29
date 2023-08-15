const TITLE_MAX_LENGTH = 100;
const TITLE_MIN_LENGTH = 30;
const INVALID_MAX_TITLE = 'Не более 100 символов';
const INVALID_MIN_TITLE = 'Не менее 30 символов';
const REGEXP = /^\d+$/;
const INVALID_PRICE_TYPE = 'Только цифры';
const PRICE_MAX_VALUE = 100000;
const INVALID_PRICE_VALUE = 'Максимальная цена 100 000';

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

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

const isTitleMaxValid = () => titleInput.value.length <= TITLE_MAX_LENGTH;

const isTitleMinValid = () => titleInput.value.length >= TITLE_MIN_LENGTH;

const isPriceTypeValid = () => REGEXP.test(priceInput.value);

const isPriceValid = () => priceInput.value <= PRICE_MAX_VALUE;

const isPriceToType = () => MIN_PRICE[priceInput.placeholder] <= priceInput.value;

const renderErrorForPrice = () => `Цена должна быть не менее ${MIN_PRICE[typeSelect.value]}`;

const onTypeSelectChange = (evt) => {
  const value = evt.target.value;
  priceInput.placeholder = MIN_PRICE[value];
};

const onTimeInSelectChange = (evt) => {
  timeOutSelect.value = evt.target.value;
};

const onTimeOutSelectChange = (evt) => {
  timeInSelect.value = evt.target.value;
};

const isCapacityValid = () => {
  if (roomSelect.value !== '100') {
    return capacitySelect.value <= roomSelect.value && capacitySelect.value !== '0';
  }
  return capacitySelect.value === '0';
};

const renderErrorForCapacity = () => {
  if (roomSelect.value === '1') {
    return 'Только для 1 гостя';
  }

  if (roomSelect.value !== '100') {
    return `Гостей от 1 до ${roomSelect.value}`;
  }

  return 'Только "не для гостей"';
};

const addValidator = () => {
  priceInput.placeholder = MIN_PRICE[typeSelect.value];
  typeSelect.addEventListener('change', onTypeSelectChange);
  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);
  pristine.addValidator(titleInput, isTitleMaxValid, INVALID_MAX_TITLE, 1, true);
  pristine.addValidator(titleInput, isTitleMinValid, INVALID_MIN_TITLE, 1, true);
  pristine.addValidator(priceInput, isPriceTypeValid, INVALID_PRICE_TYPE, 2, true);
  pristine.addValidator(priceInput, isPriceValid, INVALID_PRICE_VALUE, 1, true);
  pristine.addValidator(priceInput, isPriceToType, renderErrorForPrice, 1, true);
  pristine.addValidator(capacitySelect, isCapacityValid, renderErrorForCapacity, 1, true);
};

const validateForm = () => pristine.validate();

const resetPristine = () => pristine.reset();

export { addValidator, validateForm, resetPristine };
