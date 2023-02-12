import Popup from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupElement, callbackSubmitForm, formElement) {
        super(popupElement);
        this.callbackSubmitForm = callbackSubmitForm.bind(this);
        this.formElement = formElement;
        this.formFields = this.formElement.querySelectorAll('.popup__input');
        this.btnSubmit = this.popupElement.querySelector('.popup__button');
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

    setEventListeners() {
        super.setEventListeners();
        this.popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.callbackSubmitForm(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this.formElement.reset();
    }

    loadingButton(value) {
        if (value === true) {
            this.btnSubmit.textContent = 'Сохранение...';
            this.btnSubmit.setAttribute("disabled", true);
        } 
        else {
            this.btnSubmit.textContent = this.btnSubmit.value;
        }
    }
}
