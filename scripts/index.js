//универсальные функции для закрытия и открытия попап

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const popupUniversal = document.querySelector('.popup');
const popupUniversalClose = document.querySelector('.popup__close');
const popupUniversalSaveChange = document.querySelector('.popup__save-change');
const openBtnEdit = document.querySelector('.profile__edit');
const openBtnAdd = document.querySelector('.profile__add-photo');
const popupProfile = document.querySelector('.popup-profile');
const popupShowplace = document.querySelector('.popup-showplace');
const closeAllBtnEdit = document.querySelectorAll('.popup__close');
const inputValue = document.querySelectorAll('.popup__input');
const editFullProfile = document.querySelector('.showplace__image');
const popupFullImage = document.querySelector('.popup-full-img');
const popupCloseFullImage = document.querySelector('.popup-full-img__close');

function openPopupEvt(evt) {
    if (evt.target = openBtnEdit) {
        openPopup(popupShowplace);
        console.log(evt.target);
        console.log(openBtnAdd);
    } else {
        openPopup(popupProfile);
        console.log(evt.target);
        console.log(openBtnEdit);
    }
};

function openPopup(oPop) {
    oPop.classList.add('popup_opened');
    return addValue();
}

function closePopup(cPop) {
    cPop.classList.remove('popup_opened');
};


function addValue() {
    if (popupUniversal.classList.contains('popup_opened') === true && popupUniversal.classList.contains('popup-profile') === true) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileStatus.textContent;
    } else {
        inputValue.value = '';
    }
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popupProfile);
};

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    renderCard({ name: photoTitle.value, link: photoUrl.value });
    photoTitle.value = '';
    photoUrl.value = '';
};

closeAllBtnEdit.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


openBtnEdit.addEventListener('click', function () {
    openPopup(popupProfile);
});


openBtnAdd.addEventListener('click', function () {
    openPopup(popupShowplace);
});

popupProfile.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupProfile);
    }
});

popupShowplace.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupShowplace);
    }
});

popupProfile.addEventListener('submit', formSubmitHandler);

popupShowplace.addEventListener('submit', photoSubmitHandler);

popupFullImage.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closePopup(popupFullImage);
    }
});

//Рендер карточек достопримечательностей, лайки, удаление
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

const photoPlaceList = document.querySelector('.photo-places');
const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');
const cardTemplate = document.querySelector('#showplace-card').content.querySelector('.showplace');
const showplaceFullUrl = document.querySelector('.popup-full-img__photo');
const showplaceFullTitle = document.querySelector('.popup-full-img__title');

const handlerDeleteCard = (evt) => {
    evt.target.closest('.showplace').remove();
};

const handlerAddLike = (evt) => {
    evt.target.closest('.showplace__like').classList.toggle('showplace__like_active');
};

const handlerImage = ('click', (evt) => {
    openPopup(popupFullImage);

    const eTargetSrc = evt.target.closest('.showplace__image').src;
    showplaceFullUrl.src = eTargetSrc;

    const eTargetTitle = evt.target.closest('.showplace__image').alt;
    showplaceFullTitle.textContent = eTargetTitle;

    const eTargetAlt = evt.target.closest('.showplace__image').alt;
    showplaceFullUrl.alt = eTargetAlt;
});

const generateShowplace = (dataPhotoCard) => {
    const newCardShowplace = cardTemplate.cloneNode(true);
    const showplaceName = newCardShowplace.querySelector('.showplace__name');
    const showplaceImage = newCardShowplace.querySelector('.showplace__image');

    showplaceName.textContent = dataPhotoCard.name;
    showplaceImage.src = dataPhotoCard.link;
    showplaceImage.alt = dataPhotoCard.name;

    const photoShowplaceRemove = newCardShowplace.querySelector('.showplace__remove');
    photoShowplaceRemove.addEventListener('click', handlerDeleteCard);

    const elemLike = newCardShowplace.querySelector('.showplace__like');
    elemLike.addEventListener('click', handlerAddLike);

    showplaceImage.addEventListener('click', handlerImage);

    return newCardShowplace;
};

const renderCard = (dataPhotoCard) => {
    photoPlaceList.prepend(generateShowplace(dataPhotoCard));
};

initialCards.forEach((dataPhotoCard) => {
    renderCard(dataPhotoCard);
});