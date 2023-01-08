export default class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
    }

    openPopup() {
        popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose() {
        if (this.key === 'Escape') {
            this.closePopup(document.querySelector('.popup_opened'));
        }
    }

    setEventListeners() {
        const buttonsClosePopup = popupSelector.querySelector('.popup__close');
        buttonsClosePopup.addEventListener('click', () => closePopup(popupSelector));
    }

}