import { openPopup } from "./modal";
import { cardsApi, userApi, addLikeApi, deletLikeApi,deletCardApi } from "./api";
const elementsContainer = document.querySelector('.elements');
function openPopupCard(popupCard, name, src) {
  const popupImg = document.querySelector('#popup-img');
  const popupImage = document.querySelector('.popup__img');
  const popupImageName = document.querySelector('.popup__img-name');
  popupCard.querySelector('.elements__img').addEventListener('click', function () {
    popupImage.src = `${src}`;
    popupImage.alt = `${name}`;
    popupImageName.textContent = popupCard.querySelector('.elements__discritpion').textContent
    openPopup(popupImg);
  })
}
/* удалить карточку */
function deletCard(card, id) {
  card.querySelector('.elements__delet-icon').addEventListener('click', function () {
    return deletCardApi(id)
      .finally(() => {
        card.remove()
      })
  })
}
/*лайк карточке */
function likeCard(heart, id, likes, user, like,numberlikes) {
  heart.addEventListener('click', function (evt) {
    if (heart.classList.contains('elements__heart_active')) {
      deletLikeApi(id)
        .then(() => {
          for (let i = 0; i < likes; i++) {
            console.log(numberlikes.textContent)
            if(like[i] === user) {
              like[i].remove();
            }
          }
        })
        .then(()=>{
          numberlikes.textContent --
        })
    } else if (heart.classList.contains('elements__heart_active') === false) {
      addLikeApi(id)
        .then(() => {
          heart.classList.add('elements__heart_active')
          like.push(user)
        })
        .then(()=>{
          numberlikes.textContent ++
        })
    }
    evt.target.classList.toggle('elements__heart_active');

  })
}
/* отрисовываем какие карточки лайкнул пользователь */
function printLikes(likes, like, heart) {
  return userApi()
    .then(res => res.json())
    .then((result) => {
      for (let i = 0; i < likes; i++) {
        if (result.name === like[i].name) {
          heart.classList.add('elements__heart_active')
        }
      }
    })
}
/* функция проверяет автора карточки */
function checkAuthor(author, del) {
  userApi()
    .then((res) => res.json())
    .then((result) => {
      if (author !== result.name) {
        del.remove()
      }
    })
}
/* функция добавить карточки */
function addCard(name, src, likes, author, id, user, like) {
  const placeTemplate = document.querySelector('#place-template').content;
  const itemElement = placeTemplate.querySelector('#elements__item').cloneNode(true);
  itemElement.querySelector('.elements__img').src = `${src}`;
  itemElement.querySelector('.elements__img').alt = `${name}`;
  itemElement.querySelector('.elements__discritpion').textContent = name;
  const numberlikes=  itemElement.querySelector('.elements__likes')
  numberlikes.textContent = likes;
  let del = itemElement.querySelector('.elements__delet-icon');
  const heart = itemElement.querySelector('.elements__heart')
  /* лайк */
  likeCard(heart, id, likes, user, like,numberlikes)
  /* удалить карточку*/
  deletCard(itemElement, id)
  /*открыть попап картинки */
  openPopupCard(itemElement, name, src)
  /*провека кто создатель */
  checkAuthor(author, del)
  /* отрисовываю кнопки лайка */
  printLikes(likes, like, heart)
  return itemElement;
}

function createCardList() {
  return cardsApi()
    .then(res => res.json())
    .then((result) => {
      for (let i = 0; i < result.length; i++) {
        elementsContainer.append(addCard(result[i].name,
          result[i].link,
          result[i].likes.length,
          result[i].owner.name,
          result[i]._id,
          result[i].owner,
          result[i].likes
        ))
      }
    });
}
createCardList()
export { createCardList }