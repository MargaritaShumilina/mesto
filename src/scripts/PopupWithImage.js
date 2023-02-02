import Popup from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupElement) {
       super(popupElement);
       this.popupElement = popupElement;
       this.popupFullPhoto = document.querySelector('.popup-full-img__photo');
       this.popupFullPhotoTitle = document.querySelector('.popup-full-img__title');
    }

    openPopup(popupElement, photo, title, alt) {
        this.popupFullPhoto.src = photo;
        this.popupFullPhotoTitle.textContent = title;
        this.popupFullPhoto.alt = alt;
        super.openPopup(popupElement);
    }
}