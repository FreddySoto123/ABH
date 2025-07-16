import { pool } from "../db.js";

export const getDocumentos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.id_documento,
        d.descripcion_acceso_documento,
        d.descripcion_documento,
        d.fecha_publicacion_documento,
        d.imagen_url_documento,
        d.titulo_documento,
        td.nombre_tipo_documento,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Documento d
      LEFT JOIN Tipo_Documento td ON d.id_tipo_documento = td.id_tipo_documento
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      ORDER BY d.fecha_publicacion_documento DESC
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener documentos',
      message: error.message
    });
  }
};

export const getDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de documento inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        d.id_documento,
        d.id_tipo_documento,
        d.id_persona,
        d.descripcion_acceso_documento,
        d.descripcion_documento,
        d.fecha_publicacion_documento,
        d.imagen_url_documento,
        d.titulo_documento,
        td.nombre_tipo_documento,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Documento d
      LEFT JOIN Tipo_Documento td ON d.id_tipo_documento = td.id_tipo_documento
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE d.id_documento = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Documento no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener documento',
      message: error.message
    });
  }
};

export const createDocumento = async (req, res) => {
  try {
    const { 
      id_tipo_documento, 
      id_persona, 
      descripcion_acceso_documento, 
      descripcion_documento, 
      fecha_publicacion_documento, 
      imagen_url_documento, 
      titulo_documento 
    } = req.body;

    if (!titulo_documento) {
      return res.status(400).json({
        success: false,
        error: 'El título del documento es requerido'
      });
    }

    if (id_tipo_documento) {
      const [tipoExists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE id_tipo_documento = ?', [id_tipo_documento]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de documento especificado no existe'
        });
      }
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
      'INSERT INTO Documento (id_tipo_documento, id_persona, descripcion_acceso_documento, descripcion_documento, fecha_publicacion_documento, imagen_url_documento, titulo_documento) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        id_tipo_documento || null,
        id_persona || null,
        descripcion_acceso_documento || null,
        descripcion_documento || null,
        fecha_publicacion_documento || null,
        imagen_url_documento || null,
        titulo_documento
      ]
    );

    const [newDocumento] = await pool.query(`
      SELECT 
        d.id_documento,
        d.id_tipo_documento,
        d.id_persona,
        d.descripcion_acceso_documento,
        d.descripcion_documento,
        d.fecha_publicacion_documento,
        d.imagen_url_documento,
        d.titulo_documento,
        td.nombre_tipo_documento,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Documento d
      LEFT JOIN Tipo_Documento td ON d.id_tipo_documento = td.id_tipo_documento
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE d.id_documento = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Documento creado exitosamente',
      data: newDocumento[0]
    });
  } catch (error) {
    console.error('Error al crear documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear documento',
      message: error.message
    });
  }
};

export const updateDocumento = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      id_tipo_documento, 
      id_persona, 
      descripcion_acceso_documento, 
      descripcion_documento, 
      fecha_publicacion_documento, 
      imagen_url_documento, 
      titulo_documento 
    } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de documento inválido'
      });
    }

    const [documentoExists] = await pool.query('SELECT id_documento FROM Documento WHERE id_documento = ?', [id]);
    if (documentoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Documento no encontrado'
      });
    }

    if (!titulo_documento) {
      return res.status(400).json({
        success: false,
        error: 'El título del documento es requerido'
      });
    }

    if (id_tipo_documento) {
      const [tipoExists] = await pool.query('SELECT id_tipo_documento FROM Tipo_Documento WHERE id_tipo_documento = ?', [id_tipo_documento]);
      if (tipoExists.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'El tipo de documento especificado no existe'
        });
      }
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

    await pool.query(
      'UPDATE Documento SET id_tipo_documento = ?, id_persona = ?, descripcion_acceso_documento = ?, descripcion_documento = ?, fecha_publicacion_documento = ?, imagen_url_documento = ?, titulo_documento = ? WHERE id_documento = ?',
      [
        id_tipo_documento || null,
        id_persona || null,
        descripcion_acceso_documento || null,
        descripcion_documento || null,
        fecha_publicacion_documento || null,
        imagen_url_documento || null,
        titulo_documento,
        id
      ]
    );

    const [updatedDocumento] = await pool.query(`
      SELECT 
        d.id_documento,
        d.id_tipo_documento,
        d.id_persona,
        d.descripcion_acceso_documento,
        d.descripcion_documento,
        d.fecha_publicacion_documento,
        d.imagen_url_documento,
        d.titulo_documento,
        td.nombre_tipo_documento,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Documento d
      LEFT JOIN Tipo_Documento td ON d.id_tipo_documento = td.id_tipo_documento
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE d.id_documento = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Documento actualizado exitosamente',
      data: updatedDocumento[0]
    });
  } catch (error) {
    console.error('Error al actualizar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar documento',
      message: error.message
    });
  }
};

export const deleteDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de documento inválido'
      });
    }

    const [documentoExists] = await pool.query('SELECT id_documento FROM Documento WHERE id_documento = ?', [id]);
    if (documentoExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Documento no encontrado'
      });
    }

    await pool.query('DELETE FROM Documento WHERE id_documento = ?', [id]);

    res.json({
      success: true,
      message: 'Documento eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar documento',
      message: error.message
    });
  }
};

export const getTiposDocumento = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Tipo_Documento ORDER BY nombre_tipo_documento');
    res.json({
      success: true,
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
