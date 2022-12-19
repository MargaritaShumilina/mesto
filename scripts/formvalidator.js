class FormValidator {
    constructor(data, form) {
        this.popupElement = data.popupElement;
        this.popupInput = data.popupInput;
        this.buttonElement = data.buttonElement;
        this.inactiveButtonClass = data.inactiveButtonClass;
        this.inputErrorClass = data.inputErrorClass;
        this.form = form;
    }

    setEventListeners(form, data) {
        const inputList = Array.from(this.form.querySelectorAll(this.popupInput));
        const buttonElement = this.form.querySelector(this.buttonElement);
        inputList.forEach((popupInput) => {
        popupInput.addEventListener('input', () => {
            toggleInputErrorState(this.form, this.popupInput, data);
            toggleButtonState(inputList, buttonElement, this.inactiveButtonClass);
        });
    });
    };

    enableValidation(data) {
        const popupList = Array.from(this.form.querySelectorAll(this.popupElement));
            popupList.forEach((form) => {
                setEventListeners(form, data);
            });
    };

    showInputError(form, popupInput, errorMessage, inputErrorClass) {
        const errorElement = this.form.querySelector(`.${this.popupInput.id}-error`);
            popupInput.classList.add(this.inputErrorClass);
            errorElement.textContent = errorMessage;
            errorElement.classList.add(`${this.inputErrorClass}_active`);
    };

    hideInputError (form, popupInput, inputErrorClass) {
        const errorElement = this.form.querySelector(`.${this.popupInput.id}-error`);
        popupInput.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(`${this.inputErrorClass}_active`);
        errorElement.textContent = '';
    };

    toggleInputErrorState = (form, popupInput, data) => {
        if (!popupInput.validity.valid) {
                    showInputError(this.popupElement, this.popupInput, this.popupInput.validationMessage, this.inputErrorClass);
                } else {
                    hideInputError(this.popupElement, this.popupInput, this.inputErrorClass);
                }
    };

    hasInvalidInput(inputList) {
        return inputList.some((popupInput) => {
                    return !popupInput.validity.valid;
                })
    };
    
    toggleButtonState(data) {
        if (hasInvalidInput(this.inputList)) {
                    addDisabledBtnClass(this.buttonElement, this.inactiveButtonClass);
                } else {
                    removeDisabledBtnClass(this.buttonElement, this.inactiveButtonClass);
                }
    };
    
    addDisabledBtnClass(data) {
        this.buttonElement.classList.add(this.inactiveButtonClass);
        this.buttonElement.setAttribute('disabled', true);
    };
    
    removeDisabledBtnClass(data) {
        this.buttonElement.classList.remove(this.inactiveButtonClass);
        this.buttonElement.removeAttribute('disabled');
    };
}

const formProfile = document.forms.formProfile;
const formAddPhoto = document.forms.formPhoto;

const enableValidationFormProfile = new FormValidator({
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
}, formProfile);

const enableValidationFormAddPhoto = new FormValidator({
    popupElement: '.popup__form',
    popupInput: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
}, formAddPhoto);

console.log(enableValidationFormProfile);

// Код, который был


// const setEventListeners = (popupElement, config) => {
//     const inputList = Array.from(popupElement.querySelectorAll(config.popupInput));
//     const buttonElement = popupElement.querySelector(config.buttonElement);
//     inputList.forEach((popupInput) => {
//         popupInput.addEventListener('input', () => {
//             _toggleInputErrorState(popupElement, popupInput, config);
//             toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
//         });
//     });
// };

// const enableValidation = (config) => {
//     const popupList = Array.from(document.querySelectorAll(config.popupElement));
//     popupList.forEach((popupElement) => {
//         setEventListeners(popupElement, config);
//     });
// };

// enableValidation({
//     popupElement: '.popup__form',
//     popupInput: '.popup__input',
//     buttonElement: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
// });

// const showInputError = (popupElement, popupInput, errorMessage, inputErrorClass) => {
//     const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
//     popupInput.classList.add(inputErrorClass);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(`${inputErrorClass}_active`);
// };

// const hideInputError = (popupElement, popupInput, inputErrorClass) => {
//     const errorElement = popupElement.querySelector(`.${popupInput.id}-error`);
//     popupInput.classList.remove(inputErrorClass);
//     errorElement.classList.remove(`${inputErrorClass}_active`);
//     errorElement.textContent = '';
// };

// const _toggleInputErrorState = (popupElement, popupInput, config) => {
//     if (!popupInput.validity.valid) {
//         showInputError(popupElement, popupInput, popupInput.validationMessage, config.inputErrorClass);
//     } else {
//         hideInputError(popupElement, popupInput, config.inputErrorClass);
//     }
// };

// const hasInvalidInput = (inputList) => {
//     return inputList.some((popupInput) => {
//         return !popupInput.validity.valid;
//     })
// };

// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//     if (hasInvalidInput(inputList)) {
//         addDisabledBtnClass(buttonElement, inactiveButtonClass);
//     } else {
//         removeDisabledBtnClass(buttonElement, inactiveButtonClass);
//     }
// };

// function addDisabledBtnClass(buttonElement, inactiveButtonClass) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.setAttribute('disabled', true);
// };

// function removeDisabledBtnClass(buttonElement, inactiveButtonClass) {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.removeAttribute('disabled');
// };
