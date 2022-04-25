export default class Card{
  constructor(card, cardSelector, openImagePopup){
    this._name = card.name;
    this._image = card.link;
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
    this._openImagePopup(this._cardPhoto);
  }
}