const setEventListeners = (popupElement, config) => {
    const inputList = Array.from(popupElement.querySelectorAll(config.popupInput));
    const buttonElement = popupElement.querySelector(config.buttonElement);
    inputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
            _toggleInputErrorState(popupElement, popupInput, config);
            toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
        });
    });
};

const enableValidation = (config) => {
    const popupList = Array.from(document.querySelectorAll(config.popupElement));
    popupList.forEach((popupElement) => {
        setEventListeners(popupElement, config);
    });
};

const showInputError = (popupElement, popupInput, errorMessage, inputErrorClass) => {
    const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${inputErrorClass}_active`);
};

const hideInputError = (popupElement, popupInput, inputErrorClass) => {
    const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
    popupInput.classList.remove(inputErrorClass);
    errorElement.classList.remove(`${inputErrorClass}_active`);
    errorElement.textContent = '';
};

const _toggleInputErrorState = (popupElement, popupInput, config) => {
    if (!popupInput.validity.valid) {
        showInputError(popupElement, popupInput, popupInput.validationMessage, config.inputErrorClass);
    } else {
        hideInputError(popupElement, popupInput, config.inputErrorClass);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((popupInput) => {
        return !popupInput.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        addDisabledBtnClass(buttonElement, inactiveButtonClass);
    } else {
        removeDisabledBtnClass(buttonElement, inactiveButtonClass);
    }
};

function addDisabledBtnClass(buttonElement, inactiveButtonClass) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

function removeDisabledBtnClass(buttonElement, inactiveButtonClass) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
};

enableValidation({
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
});

