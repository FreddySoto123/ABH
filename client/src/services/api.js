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

export const librosService = {
  getAll: async () => {
    const response = await api.get('/libros');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/libros/${id}`);
    return response.data;
  },

  create: async (libroData) => {
    const response = await api.post('/libros', libroData);
    return response.data;
  },

  update: async (id, libroData) => {
    const response = await api.put(`/libros/${id}`, libroData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/libros/${id}`);
    return response.data;
  },
};

export const documentosService = {
  getAll: async () => {
    const response = await api.get('/documentos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/documentos/${id}`);
    return response.data;
  },

  create: async (documentoData) => {
    const response = await api.post('/documentos', documentoData);
    return response.data;
  },

  update: async (id, documentoData) => {
    const response = await api.put(`/documentos/${id}`, documentoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/documentos/${id}`);
    return response.data;
  },

  getTiposDocumento: async () => {
    const response = await api.get('/tipos-documento');
    return response.data;
  },
};

export const actividadesService = {
  getAll: async () => {
    const response = await api.get('/actividades');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/actividades/${id}`);
    return response.data;
  },

  create: async (actividadData) => {
    const response = await api.post('/actividades', actividadData);
    return response.data;
  },

  update: async (id, actividadData) => {
    const response = await api.put(`/actividades/${id}`, actividadData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/actividades/${id}`);
    return response.data;
  },

  getTiposActividad: async () => {
    const response = await api.get('/tipos-actividad');
    return response.data;
  },
};

export const filialesService = {
  getAll: async () => {
    const response = await api.get('/filiales');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/filiales/${id}`);
    return response.data;
  },

  create: async (filialData) => {
    const response = await api.post('/filiales', filialData);
    return response.data;
  },

  update: async (id, filialData) => {
    const response = await api.put(`/filiales/${id}`, filialData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/filiales/${id}`);
    return response.data;
  },
};

export const academicosService = {
  getAll: async () => {
    const response = await api.get('/academicos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/academicos/${id}`);
    return response.data;
  },

  create: async (academicoData) => {
    const response = await api.post('/academicos', academicoData);
    return response.data;
  },

  update: async (id, academicoData) => {
    const response = await api.put(`/academicos/${id}`, academicoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/academicos/${id}`);
    return response.data;
  },

  getTiposAcademico: async () => {
    const response = await api.get('/tipos-academico');
    return response.data;
  },
};

export const directivasService = {
  getAll: async () => {
    const response = await api.get('/directivas');
    return response.data;
  },

  getById: async (id_persona, id_cargo, id_filial) => {
    const response = await api.get(`/directivas/${id_persona}/${id_cargo}/${id_filial}`);
    return response.data;
  },

  create: async (directivaData) => {
    const response = await api.post('/directivas', directivaData);
    return response.data;
  },

  delete: async (id_persona, id_cargo, id_filial) => {
    const response = await api.delete(`/directivas/${id_persona}/${id_cargo}/${id_filial}`);
    return response.data;
  },

  getCargos: async () => {
    const response = await api.get('/cargos');
    return response.data;
  },
};

export const redesSocialesService = {
  getAll: async () => {
    const response = await api.get('/redes-sociales');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/redes-sociales/${id}`);
    return response.data;
  },

  create: async (redSocialData) => {
    const response = await api.post('/redes-sociales', redSocialData);
    return response.data;
  },

  update: async (id, redSocialData) => {
    const response = await api.put(`/redes-sociales/${id}`, redSocialData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/redes-sociales/${id}`);
    return response.data;
  },

  getAcademiaRedesSociales: async () => {
    const response = await api.get('/academia-redes-sociales');
    return response.data;
  },

  createAcademiaRedSocial: async (relationData) => {
    const response = await api.post('/academia-redes-sociales', relationData);
    return response.data;
  },

  deleteAcademiaRedSocial: async (id_academia, id_red_social) => {
    const response = await api.delete(`/academia-redes-sociales/${id_academia}/${id_red_social}`);
    return response.data;
  },
};

export const mensajesService = {
  getAll: async () => {
    const response = await api.get('/mensajes-contacto');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/mensajes-contacto/${id}`);
    return response.data;
  },

  create: async (mensajeData) => {
    const response = await api.post('/mensajes-contacto', mensajeData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/mensajes-contacto/${id}`);
    return response.data;
  },
};

export const recorridosService = {
  getAll: async () => {
    const response = await api.get('/recorridos-virtuales');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/recorridos-virtuales/${id}`);
    return response.data;
  },

  create: async (recorridoData) => {
    const response = await api.post('/recorridos-virtuales', recorridoData);
    return response.data;
  },

  update: async (id, recorridoData) => {
    const response = await api.put(`/recorridos-virtuales/${id}`, recorridoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/recorridos-virtuales/${id}`);
    return response.data;
  },
};

export const logsService = {
  getAll: async () => {
    const response = await api.get('/logs');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/logs/${id}`);
    return response.data;
  },

  create: async (logData) => {
    const response = await api.post('/logs', logData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/logs/${id}`);
    return response.data;
  },

  getByPersona: async (id_persona) => {
    const response = await api.get(`/logs/persona/${id_persona}`);
    return response.data;
  },

  getByTabla: async (tabla) => {
    const response = await api.get(`/logs/tabla/${tabla}`);
    return response.data;
  },
};

export const tiposDocumentoService = {
  getAll: async () => {
    const response = await api.get('/tipos-documento');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tipos-documento/${id}`);
    return response.data;
  },

  create: async (tipoDocumentoData) => {
    const response = await api.post('/tipos-documento', tipoDocumentoData);
    return response.data;
  },

  update: async (id, tipoDocumentoData) => {
    const response = await api.put(`/tipos-documento/${id}`, tipoDocumentoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tipos-documento/${id}`);
    return response.data;
  },
};

export const tiposPersonaService = {
  getAll: async () => {
    const response = await api.get('/tipos-persona');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tipos-persona/${id}`);
    return response.data;
  },

  create: async (tipoPersonaData) => {
    const response = await api.post('/tipos-persona', tipoPersonaData);
    return response.data;
  },

  update: async (id, tipoPersonaData) => {
    const response = await api.put(`/tipos-persona/${id}`, tipoPersonaData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tipos-persona/${id}`);
    return response.data;
  },
};

export const gradosPersonaService = {
  getAll: async () => {
    const response = await api.get('/grados-persona');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/grados-persona/${id}`);
    return response.data;
  },

  create: async (gradoPersonaData) => {
    const response = await api.post('/grados-persona', gradoPersonaData);
    return response.data;
  },

  update: async (id, gradoPersonaData) => {
    const response = await api.put(`/grados-persona/${id}`, gradoPersonaData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/grados-persona/${id}`);
    return response.data;
  },
};

export const tiposAcademicoService = {
  getAll: async () => {
    const response = await api.get('/tipos-academico');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tipos-academico/${id}`);
    return response.data;
  },

  create: async (tipoAcademicoData) => {
    const response = await api.post('/tipos-academico', tipoAcademicoData);
    return response.data;
  },

  update: async (id, tipoAcademicoData) => {
    const response = await api.put(`/tipos-academico/${id}`, tipoAcademicoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tipos-academico/${id}`);
    return response.data;
  },
};

export const tiposActividadService = {
  getAll: async () => {
    const response = await api.get('/tipos-actividad');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/tipos-actividad/${id}`);
    return response.data;
  },

  create: async (tipoActividadData) => {
    const response = await api.post('/tipos-actividad', tipoActividadData);
    return response.data;
  },

  update: async (id, tipoActividadData) => {
    const response = await api.put(`/tipos-actividad/${id}`, tipoActividadData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/tipos-actividad/${id}`);
    return response.data;
  },
};

export const cargosService = {
  getAll: async () => {
    const response = await api.get('/cargos');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/cargos/${id}`);
    return response.data;
  },

  create: async (cargoData) => {
    const response = await api.post('/cargos', cargoData);
    return response.data;
  },

  update: async (id, cargoData) => {
    const response = await api.put(`/cargos/${id}`, cargoData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/cargos/${id}`);
    return response.data;
  },
};

export const academiaRedesService = {
  getAll: async () => {
    const response = await api.get('/academia-redes-sociales');
    return response.data;
  },

  getById: async (id_academia, id_red_social) => {
    const response = await api.get(`/academia-redes-sociales/${id_academia}/${id_red_social}`);
    return response.data;
  },

  create: async (academiaRedData) => {
    const response = await api.post('/academia-redes-sociales', academiaRedData);
    return response.data;
  },

  delete: async (id_academia, id_red_social) => {
    const response = await api.delete(`/academia-redes-sociales/${id_academia}/${id_red_social}`);
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
