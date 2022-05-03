export default class Card{
  constructor(card, cardSelector, openImagePopup){
    this._card = card;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
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
    this._cardPhoto.addEventListener('click', () => this._handleOpenPopup());
    this._cardButtonLike.addEventListener('click', () => this._handleLikeCard());
    this._cardButtonTrash.addEventListener('click', () => this._handleTrashCard());
  }  
    
  _handleLikeCard() {
    this._cardButtonLike.classList.toggle('card__button-like_active');
  } 
    
  _handleTrashCard() {
    this._element.remove();
    this._element = null;
  }  

  _handleOpenPopup() {
    this._openImagePopup(this._card);
  }
}