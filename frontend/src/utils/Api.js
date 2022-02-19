class Api {
    constructor({ address }) {
        this._address = address
    }

    getAppInfo() {
        return Promise.all([this.getUserInfo(), this.getCardList()])
    }

    getUserInfo() {
        return this._get('users/me')
    }

    setUserInfo(name, about) {
        return this._set('users/me', 'PATCH', {name, about})
    }

    setUserAvatar(data) {
      const avatar = {avatar: data}
      return this._set('users/me/avatar', 'PATCH', avatar)
        
    }
    
    getCardList() {
       const res = this._get('cards')        
       return res
    }
    
    removeCard(id) {
        return this._set(`cards/${id}`, 'DELETE', {});

    }

    setCard(name, link) {
       return this._set('cards', 'POST', {name, link})
    }
    
    toggleLike(id, liked) {
      return this._set(`cards/${id}/likes`, liked ? 'PUT' : 'DELETE')
    }

    _get(query) {
      const options = {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      return fetch(this.createUrl(query), options)
             .then(this._checkResponse)
    }

    _set(query, method, body) {
      const options = {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
      return fetch(this.createUrl(query), options)
             .then(this._checkResponse)
    }
    
    _checkResponse(res) {
      console.log(res)
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }


    createUrl(query) {
      return `${this._address}/${query}`
    }
}

const api = new Api({
  address: 'https://api.afrantsuzskaya.studen.nomoredomains.xyz'
})

export default api;
