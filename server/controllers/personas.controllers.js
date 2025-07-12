import { pool } from "../db.js";

export const getPersonas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        p.id_persona,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona
      FROM Persona p
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      ORDER BY p.apellido_persona, p.nombre_persona
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener personas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener personas',
      message: error.message
    });
  }
}

export const getPersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT
        p.id_persona,
        p.id_grado_persona,
        p.id_tipo_persona,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona
      FROM Persona p
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      WHERE p.id_persona = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Persona no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener persona',
      message: error.message
    });
  }
}

export const createPersona = async (req, res) => {
  try {
    const { id_grado_persona, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona } = req.body;

    if (!nombre_persona || !apellido_persona) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y apellido son requeridos'
      });
    }

    if (id_grado_persona) {
      const [gradoExists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE id_grado_persona = ?', [id_grado_persona]);
      if (gradoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El grado especificado no existe'
        });
      }
    }

    if (id_tipo_persona) {
      const [tipoExists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE id_tipo_persona = ?', [id_tipo_persona]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de persona especificado no existe'
        });
      }
    }

    const result = await pool.query(
      'INSERT INTO Persona (id_grado_persona, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona) VALUES (?, ?, ?, ?, ?)',
      [id_grado_persona || null, id_tipo_persona || null, nombre_persona, apellido_persona, imagen_perfil_url_persona || null]
    );

    const [newPersona] = await pool.query(`
      SELECT
        p.id_persona,
        p.id_grado_persona,
        p.id_tipo_persona,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona
      FROM Persona p
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      WHERE p.id_persona = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Persona creada exitosamente',
      data: newPersona[0]
    });
  } catch (error) {
    console.error('Error al crear persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear persona',
      message: error.message
    });
  }
}

export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_grado_persona, id_tipo_persona, nombre_persona, apellido_persona, imagen_perfil_url_persona } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona inválido'
      });
    }

    const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id]);
    if (personaExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Persona no encontrada'
      });
    }

    if (!nombre_persona || !apellido_persona) {
      return res.status(400).json({
        success: false,
        error: 'Nombre y apellido son requeridos'
      });
    }

    if (id_grado_persona) {
      const [gradoExists] = await pool.query('SELECT id_grado_persona FROM Grado_Persona WHERE id_grado_persona = ?', [id_grado_persona]);
      if (gradoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El grado especificado no existe'
        });
      }
    }

    if (id_tipo_persona) {
      const [tipoExists] = await pool.query('SELECT id_tipo_persona FROM Tipo_Persona WHERE id_tipo_persona = ?', [id_tipo_persona]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de persona especificado no existe'
        });
      }
    }

    await pool.query(
      'UPDATE Persona SET id_grado_persona = ?, id_tipo_persona = ?, nombre_persona = ?, apellido_persona = ?, imagen_perfil_url_persona = ? WHERE id_persona = ?',
      [id_grado_persona || null, id_tipo_persona || null, nombre_persona, apellido_persona, imagen_perfil_url_persona || null, id]
    );

    const [updatedPersona] = await pool.query(`
      SELECT 
        p.id_persona,
        p.id_grado_persona,
        p.id_tipo_persona,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        tp.nombre_tipo_persona
      FROM Persona p
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Tipo_Persona tp ON p.id_tipo_persona = tp.id_tipo_persona
      WHERE p.id_persona = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Persona actualizada exitosamente',
      data: updatedPersona[0]
    });
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar persona',
      message: error.message
    });
  }
}

export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona inválido'
      });
    }

    const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id]);
    if (personaExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Persona no encontrada'
      });
    }

    const [dependencies] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM Libro WHERE id_persona = ?) as libros,
        (SELECT COUNT(*) FROM Documento WHERE id_persona = ?) as documentos,
        (SELECT COUNT(*) FROM Logs WHERE id_persona = ?) as logs,
        (SELECT COUNT(*) FROM Academico WHERE id_persona = ?) as academicos,
        (SELECT COUNT(*) FROM Directiva WHERE id_persona = ?) as directivas
    `, [id, id, id, id, id]);

    const totalDependencies = dependencies[0].libros + dependencies[0].documentos + dependencies[0].logs + dependencies[0].academicos + dependencies[0].directivas;

    if (totalDependencies > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar la persona porque tiene registros asociados',
        dependencies: dependencies[0]
      });
    }

    await pool.query('DELETE FROM Persona WHERE id_persona = ?', [id]);

    res.json({
      success: true,
      message: 'Persona eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar persona',
      message: error.message
    });
  }
}

export const getGrados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Grado_Persona ORDER BY nombre_grado_persona');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener grados:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener grados',
      message: error.message
    });
  }
}

export const getTiposPersona = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Persona ORDER BY nombre_tipo_persona');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener tipos de persona:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener tipos de persona',
      message: error.message
    });
  }
}
