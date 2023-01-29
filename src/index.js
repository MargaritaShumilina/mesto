import './index.css';

import { Card } from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
// import { popupFullImage } from './scripts/utils/utils.js';
import { popupFullImage, popupFullPhoto, popupFullPhotoTitle } from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import Section from './scripts/Section.js';
import { PopupWithImage } from './scripts/Popup.js';
import { PopupWithForm } from './scripts/Popup.js';
import UserInfo from './scripts/UserInfo.js';
import { initialCards } from './scripts/constants.js';

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const openBtnEdit = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup-profile');
const popupShowplace = document.querySelector('.popup-showplace');
const formProfile = document.forms.formProfile;
const formAddPhoto = document.forms.formPhoto;
const sectionAddPhoto = document.querySelector('.photo-places')
const openBtnAdd = document.querySelector('.profile__add-photo');

const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');

const showplace = '.photo-places';

//константы и вызовы класса Popup
const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);
popupEditProfile.setEventListeners(popupProfile);
popupAddPhoto.setEventListeners(popupShowplace);
popupFullImg.setEventListeners(popupFullImage);

//константы и вызовы класса PopupWithForm
const popupEdProfile = new PopupWithForm(popupProfile, submitEditProfileForm, formProfile);
const popupAdPhoto = new PopupWithForm(popupShowplace, photoSubmitHandler, formAddPhoto);
popupEdProfile.setEventListeners(popupProfile);
popupAdPhoto.setEventListeners(popupShowplace);

const formConfig = {
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

//константы и вызовы класса FormValidator
const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);

//константы и вызовы класса PopupWithImage
const popupFI = new PopupWithImage(popupFullImage);


//константы и вызовы класса Section
const addCardToTemplate = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            text: item.name, 
            image: item.link, 
            templateSelector: '#showplace-card', 
        handleCardClick: () => {
            popupFI.openPopup(popupFullImage, item.link, item.name, item.name);
        }
    });
        const cardElement = card.generateCard();
        addCardToTemplate.addItem(cardElement);
    },
},
    showplace
);

//константы вызова UserInfo
const handleUserInfo = new UserInfo({
    name: profileName.textContent, 
    status: profileStatus.textContent});

    
handleUserInfo.setUserInfo();
handleUserInfo.getUserInfo();

addCardToTemplate.renderItems();

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    popupEditProfile.closePopup(popupProfile);
};

function photoSubmitHandler(evt) {
    evt.preventDefault();
    popupAddPhoto.closePopup(popupShowplace);
    const card = new Card({
        text: photoTitle.value, 
        image:  photoUrl.value, 
        templateSelector: '#showplace-card', 
    handleCardClick: () => {
        popupFI.openPopup(popupFullImage, photoTitle.value,  photoUrl.value);
        console.log(popupFullImage);
    }
});
    const cardElement = card.generateCard();
    sectionAddPhoto.prepend(cardElement);
    formAddPhoto.reset();
};

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
    
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();