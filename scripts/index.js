//универсальные функции для закрытия и открытия попап

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

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    closePopup(popupProfile);
};

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    renderCard({ name: photoTitle.value, link: photoUrl.value });
    evt.target.reset();
};

function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt);
    }
};

buttonsClosePopup.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});


openBtnEdit.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
});


openBtnAdd.addEventListener('click', function () {
    openPopup(popupShowplace);
});

popupProfile.addEventListener('click', (evt) => {
    closeByOverlayClick(evt.target);
});

popupShowplace.addEventListener('click', (evt) => {
    closeByOverlayClick(evt.target);
});

popupFullImage.addEventListener('click', (evt) => {
    closeByOverlayClick(evt.target);
});

popupProfile.addEventListener('submit', submitEditProfileForm);

popupShowplace.addEventListener('submit', photoSubmitHandler);


//Генерация карточек, лайки, удаление
//я понимаю, что это не совсем верная иерархия, но если я сейчас все смешаю, я боюсь,
//что запутаюсь в следующей практической

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