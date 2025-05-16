// src/services/projectService.js
import api from '../services/api';

export const getAllProjects = () => api.get('/projects');

export const getProjectById = (id) => api.get(`/projects/filter?id=${id}`);

export const markProjectComplete = (username, title) =>
    api.post(`/projects/complete?username=${username}&title=${title}`);
