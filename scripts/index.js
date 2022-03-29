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

const KEY_ENTER = 13;

const content = document.querySelector('.content');
const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');
const profile = content.querySelector('.profile')
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const buttonAddMesto = profile.querySelector('.profile__add-mesto');
const cards = content.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const cardPopupTemplate = document.querySelector('#card-popup-template').content;
const profileFormTemplate = document.querySelector('#profile-form-template').content;
const cardFormTemplate = document.querySelector('#card-form-template').content;

function openPopup(popup, content){
  const popupCloseButton = popup.querySelector('.popup__close-button');
  const popupContainer = popup.querySelector('.popup__container');
  popupCloseButton.addEventListener('click', closeButtonPopup);
  popupContainer.append(content);
  popup.addEventListener("transitionend", removePopupContainer);
  popup.classList.add('popup_opened'); 
}

function closeButtonPopup(evt){
  closePopup(evt.target.closest('.popup'));
}

function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function removePopupContainer(evt){
  if(evt.propertyName === 'visibility'){
    const popup = evt.target;
    const popupContainer = popup.querySelector('.popup__container');
    popupContainer.removeChild(popupContainer.lastChild);
  }
}  

function makeInicialCards(){
  initialCards.forEach(appendCard);
}

function appendCard(card){
  cards.append(makeCard(card));
}  

function makeCard(card){
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElem.querySelector('.card__photo');
  const cardTitle = cardElem.querySelector('.card__title');
  const cardLike = cardElem.querySelector('.card__like');
  const cardTrash = cardElem.querySelector('.card__trash');
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardTitle.textContent = card.name;  
  cardLike.addEventListener('click', likeCard);
  cardTrash.addEventListener('click', trashCard);  
  cardPhoto.addEventListener('click', popupCard);
  return cardElem;
}

function likeCard(evt){
  evt.target.classList.toggle('card__like_active');
}  

function trashCard(evt){
  evt.target.closest('.card').remove();
} 

function popupCard(evt){
  const cardPopupElem = cardPopupTemplate.querySelector('.card-popup').cloneNode(true);
  const cardPopupPhoto = cardPopupElem.querySelector('.card-popup__photo');
  const cardPopupTitle = cardPopupElem.querySelector('.card-popup__title');
  const cardPhoto = evt.target;
  cardPopupPhoto.src = cardPhoto.src;
  cardPopupPhoto.alt = cardPhoto.alt;
  cardPopupTitle.textContent = cardPhoto.alt;
  openPopup(imagePopup, cardPopupElem);
}

function popupProfileEdit(){
  const profileForm = profileFormTemplate.querySelector('.profile-form').cloneNode(true);
  const formInputName = profileForm.querySelector('.edit-form__input-text_input_name');
  const formInputDescription = profileForm.querySelector('.edit-form__input-text_input_description');
  formInputName.value = profileTitle.textContent;
  formInputDescription.value = profileDescription.textContent;
  profileForm.addEventListener('submit', saveProfileEdit);
  openPopup(profilePopup, profileForm);
}

function saveProfileEdit(evt){
  evt.preventDefault();
  const profileForm = profilePopup.querySelector('.profile-form');
  const formInputName = profileForm.querySelector('.edit-form__input-text_input_name');
  const formInputDescription = profileForm.querySelector('.edit-form__input-text_input_description');  
  profileTitle.textContent = formInputName.value;
  profileDescription.textContent = formInputDescription.value;
  closePopup(profilePopup);
}

function addMestoPopup(){
  const cardForm = cardFormTemplate.querySelector('.card-form').cloneNode(true);
  const formInputText = cardForm.querySelector('.form__input-text');
  formInputText.addEventListener('keydown', processKeyDownEnter);
  cardForm.addEventListener('submit', addCardItem);
  openPopup(cardPopup, cardForm);
}

function processKeyDownEnter(evt){
  if (evt.keyCode === KEY_ENTER) {
    addCardItem(evt);
  }
} 
function addCardItem(evt){
  evt.preventDefault();
  const cardForm = cardPopup.querySelector('.card-form');
  const cardInputName = cardForm.querySelector('.new-item__input-text_input_name');
  const cardInputHref = cardForm.querySelector('.new-item__input-text_input_href');
  cards.prepend(makeCard({
    name: cardInputName.value,
    link: cardInputHref.value
  }));
  closePopup(cardPopup);
} 

profileEdit.addEventListener('click', popupProfileEdit);
buttonAddMesto.addEventListener('click', addMestoPopup);
makeInicialCards();