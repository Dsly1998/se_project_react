// auth.js in utils directory

export const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://api.wtwr.ix.tc'
    : 'http://localhost:3001';

// Function to check the server response
const checkResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return response.json().then((json) => Promise.reject(json));
};

// Function to register a new user
export const register = (userInfo) => {
    return fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    }).then(checkResponse);
};

// Function to sign in a user
export const signin = (credentials) => {
    return fetch(`${baseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    }).then(checkResponse);
};

// Function to check the validity of a token
export const checkToken = (token) => {
    return fetch(`${baseUrl}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(checkResponse);
};