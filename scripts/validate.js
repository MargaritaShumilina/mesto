const popupElement = document.querySelector('.popup__form');
const popupInput = popupElement.querySelector('.popup__input');
const popupError = popupElement.querySelector(`.${popupInput.id}_error`);

const setEventListeners = (popupElement) => {
    const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
    const buttonElement = popupElement.querySelector('.popup__button');
    inputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
            isValid(popupElement, popupInput);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const popupList = Array.from(document.querySelectorAll('.popup'));
    popupList.forEach((popupElement) => {
        setEventListeners(popupElement);
    });
};

const showInputError = (popupElement, popupInput, errorMessage) => {
    const errorElement = popupElement.querySelector(`.${popupInput.id}_error`);
    popupInput.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_type_error_active');
};

const hideInputError = (popupElement, popupInput) => {
    const errorElement = popupElement.querySelector(`.${popupInput.id}_error`);
    popupInput.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input_type_error_active');
    errorElement.textContent = '';
};

const isValid = (popupElement, popupInput) => {
    if (!popupInput.validity.valid) {
        showInputError(popupElement, popupInput, popupInput.validationMessage);
    } else {
        hideInputError(popupElement, popupInput);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((popupInput) => {
        return !popupInput.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }
};

enableValidation({
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: '.popup__button_disabled',
    inputErrorClass: '.popup__input_type_error',
});