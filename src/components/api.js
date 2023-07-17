
/* отправялем данные о новой карточку*/
function createCardApi(newCardName, newCardLink) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
        },
        body: JSON.stringify({
            name: newCardName,
            link: newCardLink
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })    
}
/* меняем аватар */
function changeAvatarApi(newAvatar){
  return  fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me/avatar ', {
        method: 'PATCH',
        headers: {
            authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: newAvatar
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
/* меняем данные пользователя */
function changeNameApi(name,discription){
   return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: discription
        })
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
/* запрашиваем данные о пользователе */
function requestUserApi(){
    return fetch('https://nomoreparties.co/v1/plus-cohort-26/users/me', {
        headers: {
            authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
        }
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
/* запрашиваем данные о карточках */
function requestCardsApi(){
    return fetch('https://nomoreparties.co/v1/plus-cohort-26/cards ', {
    headers: {
      authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
    }
  })
  .then((res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
})
}
/* добавить лайк */
function addLikeApi(id){
    return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id}`,{
        method: 'PUT',
        headers:{
          authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
        }
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
/*удалить лайк */
function deletLikeApi(id){
    return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/likes/${id} `, {
        method: 'DELETE',
        headers:{
          authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
        }
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
/* удалить карточку */
function deletCardApi(id){
    return fetch(`https://nomoreparties.co/v1/plus-cohort-26/cards/${id} `, {
        method: 'DELETE',
        headers: {
          authorization: '019bbcb5-3c25-4998-9d5f-ecd3bb7b11a2'
        }
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
}
export{createCardApi,changeAvatarApi,changeNameApi,requestUserApi,requestCardsApi,addLikeApi,deletLikeApi,deletCardApi}