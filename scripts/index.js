import { initialCards } from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'; 

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const openBtnEdit = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('.popup-profile');
export const popupShowplace = document.querySelector('.popup-showplace');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
export const popupFullImage = document.querySelector('.popup-full-img');
export const popupFullPhoto = document.querySelector('.popup-full-img__photo');
export const popupFullPhotoTitle = document.querySelector('.popup-full-img__title');
const formProfile = document.forms.formProfile;
export const formAddPhoto = document.forms.formPhoto;
const sectionAddPhoto = document.querySelector('.photo-places')
const error = document.querySelector('.popup__input-error');

const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');

export const keyHandler = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

const formConfig = {
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
};

const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);

function createCard(text, image, templateSelector) {
    return new Card(text, image, templateSelector);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    error.textContent = '';
    document.removeEventListener('keydown', keyHandler);
};

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popupProfile);
};

function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
};

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    const card = createCard(photoTitle.value, photoUrl.value, '#showplace-card');
    const cardElement = card.generateCard();
    sectionAddPhoto.prepend(cardElement);
    formAddPhoto.reset();
};

buttonsClosePopup.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((item) => {
    const card = createCard(item.name, item.link, '#showplace-card');
    const cardElement = card.generateCard();
    sectionAddPhoto.append(cardElement);
});

openBtnEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
});

popupProfile.addEventListener('click', closeByOverlayClick);

popupShowplace.addEventListener('click', closeByOverlayClick);

popupFullImage.addEventListener('click', closeByOverlayClick);

formProfile.addEventListener('submit', submitEditProfileForm);

document.forms.formPhoto.addEventListener('submit', photoSubmitHandler);
    
validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();