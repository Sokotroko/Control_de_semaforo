import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // URL de la API Django

export const getOverview = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};
