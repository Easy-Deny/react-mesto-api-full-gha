class Api {
    constructor(props) {
        this.url = props.url
        this.headers = props.headers
        this.checkServerStatus = this.checkServerStatus.bind(this)
    }
    getAllElements() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    getAllCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers,
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    addElement(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    deleteElement(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    editProfile(data) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.description
            })
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    addLike(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    deleteLike(id) {
        return fetch(`${this.url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => { return this.checkServerStatus(res) })
    }
    editAvatar(data) {
        //console.log(data);
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data
            })
        })
            .then((res) => {
                return this.checkServerStatus(res)
                /* if (res.ok) {
                  return res.json()
              };
              return Promise.reject('произошла ошибка');   */

            })
    }
    checkServerStatus(res) {
        if (res.ok) {
            return res.json()
        };
        return Promise.reject('произошла ошибка');
    }
}


export const api = new Api({
   url: 'http://localhost:3500',
   // url: 'https://mesto.nomoreparties.co/v1/cohort-62',
    headers: {
        'content-type': 'application/json',
       // authorization: '8fe21241-d4e3-40e9-bdfb-586c0b845bc2'
    }
})
