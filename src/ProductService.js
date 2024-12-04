import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44326/api/products',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllProducts = () => axiosInstance.get('/');
export const createProduct = (data) => axiosInstance.post('/', data);
export const updateProduct = (id, data) => axiosInstance.put(`/${id}`, data);
export const deleteProduct = (id) => axiosInstance.delete(`/${id}`);
