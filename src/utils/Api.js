const baseUrl = 'http://localhost:3001';

const getToken = () => {
  return localStorage.getItem("jwt");
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};

export const fetchItems = () => {
  const token = getToken();
  const getItems = fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return getItems;
};

export const removeItems = (selectedCard) => {
  const token = getToken();
  const deleteItems = fetch(`${baseUrl}/items/${selectedCard}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return deleteItems;
};

export const registerUser = ({ email, password, name, avatar }) => {
  return fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.statusText}`);
  });
};

export const loadItems = ({ name, link, weather }) => {
  const token = getToken();
  const postItems = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: 99, name, imageUrl: link, weather }),
  }).then(checkResponse);
  return postItems;
};

export const likeItem = (itemId) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${itemId}/like`, {
    method: "PUT", // or "POST", depending on how your API is set up
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
