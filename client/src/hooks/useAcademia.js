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

      // Verificar si la respuesta tiene datos válidos
      if (response && response.data) {
        // Ensure all fields are strings to prevent React #130 error
        const sanitizedData = {
          telefono_academia: String(response.data.telefono_academia || '(+591) 65164240'),
          email_academia: String(response.data.email_academia || 'info@academiahistoriamilitar.com'),
          horario_academia: String(response.data.horario_academia || '09:00 a 12:00'),
          nombre_academia: String(response.data.nombre_academia || 'Academia Boliviana de Historia Militar'),
          mision_academia: response.data.mision_academia ? String(response.data.mision_academia) : null
        };
        setAcademiaData(sanitizedData);
      } else {
        // Si no hay datos, establecer datos por defecto
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

      // En caso de error, establecer datos por defecto
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