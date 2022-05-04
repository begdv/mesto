import Popup from './Popup.js'
export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._imagePhoto = this._popup.querySelector('.image-popup__photo');
    this._imageTitle = this._popup.querySelector('.image-popup__title');
  }     
  open(card){
    this._imagePhoto.src = card.link;
    this._imagePhoto.alt = card.name;
    this._imageTitle.textContent = card.name;
    super.open();
  }  
}    