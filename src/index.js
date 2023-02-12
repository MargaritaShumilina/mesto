import './index.css';

import {Card} from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import {popupFullImage} from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import PopupConfirm from './scripts/PopupConfirm.js';
import Section from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import Api from './scripts/Api.js';
import { profileNameSelector, profileStatusSelector, templateCardSelector, showplace, nameInput, jobInput, openBtnEdit, popupProfile, popupShowplace, formProfile, formAddPhoto, openBtnAdd, avatarElement, popupSaveAvatarElement, popupRemove, profileAvatarSelector, profileAvatarImage, formConfig } from './scripts/utils/utils.js';

const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);

//Инициализация попапа удаления картинки
const popupAreYouSure = new PopupConfirm(popupRemove);

const popupEdProfile = new PopupWithForm(popupProfile, submitEditProfileForm, formProfile);
const popupAdPhoto = new PopupWithForm(popupShowplace, photoSubmitHandler, formAddPhoto);

//Инициализация попапа Аватарки
const formSaveAvatar = document.forms.formAvatar;
const popupSaveAvatar = new PopupWithForm(popupSaveAvatarElement, submitPopupAvatar, formSaveAvatar);


avatarElement.addEventListener('click', function () {
    formSaveAvatar.reset();
    popupSaveAvatar.openPopup();
    validatorSaveAvatar.addDisabledBtnClass();
});

const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);
const validatorSaveAvatar = new FormValidator(formConfig, formSaveAvatar);

const popupFI = new PopupWithImage(popupFullImage);

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-58',
    headers: {
      authorization: 'cede7662-5863-46cd-adba-d0cd6f4331bc',
      'Content-Type': 'application/json'
    }
  });

function addNewCard(text, image, likes, ownerId, id, templateSelector) {
    const card = new Card({
        text: text,
        image: image,
        likes: likes,
        ownerId: ownerId,
        id: id,
        templateSelector: templateSelector,

        handleCardClick: () => {
            popupFI.openPopup(popupFullImage, image, text, text);
        },

        handlePopupRemove: () => {
            popupAreYouSure.openPopup(() => {
                api.removeMyOwnCard(id)
                    .then((response) => {
                        // у response нет status или success, поэтому
                        if (response.message === 'Пост удалён') {
                            card.handlerDeleteCard()
                        }
                    })
                    .catch(e => console.log(e))
            });
        },

        handleLike: (id) => {
            api.putLike(id)
            .catch((error) => {
                console.log(error);
            });
        },

        handleDeleteLike: (id) => {
            api.deleteLike(id)
            .catch((error) => {
                console.log(error);
            });
        },

        userId: handleUserInfo.getUserId()
    })
    const cardElement = card.generateCard();
    addCardToTemplate.addItem(cardElement);
    return cardElement;
};

//метод вывода картинок с сервера
api.getInitialCards()
.then((data) => {
    addCardToTemplate.renderItems(data);
})
.catch((error) => {
    console.log(error);
});

//добавление карточки в шаблон
const addCardToTemplate = new Section({ 
    renderer: (item) => { 
        addNewCard(item.name, item.link, item.likes, item.owner._id, item._id, templateCardSelector);
    }, 
}, 
showplace 
);

const handleUserInfo = new UserInfo({
    nameElement: profileNameSelector,
    statusElement: profileStatusSelector,
    avatarElement: profileAvatarSelector
});

const myId = handleUserInfo.getUserId();

function submitEditProfileForm(allValues) {
    popupEdProfile.loadingButton(true);
    console.log(popupSaveAvatarElement);
    handleUserInfo.setUserInfo(allValues['name'], allValues['status'], profileAvatarImage.src);
    //Отредактированные данные профиля должны сохраняться на сервере
    api.userInformationForSave(allValues['name'], allValues['status'])
    .catch((error) => {
        console.log(error);
    });
    popupEdProfile.loadingButton(false);
    popupEdProfile.closePopup();
};

//Информация о пользователе должна подгружаться с сервера
api.getUserInformation()
.then((data) => {
    handleUserInfo.setUserInfo(data['name'], data['about'], data['avatar'], data['_id']);
})
.catch((error) => {
    console.log(error);
});

function submitPopupAvatar(allValues) {
    popupSaveAvatar.loadingButton(true);
    api.newUserAvatar(allValues['url'])
    .then((data) => {
        handleUserInfo.setAvatar(data['avatar']);
    })
    .catch((error) => {
        console.log(error);
    });
    popupSaveAvatar.loadingButton(false);
    popupSaveAvatar.closePopup();
};

function photoSubmitHandler(allValues) {
    popupAdPhoto.loadingButton(true);
    api.addNewCardToTemplate(allValues['title'], allValues['url'])
    .catch((error) => {
        console.log(error);
    });
    addNewCard(allValues['title'], allValues['url'], [], myId, '', templateCardSelector);
    //добавить на сервер новую карточку
    popupAdPhoto.loadingButton(false);
    popupAdPhoto.closePopup();
    formAddPhoto.reset();
};

openBtnEdit.addEventListener('click', function () {
    formProfile.reset();
    popupEditProfile.openPopup();
    const profileInputValues = handleUserInfo.getUserInfo();
    nameInput.value = profileInputValues.name;
    jobInput.value = profileInputValues.about;
});

openBtnAdd.addEventListener('click', function () {
    formAddPhoto.reset();
    popupAddPhoto.openPopup();
    validatorAddCard.addDisabledBtnClass();
});

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorSaveAvatar.enableValidation();
