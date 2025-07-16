import { pool } from "../db.js";

export const getRecorridosVirtuales = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        rv.id_recorrido_virtual,
        rv.imagen_url_recorrido_virtual,
        rv.titulo_recorrido_virtual,
        rv.descripcion_recorrido_virtual
      FROM Recorrido_virtual rv
      ORDER BY rv.titulo_recorrido_virtual
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener recorridos virtuales:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener recorridos virtuales',
      message: error.message
    });
  }
};

export const getRecorridoVirtual = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de recorrido virtual inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        rv.id_recorrido_virtual,
        rv.imagen_url_recorrido_virtual,
        rv.titulo_recorrido_virtual,
        rv.descripcion_recorrido_virtual
      FROM Recorrido_virtual rv
      WHERE rv.id_recorrido_virtual = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recorrido virtual no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener recorrido virtual:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener recorrido virtual',
      message: error.message
    });
  }
};

export const createRecorridoVirtual = async (req, res) => {
  try {
    const { 
      imagen_url_recorrido_virtual, 
      titulo_recorrido_virtual, 
      descripcion_recorrido_virtual 
    } = req.body;

    if (!titulo_recorrido_virtual) {
      return res.status(400).json({
        success: false,
        error: 'El título del recorrido virtual es requerido'
      });
    }

    const result = await pool.query(
      'INSERT INTO Recorrido_virtual (imagen_url_recorrido_virtual, titulo_recorrido_virtual, descripcion_recorrido_virtual) VALUES (?, ?, ?)',
      [imagen_url_recorrido_virtual || null, titulo_recorrido_virtual, descripcion_recorrido_virtual || null]
    );

    const [newRecorrido] = await pool.query(`
      SELECT 
        rv.id_recorrido_virtual,
        rv.imagen_url_recorrido_virtual,
        rv.titulo_recorrido_virtual,
        rv.descripcion_recorrido_virtual
      FROM Recorrido_virtual rv
      WHERE rv.id_recorrido_virtual = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Recorrido virtual creado exitosamente',
      data: newRecorrido[0]
    });
  } catch (error) {
    console.error('Error al crear recorrido virtual:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear recorrido virtual',
      message: error.message
    });
  }
};

export const updateRecorridoVirtual = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      imagen_url_recorrido_virtual, 
      titulo_recorrido_virtual, 
      descripcion_recorrido_virtual 
    } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de recorrido virtual inválido'
      });
    }

    const [recorridoExists] = await pool.query('SELECT id_recorrido_virtual FROM Recorrido_virtual WHERE id_recorrido_virtual = ?', [id]);
    if (recorridoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recorrido virtual no encontrado'
      });
    }

    if (!titulo_recorrido_virtual) {
      return res.status(400).json({
        success: false,
        error: 'El título del recorrido virtual es requerido'
      });
    }

    await pool.query(
      'UPDATE Recorrido_virtual SET imagen_url_recorrido_virtual = ?, titulo_recorrido_virtual = ?, descripcion_recorrido_virtual = ? WHERE id_recorrido_virtual = ?',
      [imagen_url_recorrido_virtual || null, titulo_recorrido_virtual, descripcion_recorrido_virtual || null, id]
    );

    const [updatedRecorrido] = await pool.query(`
      SELECT 
        rv.id_recorrido_virtual,
        rv.imagen_url_recorrido_virtual,
        rv.titulo_recorrido_virtual,
        rv.descripcion_recorrido_virtual
      FROM Recorrido_virtual rv
      WHERE rv.id_recorrido_virtual = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Recorrido virtual actualizado exitosamente',
      data: updatedRecorrido[0]
    });
  } catch (error) {
    console.error('Error al actualizar recorrido virtual:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar recorrido virtual',
      message: error.message
    });
  }
};

export const deleteRecorridoVirtual = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de recorrido virtual inválido'
      });
    }

    const [recorridoExists] = await pool.query('SELECT id_recorrido_virtual FROM Recorrido_virtual WHERE id_recorrido_virtual = ?', [id]);
    if (recorridoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Recorrido virtual no encontrado'
      });
    }

    await pool.query('DELETE FROM Recorrido_virtual WHERE id_recorrido_virtual = ?', [id]);

    res.json({
      success: true,
      message: 'Recorrido virtual eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar recorrido virtual:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar recorrido virtual',
      message: error.message
    });
  }
};
