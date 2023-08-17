const sliderContainer = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

const PRICE_RULES = {
  min: 0,
  max: 100000,
  toFixed: 0,
};

const createSlider = () => {
  noUiSlider.create(sliderContainer, {
    range: {
      min: PRICE_RULES.min,
      max: PRICE_RULES.max,
    },
    start: 0,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(PRICE_RULES.toFixed);
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
