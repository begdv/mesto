

const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const popupСontainer = document.querySelector('.popup__container');
const profileEdit = document.querySelector('.profile__edit');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addMesto = document.querySelector('.profile__add-mesto');

profileEdit.addEventListener('click', profileEditPopup);

const popupCloseButton = popup.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', popupClose);

let form;


function profileEditPopup(){
  const formTemplate = document.querySelector('#form-template').content;
  form = formTemplate.querySelector('.form').cloneNode(true);
  form.classList.add('edit-form');
  form.name = 'edit-form';
  form.querySelector('.form__title').textContent = 'Редактировать профиль';
  profileEditContent();
  form.querySelector('.form__save-button').textContent = 'Сохранить';
  form.addEventListener('submit', profileEditSave);
  function profileEditContent(){
    const formContent = form.querySelector('.form__content');
    const editFormInputName = document.createElement('input');
    editFormInputName.classList.add('form__input-text','edit-form__input-text_input_name');
    editFormInputName.name = 'input-name';
    editFormInputName.value = profileTitle.textContent;
    formContent.append(editFormInputName);
    const editFormInputDescription = document.createElement('input');
    editFormInputDescription.classList.add('form__input-text','edit-form__input-text_input_description');
    editFormInputDescription.name = 'input-name';
    editFormInputDescription.value = profileDescription.textContent;
    formContent.append(editFormInputDescription);
  }
  function profileEditSave(event){
    event.preventDefault();
    profileTitle.textContent = form.querySelector('.edit-form__input-text_input_name').value;
    profileDescription.textContent = form.querySelector('.edit-form__input-text_input_description').value;
    form.remove();
    popup.classList.remove('popup_opened');
  }
  popupСontainer.append(form);
  popup.classList.add('popup_opened');  
}

function addMestoPopup(){
  const formTemplate = document.querySelector('#form-template').content;
  form = formTemplate.querySelector('.form').cloneNode(true);
  form.classList.add('new-item');
  form.name = 'new-item';
  form.querySelector('.form__title').textContent = 'Редактировать профиль';
  profileEditContent();
  form.querySelector('.form__save-button').textContent = 'Сохранить';
  form.addEventListener('submit', profileEditSave);
  function profileEditContent(){
    const formContent = form.querySelector('.form__content');
    const newItemInputName = document.createElement('input');
    newItemInputName.classList.add('form__input-text','new-item__input-text_input_name');
    newItemInputName.name = 'input-name';
    newItemInputName.value = profileTitle.textContent;
    formContent.append(newItemInputName);
    const newItemInputDescription = document.createElement('input');
    newItemInputDescription.classList.add('form__input-text','new-item__input-text_input_description');
    newItemInputDescription.name = 'input-name';
    newItemInputDescription.value = profileDescription.textContent;
    formContent.append(newItemInputDescription);
  }
  function profileEditSave(event){
    event.preventDefault();
    profileTitle.textContent = form.querySelector('.new-item__input-text_input_name').value;
    profileDescription.textContent = form.querySelector('.new-item__input-text_input_description').value;
    form.remove();
    popup.classList.remove('popup_opened');
  }
  popupСontainer.append(form);
  popup.classList.add('popup_opened');  
}

function popupClose(){
  form.remove();
  popup.classList.remove('popup_opened');
}


