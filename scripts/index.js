
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const content = document.querySelector('.content');
const popup = document.querySelector('.popup');
const profile = content.querySelector('.profile')
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const addMesto = profile.querySelector('.profile__add-mesto');
const cards = content.querySelector('.cards');

function openPopup(){
  popup.classList.add('popup_state_opened'); 
  popup.classList.remove('popup_state_closed');
}

function closePopup(){
  popup.classList.add('popup_state_closed'); 
  popup.classList.remove('popup_state_opened');
}

function removePopupContainer(evt){
  if(evt.propertyName === 'visibility'){
    popup.querySelector('.popup__container').remove();
  }
}  

function makeInicialCards(){
  initialCards.forEach(appendCard);
}

function appendCard(card){
  cards.append(makeCard(card));
}  

function makeCard(card){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElem.querySelector('.card__photo');
  function popupCard(evt){
    const popupСontainer = popupContainer('popup__container_type_card');
    const cardPopupTemplate = document.querySelector('#card-popup-template').content;
    const cardPopupElem = cardPopupTemplate.querySelector('.card-popup').cloneNode(true);
    const cardPopupPhoto = cardPopupElem.querySelector('.card-popup__photo');
    const cardPhoto = evt.target;
    cardPopupPhoto.src = cardPhoto.src;
    cardPopupPhoto.alt = cardPhoto.alt;
    cardPopupElem.querySelector('.card-popup__title').textContent = cardPhoto.alt;
    popupСontainer.append(cardPopupElem);
    openPopup();
  }
  function likeCard(evt){
    evt.target.classList.toggle('card__like_active');
  }  
  function trashCard(evt){
    evt.target.parentElement.remove();
  } 
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardElem.querySelector('.card__title').textContent = card.name;  
  cardPhoto.addEventListener('click', popupCard);
  cardElem.querySelector('.card__like').addEventListener('click', likeCard);
  cardElem.querySelector('.card__trash').addEventListener('click', trashCard);  
  return cardElem;
}

function popupContainer(className){
  const popupTemplate = document.querySelector('#popup-template').content;
  const popupContainer = popupTemplate.querySelector('.popup__container').cloneNode(true);
  popupContainer.classList.add(className);
  popupContainer.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popup.append(popupContainer);
  return popupContainer;
}  

function popupProfileEdit(){
  const popupСontainer = popupContainer('popup__container_type_form');
  const formTemplate = document.querySelector('#form-template').content;
  const form = formTemplate.querySelector('.form').cloneNode(true);
  function makeProfileEditContent(){
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
  function saveProfileEdit(event){
    event.preventDefault();
    profileTitle.textContent = form.querySelector('.edit-form__input-text_input_name').value;
    profileDescription.textContent = form.querySelector('.edit-form__input-text_input_description').value;
    closePopup();
  }
  form.classList.add('edit-form');
  form.name = 'edit-form';
  form.querySelector('.form__title').textContent = 'Редактировать профиль';
  makeProfileEditContent();
  form.querySelector('.form__save-button').textContent = 'Сохранить';
  form.addEventListener('submit', saveProfileEdit);
  popupСontainer.append(form);
  openPopup();
}

function addMestoPopup(){
  const popupСontainer = popupContainer('popup__container_type_form');
  const formTemplate = document.querySelector('#form-template').content;
  const form = formTemplate.querySelector('.form').cloneNode(true);
  function makeAddMestoContent(){
    const formContent = form.querySelector('.form__content');
    const newItemInputName = document.createElement('input');
    newItemInputName.classList.add('form__input-text','new-item__input-text_input_name');
    newItemInputName.name = 'input-name';
    newItemInputName.placeholder = 'Название';
    formContent.append(newItemInputName);
    const newItemInputHref = document.createElement('input');
    newItemInputHref.classList.add('form__input-text','new-item__input-text_input_href');
    newItemInputHref.name = 'input-href';
    newItemInputHref.placeholder = 'Ссылка на картинку';
    formContent.append(newItemInputHref);
  }
  function processKeyDownEnter(evt){
    if (evt.keyCode === 13) {
      addCardItem(evt);
    }
  } 
  function addCardItem(evt){
    evt.preventDefault();
    cards.prepend(makeCard({
      name: form.querySelector('.new-item__input-text_input_name').value,
      link: form.querySelector('.new-item__input-text_input_href').value
    }));
    closePopup();
  }  
  form.classList.add('new-item');
  form.name = 'new-item';
  form.querySelector('.form__title').textContent = 'Новое место';
  makeAddMestoContent();
  form.querySelector('.form__save-button').textContent = 'Создать';
  form.querySelector('.form__input-text').addEventListener('keydown', processKeyDownEnter, false);
  form.addEventListener('submit', addCardItem);
  popupСontainer.append(form);
  openPopup();
}

profileEdit.addEventListener('click', popupProfileEdit);
addMesto.addEventListener('click', addMestoPopup);
popup.addEventListener("transitionend", removePopupContainer, false);
makeInicialCards();