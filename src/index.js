import './index.css';

import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import { popupFullImage } from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import Section from './scripts/Section.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import { initialCards } from './scripts/constants.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const openBtnEdit = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup-profile');
const popupShowplace = document.querySelector('.popup-showplace');
// const buttonsClosePopup = document.querySelectorAll('.popup__close');
const formProfile = document.forms.formProfile;
const formAddPhoto = document.forms.formPhoto;
// const sectionAddPhoto = document.querySelector('.photo-places')
// const error = document.querySelector('.popup__input-error');
const openBtnAdd = document.querySelector('.profile__add-photo');

const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');

//константы и вызовы класса Popup
const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);
popupEditProfile.setEventListeners(popupProfile);
popupAddPhoto.setEventListeners(popupShowplace);
popupFullImg.setEventListeners(popupFullImage);

// const popupEdProfile = new PopupWithForm(popupProfile);
// const popupAdPhoto = new PopupWithForm(popupShowplace);
// const popupFull = new PopupWithForm(popupFullImage);
// popupEdProfile.setEventListeners(popupProfile);
// popupAdPhoto.setEventListeners(popupShowplace);
// popupFull.setEventListeners(popupFullImage);

// const popupFI = new PopupWithImage(popupFullImage);


//вызовы класса Popup
// const popupFullImg = new PopupWithImage(popupFullImage);
// popupFullImg.openPopup(popupProfile);

const formConfig = {
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);

const showplace = '.showplace';
//создание новой карточки
// function createCard(text, image, templateSelector) {
//     return new Card(text, image, templateSelector);
// }

const addCardToTemplate = new Section ({
    items: initialCards,
    renderer: () => {
        const card = new Card(item.name, item.link, '#showplace-card');
        const cardElement = card.generateCard();
        addCardToTemplate.addItem(cardElement);
    }},
    showplace
);

addCardToTemplate.renderItems();

// function submitEditProfileForm(evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileStatus.textContent = jobInput.value;
//     popupEditProfile.closePopup(popupProfile);
// };

// function photoSubmitHandler(evt) {
//     evt.preventDefault();
//     popupAddPhoto.closePopup(popupShowplace);
//     const card = createCard(photoTitle.value, photoUrl.value, '#showplace-card');
//     const cardElement = card.generateCard();
//     sectionAddPhoto.prepend(cardElement);
//     formAddPhoto.reset();
// };


//сборка из массива карточек шоуплейсов
// initialCards.forEach((item) => {
//     const card = createCard(item.name, item.link, '#showplace-card');
//     const cardElement = card.generateCard();
//     sectionAddPhoto.append(cardElement);
// });

openBtnEdit.addEventListener('click', function () {
    formProfile.reset();
    popupEditProfile.openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
});

openBtnAdd.addEventListener('click', function () {
    formAddPhoto.reset();
    popupAddPhoto.openPopup(popupShowplace);
    validatorAddCard.disableSubmitButton();
});

// formProfile.addEventListener('submit', submitEditProfileForm);

// document.forms.formPhoto.addEventListener('submit', photoSubmitHandler);
    
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();