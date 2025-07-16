// controllers/academia.controllers.js
import { pool } from "../db.js";

export const getAcademiaInfo = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id_academia,
        nombre_academia,
        mision_academia,
        vision_academia,
        historia_academia,
        horario_academia,
        email_academia,
        telefono_academia
      FROM Academia 
      WHERE id_academia = 1
    `);
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Información de la academia no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener información de la academia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener información de la academia',
      message: error.message
    });
  }
};

export const updateAcademiaInfo = async (req, res) => {
  try {
    const {
      nombre_academia,
      mision_academia,
      vision_academia,
      historia_academia,
      horario_academia,
      email_academia,
      telefono_academia
    } = req.body;

    // Obtener datos actuales para mantener valores existentes
    const [currentData] = await pool.query('SELECT * FROM Academia WHERE id_academia = 1');
    
    if (currentData.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Academia no encontrada'
      });
    }

    const current = currentData[0];

    // Usar valores actuales si no se proporcionan nuevos
    const updatedData = {
      nombre_academia: nombre_academia || current.nombre_academia,
      mision_academia: mision_academia !== undefined ? mision_academia : current.mision_academia,
      vision_academia: vision_academia !== undefined ? vision_academia : current.vision_academia,
      historia_academia: historia_academia !== undefined ? historia_academia : current.historia_academia,
      horario_academia: horario_academia !== undefined ? horario_academia : current.horario_academia,
      email_academia: email_academia || current.email_academia,
      telefono_academia: telefono_academia || current.telefono_academia
    };

    // Validación básica con valores finales
    if (!updatedData.nombre_academia || !updatedData.email_academia || !updatedData.telefono_academia) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y teléfono son requeridos'
      });
    }

    // Verificar si existe el registro
    const [academiaExists] = await pool.query('SELECT id_academia FROM Academia WHERE id_academia = 1');
    if (academiaExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Academia no encontrada'
      });
    }

    // Actualizar la información
    await pool.query(`
      UPDATE Academia 
      SET 
        nombre_academia = ?,
        mision_academia = ?,
        vision_academia = ?,
        historia_academia = ?,
        horario_academia = ?,
        email_academia = ?,
        telefono_academia = ?
      WHERE id_academia = 1
    `, [
      updatedData.nombre_academia,
      updatedData.mision_academia,
      updatedData.vision_academia,
      updatedData.historia_academia,
      updatedData.horario_academia,
      updatedData.email_academia,
      updatedData.telefono_academia
    ]);

    // Obtener la información actualizada
    const [updatedAcademia] = await pool.query(`
      SELECT 
        id_academia,
        nombre_academia,
        mision_academia,
        vision_academia,
        historia_academia,
        horario_academia,
        email_academia,
        telefono_academia
      FROM Academia 
      WHERE id_academia = 1
    `);

    res.json({
      success: true,
      message: 'Información de la academia actualizada exitosamente',
      data: updatedAcademia[0]
    });
  } catch (error) {
    console.error('Error al actualizar información de la academia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar información de la academia',
      message: error.message
    });
  }
};

export const createAcademiaInfo = async (req, res) => {
  try {
    const {
      nombre_academia,
      mision_academia,
      vision_academia,
      historia_academia,
      horario_academia,
      email_academia,
      telefono_academia
    } = req.body;

    // Validación básica
    if (!nombre_academia || !email_academia || !telefono_academia) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y teléfono son requeridos'
      });
    }

    // Verificar si ya existe un registro (solo debería haber uno)
    const [academiaExists] = await pool.query('SELECT id_academia FROM Academia LIMIT 1');
    if (academiaExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe información de la academia. Use PUT para actualizar.'
      });
    }

    // Crear nuevo registro
    const result = await pool.query(
      'INSERT INTO Academia (nombre_academia, mision_academia, vision_academia, historia_academia, horario_academia, email_academia, telefono_academia) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre_academia, mision_academia || null, vision_academia || null, historia_academia || null, horario_academia || null, email_academia, telefono_academia]
    );

    // Obtener el registro creado
    const [newAcademia] = await pool.query(`
      SELECT 
        id_academia,
        nombre_academia,
        mision_academia,
        vision_academia,
        historia_academia,
        horario_academia,
        email_academia,
        telefono_academia
      FROM Academia 
      WHERE id_academia = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Información de la academia creada exitosamente',
      data: newAcademia[0]
    });
  } catch (error) {
    console.error('Error al crear información de la academia:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear información de la academia',
      message: error.message
    });
  }
};