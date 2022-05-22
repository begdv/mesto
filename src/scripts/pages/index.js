import '../../pages/index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards, configApi, configFormValidator, cardSelector, cardTemplateSelector, profile, profileEdit, buttonAddMesto, profileForm, cardForm, profileInputName, profileInputDescription} from '../utils/const.js';

const userInfo = new UserInfo({
  titleSelector: '.profile__title', 
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

const profilePopup = new PopupWithForm('.popup_type_profile', (formData) => {
  userInfo.setUserInfo(formData);
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm('.popup_type_card', (formData) => {
  const cardElement = createCard(formData);
  cardList.addItem(cardElement);  
});
cardPopup.setEventListeners();

const openProfilePopup = () => {
  const {name, description} = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputDescription.value = description;
  profileValidator.hideFormErrors();
  profileValidator.toggleButtonState();
  profilePopup.open();
}

const openCardPopup = (evt) => {
  cardValidator.hideFormErrors();
  cardValidator.toggleButtonState();
  cardPopup.open();
}

profileEdit.addEventListener('click', openProfilePopup);
buttonAddMesto.addEventListener('click', openCardPopup);

const api = new Api(configApi);
api.getAllData().then(data => {
  const [items, user] = data;
  userInfo.setUserInfo(user);
  userInfo.setAvatar(user.avatar);
  console.log(items);
  const cardList = new Section({ items, renderer: (card) => {
      const cardElement = createCard(card);
      cardList.addItem(cardElement);
    }}, 
    cardSelector);
  cardList.renderItems();
}).catch((err) => {
  console.log(err); 
}); 

const createCard = (card) => {
  const cardObject = new Card({
    card: card, 
    handleCardClick: (card) => {
      imagePopup.open(card);
    }, 
    handleLikeCard: (card) => {
      cardObject._toggleLikeCard();
    },
    handleTrashCard: (card) => {
      cardObject._trashCard();
    }},    
    cardTemplateSelector);
  const cardElement = cardObject.generateCard();
  return cardElement;
}

const cardValidator = new FormValidator(configFormValidator, cardForm);
const profileValidator = new FormValidator(configFormValidator, profileForm);
cardValidator.enableValidation();  
profileValidator.enableValidation(); 