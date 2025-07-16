import { useState, useEffect, useCallback } from 'react';
import { recorridosVirtualesService } from '../services/api';

export const useRecorridosVirtuales = () => {
  const [recorridosVirtuales, setRecorridosVirtuales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecorridosVirtuales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await recorridosVirtualesService.getAll();
      setRecorridosVirtuales(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecorridoVirtualById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recorridosVirtualesService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRecorridoVirtual = useCallback(async (recorridoVirtualData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recorridosVirtualesService.create(recorridoVirtualData);
      await fetchRecorridosVirtuales();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRecorridosVirtuales]);

  const updateRecorridoVirtual = useCallback(async (id, recorridoVirtualData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await recorridosVirtualesService.update(id, recorridoVirtualData);
      await fetchRecorridosVirtuales();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRecorridosVirtuales]);

  const deleteRecorridoVirtual = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await recorridosVirtualesService.delete(id);
      await fetchRecorridosVirtuales();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRecorridosVirtuales]);

  useEffect(() => {
    fetchRecorridosVirtuales();
  }, [fetchRecorridosVirtuales]);

  return {
    recorridosVirtuales,
    loading,
    error,
    fetchRecorridosVirtuales,
    getRecorridoVirtualById,
    createRecorridoVirtual,
    updateRecorridoVirtual,
    deleteRecorridoVirtual
  };
};
