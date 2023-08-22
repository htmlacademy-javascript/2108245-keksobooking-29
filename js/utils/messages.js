import { isEscapeKey } from './utils.js';

let modal;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessageTemplate = (state, message, buttonText) =>
  `<div class='${state}'>
    <p class='${state}__message'>${message}</p>
    ${
  buttonText
    ? `<button type="button" class="${state}__button">${buttonText}</button>`
    : ''
}
  </div>`;

const closeMessage = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
  modal.remove();
};

function onDocumentKeydown(event) {
  if (isEscapeKey(event)) {
    event.preventDefault();
    closeMessage();
  }
}

const onSubmitButtonClick = (event) => {
  event.preventDefault();
  closeMessage();
};

const onMessageContainerClick = (event, state) => {
  if (!event.target.closest(`.${state}__message`)) {
    closeMessage();
  }
};

const renderMessage = (state, message, buttonText) => {
  modal = createElement(createMessageTemplate(state, message, buttonText));
  document.body.append(modal);

  if (buttonText) {
    modal
      .querySelector(`.${state}__button`)
      .addEventListener('click', onSubmitButtonClick);
  }

  document.addEventListener('keydown', onDocumentKeydown);
  modal.addEventListener('click', (event) => {
    onMessageContainerClick(event, state);
  });
};

export { renderMessage };
