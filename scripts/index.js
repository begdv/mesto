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

const ESC_KEYCODE = 27;

const content = document.querySelector('.content');

const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_card');
const imagePopup = document.querySelector('.popup_type_image');

const profilePopupButtonClose = profilePopup.querySelector('.popup__button-close');
const cardPopupButtonClose = cardPopup.querySelector('.popup__button-close');
const imagePopupButtonClose = imagePopup.querySelector('.popup__button-close');

const profile = content.querySelector('.profile');
const profileEdit = profile.querySelector('.profile__edit');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const buttonAddMesto = profile.querySelector('.profile__add-mesto');

const cards = content.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;

const image = imagePopup.querySelector('.image');
const imagePhoto = image.querySelector('.image__photo');
const imageTitle = image.querySelector('.image__title');

const profileForm = profilePopup.querySelector('.profile-form');
const profileInputName = profileForm.querySelector('.form__input-text_input_profile-name');
const profileInputDescription = profileForm.querySelector('.form__input-text_input_profile-description');

const cardForm = cardPopup.querySelector('.card-form');
const cardInputName = cardForm.querySelector('.form__input-text_input_card-name');
const cardInputHref = cardForm.querySelector('.form__input-text_input_card-href');

const openPopup = (popup) => {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', handleEscapePopup);
}

const handleEscapePopup = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.which === ESC_KEYCODE) {
    closePopup(activePopup);
  };
}

const handleCloseButton = (evt) => {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}  

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
}  

const makeInicialCards = (cards) => {
  initialCards.forEach(card => addCard(cards, card));
}

const addCard = (cards, card) => {
  const cardItem = makeCard(card);
  cards.prepend(cardItem);
}  

const makeCard = (card) => {
  const cardElem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardPhoto = cardElem.querySelector('.card__photo');
  const cardTitle = cardElem.querySelector('.card__title');
  const cardButtonLike = cardElem.querySelector('.card__button-like');
  const cardButtonTrash = cardElem.querySelector('.card__button-trash');
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardTitle.textContent = card.name;  
  cardButtonLike.addEventListener('click', likeCard);
  cardButtonTrash.addEventListener('click', trashCard);  
  cardPhoto.addEventListener('click', popupImage);
  return cardElem;
}

const likeCard = (evt) => evt.target.classList.toggle('card__button-like_active');

const trashCard = (evt) => evt.target.closest('.card').remove();

const popupImage = (evt) => {
  const cardPhoto = evt.target;
  imagePhoto.src = cardPhoto.src;
  imagePhoto.alt = cardPhoto.alt;
  imageTitle.textContent = cardPhoto.alt;
  openPopup(imagePopup);
}

const popupProfile = () => {
  profileInputName.value = profileTitle.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openPopup(profilePopup);
}

const saveProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profilePopup);
}

const popupCard = () => {
  cardInputName.value = '';
  cardInputHref.value = '';
  openPopup(cardPopup);
}

const addNewCard = (evt) => {
  evt.preventDefault();
  addCard(cards, {
    name: cardInputName.value,
    link: cardInputHref.value
  });
  closePopup(cardPopup);
} 

profileEdit.addEventListener('click', popupProfile);
buttonAddMesto.addEventListener('click', popupCard);
profilePopupButtonClose.addEventListener('click', handleCloseButton);
cardPopupButtonClose.addEventListener('click', closePopup);
imagePopupButtonClose.addEventListener('click', closePopup);
profileForm.addEventListener('submit', saveProfile);
cardForm.addEventListener('submit', addNewCard);

makeInicialCards(cards);