import { pool } from "../db.js";

export const getTiposPersona = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Persona ORDER BY nombre_tipo_persona');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener tipos de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de persona',
      message: error.message
    });
  }
};

export const getTipoPersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de persona inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Tipo_Persona WHERE id_tipo_persona = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de persona no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener tipo de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipo de persona',
      message: error.message
    });
  }
};

export const createTipoPersona = async (req, res) => {
  try {
    const { nombre_tipo_persona } = req.body;

    if (!nombre_tipo_persona) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de persona es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = ?', [nombre_tipo_persona]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de persona con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Tipo_Persona (nombre_tipo_persona) VALUES (?)',
      [nombre_tipo_persona]
    );

    const [newTipoPersona] = await pool.query('SELECT * FROM Tipo_Persona WHERE id_tipo_persona = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Tipo de persona creado exitosamente',
      data: newTipoPersona[0]
    });
  } catch (error) {
    console.error('Error al crear tipo de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear tipo de persona',
      message: error.message
    });
  }
};

export const updateTipoPersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo_persona } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de persona inválido'
      });
    }

    if (!nombre_tipo_persona) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de persona es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE id_tipo_persona = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de persona no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE nombre_tipo_persona = ? AND id_tipo_persona != ?', [nombre_tipo_persona, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de persona con este nombre'
      });
    }

    await pool.query(
      'UPDATE Tipo_Persona SET nombre_tipo_persona = ? WHERE id_tipo_persona = ?',
      [nombre_tipo_persona, id]
    );

    const [updatedTipoPersona] = await pool.query('SELECT * FROM Tipo_Persona WHERE id_tipo_persona = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de persona actualizado exitosamente',
      data: updatedTipoPersona[0]
    });
  } catch (error) {
    console.error('Error al actualizar tipo de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de persona',
      message: error.message
    });
  }
};

export const deleteTipoPersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de persona inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE id_tipo_persona = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de persona no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Persona WHERE id_tipo_persona = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el tipo de persona porque tiene personas asociadas'
      });
    }

    await pool.query('DELETE FROM Tipo_Persona WHERE id_tipo_persona = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de persona eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar tipo de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar tipo de persona',
      message: error.message
    });
  }
};
