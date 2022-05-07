export default class Popup{
  constructor(popupSelector){
    this._popupSelector = popupSelector;
    this._popup = document.querySelector(popupSelector);
  }  
  open(){
    this._popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', this._handleEscClose.bind(this));
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
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    };      

  }
  setEventListeners(){
    this._popup.addEventListener('click', (evt) => this._handleClickPopup(evt));
  }
}