import {ESC_KEYCODE} from '../utils/const.js';
export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = (evt) => {
      if (evt.which === ESC_KEYCODE) {
        this.close();
      };      
    }
  }  
  open(){
    this._popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose);
  }
  close(){
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }
  _handleClickPopup(evt){
    if (evt.target === evt.currentTarget || evt.target.classList.contains("popup__button-close")) { 
      this.close();
    }      
  }
  setEventListeners(){
    this._popup.addEventListener('click', (evt) => this._handleClickPopup(evt));
  }
}