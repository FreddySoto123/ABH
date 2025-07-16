import { useState, useEffect, useCallback } from 'react';
import { documentosService } from '../services/api';

export const useDocumentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocumentos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentosService.getAll();
      setDocumentos(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar documentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createDocumento = async (documentoData) => {
    try {
      const response = await documentosService.create(documentoData);
      if (response.success) {
        setDocumentos(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear documento');
    } catch (err) {
      console.error('Error al crear documento:', err);
      return { success: false, error: err.message };
    }
  };

  const updateDocumento = async (id, documentoData) => {
    try {
      const response = await documentosService.update(id, documentoData);
      if (response.success) {
        setDocumentos(prev =>
          prev.map(documento =>
            documento.id_documento === id ? response.data : documento
          )
        );
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al actualizar documento');
    } catch (err) {
      console.error('Error al actualizar documento:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteDocumento = async (id) => {
    try {
      const response = await documentosService.delete(id);
      if (response.success) {
        setDocumentos(prev => prev.filter(documento => documento.id_documento !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar documento');
    } catch (err) {
      console.error('Error al eliminar documento:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  return {
    documentos,
    loading,
    error,
    fetchDocumentos,
    createDocumento,
    updateDocumento,
    deleteDocumento,
  };
};

export const useDocumento = (id) => {
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDocumento = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentosService.getById(id);
      setDocumento(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar documento:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchDocumento();
    }
  }, [id, fetchDocumento]);

  return {
    documento,
    loading,
    error,
    refetch: fetchDocumento,
  };
};

export const useTiposDocumento = () => {
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTiposDocumento = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await documentosService.getTiposDocumento();
      setTiposDocumento(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar tipos de documento:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiposDocumento();
  }, []);

  return {
    tiposDocumento,
    loading,
    error,
    refetch: fetchTiposDocumento,
  };
};
