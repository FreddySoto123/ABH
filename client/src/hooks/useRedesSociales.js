import { useState, useEffect, useCallback } from 'react';
import { redesSocialesService } from '../services/api';

export const useRedesSociales = () => {
  const [redesSociales, setRedesSociales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRedesSociales = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await redesSocialesService.getAll();
      setRedesSociales(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRedSocialById = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await redesSocialesService.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createRedSocial = useCallback(async (redSocialData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await redesSocialesService.create(redSocialData);
      await fetchRedesSociales();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRedesSociales]);

  const updateRedSocial = useCallback(async (id, redSocialData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await redesSocialesService.update(id, redSocialData);
      await fetchRedesSociales();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRedesSociales]);

  const deleteRedSocial = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await redesSocialesService.delete(id);
      await fetchRedesSociales();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchRedesSociales]);

  useEffect(() => {
    fetchRedesSociales();
  }, [fetchRedesSociales]);

  return {
    redesSociales,
    loading,
    error,
    fetchRedesSociales,
    getRedSocialById,
    createRedSocial,
    updateRedSocial,
    deleteRedSocial
  };
};
