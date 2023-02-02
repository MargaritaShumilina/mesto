export default class FormValidator {
    constructor(validationConfig, form) {
        this._popupElement = validationConfig.popupElement;
        this._popupInput = validationConfig.popupInput;
        this._buttonElement = validationConfig.buttonElement;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._form = form;
        this.btnElement = this._form.querySelector(this._buttonElement)
    }
    
    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._popupInput));
        inputList.forEach((popupInput) => {
        popupInput.addEventListener('input', (e) => {
        this._toggleInputErrorState(e.target);
        this._toggleButtonState(inputList, this.inactiveButtonClass);
            });
        });
    };

    enableValidation() {
        this._setEventListeners(this._form);
    };
    
    _showInputError(popupInput, errorMessage) {
        const errorElement = this._form.querySelector(`.${popupInput.id}-error`);
        popupInput.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(`${this._inputErrorClass}_active`);
    };
    
    _hideInputError(popupInput) {
        const errorElement = this._form.querySelector(`.${popupInput.id}-error`);
        popupInput.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(`${this._inputErrorClass}_active`);
        errorElement.textContent = '';
    };
    
    _toggleInputErrorState = (popupInput) => {
        if (!popupInput.validity.valid) {
            this._showInputError(popupInput, popupInput.validationMessage);
        } else {
        this._hideInputError(popupInput);
        }
    };
    
    _hasInvalidInput(inputList) {
        return inputList.some((popupInput) => {
        return !popupInput.validity.valid;
        })
    };
    
    _toggleButtonState(inputList) {
        if (this._hasInvalidInput(inputList)) {
            this._addDisabledBtnClass(this._buttonElement, this._inactiveButtonClass);
        } else {
            this._removeDisabledBtnClass(this._buttonElement, this._inactiveButtonClass);
        }
    };
    
    _addDisabledBtnClass() {
        this.btnElement.classList.add(this._inactiveButtonClass);
        this.btnElement.setAttribute('disabled', true);
    };
    
    _removeDisabledBtnClass() {
        this.btnElement.classList.remove(this._inactiveButtonClass);
        this.btnElement.removeAttribute('disabled');
    };

    disableSubmitButton() {
        // const btnElement = document.forms.formPhoto.elements.buttonPhoto;
        this.btnElement.classList.add('popup__button_disabled');
        this.btnElement.setAttribute('disabled', true);
    }
}
