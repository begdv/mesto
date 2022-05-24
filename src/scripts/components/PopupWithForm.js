import Popup from './Popup.js';
export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleFormSubmit){
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;    
    this._inputList = this._form.querySelectorAll('.form__input');
  }   
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(
      input => {
        formValues[input.name] = input.value;
      }
    );
    return formValues;
  }     
  close(){
    super.close();
    this._form.reset();
  }  
  setEventListeners(){
    this._form.addEventListener(
      'submit', 
      (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      }
    );
    super.setEventListeners();
  }  
}   