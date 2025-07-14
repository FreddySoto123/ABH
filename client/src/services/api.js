import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          throw new Error(data.error || 'Datos inválidos');
        case 404:
          throw new Error(data.error || 'Recurso no encontrado');
        case 500:
          throw new Error(data.error || 'Error interno del servidor');
        default:
          throw new Error(data.error || 'Error desconocido');
      }
    } else if (error.request) {
      throw new Error('No se pudo conectar al servidor');
    } else {
      throw new Error('Error inesperado');
    }
  }
);

export const personasService = {
  getAll: async () => {
    const response = await api.get('/personas');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/personas/${id}`);
    return response.data;
  },

  create: async (personaData) => {
    const response = await api.post('/personas', personaData);
    return response.data;
  },

  update: async (id, personaData) => {
    const response = await api.put(`/personas/${id}`, personaData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/personas/${id}`);
    return response.data;
  },

  getGrados: async () => {
    const response = await api.get('/grados');
    return response.data;
  },

  getTiposPersona: async () => {
    const response = await api.get('/tipos-persona');
    return response.data;
  },  
};

export const academiaService = {
  getInfo: async () => {
    const response = await api.get('/info');
    return response.data;
  },

  updateInfo: async (academiaData) => {
    const response = await api.put('/info', academiaData);
    return response.data;
  },

  createInfo: async (academiaData) => {
    const response = await api.post('/info', academiaData);
    return response.data;
  },
};

export const testService = {
  ping: async () => {
    const response = await api.get('/ping');
    return response.data;
  },
};

export default api;
