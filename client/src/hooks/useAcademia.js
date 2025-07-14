import { useState, useEffect } from 'react';
import { academiaService } from '../services/api';

const useAcademia = () => {
  const [academiaData, setAcademiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar información de la academia
  const fetchAcademiaInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaService.getInfo();
      setAcademiaData(response.data || null);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener información de la academia:', err);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar información de la academia
  const updateAcademiaInfo = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaService.updateInfo(updatedData);
      if (response.success) {
        setAcademiaData(response.data);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar información');
    } catch (err) {
      setError(err.message);
      console.error('Error al actualizar información de la academia:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Crear información de la academia
  const createAcademiaInfo = async (newData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaService.createInfo(newData);
      if (response.success) {
        setAcademiaData(response.data);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear información');
    } catch (err) {
      setError(err.message);
      console.error('Error al crear información de la academia:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchAcademiaInfo();
  }, []);

  return {
    academiaData,
    loading,
    error,
    fetchAcademiaInfo,
    updateAcademiaInfo,
    createAcademiaInfo,
    refetchAcademiaInfo: fetchAcademiaInfo, // Alias para consistencia
  };
};

export default useAcademia;