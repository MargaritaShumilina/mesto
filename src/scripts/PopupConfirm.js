import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
    constructor(popupElement) {
        super(popupElement);
        this.callback = null;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popupElement.addEventListener('submit', (e) => {
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
    }

}
