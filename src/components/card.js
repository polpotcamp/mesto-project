import { openPopup } from "./modal";
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
function deletCard(card) {
  card.querySelector('.elements__delet-icon').addEventListener('click', function () {
    card.remove()
  })
}
/*лайк карточке */
function likeCard(card) {
  card.querySelector('.elements__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_active');
  })
}
/* функция добавить карточки */
function addCard(name, src) {
  const placeTemplate = document.querySelector('#place-template').content;
  const itemElement = placeTemplate.querySelector('#elements__item').cloneNode(true);
  itemElement.querySelector('.elements__img').src = `${src}`;
  itemElement.querySelector('.elements__img').alt = `${name}`;
  itemElement.querySelector('.elements__discritpion').textContent = name;
  /* лайк */
  likeCard(itemElement)
  /* удалить карточку*/
  deletCard(itemElement)
  /*открыть попап картинки */
  openPopupCard(itemElement, name, src)
  return itemElement;
}

/* создаю карточки */
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
function createStartCard() {
  for (let i = 0; i < initialCards.length; i++) {
    elementsContainer.prepend(addCard(initialCards[i].name, initialCards[i].link))
  }
}
createStartCard()
export { addCard }