import { openPopup } from "./modal";
import {  addLikeApi, deletLikeApi, deletCardApi } from "./api";
import { popupImage, popupImg, popupImageName,profileName } from "./utils";
function openPopupCard(popupCard, name, src) {
  popupImage.src = `${src}`;
  popupImage.alt = `${name}`;
  popupImageName.textContent = popupCard.querySelector('.elements__discritpion').textContent
  openPopup(popupImg);
}
/* удалить карточку */
function deletCard(card, id) {
  return deletCardApi(id)
    .then(() => {
      card.remove()
    })
    .catch((err) => {
      console.log(err)
    })
}
/*лайк карточке */
function likeCard(heart, id, numberlikes,evt) {
    if (heart.classList.contains('elements__heart_active')) {
      deletLikeApi(id)
        .then((result) => {
          numberlikes.textContent = result.likes.length
          evt.target.classList.toggle('elements__heart_active');
        })
        .catch((err) => console.log(err))

    } else if (heart.classList.contains('elements__heart_active') === false) {
      addLikeApi(id)
        .then((result) => {
          numberlikes.textContent= result.likes.length
          evt.target.classList.toggle('elements__heart_active');
        })
        .catch((err) => console.log(err))
    }
}
/* отрисовываем какие карточки лайкнул пользователь */
function printLikes(likes, like, heart,userId) {
      for (let i = 0; i < likes; i++) {
        if (userId === like[i]._id) {
          heart.classList.add('elements__heart_active')
        }
      }
}
/* функция проверяет автора карточки */
function checkAuthor( authorId,del,userId) {
      if (userId != authorId) {
        del.remove()
      }
}
/* функция добавить карточки */
function addCard(item) {
  const placeTemplate = document.querySelector('#place-template').content;
  const itemElement = placeTemplate.querySelector('#elements__item').cloneNode(true);
  const itemImg = itemElement.querySelector('.elements__img')
  const numberlikes = itemElement.querySelector('.elements__likes')
  const del = itemElement.querySelector('.elements__delet-icon');
  const heart = itemElement.querySelector('.elements__heart')
  itemImg.src = `${item.src}`;
  itemImg.alt = `${item.name}`;
  itemElement.querySelector('.elements__discritpion').textContent = item.name;
  numberlikes.textContent = item.likes;
  /*открыть попап картинки */
  itemImg.addEventListener('click', function () {
    openPopupCard(itemElement, item.name, item.src)
  })
  /* лайк */
  heart.addEventListener('click', function (evt) {
    likeCard(heart, item.id, numberlikes,evt)
  })
  /* удалить карточку*/
  del.addEventListener('click', function () {
    deletCard(itemElement, item.id)
  })
  /*провека кто создатель */
  checkAuthor(item.authorId,del,item.userId)
  /* отрисовываю кнопки лайка */
  printLikes(item.likes, item.like, heart,item.userId)
  return itemElement
}
export { addCard }