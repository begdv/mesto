import Popup from './Popup.js'
export default class PopupWithSubmit extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    this._handleSubmit = handleSubmit;   
    this._submitButton = this._popup.querySelector('.submit-popup__button');
  } 
  setEventListeners(){
    this._submitButton.addEventListener('click', (evt) => {
        this._handleSubmit();
        this.close();
    });
    super.setEventListeners();
  }        
  open(){
    super.open();
  }  
}  