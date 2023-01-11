import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, photo, title) {
       super(popupSelector);
       this.popupSelector = popupSelector;
       this.photo = photo;
       this.title = title;
    }

    // openPopup(popupSelector) {
    //     popupSelector.classList.add('popup_opened');
    //     document.addEventListener('keydown', this._handleEscClose.bind(this));
    // }

    handleCardClick() {
        super.openPopup(popupSelector);
        this.photo.src = this.photo;
        this.title.textContent = this.title;
        this.title.alt = this.title;
    }
}