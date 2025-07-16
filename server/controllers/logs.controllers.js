import { pool } from "../db.js";

export const getLogs = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        l.id_log,
        l.descripcion_log,
        l.tabla_modificada_log,
        l.fecha_ingreso_log,
        l.tipo_evento_log,
        l.direccion_ip_log,
        l.sistema_operativo_log,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Logs l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      ORDER BY l.fecha_ingreso_log DESC, l.id_log DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener logs',
      message: error.message
    });
  }
};

export const getLog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de log inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        l.id_log,
        l.id_persona,
        l.descripcion_log,
        l.tabla_modificada_log,
        l.fecha_ingreso_log,
        l.tipo_evento_log,
        l.direccion_ip_log,
        l.sistema_operativo_log,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Logs l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_log = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Log no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener log:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener log',
      message: error.message
    });
  }
};

export const createLog = async (req, res) => {
  try {
    const { 
      id_persona, 
      descripcion_log, 
      tabla_modificada_log, 
      tipo_evento_log, 
      direccion_ip_log, 
      sistema_operativo_log 
    } = req.body;

    if (!descripcion_log || !tipo_evento_log) {
      return res.status(400).json({
        success: false,
        error: 'Descripción y tipo de evento son requeridos'
      });
    }

    if (id_persona) {
      const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id_persona]);
      if (personaExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La persona especificada no existe'
        });
      }
    }

    const result = await pool.query(
      'INSERT INTO Logs (id_persona, descripcion_log, tabla_modificada_log, fecha_ingreso_log, tipo_evento_log, direccion_ip_log, sistema_operativo_log) VALUES (?, ?, ?, CURDATE(), ?, ?, ?)',
      [
        id_persona || null,
        descripcion_log,
        tabla_modificada_log || null,
        tipo_evento_log,
        direccion_ip_log || null,
        sistema_operativo_log || null
      ]
    );

    const [newLog] = await pool.query(`
      SELECT 
        l.id_log,
        l.id_persona,
        l.descripcion_log,
        l.tabla_modificada_log,
        l.fecha_ingreso_log,
        l.tipo_evento_log,
        l.direccion_ip_log,
        l.sistema_operativo_log,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Logs l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_log = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Log creado exitosamente',
      data: newLog[0]
    });
  } catch (error) {
    console.error('Error al crear log:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear log',
      message: error.message
    });
  }
};

export const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de log inválido'
      });
    }

    const [logExists] = await pool.query('SELECT id_log FROM Logs WHERE id_log = ?', [id]);
    if (logExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Log no encontrado'
      });
    }

    await pool.query('DELETE FROM Logs WHERE id_log = ?', [id]);

    res.json({
      success: true,
      message: 'Log eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar log:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar log',
      message: error.message
    });
  }
};

export const getLogsByPersona = async (req, res) => {
  try {
    const { id_persona } = req.params;

    if (!id_persona || isNaN(id_persona)) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        l.id_log,
        l.descripcion_log,
        l.tabla_modificada_log,
        l.fecha_ingreso_log,
        l.tipo_evento_log,
        l.direccion_ip_log,
        l.sistema_operativo_log,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Logs l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_persona = ?
      ORDER BY l.fecha_ingreso_log DESC, l.id_log DESC
    `, [id_persona]);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener logs por persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener logs por persona',
      message: error.message
    });
  }
};

export const getLogsByTabla = async (req, res) => {
  try {
    const { tabla } = req.params;

    if (!tabla) {
      return res.status(400).json({
        success: false,
        error: 'Nombre de tabla es requerido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        l.id_log,
        l.descripcion_log,
        l.tabla_modificada_log,
        l.fecha_ingreso_log,
        l.tipo_evento_log,
        l.direccion_ip_log,
        l.sistema_operativo_log,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Logs l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.tabla_modificada_log = ?
      ORDER BY l.fecha_ingreso_log DESC, l.id_log DESC
    `, [tabla]);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener logs por tabla:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener logs por tabla',
      message: error.message
    });
  }
};
