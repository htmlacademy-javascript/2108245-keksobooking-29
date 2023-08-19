import { FormRules } from '../utils/constants.js';

const sliderContainer = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

const { MAX_PRICE, MIN_PRICE, PRICE_TO_FIXED } = FormRules;

const createSlider = () => {
  noUiSlider.create(sliderContainer, {
    range: {
      min: MIN_PRICE.value,
      max: MAX_PRICE.value,
    },
    start: 0,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(PRICE_TO_FIXED);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

const onPriceInputInput = () => {
  sliderContainer.noUiSlider.set([priceInput.value]);
};

const onSliderUpdate = () => {
  priceInput.value = sliderContainer.noUiSlider.get();
};

const initSlider = () => {
  createSlider();
  sliderContainer.noUiSlider.on('update', onSliderUpdate);
  priceInput.addEventListener('input', onPriceInputInput);
};

const restSlider = () => sliderContainer.noUiSlider.reset();

export {initSlider, restSlider};
