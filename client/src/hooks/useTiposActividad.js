import { useState, useEffect, useCallback } from 'react';
import { tiposActividadService } from '../services/api';

export const useTiposActividad = () => {
  const [tiposActividad, setTiposActividad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiposActividad = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposActividadService.getAll();
      setTiposActividad(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipos de actividad:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTipoActividad = async (tipoActividadData) => {
    try {
      const response = await tiposActividadService.create(tipoActividadData);
      if (response.success) {
        setTiposActividad(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear tipo de actividad');
    } catch (err) {
      console.error('Error al crear tipo de actividad:', err);
      return { success: false, error: err.message };
    }
  };

  const updateTipoActividad = async (id, tipoActividadData) => {
    try {
      const response = await tiposActividadService.update(id, tipoActividadData);
      if (response.success) {
        setTiposActividad(prev => 
          prev.map(tipoActividad => 
            tipoActividad.id_tipo_actividad === id ? response.data : tipoActividad
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar tipo de actividad');
    } catch (err) {
      console.error('Error al actualizar tipo de actividad:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteTipoActividad = async (id) => {
    try {
      const response = await tiposActividadService.delete(id);
      if (response.success) {
        setTiposActividad(prev => 
          prev.filter(tipoActividad => 
            tipoActividad.id_tipo_actividad !== id
          )
        );
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar tipo de actividad');
    } catch (err) {
      console.error('Error al eliminar tipo de actividad:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTiposActividad();
  }, [fetchTiposActividad]);

  return {
    tiposActividad,
    loading,
    error,
    fetchTiposActividad,
    createTipoActividad,
    updateTipoActividad,
    deleteTipoActividad,
  };
};

export const useTipoActividad = (id) => {
  const [tipoActividad, setTipoActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTipoActividad = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposActividadService.getById(id);
      setTipoActividad(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipo de actividad:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTipoActividad();
    }
  }, [id, fetchTipoActividad]);

  return {
    tipoActividad,
    loading,
    error,
    refetch: fetchTipoActividad,
  };
};

