import { pool } from "../db.js";

export const getAcademicos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        ac.id_academico,
        ac.estado_academico,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona,
        ta.nombre_tipo_academico
      FROM Academico ac
      LEFT JOIN Persona p ON ac.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      LEFT JOIN Tipo_Academico ta ON ac.id_tipo_academico = ta.id_tipo_academico
      ORDER BY p.apellido_persona, p.nombre_persona
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener académicos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener académicos',
      message: error.message
    });
  }
};

export const getAcademico = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de académico inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        ac.id_academico,
        ac.id_persona,
        ac.id_tipo_academico,
        ac.estado_academico,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona,
        ta.nombre_tipo_academico
      FROM Academico ac
      LEFT JOIN Persona p ON ac.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      LEFT JOIN Tipo_Academico ta ON ac.id_tipo_academico = ta.id_tipo_academico
      WHERE ac.id_academico = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Académico no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener académico',
      message: error.message
    });
  }
};

export const createAcademico = async (req, res) => {
  try {
    const { id_persona, id_tipo_academico, estado_academico } = req.body;

    if (!id_persona || !id_tipo_academico) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona y tipo académico son requeridos'
      });
    }

    const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id_persona]);
    if (personaExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La persona especificada no existe'
      });
    }

    const [tipoExists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE id_tipo_academico = ?', [id_tipo_academico]);
    if (tipoExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'El tipo académico especificado no existe'
      });
    }

    const result = await pool.query(
      'INSERT INTO Academico (id_persona, id_tipo_academico, estado_academico) VALUES (?, ?, ?)',
      [id_persona, id_tipo_academico, estado_academico || 'Activo']
    );

    const [newAcademico] = await pool.query(`
      SELECT 
        ac.id_academico,
        ac.id_persona,
        ac.id_tipo_academico,
        ac.estado_academico,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona,
        ta.nombre_tipo_academico
      FROM Academico ac
      LEFT JOIN Persona p ON ac.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      LEFT JOIN Tipo_Academico ta ON ac.id_tipo_academico = ta.id_tipo_academico
      WHERE ac.id_academico = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Académico creado exitosamente',
      data: newAcademico[0]
    });
  } catch (error) {
    console.error('Error al crear académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear académico',
      message: error.message
    });
  }
};

export const updateAcademico = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_persona, id_tipo_academico, estado_academico } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de académico inválido'
      });
    }

    const [academicoExists] = await pool.query('SELECT id_academico FROM Academico WHERE id_academico = ?', [id]);
    if (academicoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Académico no encontrado'
      });
    }

    if (!id_persona || !id_tipo_academico) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona y tipo académico son requeridos'
      });
    }

    const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id_persona]);
    if (personaExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La persona especificada no existe'
      });
    }

    const [tipoExists] = await pool.query('SELECT id_tipo_academico FROM Tipo_Academico WHERE id_tipo_academico = ?', [id_tipo_academico]);
    if (tipoExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'El tipo académico especificado no existe'
      });
    }

    await pool.query(
      'UPDATE Academico SET id_persona = ?, id_tipo_academico = ?, estado_academico = ? WHERE id_academico = ?',
      [id_persona, id_tipo_academico, estado_academico || 'Activo', id]
    );

    const [updatedAcademico] = await pool.query(`
      SELECT 
        ac.id_academico,
        ac.id_persona,
        ac.id_tipo_academico,
        ac.estado_academico,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona,
        ta.nombre_tipo_academico
      FROM Academico ac
      LEFT JOIN Persona p ON ac.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      LEFT JOIN Tipo_Academico ta ON ac.id_tipo_academico = ta.id_tipo_academico
      WHERE ac.id_academico = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Académico actualizado exitosamente',
      data: updatedAcademico[0]
    });
  } catch (error) {
    console.error('Error al actualizar académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar académico',
      message: error.message
    });
  }
};

export const deleteAcademico = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de académico inválido'
      });
    }

    const [academicoExists] = await pool.query('SELECT id_academico FROM Academico WHERE id_academico = ?', [id]);
    if (academicoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Académico no encontrado'
      });
    }

    await pool.query('DELETE FROM Academico WHERE id_academico = ?', [id]);

    res.json({
      success: true,
      message: 'Académico eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar académico:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar académico',
      message: error.message
    });
  }
};

export const getTiposAcademico = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Academico ORDER BY nombre_tipo_academico');
    res.json({
      success: true,
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
