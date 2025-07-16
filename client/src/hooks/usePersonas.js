import { useState, useEffect } from 'react';
import { personasService } from '../services/api';

export const usePersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todas las personas
  const fetchPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await personasService.getAll();
      setPersonas(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar personas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva persona
  const createPersona = async (personaData) => {
    try {
      const response = await personasService.create(personaData);
      if (response.success) {
        setPersonas(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear persona');
    } catch (err) {
      console.error('Error al crear persona:', err);
      return { success: false, error: err.message };
    }
  };

  // Actualizar una persona
  const updatePersona = async (id, personaData) => {
    try {
      const response = await personasService.update(id, personaData);
      if (response.success) {
        setPersonas(prev =>
          prev.map(persona =>
            persona.id_persona === id ? response.data : persona
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar persona');
    } catch (err) {
      console.error('Error al actualizar persona:', err);
      return { success: false, error: err.message };
    }
  };

  // Eliminar una persona
  const deletePersona = async (id) => {
    try {
      const response = await personasService.delete(id);
      if (response.success) {
        setPersonas(prev => prev.filter(persona => persona.id_persona !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar persona');
    } catch (err) {
      console.error('Error al eliminar persona:', err);
      return { success: false, error: err.message };
    }
  };

  // Cargar personas al montar el componente
  useEffect(() => {
    fetchPersonas();
  }, []);

  return {
    personas,
    loading,
    error,
    fetchPersonas,
    createPersona,
    updatePersona,
    deletePersona,
  };
};

export const useGradosYTipos = () => {
  const [grados, setGrados] = useState([]);
  const [tiposPersona, setTiposPersona] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGradosYTipos = async () => {
    try {
      setLoading(true);
      setError(null);

      const [gradosResponse, tiposResponse] = await Promise.all([
        personasService.getGrados(),
        personasService.getTiposPersona(),
      ]);

      setGrados(gradosResponse.data || []);
      setTiposPersona(tiposResponse.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar grados y tipos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGradosYTipos();
  }, []);

  return {
    grados,
    tiposPersona,
    loading,
    error,
    refetch: fetchGradosYTipos,
  };
};
