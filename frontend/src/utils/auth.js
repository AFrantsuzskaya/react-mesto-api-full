const BASE_URL = 'https://api.afrantsuzskaya.studen.nomoredomains.xyz';

function checkResponse (res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => checkResponse(res)
   )
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      return res
     })
    .then((res) => checkResponse(res))
    .then(data => {
      localStorage.setItem('email', email);
      return data;
    });
      
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}`
    }})
    .then((res) => checkResponse(res))
};
  
