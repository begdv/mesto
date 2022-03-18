let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let profileEdit = content.querySelector('.profile__edit');
let profileTitle = content.querySelector('.profile__title');
let profileDescription = content.querySelector('.profile__description');
let editForm = popup.querySelector('.edit-form');
let editFormInputName = popup.querySelector('.edit-form__input-text_input_name');
let editFormInputDescription = popup.querySelector('.edit-form__input-text_input_description');
let popupCloseButton = popup.querySelector('.popup__close-button');
let editFormSaveButton = popup.querySelector('.edit-form__save-button');
function profileEditPopup(){
  editFormInputName.value = profileTitle.textContent;
  editFormInputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');  
}
function profileEditClose(){
  popup.classList.remove('popup_opened');
}
function profileEditSave(event){
  event.preventDefault();
  profileTitle.textContent = editFormInputName.value;
  profileDescription.textContent = editFormInputDescription.value;
  popup.classList.remove('popup_opened');
}
profileEdit.addEventListener('click', profileEditPopup);
popupCloseButton.addEventListener('click', profileEditClose);
editForm.addEventListener('submit', profileEditSave);