export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }    
  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getProfile() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  getAllData() {
    return Promise.all([this.getInitialCards(), this.getProfile()]);
  }          
  saveProfile({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
    saveAvatar({avatar}) {
      return fetch(`${this._url}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
           avatar: avatar,
        })
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }    
    addCard({name, link}) {
      return fetch(`${this._url}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }    
    removeCard(cardId) {
      return fetch(`${this._url}cards/${cardId}`, {
        method: 'DELETE',
         headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }  
    addLikeCard(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }        
    removeLikeCard(cardId) {
      return fetch(`${this._url}cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }            
}    