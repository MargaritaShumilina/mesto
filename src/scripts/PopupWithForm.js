import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm, formSelector) {
        super(popupSelector);
        this.popupSelector = popupSelector;
        this.callbackSubmitForm = callbackSubmitForm;
        this.formSelector = formSelector;
    }

//собирает данные всех полей формы
    _getInputValues() {
        const formFields = this.formSelector.querySelectorAll('.popup__input');
        const values = {};
        formFields.forEach((field) => {
            const {name, value} = field;
            values[name] = value;
            console.log(field.value);
        })
    }

    setEventListeners(popupSelector) {
        super.setEventListeners(popupSelector);
        popupSelector.addEventListener('submit', this._getInputValues.bind(this));
        popupSelector.addEventListener('submit', this.callbackSubmitForm.bind(this));
    }

    closePopup(popupSelector) {
        super.closePopup(popupSelector);
        this.formSelector.reset();
    }
}