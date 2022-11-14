//Popup для редактирования профиля
const editProfile = document.querySelector('.profile__edit');
const popupElem = document.querySelector('.popup-profile');
const popupCloseElem = document.querySelector('.popup__close');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');

function popupAddOpened() {
    popupElem.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
};

function popupRemoveOpened() {
    popupElem.classList.remove('popup_opened');
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    popupRemoveOpened();
};

popupElem.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popupRemoveOpened();
    }
});

editProfile.addEventListener('click', popupAddOpened);

popupCloseElem.addEventListener('click', popupRemoveOpened);

popupElem.addEventListener('submit', formSubmitHandler);

//Popup для добавления картинки
const addPhoto = document.querySelector('.profile__add-photo');
const popupForAddPhoto = document.querySelector('.popup-showplace');
const popupAddPhotoClose = document.querySelector('.popup-showplace__close');

function popupAddPhotoOpened() {
    popupForAddPhoto.classList.add('popup_opened');
};

function popupAddRemoveOpened() {
    popupForAddPhoto.classList.remove('popup_opened');
};

function formAddSubmitHandler(evt) {
    evt.preventDefault();
    popupAddRemoveOpened();
    renderCard({ name: photoTitle.value, link: photoUrl.value });
    photoTitle.value = '';
    photoUrl.value = '';
};

popupForAddPhoto.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popupAddRemoveOpened();
    }
});

addPhoto.addEventListener('click', popupAddPhotoOpened);

popupAddPhotoClose.addEventListener('click', popupAddRemoveOpened);

popupForAddPhoto.addEventListener('submit', formAddSubmitHandler);

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
    popupFullImage.classList.add('popup_opened');

    const etargetsrc = evt.target.closest('.showplace__image').src;
    showplaceFullUrl.src = etargetsrc;

    const etargettitle = evt.target.closest('.showplace__image').alt;
    showplaceFullTitle.textContent = etargettitle;
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

//Popup для вывода большой картинки достопримечательности
const editFullProfile = document.querySelector('.showplace__image');
const popupFullImage = document.querySelector('.popup-full-img');
const popupCloseFullImage = document.querySelector('.popup-full-img__close');

function popupFullRemoveOpened() {
    popupFullImage.classList.remove('popup_opened');
};

popupFullImage.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popupFullRemoveOpened();
    }
});

popupCloseFullImage.addEventListener('click', popupFullRemoveOpened);