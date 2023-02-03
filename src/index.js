import './index.css';

import {Card} from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import {popupFullImage} from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import Section from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import {initialCards} from './scripts/constants.js';

const profileNameSelector = '.profile__name';
const profileStatusSelector = '.profile__status';
const templateCardSelector = '#showplace-card';
const showplace = '.photo-places';

const nameInput = document.querySelector('.popup__input_type_name');

const jobInput = document.querySelector('.popup__input_type_status');
const openBtnEdit = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup-profile');
const popupShowplace = document.querySelector('.popup-showplace');
const formProfile = document.forms.formProfile;

const formAddPhoto = document.forms.formPhoto;

const openBtnAdd = document.querySelector('.profile__add-photo');

const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);

const popupEdProfile = new PopupWithForm(popupProfile, submitEditProfileForm, formProfile);
const popupAdPhoto = new PopupWithForm(popupShowplace, photoSubmitHandler, formAddPhoto);

const formConfig = {
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);

const popupFI = new PopupWithImage(popupFullImage);

function addNewCard(text, image, templateSelector) {
    const card = new Card({
        text: text,
        image: image,
        templateSelector: templateSelector,
        handleCardClick: () => {
            popupFI.openPopup(popupFullImage, image, text, text);
        }
    });
    const cardElement = card.generateCard();
    addCardToTemplate.addItem(cardElement);
    return cardElement;
};

const addCardToTemplate = new Section({
        items: initialCards,
        renderer: (item) => {
            addNewCard(item.name, item.link, templateCardSelector);
        },
    },
    showplace
);

const handleUserInfo = new UserInfo({
    nameSelector: profileNameSelector,
    statusSelector: profileStatusSelector
});

function submitEditProfileForm(allValues) {
    handleUserInfo.setUserInfo(allValues['name'], allValues['status'])

    popupEdProfile.closePopup(popupProfile);

};

function photoSubmitHandler() {
    const { title, url } = popupAdPhoto._getInputValues();

    addNewCard(title, url, templateCardSelector);
    popupAddPhoto.closePopup(popupShowplace);
    formAddPhoto.reset();
};

openBtnEdit.addEventListener('click', function () {
    formProfile.reset();
    popupEditProfile.openPopup(popupProfile);
    nameInput.value = handleUserInfo.getUserInfo().name;
    jobInput.value = handleUserInfo.getUserInfo().status;
});

openBtnAdd.addEventListener('click', function () {
    formAddPhoto.reset();
    popupAddPhoto.openPopup(popupShowplace);
    validatorAddCard.disableSubmitButton();
});

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

addCardToTemplate.renderItems();

popupEditProfile.setEventListeners(popupProfile);
popupAddPhoto.setEventListeners(popupShowplace);
popupFullImg.setEventListeners(popupFullImage);

popupEdProfile.setEventListeners(popupProfile);
popupAdPhoto.setEventListeners(popupShowplace);