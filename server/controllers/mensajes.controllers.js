import { pool } from "../db.js";

export const getMensajesContacto = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        mc.id_mensaje_contacto,
        mc.fecha_envio_mensaje_contacto,
        mc.mensaje_mensaje_contacto,
        mc.email_remitente_mensaje_contacto,
        mc.nombre_remitente_mensaje_contacto
      FROM Mensaje_Contacto mc
      ORDER BY mc.fecha_envio_mensaje_contacto DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener mensajes de contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener mensajes de contacto',
      message: error.message
    });
  }
};

export const getMensajeContacto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de mensaje inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        mc.id_mensaje_contacto,
        mc.fecha_envio_mensaje_contacto,
        mc.mensaje_mensaje_contacto,
        mc.email_remitente_mensaje_contacto,
        mc.nombre_remitente_mensaje_contacto
      FROM Mensaje_Contacto mc
      WHERE mc.id_mensaje_contacto = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Mensaje de contacto no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener mensaje de contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener mensaje de contacto',
      message: error.message
    });
  }
};

export const createMensajeContacto = async (req, res) => {
  try {
    const { 
      mensaje_mensaje_contacto, 
      email_remitente_mensaje_contacto, 
      nombre_remitente_mensaje_contacto 
    } = req.body;

    if (!mensaje_mensaje_contacto || !email_remitente_mensaje_contacto || !nombre_remitente_mensaje_contacto) {
      return res.status(400).json({
        success: false,
        error: 'Mensaje, email y nombre del remitente son requeridos'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_remitente_mensaje_contacto)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }

    const result = await pool.query(
      'INSERT INTO Mensaje_Contacto (fecha_envio_mensaje_contacto, mensaje_mensaje_contacto, email_remitente_mensaje_contacto, nombre_remitente_mensaje_contacto) VALUES (CURDATE(), ?, ?, ?)',
      [mensaje_mensaje_contacto, email_remitente_mensaje_contacto, nombre_remitente_mensaje_contacto]
    );

    const [newMensaje] = await pool.query(`
      SELECT 
        mc.id_mensaje_contacto,
        mc.fecha_envio_mensaje_contacto,
        mc.mensaje_mensaje_contacto,
        mc.email_remitente_mensaje_contacto,
        mc.nombre_remitente_mensaje_contacto
      FROM Mensaje_Contacto mc
      WHERE mc.id_mensaje_contacto = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Mensaje de contacto creado exitosamente',
      data: newMensaje[0]
    });
  } catch (error) {
    console.error('Error al crear mensaje de contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear mensaje de contacto',
      message: error.message
    });
  }
};

export const deleteMensajeContacto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de mensaje inválido'
      });
    }

    const [mensajeExists] = await pool.query('SELECT id_mensaje_contacto FROM Mensaje_Contacto WHERE id_mensaje_contacto = ?', [id]);
    if (mensajeExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Mensaje de contacto no encontrado'
      });
    }

    await pool.query('DELETE FROM Mensaje_Contacto WHERE id_mensaje_contacto = ?', [id]);

    res.json({
      success: true,
      message: 'Mensaje de contacto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar mensaje de contacto:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar mensaje de contacto',
      message: error.message
    });
  }
};
