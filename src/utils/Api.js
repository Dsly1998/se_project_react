const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.ttwtwr.ignorelist.com"
    : "http://localhost:3001";

// deployed-backend-url is the URL that points to your deployed back end

const getToken = () => {
  return localStorage.getItem("jwt");
};

export const checkResponse = (res) => {
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
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
  return deleteItems;
};

export const registerUser = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, avatar }),
  }).then(checkResponse);
};

export const loadItems = ({ name, link, weather }) => {
  const token = getToken();
  const postItems = fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl: link, weather }),
  }).then(checkResponse);
  return postItems;
};

export const likeItem = (itemId) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUserProfile = (updatedData) => {
  const token = getToken();
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  }).then(checkResponse);
};

export const dislikeItem = (itemId) => {
  const token = getToken();
  return fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
