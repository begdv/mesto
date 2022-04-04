const profileForm1 = document.querySelector('.profile-form');
const profileInputName1 = profileForm1.querySelector('.form__input-text_input_profile-name');

function enableValidation(){
    profileForm1.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
    profileInputName1.addEventListener('input', isValid);     
}

const showInputError = (element) => {
    element.classList.add('form__input_type_error');
    const elementError = profileForm1.querySelector(`.form__input-error_input_${element.name}`);
    elementError.textContent = element.validationMessage;
  };
  
  const hideInputError = (element) => {
    element.classList.remove('form__input_type_error');
    elementError.textContent = '';
  };
  
  const isValid = () => {
    if (!profileInputName1.validity.valid) {
      showInputError(profileInputName1);
    } else {
      hideInputError(profileInputName1);
    }
  };

enableValidation();