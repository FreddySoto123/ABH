import { pool } from "../db.js";

export const getGradosPersona = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Grado_Persona ORDER BY nombre_grado_persona');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener grados de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener grados de persona',
      message: error.message
    });
  }
};

export const getGradoPersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de grado de persona inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Grado_Persona WHERE id_grado_persona = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Grado de persona no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener grado de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener grado de persona',
      message: error.message
    });
  }
};

export const createGradoPersona = async (req, res) => {
  try {
    const { nombre_grado_persona, acronimo_grado_persona } = req.body;

    if (!nombre_grado_persona) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del grado de persona es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE nombre_grado_persona = ?', [nombre_grado_persona]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un grado de persona con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Grado_Persona (nombre_grado_persona, acronimo_grado_persona) VALUES (?, ?)',
      [nombre_grado_persona, acronimo_grado_persona || null]
    );

    const [newGradoPersona] = await pool.query('SELECT * FROM Grado_Persona WHERE id_grado_persona = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Grado de persona creado exitosamente',
      data: newGradoPersona[0]
    });
  } catch (error) {
    console.error('Error al crear grado de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear grado de persona',
      message: error.message
    });
  }
};

export const updateGradoPersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_grado_persona, acronimo_grado_persona } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de grado de persona inválido'
      });
    }

    if (!nombre_grado_persona) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del grado de persona es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE id_grado_persona = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Grado de persona no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE nombre_grado_persona = ? AND id_grado_persona != ?', [nombre_grado_persona, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un grado de persona con este nombre'
      });
    }

    await pool.query(
      'UPDATE Grado_Persona SET nombre_grado_persona = ?, acronimo_grado_persona = ? WHERE id_grado_persona = ?',
      [nombre_grado_persona, acronimo_grado_persona || null, id]
    );

    const [updatedGradoPersona] = await pool.query('SELECT * FROM Grado_Persona WHERE id_grado_persona = ?', [id]);

    res.json({
      success: true,
      message: 'Grado de persona actualizado exitosamente',
      data: updatedGradoPersona[0]
    });
  } catch (error) {
    console.error('Error al actualizar grado de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar grado de persona',
      message: error.message
    });
  }
};

export const deleteGradoPersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de grado de persona inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE id_grado_persona = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Grado de persona no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Persona WHERE id_grado_persona = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el grado de persona porque tiene personas asociadas'
      });
    }

    await pool.query('DELETE FROM Grado_Persona WHERE id_grado_persona = ?', [id]);

    res.json({
      success: true,
      message: 'Grado de persona eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar grado de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar grado de persona',
      message: error.message
    });
  }
};
