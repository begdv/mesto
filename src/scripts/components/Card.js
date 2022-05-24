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
    this._cardLikes = this._element.querySelector(".card__likes");
    this._cardButtonTrash = this._element.querySelector(".card__button-trash");
    this._cardTitle = this._element.querySelector('.card__title');
    
    this._setEventListeners();

    this._cardTitle.textContent = this._card.name;
    this._cardPhoto.src = this._card.link;
    this._cardPhoto.alt = this._card.name;
    if(this._card.own){
      this._cardButtonTrash.classList.remove('card__button-trash__hidden');
    }    
    this._showCardOwnLike();
    this._showCardLikes();
  
    return this._element;
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._card));
    this._cardButtonLike.addEventListener('click', () => this._handleLikeCard(this._card));
    this._cardButtonTrash.addEventListener('click', () => this._handleTrashCard(this._card));
  }  

  _getOwnLike() {
    return this._card.ownLike; 
  }
  _setOwnLike(ownLike) {
    this._card.ownLike = ownLike; 
  }
 
  _setLikes(likes) {
    this._card.likes = likes; 
  }
  
  _showCardOwnLike() {
    if(this._card.ownLike){
      this._cardButtonLike.classList.add('card__button-like_active');
    } else {
      this._cardButtonLike.classList.remove('card__button-like_active');
    }
  } 

  _showCardLikes() {
    this._cardLikes.textContent = this._card.likes.length; 
  }   

  _showLikeStatus(likes, ownLike) {
    this._setLikes(likes);
    this._setOwnLike(ownLike);
    this._showCardLikes();    
    this._showCardOwnLike();
  } 
    
  _trashCard() {
    this._element.remove();
    this._element = null;
  }  
}