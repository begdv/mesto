import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._submitButton = this._popup.querySelector('.submit-popup__button');
  } 
  setBeforeCloseAction(handleSubmit){
    this._handleSubmit = handleSubmit;
  }  
  setEventListeners(){
    this._submitButton.addEventListener('click', () => {
      if (typeof this._handleSubmit === 'function'){
        this._handleSubmit();
      }
      this.close();
    });
    super.setEventListeners();
  }        
  open(){
    super.open();
  }  
}  