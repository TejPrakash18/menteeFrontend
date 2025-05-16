// src/services/authService.js
import api from './api';


const login = (username, password) => {
    const response = api.post(`/auth/login`, { username, password }, { withCredentials: true });
     if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username); // Save username for later profile queries
    }
    return response.data;
};

const register = (userData) => {
    return api.post(`/auth/register`, userData);
};

export default {
    login,
    register
};