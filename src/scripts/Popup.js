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