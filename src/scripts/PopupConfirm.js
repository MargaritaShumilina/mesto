import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this.popupElement = popupElement;
        this.callback = null;
        this.confirmButtonElement = popupElement.querySelector('.popup__button');
        this._setEventListener();
    }

    _setEventListener() {
        this.popupElement.addEventListener('click', (e) => {
            e.preventDefault();
            this._onConfirm();
        })
    }

    openPopup(callback) {
        super.openPopup();
        this.callback = callback;
    }

    _onConfirm() {
        this.callback();
        this.closePopup();
    }

}
