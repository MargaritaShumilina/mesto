import { initialCards } from './constants.js';
import { Card } from './сard.js';
import { FormValidator } from './formvalidator.js'; 

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const openBtnEdit = document.querySelector('.profile__edit');
const openBtnAdd = document.querySelector('.profile__add-photo');
const popupProfile = document.querySelector('.popup-profile');
const popupShowplace = document.querySelector('.popup-showplace');
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popupFullImage = document.querySelector('.popup-full-img');
const formProfile = document.forms.formProfile;
const formAddPhoto = document.forms.formPhoto;
const buttonPhoto = formAddPhoto.elements.buttonPhoto;

const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');

const keyHandler = (evt) => {
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

const enableValidationFormProfile = new FormValidator(formConfig, formProfile);
const enableValidationFormAddPhoto = new FormValidator(formConfig, formAddPhoto);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', keyHandler);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', keyHandler);
};

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popupProfile);
};

function addDisabled(button) {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', true);;
};

function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
};

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    const card = new Card(photoTitle.value, photoUrl.value );
    const cardElement = card.generateCard();
    document.querySelector('.photo-places').prepend(cardElement);
    formAddPhoto.reset();
};

buttonsClosePopup.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();
    document.querySelector('.photo-places').append(cardElement);
});

openBtnEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
});

openBtnAdd.addEventListener('click', function () {
    openPopup(popupShowplace);
    addDisabled(buttonPhoto);
});

popupProfile.addEventListener('click', closeByOverlayClick);

popupShowplace.addEventListener('click', closeByOverlayClick);

popupFullImage.addEventListener('click', closeByOverlayClick);

formProfile.addEventListener('submit', submitEditProfileForm);

document.forms.formPhoto.addEventListener('submit', photoSubmitHandler);
    
enableValidationFormProfile.enableValidation();
enableValidationFormAddPhoto.enableValidation();