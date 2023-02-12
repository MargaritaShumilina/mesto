import { popupAreYouSure } from "../index";

export class Card {
    constructor({text, image, likes, ownerId, id, templateSelector, handleCardClick, handlePopupRemove, handleLike, handleDeleteLike, userId}) {
        this._text = text;
        this._image = image;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.likeButton = '.showplace__like';
        this._likes = likes;
        this._likesSelector = '.showplace__people-likes';
        this._likeElement = document.querySelector(this._likesSelector);
        this.ownerId = ownerId;
        this.userId = userId;
        this._removeSelector = '.showplace__remove';
        this.handlePopupRemove = handlePopupRemove;
        this.handleLike = handleLike;
        this.handleDeleteLike = handleDeleteLike;
        this.id = id;
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
        this.likeInf();
        this._colorLikeIcon();
        this._addTrashButton();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.showplace__remove').addEventListener('click', () => {
            this._handleImageRemovePopup();
        });

        this._element.querySelector(this.likeButton).addEventListener('click', () => {
            this.likeMethod();
        });

        this._element.querySelector('.showplace__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    likeInf() {
        if(this._likes.length >= 1) {
            this._element.querySelector(this._likesSelector).textContent = this._likes.length;
        } else {
            this._element.querySelector(this._likesSelector).textContent;
        }
    }

    handlerDeleteCard() {
        this._element.remove();
    };

    colorLike() {
        this._element.querySelector('.showplace__like').classList.toggle('showplace__like_active');
    };

    _colorLikeIcon = () => {
        if (this._likes.some(like => like._id === this.userId)) {
            this.colorLike();
        } else {
            this._element.querySelector('.showplace__like');
        }
    };

    likeMethod() {
        if (this._likes.some(like => like._id === this.userId)) {
            this.handleDeleteLike(this.id);
        } else {
            this.handleLike(this.id);
        }
    };

    _handleImageClick = () => {
        this.handleCardClick();
    };

    _handleImageRemovePopup = () => {
        this.handlePopupRemove();
    };

    _addTrashButton() {
        if (this.ownerId === this.userId) {
            this._element.querySelector(this._removeSelector).style.visibility = "visible";
        }
    }

    setLikesCount(likes) {
        this._likeCounter = this._element.querySelector(this._likesSelector);
        this._likeCounter.textContent = likes.length;
        this._likes = likes;
    }
}
