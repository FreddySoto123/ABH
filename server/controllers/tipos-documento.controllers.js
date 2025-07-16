import { pool } from "../db.js";

export const getTiposDocumento = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Documento ORDER BY nombre_tipo_documento');
    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener tipos de documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de documento',
      message: error.message
    });
  }
};

export const getTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de documento inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Tipo_Documento WHERE id_tipo_documento = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de documento no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener tipo de documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipo de documento',
      message: error.message
    });
  }
};

export const createTipoDocumento = async (req, res) => {
  try {
    const { nombre_tipo_documento } = req.body;

    if (!nombre_tipo_documento) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de documento es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = ?', [nombre_tipo_documento]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de documento con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Tipo_Documento (nombre_tipo_documento) VALUES (?)',
      [nombre_tipo_documento]
    );

    const [newTipoDocumento] = await pool.query('SELECT * FROM Tipo_Documento WHERE id_tipo_documento = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Tipo de documento creado exitosamente',
      data: newTipoDocumento[0]
    });
  } catch (error) {
    console.error('Error al crear tipo de documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear tipo de documento',
      message: error.message
    });
  }
};

export const updateTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tipo_documento } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de documento inválido'
      });
    }

    if (!nombre_tipo_documento) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del tipo de documento es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE id_tipo_documento = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de documento no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE nombre_tipo_documento = ? AND id_tipo_documento != ?', [nombre_tipo_documento, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un tipo de documento con este nombre'
      });
    }

    await pool.query(
      'UPDATE Tipo_Documento SET nombre_tipo_documento = ? WHERE id_tipo_documento = ?',
      [nombre_tipo_documento, id]
    );

    const [updatedTipoDocumento] = await pool.query('SELECT * FROM Tipo_Documento WHERE id_tipo_documento = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de documento actualizado exitosamente',
      data: updatedTipoDocumento[0]
    });
  } catch (error) {
    console.error('Error al actualizar tipo de documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar tipo de documento',
      message: error.message
    });
  }
};

export const deleteTipoDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de tipo de documento inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE id_tipo_documento = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Tipo de documento no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Documento WHERE id_tipo_documento = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el tipo de documento porque tiene documentos asociados'
      });
    }

    await pool.query('DELETE FROM Tipo_Documento WHERE id_tipo_documento = ?', [id]);

    res.json({
      success: true,
      message: 'Tipo de documento eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar tipo de documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar tipo de documento',
      message: error.message
    });
  }
};
