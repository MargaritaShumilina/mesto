import { popupFullImage, popupFullPhoto, popupFullPhotoTitle } from './utils/utils.js';


export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.buttonsClosePopup = popupSelector.querySelector('.popup__close');
    }

    openPopup(popupSelector) {
        popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    closePopup(popupSelector) {
        popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    setEventListeners(popupSelector) {
        this.buttonsClosePopup.addEventListener('click', () => this.closePopup(popupSelector));

        popupSelector.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
            this.closePopup(this.popupSelector);
            }
        })
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.closePopup(this.popupSelector);
        }
    }
}

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
        console.log(values);
        console.log(formFields);
    }

    setEventListeners(popupSelector) {
        super.setEventListeners(popupSelector);
        popupSelector.addEventListener('submit', this._getInputValues());
        popupSelector.addEventListener('submit', this.callbackSubmitForm.bind(this));
    }

    closePopup(popupSelector) {
        super.closePopup(popupSelector);
        this.formSelector.reset();
    }
}

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
       super(popupSelector);
       this.popupSelector = popupSelector;
    }

    openPopup(popupSelector, photo, title, alt) {
        super.openPopup(popupSelector);
        popupFullPhoto.src = photo;
        popupFullPhotoTitle.textContent = title;
        popupFullPhoto.alt = alt;
    }
}