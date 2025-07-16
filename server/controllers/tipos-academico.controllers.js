import { pool } from "../db.js";

export const getTiposAcademico = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Academico ORDER BY nombre_tipo_academico');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener tipos académicos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos académicos',
      message: error.message
    });
  }
};

export const getTipoAcademico = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo académico inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Tipo_Academico WHERE id_tipo_academico = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo académico no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener tipo académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipo académico',
      message: error.message
    });
  }
};

export const createTipoAcademico = async (req, res) => {
  try {
    const { nombre_tipo_academico } = req.body;

    if (!nombre_tipo_academico) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo académico es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = ?', [nombre_tipo_academico]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo académico con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Tipo_Academico (nombre_tipo_academico) VALUES (?)',
      [nombre_tipo_academico]
    );

    const [newTipoAcademico] = await pool.query('SELECT * FROM Tipo_Academico WHERE id_tipo_academico = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Tipo académico creado exitosamente',
      data: newTipoAcademico[0]
    });
  } catch (error) {
    console.error('Error al crear tipo académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear tipo académico',
      message: error.message
    });
  }
};

export const updateTipoAcademico = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo_academico } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo académico inválido'
      });
    }

    if (!nombre_tipo_academico) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo académico es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE id_tipo_academico = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo académico no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE nombre_tipo_academico = ? AND id_tipo_academico != ?', [nombre_tipo_academico, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo académico con este nombre'
      });
    }

    await pool.query(
      'UPDATE Tipo_Academico SET nombre_tipo_academico = ? WHERE id_tipo_academico = ?',
      [nombre_tipo_academico, id]
    );

    const [updatedTipoAcademico] = await pool.query('SELECT * FROM Tipo_Academico WHERE id_tipo_academico = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo académico actualizado exitosamente',
      data: updatedTipoAcademico[0]
    });
  } catch (error) {
    console.error('Error al actualizar tipo académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo académico',
      message: error.message
    });
  }
};

export const deleteTipoAcademico = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo académico inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE id_tipo_academico = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo académico no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Academico WHERE id_tipo_academico = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el tipo académico porque tiene académicos asociados'
      });
    }

    await pool.query('DELETE FROM Tipo_Academico WHERE id_tipo_academico = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo académico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar tipo académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar tipo académico',
      message: error.message
    });
  }
};
