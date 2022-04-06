const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error',
  visibleErrorClass: 'form__input-error_visible'
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });  
};

const setEventListeners = (config, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  formElement.addEventListener('input', (evt) => handleFormInput(evt, config, inputList, buttonElement));
}; 

const handleFormInput = ((evt, config, inputList, buttonElement) => {
  const formElement = evt.currentTarget;
  const inputElement = evt.target;
  isValid(config, formElement, inputElement);
  toggleButtonState(config, inputList, buttonElement);
});
  
const isValid = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${config.errorClass}_field_${inputElement.name}`);
  if (!inputElement.validity.valid) {
    showInputError(config, inputElement, errorElement, inputElement.validationMessage);
  } else {
    hideInputError(config, inputElement, errorElement);
  }
};

const showInputError = (config, inputElement, errorElement, errorMessage) => {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.visibleErrorClass);
};

const hideInputError = (config, inputElement, errorElement) => {
  errorElement.classList.remove(config.visibleErrorClass);  
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}; 

enableValidation(config);