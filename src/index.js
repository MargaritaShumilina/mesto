import './index.css';

import {Card} from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import {popupFullImage} from './scripts/utils/utils.js';
import Popup from './scripts/Popup.js';
import Section from './scripts/Section.js';
import {PopupWithImage} from './scripts/PopupWithImage.js';
import {PopupWithForm} from './scripts/PopupWithForm.js';
import UserInfo from './scripts/UserInfo.js';
import { initialCards } from './scripts/constants.js';
import Api from './scripts/Api.js';
import { profileNameSelector, profileStatusSelector, templateCardSelector, showplace, nameInput, jobInput, openBtnEdit, popupProfile, popupShowplace, formProfile, formAddPhoto, openBtnAdd, formConfig } from './scripts/utils/utils.js';

const popupEditProfile = new Popup(popupProfile);
const popupAddPhoto = new Popup(popupShowplace);
const popupFullImg = new Popup(popupFullImage);

//Инициализация попапа удаления картинки
const popupRemove = document.querySelector('.popup-are-you-sure');
const popupAreYouSure = new Popup(popupRemove);
popupAreYouSure.setEventListeners(popupRemove);

const popupEdProfile = new PopupWithForm(popupProfile, submitEditProfileForm, formProfile);
const popupAdPhoto = new PopupWithForm(popupShowplace, photoSubmitHandler, formAddPhoto);

const validatorEditProfile = new FormValidator(formConfig, formProfile);
const validatorAddCard = new FormValidator(formConfig, formAddPhoto);

const popupFI = new PopupWithImage(popupFullImage);

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-58',
    headers: {
      authorization: 'cede7662-5863-46cd-adba-d0cd6f4331bc',
      'Content-Type': 'application/json'
    }
  });

const myId = '638dc3e1a5f91c26916a01fb';

function addNewCard(text, image, likes, owner, id, templateSelector) {
    const card = new Card({
        text: text,
        image: image,
        likes: likes,
        owner: owner,
        id: id,
        templateSelector: templateSelector,
        handleCardClick: () => {
            popupFI.openPopup(popupFullImage, image, text, text);
        },
        handlePopupRemove: () => {
            popupAreYouSure.openPopup(popupRemove);
        },

        handleLike: (id) => {
            api.putLike(id)
            // .then((data) => {
            //     card._handlerDeleteCard(data._id);
            // })
        },

        //попытка сделать удаление своей карточки
        handleDelete: () => {
            popupRemove.addEventListener('submit', (e) => {
                console.log(data._id);
                e.preventDefault();
                api.removeMyOwnCard(id)
                    .then((data) => {
                        card._handlerDeleteCard(data._id);
                    })
                })
        }
    })
    const cardElement = card.generateCard();
    card.cardOwner();
    card.handleDeleteFunction();
    card.likeMethod();
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
    // items: [], 
    renderer: (item) => { 
        addNewCard(item.name, item.link, item.likes, item.owner._id, item._id, templateCardSelector);
    }, 
}, 
showplace 
)

const profileAvatarSelector = '.profile__avatar';

const handleUserInfo = new UserInfo({
    nameElement: profileNameSelector,
    statusElement: profileStatusSelector,
    avatarElement: profileAvatarSelector
});

function submitEditProfileForm(allValues) {
    handleUserInfo.setUserInfo(allValues['name'], allValues['status']);
    //Отредактированные данные профиля должны сохраняться на сервере
    api.userInformationForSave(allValues['name'], allValues['status']);
    popupEdProfile.closePopup(popupProfile);
};



//Информация о пользователе должна подгружаться с сервера
api.getUserInformation()
.then((data) => {
    handleUserInfo.setUserInfo(data['name'], data['about'], data['avatar']);
})
.catch((error) => {
    console.log(error);
});

function photoSubmitHandler(allValues) {
    addNewCard(allValues['title'], allValues['url'], '', myId, '', templateCardSelector);
    //добавить на сервер новую карточку
    api.addNewCardToTemplate(allValues['title'], allValues['url'])
    popupAddPhoto.closePopup(popupShowplace);
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

popupEditProfile.setEventListeners(popupProfile);
popupAddPhoto.setEventListeners(popupShowplace);
popupFullImg.setEventListeners(popupFullImage);

popupEdProfile.setEventListeners(popupProfile);
popupAdPhoto.setEventListeners(popupShowplace);