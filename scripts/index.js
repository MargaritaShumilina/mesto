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
const overlay = document.querySelector('.content');
const formProfile = document.forms.formProfile;
const formAddPhoto = document.forms.formPhoto;
const buttonPhoto = formAddPhoto.elements.buttonPhoto;

const photoPlaceList = document.querySelector('.photo-places');
const photoTitle = document.querySelector('.popup__input_type_title');
const photoUrl = document.querySelector('.popup__input_type_url');
const cardTemplate = document.querySelector('#showplace-card').content.querySelector('.showplace');
const showplaceFullUrl = document.querySelector('.popup-full-img__photo');
const showplaceFullTitle = document.querySelector('.popup-full-img__title');
const openPopupElem = document.querySelector('.popup_opened');
const popupBtnElem = document.querySelector('.popup__button');

const handlerDeleteCard = (evt) => {
    evt.target.closest('.showplace').remove();
};

const handlerAddLike = (evt) => {
    evt.target.closest('.showplace__like').classList.toggle('showplace__like_active');
};

const handleImageClick = ('click', (evt) => {
    openPopup(popupFullImage);

    const eTargetSrc = evt.currentTarget.src;
    showplaceFullUrl.src = eTargetSrc;

    const eTargetTitle = evt.currentTarget.alt;
    showplaceFullTitle.textContent = eTargetTitle;

    const eTargetAlt = evt.currentTarget.alt;
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

    showplaceImage.addEventListener('click', handleImageClick);

    return newCardShowplace;
};

const renderCard = (dataPhotoCard) => {
    photoPlaceList.prepend(generateShowplace(dataPhotoCard));
};

const keyHandler = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
};

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

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    renderCard({ name: photoTitle.value, link: photoUrl.value });
    formAddPhoto.reset();
};


function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
};

buttonsClosePopup.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

initialCards.forEach((dataPhotoCard) => {
    renderCard(dataPhotoCard);
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

formAddPhoto.addEventListener('submit', photoSubmitHandler);