import Popup from './Popup.js';
import { popupFullPhoto, popupFullPhotoTitle } from './utils/utils.js';

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