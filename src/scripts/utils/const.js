export const configFormValidator = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error',
  visibleErrorClass: 'form__input-error_visible'
};

export const configApi = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
    headers: {
      "content-type": "application/json",
      "authorization": '927f2c34-eed2-41a5-b205-b051cad1964c'
    }
};

export const notifySaveActions = {
  defaultText: 'Сохранить',
  notifyText: 'Сохранение...'
};

export const notifyAddActions = {
  defaultText: 'Создать',
  notifyText: 'Сохранение...'
};

export const cardSelector = '.cards';
export const cardTemplateSelector = '.card-template';

export const profileAvatar = document.querySelector('.profile__avatar');
export const profileEdit = document.querySelector('.profile__edit');
export const buttonAddMesto = document.querySelector('.profile__add-mesto');
export const avatarForm = document.querySelector('.avatar-form');
export const profileForm = document.querySelector('.profile-form');
export const cardForm = document.querySelector('.card-form');

export const avatarInputHref = avatarForm.querySelector('.form__input_field_avatar-href');
export const profileInputName = profileForm.querySelector('.form__input_field_profile-name');
export const profileInputAbout = profileForm.querySelector('.form__input_field_profile-about');