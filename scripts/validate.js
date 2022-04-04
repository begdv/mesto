const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement)
    });
  });
}; 
  
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.form__input-error_input_${inputElement.name}`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.form__input-error_input_${inputElement.name}`);
  errorElement.textContent = '';
  inputElement.classList.remove('form__input_type_error');
};

enableValidation();