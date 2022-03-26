
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
const popupСontainer = document.querySelector('.popup__container');
let form;

const profile = content.querySelector('.profile')
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const addMesto = profile.querySelector('.profile__add-mesto');
const cards = content.querySelector('.cards');
const popupCloseButton = popup.querySelector('.popup__close-button');

profileEdit.addEventListener('click', profileEditPopup);
addMesto.addEventListener('click', addMestoPopup);
popupCloseButton.addEventListener('click', popupClose);

makeInicialCards();

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
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardElem.querySelector('.card__title').textContent = card.name;
  cardElem.addEventListener('click', cardLike);
  return cardElem;
}

function cardLike(evt){
  console.log(evt.target);
  evt.target.classList.toggle('card__like_active');
}  

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
  form.querySelector('.form__title').textContent = 'Новое место';
  addMestoContent();
  form.querySelector('.form__save-button').textContent = 'Создать';
  form.addEventListener('submit', cardsAddItem);
  function addMestoContent(){
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
  function cardsAddItem(event){
    event.preventDefault();
    cards.prepend(makeCard({
      name: form.querySelector('.new-item__input-text_input_name').value,
      link: form.querySelector('.new-item__input-text_input_href').value
    }));
    form.remove();
    popup.classList.remove('popup_opened');
  }
  popupСontainer.append(form);
  popup.classList.add('popup_opened');  
}

function popupClose(){
  alert('1');
  popup.classList.remove('popup_opened');
  alert('2');
//  form.remove();
}


