import { useState, useEffect, useCallback } from 'react';
import { directivasService } from '../services/api';

export const useDirectivas = () => {
  const [directivas, setDirectivas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDirectivas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await directivasService.getAll();
      setDirectivas(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDirectivaById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await directivasService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createDirectiva = useCallback(async (directivaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await directivasService.create(directivaData);
      await fetchDirectivas();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDirectivas]);

  const updateDirectiva = useCallback(async (id, directivaData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await directivasService.update(id, directivaData);
      await fetchDirectivas();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDirectivas]);

  const deleteDirectiva = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await directivasService.delete(id);
      await fetchDirectivas();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchDirectivas]);

  useEffect(() => {
    fetchDirectivas();
  }, [fetchDirectivas]);

  return {
    directivas,
    loading,
    error,
    fetchDirectivas,
    getDirectivaById,
    createDirectiva,
    updateDirectiva,
    deleteDirectiva
  };
};
