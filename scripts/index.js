let editProfile = document.querySelector('.profile__edit');
let popupElem = document.querySelector('.popup');
let popupCloseElem = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_status');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let formElement = document.querySelector('.popup');

function popupAddOpened() {
    popupElem.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
};

editProfile.addEventListener('click', popupAddOpened)

function popupRemoveOpened() {
    popupElem.classList.remove('popup_opened');
};

popupCloseElem.addEventListener('click', popupRemoveOpened);

popupElem.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popupRemoveOpened();
    }
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);

formElement.addEventListener('submit', popupRemoveOpened);