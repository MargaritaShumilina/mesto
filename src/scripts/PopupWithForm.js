import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupElement, callbackSubmitForm, formElement) {
        super(popupElement);
        this.popupElement = popupElement;
        this.callbackSubmitForm = callbackSubmitForm.bind(this);
        this.formElement = formElement;
        this.formFields = this.formElement.querySelectorAll('.popup__input');
    }

//собирает данные всех полей формы
    _getInputValues() {
        const values = {};
        this.formFields.forEach((field) => {
            const {name, value} = field;
            values[name] = value;
        })
        return values;
    }

    setEventListeners(popupElement) {
        super.setEventListeners(popupElement);
        popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.callbackSubmitForm(this._getInputValues());
        });
    }

    closePopup(popupElement) {
        super.closePopup(popupElement);
        this.formElement.reset();
    }
}