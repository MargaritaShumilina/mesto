import { popupFullImage, popupFullPhoto, popupFullPhotoTitle } from './utils/utils.js';

export class Card {
    constructor({text, image, templateSelector, handleCardClick}) {
        this._text = text;
        this._image = image;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.likeButton = '.showplace__like';
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.showplace')
        .cloneNode(true)
    
      return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        const imageShowplace = this._element.querySelector('.showplace__image');
        imageShowplace.src = this._image;
        this._element.querySelector('.showplace__name').textContent = this._text;
        imageShowplace.alt = this._text;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.showplace__remove').addEventListener('click', () => {
            this._handlerDeleteCard();
        });

        this._element.querySelector(this.likeButton).addEventListener('click', () => {
            this._handlerAddLike();
        });

          this._element.querySelector('.showplace__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _handlerDeleteCard = () => {
        this._element.remove();
        this._element = null;
    };

    _handlerAddLike = () => {
        this._element.querySelector('.showplace__like').classList.toggle('showplace__like_active');
    };

    _handleImageClick = () => {
        this.handleCardClick();
    };
}