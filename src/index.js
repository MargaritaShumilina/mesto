import './index.css';

import {Card} from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import {popupFullImage} from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import Section from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import { initialCards, profileNameSelector, profileStatusSelector, templateCardSelector, showplace, nameInput, jobInput, openBtnEdit, popupProfile, popupShowplace, formProfile, formAddPhoto, openBtnAdd, formConfig } from './scripts/constants.js';

const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);

const popupEdProfile = new PopupWithForm(popupProfile, submitEditProfileForm, formProfile);
const popupAdPhoto = new PopupWithForm(popupShowplace, photoSubmitHandler, formAddPhoto);

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
    console.log(4, allValues);
    console.log(5, allValues['name']);
    handleUserInfo.setUserInfo(allValues['name'], allValues['status']);
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
    popupEditProfile.openPopup();
    nameInput.value = handleUserInfo.getUserInfo().name;
    jobInput.value = handleUserInfo.getUserInfo().status;
});

openBtnAdd.addEventListener('click', function () {
    formAddPhoto.reset();
    popupAddPhoto.openPopup();
    validatorAddCard.addDisabledBtnClass();
});

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

addCardToTemplate.renderItems();

popupEditProfile.setEventListeners(popupProfile);
popupAddPhoto.setEventListeners(popupShowplace);
popupFullImg.setEventListeners(popupFullImage);

popupEdProfile.setEventListeners(popupProfile);
popupAdPhoto.setEventListeners(popupShowplace);