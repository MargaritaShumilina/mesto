export default class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement;
        this.buttonsClosePopup = popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
        this.setEventListeners();
    }

    openPopup() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this.buttonsClosePopup.addEventListener('click', () => this.closePopup());

        this.popupElement.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
            this.closePopup();
            }
        })
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.closePopup();
        }
    }
}