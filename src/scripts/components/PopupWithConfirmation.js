import Popup from './Popup.js'
export default class PopupWithConfirmation extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  } 
  setHandleSubmit(handleSubmit){
    this._handleSubmit = handleSubmit;
  }  
  setEventListeners(){
    this._form.addEventListener(
      'submit', 
      (evt) => {
        evt.preventDefault();
        if (typeof this._handleSubmit === 'function'){
          this._handleSubmit();
        }
      }
    );    
    super.setEventListeners();
  }        
  open(){
    super.open();
  }  
}  