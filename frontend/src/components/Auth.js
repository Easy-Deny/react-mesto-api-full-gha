export const BASE_URL = 'https://auth.nomoreparties.co';

export function register(email, password){
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  
  .then((response) => checkServerStatus(response))
}

export function authorize(email, password){
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response => checkServerStatus(response)))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  })
}; 

export function checkToken(token){
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkServerStatus(res))
  .then(data => data)
} 

function checkServerStatus(res){
  if (res.ok) {
      return res.json()
  };
  return Promise.reject('произошла ошибка');
}
