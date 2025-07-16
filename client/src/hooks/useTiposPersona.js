import { useState, useEffect, useCallback } from 'react';
import { tiposPersonaService } from '../services/api';

export const useTiposPersona = () => {
  const [tiposPersona, setTiposPersona] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTiposPersona = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposPersonaService.getAll();
      setTiposPersona(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTipoPersonaById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposPersonaService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTipoPersona = useCallback(async (tipoPersonaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposPersonaService.create(tipoPersonaData);
      await fetchTiposPersona();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposPersona]);

  const updateTipoPersona = useCallback(async (id, tipoPersonaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposPersonaService.update(id, tipoPersonaData);
      await fetchTiposPersona();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposPersona]);

  const deleteTipoPersona = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await tiposPersonaService.delete(id);
      await fetchTiposPersona();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposPersona]);

  useEffect(() => {
    fetchTiposPersona();
  }, [fetchTiposPersona]);

  return {
    tiposPersona,
    loading,
    error,
    fetchTiposPersona,
    getTipoPersonaById,
    createTipoPersona,
    updateTipoPersona,
    deleteTipoPersona
  };
};
