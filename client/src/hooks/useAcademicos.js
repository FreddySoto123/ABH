import { useState, useEffect, useCallback } from 'react';
import { academicosService } from '../services/api';

export const useAcademicos = () => {
  const [academicos, setAcademicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAcademicos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academicosService.getAll();
      setAcademicos(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar académicos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAcademico = async (academicoData) => {
    try {
      const response = await academicosService.create(academicoData);
      if (response.success) {
        setAcademicos(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear académico');
    } catch (err) {
      console.error('Error al crear académico:', err);
      return { success: false, error: err.message };
    }
  };

  const updateAcademico = async (id, academicoData) => {
    try {
      const response = await academicosService.update(id, academicoData);
      if (response.success) {
        setAcademicos(prev =>
          prev.map(academico =>
            academico.id_academico === id ? response.data : academico
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar académico');
    } catch (err) {
      console.error('Error al actualizar académico:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteAcademico = async (id) => {
    try {
      const response = await academicosService.delete(id);
      if (response.success) {
        setAcademicos(prev => prev.filter(academico => academico.id_academico !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar académico');
    } catch (err) {
      console.error('Error al eliminar académico:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAcademicos();
  }, [fetchAcademicos]);

  return {
    academicos,
    loading,
    error,
    fetchAcademicos,
    createAcademico,
    updateAcademico,
    deleteAcademico,
  };
};

export const useAcademico = (id) => {
  const [academico, setAcademico] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAcademico = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academicosService.getById(id);
      setAcademico(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar académico:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAcademico();
    }
  }, [id, fetchAcademico]);

  return {
    academico,
    loading,
    error,
    refetch: fetchAcademico,
  };
};

export const useTiposAcademico = () => {
  const [tiposAcademico, setTiposAcademico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiposAcademico = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academicosService.getTiposAcademico();
      setTiposAcademico(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipos académicos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTiposAcademico();
  }, [fetchTiposAcademico]);

  return {
    tiposAcademico,
    loading,
    error,
    refetch: fetchTiposAcademico,
  };
};
