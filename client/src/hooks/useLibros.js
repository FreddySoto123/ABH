import { useState, useEffect, useCallback } from 'react';
import { librosService } from '../services/api';

export const useLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLibros = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await librosService.getAll();
      setLibros(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar libros:', err);
    } finally {
      setLoading(false);
    }
  };

  const createLibro = async (libroData) => {
    try {
      const response = await librosService.create(libroData);
      if (response.success) {
        setLibros(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear libro');
    } catch (err) {
      console.error('Error al crear libro:', err);
      return { success: false, error: err.message };
    }
  };

  const updateLibro = async (id, libroData) => {
    try {
      const response = await librosService.update(id, libroData);
      if (response.success) {
        setLibros(prev =>
          prev.map(libro =>
            libro.id_libro === id ? response.data : libro
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar libro');
    } catch (err) {
      console.error('Error al actualizar libro:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteLibro = async (id) => {
    try {
      const response = await librosService.delete(id);
      if (response.success) {
        setLibros(prev => prev.filter(libro => libro.id_libro !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar libro');
    } catch (err) {
      console.error('Error al eliminar libro:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return {
    libros,
    loading,
    error,
    fetchLibros,
    createLibro,
    updateLibro,
    deleteLibro,
  };
};

export const useLibro = (id) => {
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLibro = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await librosService.getById(id);
      setLibro(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar libro:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLibro();
    }
  }, [id, fetchLibro]);

  return {
    libro,
    loading,
    error,
    refetch: fetchLibro,
  };
};
