export default class FormValidator{
  constructor(config, form){
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._visibleErrorClass = config.visibleErrorClass;
  }  
  enableValidation(){
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._form.addEventListener('input', (evt) => this._handleFormInput(evt));
    this._toggleButtonState();
  }  
  _handleFormInput(evt){
    this._isValid(evt.target);
    this._toggleButtonState();
  }
  _isValid(inputElement){
    const errorElement = this._form.querySelector(`.${this._errorClass}_field_${inputElement.name}`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }    
  }
  _showInputError(inputElement, errorElement, errorMessage){
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._visibleErrorClass);    
  }
  _hideInputError(inputElement, errorElement){
    errorElement.classList.remove(this._visibleErrorClass);  
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }
  _hasInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  _toggleButtonState(){
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }
}