import './index.css'
import { enableValidation} from './components/validate.js'
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

Promise.all([requestUserApi(), requestCardsApi()])
    .then((result) => {
        console.log(result)
        utilits.profileName.textContent = result[0].name;
        utilits.profileDiscription.textContent = result[0].about;
        utilits.profileAvatarImg.src = result[0].avatar
        for (let i = 0; i < result[1].length; i++) {
            utilits.elementsContainer.append(addCard({
                name: result[1][i].name,
                src: result[1][i].link,
                likes: result[1][i].likes.length,
                authorId: result[1][i].owner._id,
                id: result[1][i]._id,
                like: result[1][i].likes,
                userId: result[0]._id
            }))
        }
    })
    .catch((err) => console.log(err))
function addItem(evt) {
    evt.preventDefault();
    const place = utilits.inputPlace.value;
    const srcPlace = utilits.inputSrcPlace.value;
    renderLoading(true, utilits.btnAddCardLoad)
    createCardApi(place, srcPlace)
        .then((result) => {
            utilits.elementsContainer.prepend(addCard({
                name: result.name,
                src: result.link,
                likes: result.likes.length,
                author: result.owner.name,
                id: result._id,
                like: result.likes
            }))
            closePopup(utilits.popupNewCard)
            evt.target.reset()
            utilits.btnAddCard.disabled=  true
            utilits.btnAddCard.classList.add('form__button_inactive')
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnAddCardLoad)
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
        .then((result) => {
            utilits.profileAvatarImg.src =result.avatar
            closePopup(utilits.popupChangeAvtor)
            utilits.btnChangeAvatar.disabled = true
            utilits.btnChangeAvatar.classList.add('form__button_inactive');
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnChangeAvatarLoad)
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
    renderLoading(true, utilits.btnChangeNameLoad)
    changeNameApi(utilits.avtorName.value, utilits.avtorDiscription.value)
        .then((result) => {
            utilits.profileName.textContent = result.name
            utilits.profileDiscription.textContent = result.about
            closePopup(utilits.popupProfile)
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderLoading(false, utilits.btnChangeNameLoad)
        })
}
utilits.formElementProf.addEventListener('submit', changeNameFrom);
/*рендер загрузки */
function renderLoading(isLoading, btnload) {
    if (isLoading) {
        btnload.classList.add('form-btnload_active')
    } else if (!isLoading) {
        btnload.classList.remove('form-btnload_active')
    }
}
