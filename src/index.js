import './index.css'
import { enableValidation } from './components/validate.js'
import { closePopup, openPopup } from './components/modal';
import { createCardList } from './components/card'
import { createCard, changeAvatarApi, changeNameApi, userApi } from './components/api';
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
const profileAvatarImg = document.querySelector('.profile__avatar')
const profileAvatar = document.querySelector('.profile__overlay')
const popupChangeAvtor = document.querySelector('#changeAvatar')
const profileSrcAvatar = document.querySelector('#src-avatar-input')
const formChangeAvatar = document.querySelector('#form-changeAvatar')
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
    const btn = formElementAdd.querySelector('.form__button')
    renderLoading(true, btn)
    createCard(place, srcPlace)
        .then((res) => {
            if (res.ok) {
                window.location.reload();
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, btn)
        })
    closePopup(popupNewCard)
    evt.target.reset()
}
formElementAdd.addEventListener('submit', addItem)
/* открыть попуп с созданием новой карточки */
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
/*открыть попуп с данными о пользователе */
btnEdit.addEventListener('click', function () {
    avtorName.value = profileName.textContent;
    avtorDiscription.value = profileDiscription.textContent;
    openPopup(popupProfile);
});
/* открыть попуп с сменой инконки пользователя */
profileAvatar.addEventListener('click', function () {
    openPopup(popupChangeAvtor)
    profileSrcAvatar.value = profileAvatarImg.src
    enableValidation({
        formSelector: '.form',
        inputSelector: '.form__input',
        submitButtonSelector: '.form__button',
        inactiveButtonClass: 'form__button_inactive',
        inputErrorClass: 'form__input_error-redbot',
        errorClass: 'form__input-error_active'
    })
})
/* поменять иконку пользователя */
function changeAvatar(evt) {
    evt.preventDefault();
    const newAvatar = profileSrcAvatar.value
    const btn = formChangeAvatar.querySelector('.form__button')
    renderLoading(true, btn)
    changeAvatarApi(newAvatar)
        .then((res) => {
            if (res.ok) {
                closePopup(popupChangeAvtor)
                printName()
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, btn)
        })
}


formChangeAvatar.addEventListener('submit', changeAvatar)
/*закрыть попап на крестик */
closeIcons.forEach(function (btn) {
    const popup = btn.closest(('.popup'))
    btn.addEventListener('click', () => closePopup(popup));
})
/* кнопка сохранить меняет имя жака кусто */
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = avtorName.value;
    profileDiscription.textContent = avtorDiscription.value;
    changeName(avtorName.value, avtorDiscription.value)
    closePopup(popupProfile)
}
formElementProf.addEventListener('submit', handleFormSubmit);
/*функция смены данных пользователя пользователя */
function changeName(name, discription) {
    let btn = formElementProf.querySelector('.form__button')
    renderLoading(true, btn, btn)
    changeNameApi(name, discription)
        .then((res) => {
            if (res.ok) {
                printName()
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, btn, btn)
        })
}
/* пишем  данные пользователя при загрузке страницы */
function printName() {
    userApi()
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((result) => {
            profileName.textContent = result.name;
            profileDiscription.textContent = result.about;
            profileAvatarImg.src = result.avatar
        })
        .catch((err) => console.log(err))
}
printName()
/*рендер загрузки */
function renderLoading(isLoading, btn) {
    if (isLoading) {
        btn.textContent += '...'
    } else if (!isLoading) {
        let button = btn.textContent.split('')
        button.pop()
        button.pop()
        button.pop()
        btn.textContent = button.join('')
    }
}

