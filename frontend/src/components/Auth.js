export const BASE_URL = 'http://localhost:3500';

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
    //console.log(`вот что приходит в дата ${data}`)
    if (data.token){
      localStorage.setItem('token', data.token);
      console.log(localStorage.getItem('token'))
      return data;
    }
  })
}; 

export function checkToken(token){
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      //'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => checkServerStatus(res))
  .then(data => {
    //console.log(data);
    return data
  })
} 

function checkServerStatus(res){
  if (res.ok) {
      return res.json()
  };
  return Promise.reject('произошла ошибка');
}
