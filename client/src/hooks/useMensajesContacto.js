import { useState, useEffect, useCallback } from 'react';
import { mensajesContactoService } from '../services/api';

export const useMensajesContacto = () => {
  const [mensajesContacto, setMensajesContacto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMensajesContacto = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mensajesContactoService.getAll();
      setMensajesContacto(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMensajeContactoById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mensajesContactoService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createMensajeContacto = useCallback(async (mensajeContactoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mensajesContactoService.create(mensajeContactoData);
      await fetchMensajesContacto();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchMensajesContacto]);

  const updateMensajeContacto = useCallback(async (id, mensajeContactoData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await mensajesContactoService.update(id, mensajeContactoData);
      await fetchMensajesContacto();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchMensajesContacto]);

  const deleteMensajeContacto = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await mensajesContactoService.delete(id);
      await fetchMensajesContacto();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchMensajesContacto]);

  useEffect(() => {
    fetchMensajesContacto();
  }, [fetchMensajesContacto]);

  return {
    mensajesContacto,
    loading,
    error,
    fetchMensajesContacto,
    getMensajeContactoById,
    createMensajeContacto,
    updateMensajeContacto,
    deleteMensajeContacto
  };
};
