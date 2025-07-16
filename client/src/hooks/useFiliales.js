import { useState, useEffect, useCallback } from 'react';
import { filialesService } from '../services/api';

export const useFiliales = () => {
  const [filiales, setFiliales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiliales = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await filialesService.getAll();
      setFiliales(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar filiales:', err);
    } finally {
      setLoading(false);
    }
  };

  const createFilial = async (filialData) => {
    try {
      const response = await filialesService.create(filialData);
      if (response.success) {
        setFiliales(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear filial');
    } catch (err) {
      console.error('Error al crear filial:', err);
      return { success: false, error: err.message };
    }
  };

  const updateFilial = async (id, filialData) => {
    try {
      const response = await filialesService.update(id, filialData);
      if (response.success) {
        setFiliales(prev =>
          prev.map(filial =>
            filial.id_filial === id ? response.data : filial
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar filial');
    } catch (err) {
      console.error('Error al actualizar filial:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteFilial = async (id) => {
    try {
      const response = await filialesService.delete(id);
      if (response.success) {
        setFiliales(prev => prev.filter(filial => filial.id_filial !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar filial');
    } catch (err) {
      console.error('Error al eliminar filial:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchFiliales();
  }, []);

  return {
    filiales,
    loading,
    error,
    fetchFiliales,
    createFilial,
    updateFilial,
    deleteFilial,
  };
};

export const useFilial = (id) => {
  const [filial, setFilial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFilial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await filialesService.getById(id);
      setFilial(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar filial:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchFilial();
    }
  }, [id, fetchFilial]);

  return {
    filial,
    loading,
    error,
    refetch: fetchFilial,
  };
};
