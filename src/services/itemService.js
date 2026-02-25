import api from './api';

export const getItems = async () => {
    const response = await api.get('/items');
    return response.data;
};

export const getItemById = async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
};

export const createItem = async (item) => {
    const response = await api.post('/items', item);
    return response.data;
};

export const updateItem = async (id, item) => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
};

export const deleteItem = async (id) => {
    await api.delete(`/items/${id}`);
};

export const getActivities = async () => {
    const response = await api.get('/items/activities/all');
    return response.data;
};
