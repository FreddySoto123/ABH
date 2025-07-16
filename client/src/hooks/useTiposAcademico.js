import { useState, useEffect, useCallback } from 'react';
import { tiposAcademicoService } from '../services/api';

export const useTiposAcademico = () => {
  const [tiposAcademico, setTiposAcademico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiposAcademico = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposAcademicoService.getAll();
      setTiposAcademico(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipos académicos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTipoAcademico = async (tipoAcademicoData) => {
    try {
      const response = await tiposAcademicoService.create(tipoAcademicoData);
      if (response.success) {
        setTiposAcademico(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear tipo académico');
    } catch (err) {
      console.error('Error al crear tipo académico:', err);
      return { success: false, error: err.message };
    }
  };

  const updateTipoAcademico = async (id, tipoAcademicoData) => {
    try {
      const response = await tiposAcademicoService.update(id, tipoAcademicoData);
      if (response.success) {
        setTiposAcademico(prev =>
          prev.map(tipoAcademico =>
            tipoAcademico.id_tipo_academico === id ? response.data : tipoAcademico
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar tipo académico');
    } catch (err) {
      console.error('Error al actualizar tipo académico:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteTipoAcademico = async (id) => {
    try {
      const response = await tiposAcademicoService.delete(id);
      if (response.success) {
        setTiposAcademico(prev => prev.filter(tipoAcademico => tipoAcademico.id_tipo_academico !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar tipo académico');
    } catch (err) {
      console.error('Error al eliminar tipo académico:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchTiposAcademico();
  }, [fetchTiposAcademico]);

  return {
    tiposAcademico,
    loading,
    error,
    fetchTiposAcademico,
    createTipoAcademico,
    updateTipoAcademico,
    deleteTipoAcademico,
  };
};

export const useTipoAcademico = (id) => {
  const [tipoAcademico, setTipoAcademico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTipoAcademico = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposAcademicoService.getById(id);
      setTipoAcademico(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipo académico:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTipoAcademico();
    }
  }, [id, fetchTipoAcademico]);

  return {
    tipoAcademico,
    loading,
    error,
    refetch: fetchTipoAcademico,
  };
};
