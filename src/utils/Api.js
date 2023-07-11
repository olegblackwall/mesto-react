class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then(this._checkResponse);

  }

  editProfile(formValues) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: formValues.name,
        about: formValues.about
      })
    })
      .then(this._checkResponse);

  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(this._checkResponse);

  }

  editAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse);

  }

  postCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse);

  }

  setLike(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._checkResponse);

  }

  deleteLike(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkResponse);

  }

  deleteCard(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'f6782ace-7e7f-4677-87dd-7e360f6606a1',
    'Content-Type': 'application/json'
  }
});