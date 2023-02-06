export default class Popup {
    constructor(popupElement) {
        this.popupElement = popupElement;
        this.buttonsClosePopup = popupElement.querySelector('.popup__close');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    openPopup() {
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup(popupElement) {
        popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners(popupElement) {
        this.buttonsClosePopup.addEventListener('click', () => this.closePopup(popupElement));

        popupElement.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
            this.closePopup(this.popupElement);
            }
        })
    }

    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.closePopup(this.popupElement);
        }
    }
}