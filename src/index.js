import './index.css'
import { enableValidation } from './components/validate.js'
import { closePopup, openPopup } from './components/modal';
import { createCardApi, changeAvatarApi, changeNameApi, requestUserApi, requestCardsApi } from './components/api';
import { addCard } from './components/card'
import * as utilits from './components/utils'
enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_inactive',
    inputErrorClass: 'form__input_error-redbot',
    errorClass: 'form__input-error_active'
})
/* пишем  данные пользователя при загрузке страницы */
function printName() {
    requestUserApi()
        .then((result) => {
            utilits.profileName.textContent = result.name;
            utilits.profileDiscription.textContent = result.about;
            utilits.profileAvatarImg.src = result.avatar
        })
        .catch((err) => console.log(err))
}
const promises = [printName(), createCardList()]
Promise.all(promises)
function createCardList() {
    requestCardsApi()
        .then((result) => {
            for (let i = 0; i < result.length; i++) {
                utilits.elementsContainer.append(addCard({name:result[i].name,
                  src: result[i].link,
                  likes:result[i].likes.length,
                  author: result[i].owner.name,
                  id:result[i]._id,
                  like:result[i].likes
            }))
            }
        })
        .catch((err) => console.log(err))
}
function setSubmitButtonState(isFormValid, btn) {
    if (isFormValid) {
        btn.classList.remove('form__button_inactive');
        btn.disabled = false
    } else {
        btn.classList.add('form__button_inactive');
        btn.disabled = true
    }
}
function addItem(evt) {
    evt.preventDefault();
    const place = utilits.inputPlace.value;
    const srcPlace = utilits.inputSrcPlace.value;
    renderLoading(true, utilits.btnAddCardLoad)
    createCardApi(place, srcPlace)
        .then(() => {
            utilits.elementsContainer.innerHTML = " "
            utilits.container.append(utilits.elementsContainer)
            createCardList()
            closePopup(utilits.popupNewCard)
            evt.target.reset()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnAddCardLoad)
            setSubmitButtonState(false, utilits.btnAddCard)
        })
}

utilits.formElementAdd.addEventListener('submit', addItem)

/* открыть попуп с созданием новой карточки */
utilits.btnNew.addEventListener('click', function () {
    openPopup(utilits.popupNewCard);
});
/*открыть попуп с данными о пользователе */
utilits.btnEdit.addEventListener('click', function () {
    utilits.avtorName.value = utilits.profileName.textContent;
    utilits.avtorDiscription.value = utilits.profileDiscription.textContent;
    openPopup(utilits.popupProfile);
});
/* открыть попуп с сменой инконки пользователя */
utilits.profileAvatar.addEventListener('click', function () {
    openPopup(utilits.popupChangeAvtor)
    utilits.profileSrcAvatar.value = utilits.profileAvatarImg.src
})
/* поменять иконку пользователя */
function changeAvatar(evt) {
    evt.preventDefault();
    const newAvatar = utilits.profileSrcAvatar.value
    renderLoading(true, utilits.btnChangeAvatarLoad)
    changeAvatarApi(newAvatar)
        .then(() => {
            closePopup(utilits.popupChangeAvtor)
            printName()
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnChangeAvatarLoad)
            setSubmitButtonState(false, utilits.btnChangeAvatar)
        })
}


utilits.formChangeAvatar.addEventListener('submit', changeAvatar)
/*закрыть попап на крестик */
utilits.closeIcons.forEach(function (btn) {
    const popup = btn.closest(('.popup'))
    btn.addEventListener('click', () => closePopup(popup));
})
/* кнопка сохранить меняет имя жака кусто */
function changeNameFrom(evt) {
    evt.preventDefault();
    utilits.profileName.textContent = utilits.avtorName.value;
    utilits.profileDiscription.textContent = utilits.avtorDiscription.value;
    changeName(utilits.avtorName.value, utilits.avtorDiscription.value)
    closePopup(utilits.popupProfile)
}
utilits.formElementProf.addEventListener('submit', changeNameFrom);
/*функция смены данных пользователя пользователя */
function changeName(name, discription) {
    renderLoading(true, utilits.btnChangeNameLoad)
    changeNameApi(name, discription)
        .then(() => {
            utilits.profileName.textContent = name
            utilits.profileDiscription.textContent = discription
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnChangeNameLoad)
        })
}
/*рендер загрузки */
function renderLoading(isLoading, btnload) {
    if (isLoading) {
        btnload.classList.add('form-btnload_active')
    } else if (!isLoading) {
        btnload.classList.remove('form-btnload_active')
    }
}
