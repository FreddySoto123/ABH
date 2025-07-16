import { useState, useEffect, useCallback } from 'react';
import { tiposDocumentoService } from '../services/api';

export const useTiposDocumento = () => {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTiposDocumento = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposDocumentoService.getAll();
      setTiposDocumento(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTipoDocumentoById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposDocumentoService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTipoDocumento = useCallback(async (tipoDocumentoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposDocumentoService.create(tipoDocumentoData);
      await fetchTiposDocumento();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposDocumento]);

  const updateTipoDocumento = useCallback(async (id, tipoDocumentoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await tiposDocumentoService.update(id, tipoDocumentoData);
      await fetchTiposDocumento();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposDocumento]);

  const deleteTipoDocumento = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await tiposDocumentoService.delete(id);
      await fetchTiposDocumento();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTiposDocumento]);

  useEffect(() => {
    fetchTiposDocumento();
  }, [fetchTiposDocumento]);

  return {
    tiposDocumento,
    loading,
    error,
    fetchTiposDocumento,
    getTipoDocumentoById,
    createTipoDocumento,
    updateTipoDocumento,
    deleteTipoDocumento
  };
};
