import '../../pages/index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {configApi, configFormValidator, cardSelector, cardTemplateSelector, profileAvatar, profileEdit, buttonAddMesto, avatarForm, profileForm, cardForm, avatarInputHref, profileInputName, profileInputAbout, notifySaveActions, notifyAddActions} from '../utils/const.js';
import {notifyApiAction} from '../utils/utils.js';

const userInfo = new UserInfo({
  titleSelector: '.profile__title', 
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar-image'
});

const imagePopup = new PopupWithImage('.popup_type_image');

const profilePopup = new PopupWithForm('.popup_type_profile', (popup, formData) => {
  notifyApiAction('.profile-form .form__button-save', notifySaveActions, true);
  api.saveProfile(formData).then(user => {
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    popup.close();
    notifyApiAction('.profile-form .form__button-save', notifySaveActions, false);
  })  
});  

const avatarPopup = new PopupWithForm('.popup_type_avatar', (popup, formData) => {
  notifyApiAction('.avatar-form .form__button-save', notifySaveActions, true);
  api.saveAvatar(formData).then(user => {
    userInfo.setAvatar(user.avatar);
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    popup.close();
    notifyApiAction('.avatar-form .form__button-save', notifySaveActions, false);
  })
});  

const submitPopup = new PopupWithSubmit('.popup_type_submit');  

const cardValidator = new FormValidator(configFormValidator, cardForm);
const profileValidator = new FormValidator(configFormValidator, profileForm);
const avatarValidator = new FormValidator(configFormValidator, avatarForm);

const openAvatarPopup = () => {
  avatarInputHref.value = userInfo.getAvatar();
  avatarValidator.hideFormErrors();
  avatarValidator.toggleButtonState();
  avatarPopup.open();
}

const openProfilePopup = () => {
  const {name, about} = userInfo.getUserInfo();
  profileInputName.value = name;
  profileInputAbout.value = about;
  profileValidator.hideFormErrors();
  profileValidator.toggleButtonState();
  profilePopup.open();
}

const createCard = (card, user) => {
  card.own = (user._id === card.owner._id);
  card.ownLike = card.likes.find(like => like.name == user.name) ? true : false;
  const cardObject = new Card({
    card: card, 
    handleCardClick: (card) => {
      imagePopup.open(card);
    }, 
    handleLikeCard: (card) => {
      if(cardObject._getOwnLike()) {
        api.removeLikeCard(card._id).then((res) => {
          cardObject._showLikeStatus(res.likes, false);
        })
      } else {
        api.addLikeCard(card._id).then((res) => {
          cardObject._showLikeStatus(res.likes, true);
        })
      }    
    },
    handleTrashCard: (card) => {
      submitPopup.setBeforeCloseAction(() => {
        api.removeCard(card._id).then(() => {
          cardObject._trashCard();
        })
        .catch((err) => {
          console.log(err); 
        });
      })
      submitPopup.open();
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
  const cardList = new Section({ items, renderer: (card) => {
      const cardElement = createCard(card, user);
      cardList.addItem(cardElement);
    }}, 
    cardSelector);
  cardList.renderItems();
  const cardPopup = new PopupWithForm('.popup_type_card', (popup, formData) => {
    notifyApiAction('.card-form .form__button-new', notifyAddActions, true);
    api.addCard(formData).then(card => {
      const cardElement = createCard(card, user);
      cardList.addItem(cardElement);  
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
      popup.close();
      notifyApiAction('.card-form .form__button-new', notifyAddActions, false);
    })
  });    
  const openCardPopup = (evt) => {
    cardValidator.hideFormErrors();
    cardValidator.toggleButtonState();
    cardPopup.open();
  }  
  cardPopup.setEventListeners();
  avatarPopup.setEventListeners();
  profilePopup.setEventListeners(); 
  imagePopup.setEventListeners();   
  submitPopup.setEventListeners(); 
  profileAvatar.addEventListener('click', openAvatarPopup);
  profileEdit.addEventListener('click', openProfilePopup);
  buttonAddMesto.addEventListener('click', openCardPopup); 
  avatarValidator.enableValidation(); 
  cardValidator.enableValidation();  
  profileValidator.enableValidation(); 
}).catch((err) => {
  console.log(err); 
}); 