export class Card {
    constructor(text, image) {
        this._text = text;
        this._image = image;
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector('#showplace-card')
        .content
        .querySelector('.showplace')
        .cloneNode(true);
    
      return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.showplace__image').src = this._image;
        this._element.querySelector('.showplace__name').textContent = this._text;
        this._element.querySelector('.showplace__image').alt = this._text;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.showplace__remove').addEventListener('click', () => {
            this._handlerDeleteCard();
        });

        this._element.querySelector('.showplace__like').addEventListener('click', () => {
            this._handlerAddLike();
        });

          this._element.querySelector('.showplace__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    _handlerDeleteCard = () => {
        this._element.remove();
    };

    _handlerAddLike = () => {
        this._element.querySelector('.showplace__like').classList.toggle('showplace__like_active');
    };

    _openPopup = () => {
        document.querySelector('.popup-full-img').classList.add('popup_opened');
        document.addEventListener('keydown', this._keyHandler);
    }

    _closePopup = () => {
        document.querySelector('.popup-full-img').classList.remove('popup_opened');
    };

    _keyHandler = (evt) => {
        if (evt.key === 'Escape') {
            this._closePopup();
        }
    };

    _handleImageClick = ('click', () => {
        this._openPopup();
        document.querySelector('.popup-full-img__photo').src = this._image;
        document.querySelector('.popup-full-img__title').textContent = this._text;
        document.querySelector('.popup-full-img__photo').alt = this._text;
    });
}