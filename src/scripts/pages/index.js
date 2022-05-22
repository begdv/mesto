import '../../pages/index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {configApi, configFormValidator, cardSelector, cardTemplateSelector, profileEdit, buttonAddMesto, profileForm, cardForm, profileInputName, profileInputAbout} from '../utils/const.js';

const userInfo = new UserInfo({
  titleSelector: '.profile__title', 
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

const imagePopup = new PopupWithImage('.popup_type_image');

const profilePopup = new PopupWithForm('.popup_type_profile', (formData) => {
  api.saveProfile(formData).then(user => {
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err); 
  })  
});  

const cardValidator = new FormValidator(configFormValidator, cardForm);
const profileValidator = new FormValidator(configFormValidator, profileForm);

const openProfilePopup = () => {
  const {name, about} = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputAbout.value = about;
  profileValidator.hideFormErrors();
  profileValidator.toggleButtonState();
  profilePopup.open();
}

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

const api = new Api(configApi);

api.getAllData().then(data => {
  const [items, user] = data;
  userInfo.setUserInfo(user);
  userInfo.setAvatar(user.avatar);
  console.log(items);
  const cardList = new Section({ items, renderer: (card) => {
      console.log(card.likes.length);
      const cardElement = createCard(card);
      cardList.addItem(cardElement);
    }}, 
    cardSelector);
  cardList.renderItems();
  const cardPopup = new PopupWithForm('.popup_type_card', (formData) => {
    api.addCard(formData).then(card => {
      const cardElement = createCard(card);
      cardList.addItem(cardElement);  
    })
    .catch((err) => {
      console.log(err); 
    }) 
  });  
  const openCardPopup = (evt) => {
    cardValidator.hideFormErrors();
    cardValidator.toggleButtonState();
    cardPopup.open();
  }  
  cardPopup.setEventListeners();
  profilePopup.setEventListeners(); 
  imagePopup.setEventListeners();    
  profileEdit.addEventListener('click', openProfilePopup);
  buttonAddMesto.addEventListener('click', openCardPopup); 
  cardValidator.enableValidation();  
  profileValidator.enableValidation(); 
}).catch((err) => {
  console.log(err); 
}); 