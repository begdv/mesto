import initialCards from './InitialCards.js';
import {openPopup} from './index.js';

const imagePopup = document.querySelector('.popup_type_image');
const imagePhoto = imagePopup.querySelector('.image-popup__photo');
const imageTitle = imagePopup.querySelector('.image-popup__title');

const cardsContainer = document.querySelector('.cards');

class Card {
  constructor(card, cardSelector){
    this._name = card.name;
    this._image = card.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
      
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardPhoto = this._element.querySelector('.card__photo');

    this._element.querySelector('.card__title').textContent = this._name;
    this._cardPhoto.src = this._image;
    this._cardPhoto.alt = this._name;
  
    return this._element;
  }

  _setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if(evt.target.classList.contains("card__button-like")){
        this._handleLikeCard(evt);
      } else if (evt.target.classList.contains("card__button-trash")){
        this._handleTrashCard(evt);
      } else if (evt.target.classList.contains("card__photo")){
        this._handleOpenPopup(evt);
      }
    });
  }  
    
  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__button-like_active');
  } 
    
  _handleTrashCard(evt) {
    evt.target.closest('.card').remove()
  }  

  _handleOpenPopup(evt) {
    imagePhoto.src = this._cardPhoto.src;
    imagePhoto.alt = this._cardPhoto.alt;
    imageTitle.textContent = this._cardPhoto.alt;
    openPopup(imagePopup);
  }
}

const addCard = (cardsContainer, item) => {
  const card = new Card(item, '.card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
}

const makeInitialCards = (cards) => {
  cards.forEach((item) => {
    addCard(cardsContainer, item);
  });
}

makeInitialCards(initialCards);

export {addCard};