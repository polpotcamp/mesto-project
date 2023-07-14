import './index.css'
import { enableValidation } from './components/validate.js'
import { addCard } from './components/card';
import { closePopup,openPopup } from './components/modal';
const formElementAdd = document.querySelector('#form-add');
const elementsContainer = document.querySelector('.elements');
const inputPlace = formElementAdd.querySelector('#place-name-input')
const inputSrcPlace = formElementAdd.querySelector('#src-name-input')
const popupNewCard = document.querySelector('#newCard')
const btnEdit = document.querySelector('.profile__edit-button');
const closeIcons = document.querySelectorAll('.popup__close-icon')
const btnNew = document.querySelector('.profile__add-button')
const popupProfile = document.querySelector('#editProfile');
const formElementProf = document.querySelector('#form-profile');
const avtorName = formElementProf.querySelector('#name-input');
const avtorDiscription = formElementProf.querySelector('#description-input');
const profileName = document.querySelector('.profile__name')
const profileDiscription = document.querySelector('.profile__description')
const formList = document.querySelectorAll('.form');
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error-redbot',
    errorClass: 'form__input-error_active'
})
function addItem(evt) {
    evt.preventDefault();
    const place = inputPlace.value;
    const srcPlace = inputSrcPlace.value;
    elementsContainer.prepend(addCard(place, srcPlace))
    closePopup(popupNewCard)
    evt.target.reset()
}
formElementAdd.addEventListener('submit', addItem);
btnNew.addEventListener('click', function () {
    openPopup(popupNewCard);
    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__button',
        inactiveButtonClass: 'form__button_inactive',
        inputErrorClass: 'form__input_error-redbot',
        errorClass: 'form__input-error_active'
    })
});
btnEdit.addEventListener('click', function () {
    avtorName.value = profileName.textContent;
    avtorDiscription.value = profileDiscription.textContent;
    openPopup(popupProfile);
});
closeIcons.forEach(function (btn) {
    const popup = btn.closest(('.popup'))
    btn.addEventListener('click', () => closePopup(popup));
})
/* кнопка сохранить меняет имя жака кусто */
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = avtorName.value;
    profileDiscription.textContent = avtorDiscription.value;
    closePopup(popupProfile)
}
formElementProf.addEventListener('submit', handleFormSubmit);