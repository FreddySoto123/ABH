import { useState, useEffect, useCallback } from 'react';
import { gradosPersonaService } from '../services/api';

export const useGradosPersona = () => {
  const [gradosPersona, setGradosPersona] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGradosPersona = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await gradosPersonaService.getAll();
      setGradosPersona(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getGradoPersonaById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gradosPersonaService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createGradoPersona = useCallback(async (gradoPersonaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gradosPersonaService.create(gradoPersonaData);
      await fetchGradosPersona();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGradosPersona]);

  const updateGradoPersona = useCallback(async (id, gradoPersonaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gradosPersonaService.update(id, gradoPersonaData);
      await fetchGradosPersona();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGradosPersona]);

  const deleteGradoPersona = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await gradosPersonaService.delete(id);
      await fetchGradosPersona();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchGradosPersona]);

  useEffect(() => {
    fetchGradosPersona();
  }, [fetchGradosPersona]);

  return {
    gradosPersona,
    loading,
    error,
    fetchGradosPersona,
    getGradoPersonaById,
    createGradoPersona,
    updateGradoPersona,
    deleteGradoPersona
  };
};
