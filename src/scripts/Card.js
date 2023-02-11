export class Card {
    constructor({text, image, likes, owner, id, templateSelector, handleCardClick, handlePopupRemove, handleLike, handleDelete}) {
        this._text = text;
        this._image = image;
        this._templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.likeButton = '.showplace__like';
        this._likes = likes;
        this._likesSelector = '.showplace__people-likes';
        this.owner = owner;
        this._removeSelector = '.showplace__remove';
        this.handlePopupRemove = handlePopupRemove;
        this.handleDelete = handleDelete;
        this.handleLike = handleLike;
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
        this._element.querySelector(this._likesSelector).textContent = this._likes.length;
        // this._element.querySelector(removeSelector) = ;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.showplace__remove').addEventListener('click', () => {
            // this._handlerDeleteCard();
            this._handleImageRemovePopup();
        });

        this._element.querySelector(this.likeButton).addEventListener('click', () => {
            // this._handlerAddLike();
            this.likeMethod(this.id)
        });

        this._element.querySelector('.showplace__image').addEventListener('click', () => {
            this._handleImageClick();
        });

        // document.querySelector('.popup-are-you-sure__close').addEventListener('submit', () => {
        //     this.handleDelete1();
        // });

    }

    _handlerDeleteCard = (id) => {
        this._element.remove();
        this._element = null;
    };

    handleDeleteFunction = () => {
        this.handleDelete();
    };

    _handlerAddLike = () => {
        this._element.querySelector('.showplace__like').classList.toggle('showplace__like_active');
    };

    likeMethod() {
        this.handleLike()
    };

    _handleImageClick = () => {
        this.handleCardClick();
    };

    _handleImageRemovePopup = () => {
        this.handlePopupRemove();
    };

    cardOwner() {
        const myId = '638dc3e1a5f91c26916a01fb';
        if (this.owner === myId) {
            this._element.querySelector(this._removeSelector).style.visibility = "visible";
        }
    }
}