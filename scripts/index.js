import {addCard} from './card.js';

const ESC_KEYCODE = 27;

const content = document.querySelector('.content');

const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card');

const profile = content.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const buttonAddMesto = profile.querySelector('.profile__add-mesto');

const profileForm = profilePopup.querySelector('.profile-form');
const profileInputName = profileForm.querySelector('.form__input_field_profile-name');
const profileInputDescription = profileForm.querySelector('.form__input_field_profile-description');

const cardForm = cardPopup.querySelector('.card-form');
const cardInputName = cardForm.querySelector('.form__input_field_card-name');
const cardInputHref = cardForm.querySelector('.form__input_field_card-href');

const openPopup = (popup) => {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscapePopup);
}

const handleEscapePopup = (evt) => {
  if (evt.which === ESC_KEYCODE) {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  };
}

const handleClickPopup = (evt) => {
  if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__button-close")) { 
    closePopup(evt.currentTarget);
  }
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscapePopup);
  popup.classList.remove('popup_opened');
}  

const openProfilePopup = () => {
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
}

const saveProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profilePopup);
}

const openCardPopup = (evt) => {
  cardInputName.value = '';
  cardInputHref.value = '';
  setButtonStateOpenPopup(config, cardForm);
  openPopup(cardPopup);
}

const addNewCard = (evt) => {
  evt.preventDefault();
  addCard(cards, {
    name: cardInputName.value,
    link: cardInputHref.value
  });
  closePopup(cardPopup);
} 

const setPopupListeners = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', handleClickPopup);
  });  
}

profileEdit.addEventListener('click', openProfilePopup);
buttonAddMesto.addEventListener('click', openCardPopup);
profileForm.addEventListener('submit', saveProfile);
cardForm.addEventListener('submit', addNewCard);

setPopupListeners();

export {openPopup};