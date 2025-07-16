import { pool } from "../db.js";

export const getDirectivas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.id_persona,
        d.id_cargo,
        d.id_filial,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        c.nombre_cargo,
        f.nombre_filial,
        a.nombre_academia
      FROM Directiva d
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Cargo c ON d.id_cargo = c.id_cargo
      LEFT JOIN Filial f ON d.id_filial = f.id_filial
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      ORDER BY f.nombre_filial, c.nombre_cargo, p.apellido_persona
    `);

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener directivas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener directivas',
      message: error.message
    });
  }
};

export const getDirectiva = async (req, res) => {
  try {
    const { id_persona, id_cargo, id_filial } = req.params;

    if (!id_persona || !id_cargo || !id_filial) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona, cargo y filial son requeridos'
      });
    }

    const [rows] = await pool.query(`
      SELECT 
        d.id_persona,
        d.id_cargo,
        d.id_filial,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        c.nombre_cargo,
        f.nombre_filial,
        a.nombre_academia
      FROM Directiva d
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Cargo c ON d.id_cargo = c.id_cargo
      LEFT JOIN Filial f ON d.id_filial = f.id_filial
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      WHERE d.id_persona = ? AND d.id_cargo = ? AND d.id_filial = ?
    `, [id_persona, id_cargo, id_filial]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Directiva no encontrada'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener directiva:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener directiva',
      message: error.message
    });
  }
};

export const createDirectiva = async (req, res) => {
  try {
    const { id_persona, id_cargo, id_filial } = req.body;

    if (!id_persona || !id_cargo || !id_filial) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona, cargo y filial son requeridos'
      });
    }

    const [personaExists] = await pool.query('SELECT id_persona FROM Persona WHERE id_persona = ?', [id_persona]);
    if (personaExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La persona especificada no existe'
      });
    }

    const [cargoExists] = await pool.query('SELECT id_cargo FROM Cargo WHERE id_cargo = ?', [id_cargo]);
    if (cargoExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'El cargo especificado no existe'
      });
    }

    const [filialExists] = await pool.query('SELECT id_filial FROM Filial WHERE id_filial = ?', [id_filial]);
    if (filialExists.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La filial especificada no existe'
      });
    }

    const [directivaExists] = await pool.query('SELECT * FROM Directiva WHERE id_persona = ? AND id_cargo = ? AND id_filial = ?', [id_persona, id_cargo, id_filial]);
    if (directivaExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Esta directiva ya existe'
      });
    }

    await pool.query(
      'INSERT INTO Directiva (id_persona, id_cargo, id_filial) VALUES (?, ?, ?)',
      [id_persona, id_cargo, id_filial]
    );

    const [newDirectiva] = await pool.query(`
      SELECT 
        d.id_persona,
        d.id_cargo,
        d.id_filial,
        p.nombre_persona,
        p.apellido_persona,
        p.imagen_perfil_url_persona,
        gp.nombre_grado_persona,
        gp.acronimo_grado_persona,
        c.nombre_cargo,
        f.nombre_filial,
        a.nombre_academia
      FROM Directiva d
      LEFT JOIN Persona p ON d.id_persona = p.id_persona
      LEFT JOIN Grado_Persona gp ON p.id_grado_persona = gp.id_grado_persona
      LEFT JOIN Cargo c ON d.id_cargo = c.id_cargo
      LEFT JOIN Filial f ON d.id_filial = f.id_filial
      LEFT JOIN Academia a ON f.id_academia = a.id_academia
      WHERE d.id_persona = ? AND d.id_cargo = ? AND d.id_filial = ?
    `, [id_persona, id_cargo, id_filial]);

    res.status(201).json({
      success: true,
      message: 'Directiva creada exitosamente',
      data: newDirectiva[0]
    });
  } catch (error) {
    console.error('Error al crear directiva:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear directiva',
      message: error.message
    });
  }
};

export const deleteDirectiva = async (req, res) => {
  try {
    const { id_persona, id_cargo, id_filial } = req.params;

    if (!id_persona || !id_cargo || !id_filial) {
      return res.status(400).json({
        success: false,
        error: 'ID de persona, cargo y filial son requeridos'
      });
    }

    const [directivaExists] = await pool.query('SELECT * FROM Directiva WHERE id_persona = ? AND id_cargo = ? AND id_filial = ?', [id_persona, id_cargo, id_filial]);
    if (directivaExists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Directiva no encontrada'
      });
    }

    await pool.query('DELETE FROM Directiva WHERE id_persona = ? AND id_cargo = ? AND id_filial = ?', [id_persona, id_cargo, id_filial]);

    res.json({
      success: true,
      message: 'Directiva eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar directiva:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar directiva',
      message: error.message
    });
  }
};

export const getCargos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Cargo ORDER BY nombre_cargo');
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener cargos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener cargos',
      message: error.message
    });
  }
};
