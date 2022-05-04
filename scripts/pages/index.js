import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, configFormValidator, cardSelector, cardTemplateSelector, profile, profileEdit, buttonAddMesto, profileForm, cardForm} from '../utils/const.js';

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();
const profilePopup = new PopupWithForm('.popup_type_profile', (formData) => {
  profile.querySelector('.profile__title').textContent = formData['profile-name'];
  profile.querySelector('.profile__description').textContent = formData['profile-description'];
});
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm('.popup_type_card', (formData) => {
  const card = new Card({
    name: formData['card-name'],
    link: formData['card-href']
  }, cardTemplateSelector, (item) => imagePopup.open(item));
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);  
});
cardPopup.setEventListeners();

const openProfilePopup = () => {
  profileForm.querySelector('.form__input_field_profile-name').value = profile.querySelector('.profile__title').textContent;
  profileForm.querySelector('.form__input_field_profile-description').value = profile.querySelector('.profile__description').textContent;
  profileValidator.hideFormErrors();
  profileValidator.toggleButtonState();
  profilePopup.open();
}

const openCardPopup = (evt) => {
  cardForm.querySelector('.form__input_field_card-name').value = '';
  cardForm.querySelector('.form__input_field_card-href').value = '';
  cardValidator.hideFormErrors();
  cardValidator.toggleButtonState();
  cardPopup.open();
}

profileEdit.addEventListener('click', openProfilePopup);
buttonAddMesto.addEventListener('click', openCardPopup);

const cardList = new Section({ items: initialCards, renderer: (item) => {
  const card = new Card(item, cardTemplateSelector, (item) => imagePopup.open(item));
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
} }, cardSelector);

cardList.renderItems();

const cardValidator = new FormValidator(configFormValidator, cardForm);
const profileValidator = new FormValidator(configFormValidator, profileForm);
cardValidator.enableValidation();  
profileValidator.enableValidation();  