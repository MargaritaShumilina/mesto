class Card {
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

    _handleImageClick = ('click', () => {
                    openPopup(popupFullImage);
                    document.querySelector('.popup-full-img__photo').src = this._image;
                    document.querySelector('.popup-full-img__title').textContent = this._text;
                    document.querySelector('.popup-full-img__photo').alt = this._text;
                });
}

initialCards.forEach((item) => {
    const card = new Card(item.name, item.link);
    const cardElement = card.generateCard();
    document.querySelector('.photo-places').append(cardElement);
});

function photoSubmitHandler(evt) {
    evt.preventDefault();
    closePopup(popupShowplace);
    const card = new Card(photoTitle.value, photoUrl.value );
    const cardElement = card.generateCard();
    document.querySelector('.photo-places').prepend(cardElement);
    formAddPhoto.reset();
};

document.forms.formPhoto.addEventListener('submit', photoSubmitHandler);