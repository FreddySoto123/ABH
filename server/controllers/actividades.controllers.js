import { pool } from "../db.js";

export const getActividades = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.id_actividad,
        a.titulo_actividad,
        a.descripcion_actividad,
        a.fecha_actividad,
        a.imagen_url_actividad,
        ta.nombre_tipo_actividad
      FROM Actividad a
      LEFT JOIN Tipo_Actividad ta ON a.id_tipo_actividad = ta.id_tipo_actividad
      ORDER BY a.fecha_actividad DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener actividades',
      message: error.message
    });
  }
};

export const getActividad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de actividad inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        a.id_actividad,
        a.id_tipo_actividad,
        a.titulo_actividad,
        a.descripcion_actividad,
        a.fecha_actividad,
        a.imagen_url_actividad,
        ta.nombre_tipo_actividad
      FROM Actividad a
      LEFT JOIN Tipo_Actividad ta ON a.id_tipo_actividad = ta.id_tipo_actividad
      WHERE a.id_actividad = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Actividad no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener actividad',
      message: error.message
    });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { 
      id_tipo_actividad, 
      titulo_actividad, 
      descripcion_actividad, 
      fecha_actividad, 
      imagen_url_actividad 
    } = req.body;

    if (!titulo_actividad) {
      return res.status(400).json({
        success: false,
        error: 'El título de la actividad es requerido'
      });
    }

    if (id_tipo_actividad) {
      const [tipoExists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id_tipo_actividad]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de actividad especificado no existe'
        });
      }
    }

    const result = await pool.query(
      'INSERT INTO Actividad (id_tipo_actividad, titulo_actividad, descripcion_actividad, fecha_actividad, imagen_url_actividad) VALUES (?, ?, ?, ?, ?)',
      [
        id_tipo_actividad || null,
        titulo_actividad,
        descripcion_actividad || null,
        fecha_actividad || null,
        imagen_url_actividad || null
      ]
    );

    const [newActividad] = await pool.query(`
      SELECT 
        a.id_actividad,
        a.id_tipo_actividad,
        a.titulo_actividad,
        a.descripcion_actividad,
        a.fecha_actividad,
        a.imagen_url_actividad,
        ta.nombre_tipo_actividad
      FROM Actividad a
      LEFT JOIN Tipo_Actividad ta ON a.id_tipo_actividad = ta.id_tipo_actividad
      WHERE a.id_actividad = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Actividad creada exitosamente',
      data: newActividad[0]
    });
  } catch (error) {
    console.error('Error al crear actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear actividad',
      message: error.message
    });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      id_tipo_actividad, 
      titulo_actividad, 
      descripcion_actividad, 
      fecha_actividad, 
      imagen_url_actividad 
    } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de actividad inválido'
      });
    }

    const [actividadExists] = await pool.query('SELECT id_actividad FROM Actividad WHERE id_actividad = ?', [id]);
    if (actividadExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Actividad no encontrada'
      });
    }

    if (!titulo_actividad) {
      return res.status(400).json({
        success: false,
        error: 'El título de la actividad es requerido'
      });
    }

    if (id_tipo_actividad) {
      const [tipoExists] = await pool.query('SELECT id_tipo_actividad FROM Tipo_Actividad WHERE id_tipo_actividad = ?', [id_tipo_actividad]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de actividad especificado no existe'
        });
      }
    }

    await pool.query(
      'UPDATE Actividad SET id_tipo_actividad = ?, titulo_actividad = ?, descripcion_actividad = ?, fecha_actividad = ?, imagen_url_actividad = ? WHERE id_actividad = ?',
      [
        id_tipo_actividad || null,
        titulo_actividad,
        descripcion_actividad || null,
        fecha_actividad || null,
        imagen_url_actividad || null,
        id
      ]
    );

    const [updatedActividad] = await pool.query(`
      SELECT 
        a.id_actividad,
        a.id_tipo_actividad,
        a.titulo_actividad,
        a.descripcion_actividad,
        a.fecha_actividad,
        a.imagen_url_actividad,
        ta.nombre_tipo_actividad
      FROM Actividad a
      LEFT JOIN Tipo_Actividad ta ON a.id_tipo_actividad = ta.id_tipo_actividad
      WHERE a.id_actividad = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Actividad actualizada exitosamente',
      data: updatedActividad[0]
    });
  } catch (error) {
    console.error('Error al actualizar actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar actividad',
      message: error.message
    });
  }
};

export const deleteActividad = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de actividad inválido'
      });
    }

    const [actividadExists] = await pool.query('SELECT id_actividad FROM Actividad WHERE id_actividad = ?', [id]);
    if (actividadExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Actividad no encontrada'
      });
    }

    await pool.query('DELETE FROM Actividad WHERE id_actividad = ?', [id]);

    res.json({
      success: true,
      message: 'Actividad eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar actividad:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar actividad',
      message: error.message
    });
  }
};

export const getTiposActividad = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Actividad ORDER BY nombre_tipo_actividad');
    res.json({
      success: true,
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
