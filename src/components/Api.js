export default class Api {
    constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    }
    
    _checkErrors(res) {
    if (res.ok) {
    return res.json()
    } else {
    return Promise.reject(`Error: ${res.status}`)
    }
    }
    
    getInitialCards() {
    return fetch(this._url + '/cards', {
    method: 'GET',
    headers: this._headers
    })
    .then(this._checkErrors)
    }
    
    getUserInfo() {
    return fetch(this._url + '/users/me', {
    method: 'GET',
    headers: this._headers
    })
    .then(this._checkErrors)
    }
    
    setUserInfoByApi(userData) {
    return fetch(this._url + '/users/me', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    name: userData.profilename,
    about: userData.job
    })
    })
    .then(this._checkErrors)
    .then(console.log(userData));
    }
    
    addCard(data) {
    return fetch(this._url + '/cards', {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
    name: data.name,
    link: data.link
    })
    })
    .then(this._checkErrors)
    }
    
    addLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
    method: 'PUT',
    headers: this._headers
    })
    .then(this._checkErrors)
    }
    
    deleteLike(id) {
    return fetch(this._url + `/cards/likes/${id}`, {
    method: 'DELETE',
    headers: this._headers
    })
    .then(this._checkErrors)
    }
    
    deleteCard(id) {
    return fetch(this._url + `/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers
    })
    .then(this._checkErrors)
    }
    
    changeUserAvatar(userData) {
    console.log(userData);
    return fetch(this._url + '/users/me/avatar', {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
    avatar: userData.avatar
    })
    })
    .then(this._checkErrors)
    }
    
    getData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }
    }