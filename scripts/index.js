import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, configFormValidator, ESC_KEYCODE} from './const.js';

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

const cardsContainer = document.querySelector('.cards');

const imagePopup = document.querySelector('.popup_type_image');
const imagePhoto = imagePopup.querySelector('.image-popup__photo');
const imageTitle = imagePopup.querySelector('.image-popup__title');

const openImagePopup = (cardPhoto) => {
  imagePhoto.src = cardPhoto.src;
  imagePhoto.alt = cardPhoto.alt;
  imageTitle.textContent = cardPhoto.alt;
  openPopup(imagePopup);
}

const openProfilePopup = () => {
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  profileValidator.toggleButtonState();
  openPopup(profilePopup);
}

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
  hideFormErrors(popup);
  popup.classList.remove('popup_opened');
}  

const setPopupListeners = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('click', handleClickPopup);
  });  
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
  cardValidator.toggleButtonState();
  openPopup(cardPopup);
}

const addNewCard = (evt) => {
  evt.preventDefault();
  addCard(cardsContainer, {
    name: cardInputName.value,
    link: cardInputHref.value
  });
  closePopup(cardPopup);
} 

profileEdit.addEventListener('click', openProfilePopup);
buttonAddMesto.addEventListener('click', openCardPopup);
profileForm.addEventListener('submit', saveProfile);
cardForm.addEventListener('submit', addNewCard);

const addCard = (cardsContainer, item) => {
  const card = new Card(item, '.card-template', openImagePopup);
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

const makeInitialCards = (cards) => {
  cards.forEach((item) => {
    addCard(cardsContainer, item);
  });
}


const cardValidator = new FormValidator(configFormValidator, cardForm);
const profileValidator = new FormValidator(configFormValidator, profileForm);

const enableValidation = () => {
  cardValidator.enableValidation();  
  profileValidator.enableValidation();  
}

const hideFormErrors = (form) => {
  if(form.classList.contains("popup_type_card")){
    cardValidator.hideFormErrors();
  } else if (form.classList.contains("popup_type_profile")){
    profileValidator.hideFormErrors();
  } 
}

makeInitialCards(initialCards);
setPopupListeners();
enableValidation();