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

    setEventListeners(popupElement) {
        super.setEventListeners(popupElement);
        popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.callbackSubmitForm(this._getInputValues());
        });
    }

    closePopup() {
        super.closePopup();
        this.formElement.reset();
    }

    loadingButton(trueValue) {
        if (trueValue) {
            this.btnSubmit.textContent = 'Сохранение...';
            console.log('Сохранение...');
            this.btnSubmit.setAttribute("disabled", true);
        } else {
            this.btnSubmit.textContent = this.btnSubmit.value;
            console.log(this.btnSubmit.value);
        }
    }
}
