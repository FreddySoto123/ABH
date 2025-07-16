import { pool } from "../db.js";

export const getRedesSociales = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        rs.id_red_social,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Red_Social rs
      ORDER BY rs.nombre_red_social
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener redes sociales:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener redes sociales',
      message: error.message
    });
  }
};

export const getRedSocial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de red social inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        rs.id_red_social,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Red_Social rs
      WHERE rs.id_red_social = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Red social no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener red social',
      message: error.message
    });
  }
};

export const createRedSocial = async (req, res) => {
  try {
    const { nombre_red_social, direccion_url_red_social } = req.body;

    if (!nombre_red_social || !direccion_url_red_social) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y URL de la red social son requeridos'
      });
    }

    const result = await pool.query(
      'INSERT INTO Red_Social (nombre_red_social, direccion_url_red_social) VALUES (?, ?)',
      [nombre_red_social, direccion_url_red_social]
    );

    const [newRedSocial] = await pool.query(`
      SELECT 
        rs.id_red_social,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Red_Social rs
      WHERE rs.id_red_social = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Red social creada exitosamente',
      data: newRedSocial[0]
    });
  } catch (error) {
    console.error('Error al crear red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear red social',
      message: error.message
    });
  }
};

export const updateRedSocial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_red_social, direccion_url_red_social } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de red social inválido'
      });
    }

    const [redSocialExists] = await pool.query('SELECT id_red_social FROM Red_Social WHERE id_red_social = ?', [id]);
    if (redSocialExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Red social no encontrada'
      });
    }

    if (!nombre_red_social || !direccion_url_red_social) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y URL de la red social son requeridos'
      });
    }

    await pool.query(
      'UPDATE Red_Social SET nombre_red_social = ?, direccion_url_red_social = ? WHERE id_red_social = ?',
      [nombre_red_social, direccion_url_red_social, id]
    );

    const [updatedRedSocial] = await pool.query(`
      SELECT 
        rs.id_red_social,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Red_Social rs
      WHERE rs.id_red_social = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Red social actualizada exitosamente',
      data: updatedRedSocial[0]
    });
  } catch (error) {
    console.error('Error al actualizar red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar red social',
      message: error.message
    });
  }
};

export const deleteRedSocial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de red social inválido'
      });
    }

    const [redSocialExists] = await pool.query('SELECT id_red_social FROM Red_Social WHERE id_red_social = ?', [id]);
    if (redSocialExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Red social no encontrada'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Academia_Red_Social WHERE id_red_social = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar la red social porque está asociada a una academia'
      });
    }

    await pool.query('DELETE FROM Red_Social WHERE id_red_social = ?', [id]);

    res.json({
      success: true,
      message: 'Red social eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar red social',
      message: error.message
    });
  }
};

export const getAcademiaRedesSociales = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ars.id_academia,
        ars.id_red_social,
        a.nombre_academia,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Academia_Red_Social ars
      LEFT JOIN Academia a ON ars.id_academia = a.id_academia
      LEFT JOIN Red_Social rs ON ars.id_red_social = rs.id_red_social
      ORDER BY a.nombre_academia, rs.nombre_red_social
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener redes sociales de academia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener redes sociales de academia',
      message: error.message
    });
  }
};

export const createAcademiaRedSocial = async (req, res) => {
  try {
    const { id_academia, id_red_social } = req.body;

    if (!id_academia || !id_red_social) {
      return res.status(400).json({
        success: false,
        error: 'ID de academia y red social son requeridos'
      });
    }

    const [academiaExists] = await pool.query('SELECT id_academia FROM Academia WHERE id_academia = ?', [id_academia]);
    if (academiaExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La academia especificada no existe'
      });
    }

    const [redSocialExists] = await pool.query('SELECT id_red_social FROM Red_Social WHERE id_red_social = ?', [id_red_social]);
    if (redSocialExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La red social especificada no existe'
      });
    }

    const [relationExists] = await pool.query('SELECT * FROM Academia_Red_Social WHERE id_academia = ? AND id_red_social = ?', [id_academia, id_red_social]);
    if (relationExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Esta relación ya existe'
      });
    }

    await pool.query(
      'INSERT INTO Academia_Red_Social (id_academia, id_red_social) VALUES (?, ?)',
      [id_academia, id_red_social]
    );

    const [newRelation] = await pool.query(`
      SELECT 
        ars.id_academia,
        ars.id_red_social,
        a.nombre_academia,
        rs.nombre_red_social,
        rs.direccion_url_red_social
      FROM Academia_Red_Social ars
      LEFT JOIN Academia a ON ars.id_academia = a.id_academia
      LEFT JOIN Red_Social rs ON ars.id_red_social = rs.id_red_social
      WHERE ars.id_academia = ? AND ars.id_red_social = ?
    `, [id_academia, id_red_social]);

    res.status(201).json({
      success: true,
      message: 'Relación academia-red social creada exitosamente',
      data: newRelation[0]
    });
  } catch (error) {
    console.error('Error al crear relación academia-red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear relación academia-red social',
      message: error.message
    });
  }
};

export const deleteAcademiaRedSocial = async (req, res) => {
  try {
    const { id_academia, id_red_social } = req.params;

    if (!id_academia || !id_red_social) {
      return res.status(400).json({
        success: false,
        error: 'ID de academia y red social son requeridos'
      });
    }

    const [relationExists] = await pool.query('SELECT * FROM Academia_Red_Social WHERE id_academia = ? AND id_red_social = ?', [id_academia, id_red_social]);
    if (relationExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Relación no encontrada'
      });
    }

    await pool.query('DELETE FROM Academia_Red_Social WHERE id_academia = ? AND id_red_social = ?', [id_academia, id_red_social]);

    res.json({
      success: true,
      message: 'Relación academia-red social eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar relación academia-red social:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar relación academia-red social',
      message: error.message
    });
  }
};
