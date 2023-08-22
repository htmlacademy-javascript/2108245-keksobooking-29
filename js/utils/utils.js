const isEscapeKey = (event) => event.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const createEvent = (element, evt) => {
  const event = new Event(evt);
  element.dispatchEvent(event);
};

export { isEscapeKey, debounce, createEvent };
