import { pool } from "../db.js";

export const getFiliales = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        f.id_filial,
        f.nombre_filial,
        f.descripcion_filial,
        a.nombre_academia
      FROM Filial f
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      ORDER BY f.nombre_filial
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener filiales:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener filiales',
      message: error.message
    });
  }
};

export const getFilial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de filial inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        f.id_filial,
        f.id_academia,
        f.nombre_filial,
        f.descripcion_filial,
        a.nombre_academia
      FROM Filial f
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      WHERE f.id_filial = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Filial no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener filial:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener filial',
      message: error.message
    });
  }
};

export const createFilial = async (req, res) => {
  try {
    const { id_academia, nombre_filial, descripcion_filial } = req.body;

    if (!nombre_filial) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de la filial es requerido'
      });
    }

    if (id_academia) {
      const [academiaExists] = await pool.query('SELECT id_academia FROM Academia WHERE id_academia = ?', [id_academia]);
      if (academiaExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La academia especificada no existe'
        });
      }
    }

    const result = await pool.query(
      'INSERT INTO Filial (id_academia, nombre_filial, descripcion_filial) VALUES (?, ?, ?)',
      [id_academia || null, nombre_filial, descripcion_filial || null]
    );

    const [newFilial] = await pool.query(`
      SELECT 
        f.id_filial,
        f.id_academia,
        f.nombre_filial,
        f.descripcion_filial,
        a.nombre_academia
      FROM Filial f
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      WHERE f.id_filial = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Filial creada exitosamente',
      data: newFilial[0]
    });
  } catch (error) {
    console.error('Error al crear filial:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear filial',
      message: error.message
    });
  }
};

export const updateFilial = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_academia, nombre_filial, descripcion_filial } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de filial inválido'
      });
    }

    const [filialExists] = await pool.query('SELECT id_filial FROM Filial WHERE id_filial = ?', [id]);
    if (filialExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Filial no encontrada'
      });
    }

    if (!nombre_filial) {
      return res.status(400).json({
        success: false,
        error: 'El nombre de la filial es requerido'
      });
    }

    if (id_academia) {
      const [academiaExists] = await pool.query('SELECT id_academia FROM Academia WHERE id_academia = ?', [id_academia]);
      if (academiaExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La academia especificada no existe'
        });
      }
    }

    await pool.query(
      'UPDATE Filial SET id_academia = ?, nombre_filial = ?, descripcion_filial = ? WHERE id_filial = ?',
      [id_academia || null, nombre_filial, descripcion_filial || null, id]
    );

    const [updatedFilial] = await pool.query(`
      SELECT 
        f.id_filial,
        f.id_academia,
        f.nombre_filial,
        f.descripcion_filial,
        a.nombre_academia
      FROM Filial f
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      WHERE f.id_filial = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Filial actualizada exitosamente',
      data: updatedFilial[0]
    });
  } catch (error) {
    console.error('Error al actualizar filial:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar filial',
      message: error.message
    });
  }
};

export const deleteFilial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de filial inválido'
      });
    }

    const [filialExists] = await pool.query('SELECT id_filial FROM Filial WHERE id_filial = ?', [id]);
    if (filialExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Filial no encontrada'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Directiva WHERE id_filial = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar la filial porque tiene directivas asociadas'
      });
    }

    await pool.query('DELETE FROM Filial WHERE id_filial = ?', [id]);

    res.json({
      success: true,
      message: 'Filial eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar filial:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar filial',
      message: error.message
    });
  }
};
