let content = document.querySelector('.content');
let popup = document.querySelector('.popup');
let profileEdit = content.querySelector('.profile__edit');
let profileTitle = content.querySelector('.profile__title');
let profileDescription = content.querySelector('.profile__description');
let editForm = content.querySelector('.edit-form');
let editFormInputName = content.querySelector('.edit-form__input-name');
let editFormInputDescription = content.querySelector('.edit-form__input-description');
let popupCloseButton = content.querySelector('.popup__close-button');
let editFormSaveButton = content.querySelector('.edit-form__save-button');
profileEdit.addEventListener('click', function(){
  editFormInputName.value = profileTitle.textContent;
  editFormInputDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
});
popupCloseButton.addEventListener('click', function(){
  popup.classList.remove('popup_opened');
});
editForm.addEventListener('submit', function(event){
  event.preventDefault();
  profileTitle.textContent = editFormInputName.value;
  profileDescription.textContent = editFormInputDescription.value;
  popup.classList.remove('popup_opened');
});