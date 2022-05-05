import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, configFormValidator, cardSelector, cardTemplateSelector, profile, profileEdit, buttonAddMesto, profileForm, cardForm} from '../utils/const.js';

const userInfo = new UserInfo('.profile__title', '.profile__description');

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo(formData);
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', (formData) => {
  const card = new Card(formData, cardTemplateSelector, (item) => imagePopup.open(item));
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);  
});
cardPopup.setEventListeners();

const openProfilePopup = () => {
  const {name, description} = userInfo.getUserInfo();
  profileForm.querySelector('.form__input_field_profile-name').value = name;
  profileForm.querySelector('.form__input_field_profile-description').value = description;
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