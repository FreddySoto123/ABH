import { useState, useEffect, useCallback } from 'react';
import { cargosService } from '../services/api';

export const useCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCargos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cargosService.getAll();
      setCargos(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar cargos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCargo = async (cargoData) => {
    try {
      const response = await cargosService.create(cargoData);
      if (response.success) {
        setCargos(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear cargo');
    } catch (err) {
      console.error('Error al crear cargo:', err);
      return { success: false, error: err.message };
    }
  };

  const updateCargo = async (id, cargoData) => {
    try {
      const response = await cargosService.update(id, cargoData);
      if (response.success) {
        setCargos(prev => 
          prev.map(cargo => 
            cargo.id_cargo === id ? response.data : cargo
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar cargo');
    } catch (err) {
      console.error('Error al actualizar cargo:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCargo = async (id) => {
    try {
      const response = await cargosService.delete(id);
      if (response.success) {
        setCargos(prev => 
          prev.filter(cargo => 
            cargo.id_cargo !== id
          )
        );
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar cargo');
    } catch (err) {
      console.error('Error al eliminar cargo:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCargos();
  }, [fetchCargos]);

  return {
    cargos,
    loading,
    error,
    fetchCargos,
    createCargo,
    updateCargo,
    deleteCargo,
  };
};

export const useCargo = (id) => {
  const [cargo, setCargo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCargo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await cargosService.getById(id);
      setCargo(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar cargo:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchCargo();
    }
  }, [id, fetchCargo]);

  return {
    cargo,
    loading,
    error,
    refetch: fetchCargo,
  };
};
