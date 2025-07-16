import { pool } from "../db.js";

export const getCargos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Cargo ORDER BY nombre_cargo');
    res.json({
      success: true,
      count: rows.length,
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

export const getCargo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de cargo inválido'
      });
    }

    const [rows] = await pool.query('SELECT * FROM Cargo WHERE id_cargo = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cargo no encontrado'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error al obtener cargo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener cargo',
      message: error.message
    });
  }
};

export const createCargo = async (req, res) => {
  try {
    const { nombre_cargo } = req.body;

    if (!nombre_cargo) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del cargo es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_cargo FROM Cargo WHERE nombre_cargo = ?', [nombre_cargo]);
    if (exists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cargo con este nombre'
      });
    }

    const result = await pool.query(
      'INSERT INTO Cargo (nombre_cargo) VALUES (?)',
      [nombre_cargo]
    );

    const [newCargo] = await pool.query('SELECT * FROM Cargo WHERE id_cargo = ?', [result[0].insertId]);

    res.status(201).json({
      success: true,
      message: 'Cargo creado exitosamente',
      data: newCargo[0]
    });
  } catch (error) {
    console.error('Error al crear cargo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al crear cargo',
      message: error.message
    });
  }
};

export const updateCargo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_cargo } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de cargo inválido'
      });
    }

    if (!nombre_cargo) {
      return res.status(400).json({
        success: false,
        error: 'El nombre del cargo es requerido'
      });
    }

    const [exists] = await pool.query('SELECT id_cargo FROM Cargo WHERE id_cargo = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cargo no encontrado'
      });
    }

    const [nameExists] = await pool.query('SELECT id_cargo FROM Cargo WHERE nombre_cargo = ? AND id_cargo != ?', [nombre_cargo, id]);
    if (nameExists.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Ya existe un cargo con este nombre'
      });
    }

    await pool.query(
      'UPDATE Cargo SET nombre_cargo = ? WHERE id_cargo = ?',
      [nombre_cargo, id]
    );

    const [updatedCargo] = await pool.query('SELECT * FROM Cargo WHERE id_cargo = ?', [id]);

    res.json({
      success: true,
      message: 'Cargo actualizado exitosamente',
      data: updatedCargo[0]
    });
  } catch (error) {
    console.error('Error al actualizar cargo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al actualizar cargo',
      message: error.message
    });
  }
};

export const deleteCargo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'ID de cargo inválido'
      });
    }

    const [exists] = await pool.query('SELECT id_cargo FROM Cargo WHERE id_cargo = ?', [id]);
    if (exists.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cargo no encontrado'
      });
    }

    const [dependencies] = await pool.query('SELECT COUNT(*) as count FROM Directiva WHERE id_cargo = ?', [id]);
    if (dependencies[0].count > 0) {
      return res.status(400).json({
        success: false,
        error: 'No se puede eliminar el cargo porque tiene directivas asociadas'
      });
    }

    await pool.query('DELETE FROM Cargo WHERE id_cargo = ?', [id]);

    res.json({
      success: true,
      message: 'Cargo eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar cargo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al eliminar cargo',
      message: error.message
    });
  }
};
