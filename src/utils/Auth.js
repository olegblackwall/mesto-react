class Auth {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    register({ password, email }) {
        return fetch(`${this.baseUrl}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password,
                email
            })
        })
            .then(this._checkResponse);
    }

    login({ password, email }) {
        return fetch((`${this.baseUrl}/signin`), {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password,
                email
            })
        })
            .then(this._checkResponse);
    }

    getUser(jwt) {
        return fetch((`${this.baseUrl}/users/me`), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            }
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

export const auth = new Auth({
    baseUrl: 'https://auth.nomoreparties.co',
    headers: {
        authorization: 'f6782ace-7e7f-4677-87dd-7e360f6606a1',
        'Content-Type': 'application/json'
    }
});