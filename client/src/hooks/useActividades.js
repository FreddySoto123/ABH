import { useState, useEffect } from 'react';
import { actividadesService } from '../services/api';

export const useActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActividades = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actividadesService.getAll();
      setActividades(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar actividades:', err);
    } finally {
      setLoading(false);
    }
  };

  const createActividad = async (actividadData) => {
    try {
      const response = await actividadesService.create(actividadData);
      if (response.success) {
        setActividades(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear actividad');
    } catch (err) {
      console.error('Error al crear actividad:', err);
      return { success: false, error: err.message };
    }
  };

  const updateActividad = async (id, actividadData) => {
    try {
      const response = await actividadesService.update(id, actividadData);
      if (response.success) {
        setActividades(prev =>
          prev.map(actividad =>
            actividad.id_actividad === id ? response.data : actividad
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar actividad');
    } catch (err) {
      console.error('Error al actualizar actividad:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteActividad = async (id) => {
    try {
      const response = await actividadesService.delete(id);
      if (response.success) {
        setActividades(prev => prev.filter(actividad => actividad.id_actividad !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar actividad');
    } catch (err) {
      console.error('Error al eliminar actividad:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  return {
    actividades,
    loading,
    error,
    fetchActividades,
    createActividad,
    updateActividad,
    deleteActividad,
  };
};

export const useActividad = (id) => {
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActividad = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actividadesService.getById(id);
      setActividad(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar actividad:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchActividad();
    }
  }, [id, fetchActividad]);

  return {
    actividad,
    loading,
    error,
    refetch: fetchActividad,
  };
};

export const useTiposActividad = () => {
  const [tiposActividad, setTiposActividad] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiposActividad = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await actividadesService.getTiposActividad();
      setTiposActividad(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipos de actividad:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposActividad();
  }, []);

  return {
    tiposActividad,
    loading,
    error,
    refetch: fetchTiposActividad,
  };
};
