import { pool } from "../db.js";

export const getLibros = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        l.id_libro,
        l.estado_libro,
        l.isbn_libro,
        l.observaciones_libro,
        l.codigo_libro,
        l.titulo_libro,
        l.deposito_legal_libro,
        l.descripcion_acceso_libro,
        l.estante_libro,
        l.fecha_publicacion_libro,
        l.imagen_portada_url_libro,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Libro l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      ORDER BY l.titulo_libro
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener libros',
      message: error.message
    });
  }
};

export const getLibro = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de libro inválido'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        l.id_libro,
        l.id_persona,
        l.estado_libro,
        l.isbn_libro,
        l.observaciones_libro,
        l.codigo_libro,
        l.titulo_libro,
        l.deposito_legal_libro,
        l.descripcion_acceso_libro,
        l.estante_libro,
        l.fecha_publicacion_libro,
        l.imagen_portada_url_libro,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Libro l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_libro = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener libro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener libro',
      message: error.message
    });
  }
};

export const createLibro = async (req, res) => {
  try {
    const { 
      id_persona, 
      estado_libro, 
      isbn_libro, 
      observaciones_libro, 
      codigo_libro, 
      titulo_libro, 
      deposito_legal_libro, 
      descripcion_acceso_libro, 
      estante_libro, 
      fecha_publicacion_libro, 
      imagen_portada_url_libro 
    } = req.body;

    if (!titulo_libro) {
      return res.status(400).json({
        success: false,
        error: 'El título del libro es requerido'
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
      'INSERT INTO Libro (id_persona, estado_libro, isbn_libro, observaciones_libro, codigo_libro, titulo_libro, deposito_legal_libro, descripcion_acceso_libro, estante_libro, fecha_publicacion_libro, imagen_portada_url_libro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id_persona || null,
        estado_libro || null,
        isbn_libro || null,
        observaciones_libro || null,
        codigo_libro || null,
        titulo_libro,
        deposito_legal_libro || null,
        descripcion_acceso_libro || null,
        estante_libro || null,
        fecha_publicacion_libro || null,
        imagen_portada_url_libro || null
      ]
    );

    const [newLibro] = await pool.query(`
      SELECT 
        l.id_libro,
        l.id_persona,
        l.estado_libro,
        l.isbn_libro,
        l.observaciones_libro,
        l.codigo_libro,
        l.titulo_libro,
        l.deposito_legal_libro,
        l.descripcion_acceso_libro,
        l.estante_libro,
        l.fecha_publicacion_libro,
        l.imagen_portada_url_libro,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Libro l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_libro = ?
    `, [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Libro creado exitosamente',
      data: newLibro[0]
    });
  } catch (error) {
    console.error('Error al crear libro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear libro',
      message: error.message
    });
  }
};

export const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      id_persona, 
      estado_libro, 
      isbn_libro, 
      observaciones_libro, 
      codigo_libro, 
      titulo_libro, 
      deposito_legal_libro, 
      descripcion_acceso_libro, 
      estante_libro, 
      fecha_publicacion_libro, 
      imagen_portada_url_libro 
    } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de libro inválido'
      });
    }

    const [libroExists] = await pool.query('SELECT id_libro FROM Libro WHERE id_libro = ?', [id]);
    if (libroExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    if (!titulo_libro) {
      return res.status(400).json({
        success: false,
        error: 'El título del libro es requerido'
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

    await pool.query(
      'UPDATE Libro SET id_persona = ?, estado_libro = ?, isbn_libro = ?, observaciones_libro = ?, codigo_libro = ?, titulo_libro = ?, deposito_legal_libro = ?, descripcion_acceso_libro = ?, estante_libro = ?, fecha_publicacion_libro = ?, imagen_portada_url_libro = ? WHERE id_libro = ?',
      [
        id_persona || null,
        estado_libro || null,
        isbn_libro || null,
        observaciones_libro || null,
        codigo_libro || null,
        titulo_libro,
        deposito_legal_libro || null,
        descripcion_acceso_libro || null,
        estante_libro || null,
        fecha_publicacion_libro || null,
        imagen_portada_url_libro || null,
        id
      ]
    );

    const [updatedLibro] = await pool.query(`
      SELECT 
        l.id_libro,
        l.id_persona,
        l.estado_libro,
        l.isbn_libro,
        l.observaciones_libro,
        l.codigo_libro,
        l.titulo_libro,
        l.deposito_legal_libro,
        l.descripcion_acceso_libro,
        l.estante_libro,
        l.fecha_publicacion_libro,
        l.imagen_portada_url_libro,
        p.nombre_persona,
        p.apellido_persona,
        gp.acronimo_grado_persona
      FROM Libro l
      LEFT JOIN Persona p ON l.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      WHERE l.id_libro = ?
    `, [id]);

    res.json({
      success: true,
      message: 'Libro actualizado exitosamente',
      data: updatedLibro[0]
    });
  } catch (error) {
    console.error('Error al actualizar libro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar libro',
      message: error.message
    });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de libro inválido'
      });
    }

    const [libroExists] = await pool.query('SELECT id_libro FROM Libro WHERE id_libro = ?', [id]);
    if (libroExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Libro no encontrado'
      });
    }

    await pool.query('DELETE FROM Libro WHERE id_libro = ?', [id]);

    res.json({
      success: true,
      message: 'Libro eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar libro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar libro',
      message: error.message
    });
  }
};
