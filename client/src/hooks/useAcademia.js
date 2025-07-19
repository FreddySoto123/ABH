import { useState, useEffect } from 'react';
import { academiaService } from '../services/api';

const useAcademia = () => {
  const [academiaData, setAcademiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAcademiaInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaService.getInfo();
      if (response && response.data) {
        const sanitizedData = {
          telefono_academia: String(response.data.telefono_academia || '(+591) 65164240'),
          email_academia: String(response.data.email_academia || 'info@academiahistoriamilitar.com'),
          horario_academia: String(response.data.horario_academia || '09:00 a 12:00'),
          nombre_academia: String(response.data.nombre_academia || 'Academia Boliviana de Historia Militar'),
          mision_academia: response.data.mision_academia ? String(response.data.mision_academia) : null
        };
        setAcademiaData(sanitizedData);
      } else {
        setAcademiaData({
          telefono_academia: '(+591) 65164240',
          email_academia: 'info@academiahistoriamilitar.com',
          horario_academia: '09:00 a 12:00',
          nombre_academia: 'Academia Boliviana de Historia Militar'
        });
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener información de la academia:', err);

      setAcademiaData({
        telefono_academia: '(+591) 65164240',
        email_academia: 'info@academiahistoriamilitar.com',
        horario_academia: '09:00 a 12:00',
        nombre_academia: 'Academia Boliviana de Historia Militar'
      });
    } finally {
      setLoading(false);
    }
  };

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
    refetchAcademiaInfo: fetchAcademiaInfo, 
  };
};

export default useAcademia;