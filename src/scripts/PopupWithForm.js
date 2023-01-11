// import Popup from './Popup.js';

// export default class PopupWithForm extends Popup {
//     constructor(popupSelector, callbackSubmitForm) {
//         super(setEventListeners(), close())
//         this.popupSelector = popupSelector;
//         this.callbackSubmitForm = callbackSubmitForm;
//     }

//     _getInputValues() {

//     }

//     setEventListeners() {
//         formProfile.addEventListener('submit', this.submitEditProfileForm);
//         document.forms.formPhoto.addEventListener('submit', this.photoSubmitHandler);
//     }

//     photoSubmitHandler(evt) {
//         evt.preventDefault();
//         popupAddPhoto.closePopup(popupShowplace);
//         const card = createCard(photoTitle.value, photoUrl.value, '#showplace-card');
//         const cardElement = card.generateCard();
//         sectionAddPhoto.prepend(cardElement);
//         formAddPhoto.reset();
//     };

//     submitEditProfileForm(evt) {
//         evt.preventDefault();
//         profileName.textContent = nameInput.value;
//         profileStatus.textContent = jobInput.value;
//         popupEditProfile.closePopup(popupProfile);
//     };
// }