let editProfile = document.querySelector('.edit-profile');
let popupElem = document.querySelector('.popup');
let popupCloseElem = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_status');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

editProfile.addEventListener('click', () => {
    popupElem.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
});

popupCloseElem.addEventListener('click', () => {
    popupElem.classList.remove('popup_opened');
});

popupElem.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        popupElem.classList.remove('popup_opened');
    }
});

// Находим форму в DOM
let formElement = document.querySelector('.popup');
// Находим поля формы в DOM

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

formElement.addEventListener('submit', () => {
    popupElem.classList.remove('popup_opened');
});