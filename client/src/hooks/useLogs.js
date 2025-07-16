import { useState, useEffect, useCallback } from 'react';
import { logsService } from '../services/api';

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await logsService.getAll();
      setLogs(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar logs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createLog = async (logData) => {
    try {
      const response = await logsService.create(logData);
      if (response.success) {
        setLogs(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      throw new Error(response.error || 'Error al crear log');
    } catch (err) {
      console.error('Error al crear log:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteLog = async (id) => {
    try {
      const response = await logsService.delete(id);
      if (response.success) {
        setLogs(prev => prev.filter(log => log.id_log !== id));
        return { success: true };
      }
      throw new Error(response.error || 'Error al eliminar log');
    } catch (err) {
      console.error('Error al eliminar log:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return {
    logs,
    loading,
    error,
    fetchLogs,
    createLog,
    deleteLog,
  };
};

export const useLog = (id) => {
  const [log, setLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await logsService.getById(id);
      setLog(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar log:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchLog();
    }
  }, [id, fetchLog]);

  return {
    log,
    loading,
    error,
    refetch: fetchLog,
  };
};

export const useLogsByPersona = (id_persona) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogsByPersona = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await logsService.getByPersona(id_persona);
      setLogs(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar logs por persona:', err);
    } finally {
      setLoading(false);
    }
  }, [id_persona]);

  useEffect(() => {
    if (id_persona) {
      fetchLogsByPersona();
    }
  }, [id_persona, fetchLogsByPersona]);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogsByPersona,
  };
};

export const useLogsByTabla = (tabla) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogsByTabla = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await logsService.getByTabla(tabla);
      setLogs(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar logs por tabla:', err);
    } finally {
      setLoading(false);
    }
  }, [tabla]);

  useEffect(() => {
    if (tabla) {
      fetchLogsByTabla();
    }
  }, [tabla, fetchLogsByTabla]);

  return {
    logs,
    loading,
    error,
    refetch: fetchLogsByTabla,
  };
};
