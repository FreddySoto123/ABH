import { pool } from "../db.js";

export const getTiposActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Actividad ORDER BY nombre_tipo_actividad');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener tipos de actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de actividad',
      message: error.message
    });
  }
};

export const getTipoActividad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de actividad inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de actividad no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener tipo de actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipo de actividad',
      message: error.message
    });
  }
};

export const createTipoActividad = async (req, res) => {
  try {
    const { nombre_tipo_actividad } = req.body;

    if (!nombre_tipo_actividad) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de actividad es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE nombre_tipo_actividad = ?', [nombre_tipo_actividad]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de actividad con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Tipo_Actividad (nombre_tipo_actividad) VALUES (?)',
      [nombre_tipo_actividad]
    );

    const [newTipoActividad] = await pool.query('SELECT * FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Tipo de actividad creado exitosamente',
      data: newTipoActividad[0]
    });
  } catch (error) {
    console.error('Error al crear tipo de actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear tipo de actividad',
      message: error.message
    });
  }
};

export const updateTipoActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo_actividad } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de actividad inválido'
      });
    }

    if (!nombre_tipo_actividad) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de actividad es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de actividad no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE nombre_tipo_actividad = ? AND id_tipo_actividad != ?', [nombre_tipo_actividad, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de actividad con este nombre'
      });
    }

    await pool.query(
      'UPDATE Tipo_Actividad SET nombre_tipo_actividad = ? WHERE id_tipo_actividad = ?',
      [nombre_tipo_actividad, id]
    );

    const [updatedTipoActividad] = await pool.query('SELECT * FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de actividad actualizado exitosamente',
      data: updatedTipoActividad[0]
    });
  } catch (error) {
    console.error('Error al actualizar tipo de actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de actividad',
      message: error.message
    });
  }
};

export const deleteTipoActividad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de actividad inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de actividad no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Actividad WHERE id_tipo_actividad = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el tipo de actividad porque tiene actividades asociadas'
      });
    }

    await pool.query('DELETE FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de actividad eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar tipo de actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar tipo de actividad',
      message: error.message
    });
  }
};
