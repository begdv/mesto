export default class Card{
  constructor({card, handleCardClick, handleLikeCard, handleTrashCard}, cardSelector){
    this._card = card;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeCard = handleLikeCard;
    this._handleTrashCard = handleTrashCard;
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
    this._cardPhoto = this._element.querySelector('.card__photo');
    this._cardButtonLike = this._element.querySelector(".card__button-like");
    this._cardButtonTrash = this._element.querySelector(".card__button-trash");
    
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._card.name;
    this._cardPhoto.src = this._card.link;
    this._cardPhoto.alt = this._card.name;
  
    return this._element;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._card));
    this._cardButtonLike.addEventListener('click', () => this._handleLikeCard(this._card));
    this._cardButtonTrash.addEventListener('click', () => this._handleTrashCard(this._card));
  }  
    
  _toggleLikeCard() {
    this._cardButtonLike.classList.toggle('card__button-like_active');
  } 
    
  _trashCard() {
    this._element.remove();
    this._element = null;
  }  
}