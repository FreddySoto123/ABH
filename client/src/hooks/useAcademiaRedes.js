import { useState, useEffect, useCallback } from 'react';
import { academiaRedesService } from '../services/api';

export const useAcademiaRedes = () => {
  const [academiaRedes, setAcademiaRedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAcademiaRedes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaRedesService.getAll();
      setAcademiaRedes(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar relaciones academia-redes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAcademiaRed = async (academiaRedData) => {
    try {
      const response = await academiaRedesService.create(academiaRedData);
      if (response.success) {
        setAcademiaRedes(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear relación academia-red');
    } catch (err) {
      console.error('Error al crear relación academia-red:', err);
      return { success: false, error: err.message };
    }
  };

  const updateAcademiaRed = async (id, academiaRedData) => {
    try {
      const response = await academiaRedesService.update(id, academiaRedData);
      if (response.success) {
        setAcademiaRedes(prev => 
          prev.map(rel => 
            rel.id_academia_red === id ? response.data : rel
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar relación academia-red');
    } catch (err) {
      console.error('Error al actualizar relación academia-red:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteAcademiaRed = async (id) => {
    try {
      const response = await academiaRedesService.delete(id);
      if (response.success) {
        setAcademiaRedes(prev => 
          prev.filter(rel => 
            rel.id_academia_red !== id
          )
        );
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar relación academia-red');
    } catch (err) {
      console.error('Error al eliminar relación academia-red:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchAcademiaRedes();
  }, [fetchAcademiaRedes]);

  return {
    academiaRedes,
    loading,
    error,
    fetchAcademiaRedes,
    createAcademiaRed,
    updateAcademiaRed,
    deleteAcademiaRed,
  };
};

export const useAcademiaRed = (id) => {
  const [academiaRed, setAcademiaRed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAcademiaRed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaRedesService.getById(id);
      setAcademiaRed(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar relación academia-red:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAcademiaRed();
    }
  }, [id, fetchAcademiaRed]);

  return {
    academiaRed,
    loading,
    error,
    refetch: fetchAcademiaRed,
  };
};

// Hook específico para obtener redes sociales por academia
export const useAcademiaRedesByAcademia = (academiaId) => {
  const [redesPorAcademia, setRedesPorAcademia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRedesPorAcademia = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await academiaRedesService.getByAcademia(academiaId);
      setRedesPorAcademia(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar redes por academia:', err);
    } finally {
      setLoading(false);
    }
  }, [academiaId]);

  useEffect(() => {
    if (academiaId) {
      fetchRedesPorAcademia();
    }
  }, [academiaId, fetchRedesPorAcademia]);

  return {
    redesPorAcademia,
    loading,
    error,
    refetch: fetchRedesPorAcademia,
  };
};
