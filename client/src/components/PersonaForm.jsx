import { useState, useEffect } from 'react';
import Button from './ui/Button';
import { useGradosYTipos } from '../hooks/usePersonas';
import './PersonaForm.css';

const PersonaForm = ({
  persona = null,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState({
    nombre_persona: '',
    apellido_persona: '',
    id_grado_persona: '',
    id_tipo_persona: '',
    imagen_perfil_url_persona: ''
  });

  const [errors, setErrors] = useState({});
  const { grados, tiposPersona, loading: optionsLoading } = useGradosYTipos();

  useEffect(() => {
    if (persona) {
      setFormData({
        nombre_persona: persona.nombre_persona || '',
        apellido_persona: persona.apellido_persona || '',
        id_grado_persona: persona.id_grado_persona || '',
        id_tipo_persona: persona.id_tipo_persona || '',
        imagen_perfil_url_persona: persona.imagen_perfil_url_persona || ''
      });
    }
  }, [persona]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre_persona.trim()) {
      newErrors.nombre_persona = 'El nombre es requerido';
    }

    if (!formData.apellido_persona.trim()) {
      newErrors.apellido_persona = 'El apellido es requerido';
    }

    if (formData.imagen_perfil_url_persona && !isValidUrl(formData.imagen_perfil_url_persona)) {
      newErrors.imagen_perfil_url_persona = 'Debe ser una URL válida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    new URL(string);
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const dataToSubmit = {
      ...formData,
      id_grado_persona: formData.id_grado_persona || null,
      id_tipo_persona: formData.id_tipo_persona || null,
      imagen_perfil_url_persona: formData.imagen_perfil_url_persona || null
    };

    onSubmit(dataToSubmit);
  };

  if (optionsLoading) {
    return (
      <div className="persona-form__loading">
        <div className="spinner"></div>
        <p>Cargando opciones...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="persona-form">
      <div className="form-group">
        <label htmlFor="nombre_persona" className="form-label">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre_persona"
          name="nombre_persona"
          value={formData.nombre_persona}
          onChange={handleChange}
          className={`form-input ${errors.nombre_persona ? 'form-input--error' : ''}`}
          placeholder="Ingrese el nombre"
        />
        {errors.nombre_persona && (
          <span className="form-error">{errors.nombre_persona}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="apellido_persona" className="form-label">
          Apellido *
        </label>
        <input
          type="text"
          id="apellido_persona"
          name="apellido_persona"
          value={formData.apellido_persona}
          onChange={handleChange}
          className={`form-input ${errors.apellido_persona ? 'form-input--error' : ''}`}
          placeholder="Ingrese el apellido"
        />
        {errors.apellido_persona && (
          <span className="form-error">{errors.apellido_persona}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="id_grado_persona" className="form-label">
          Grado
        </label>
        <select
          id="id_grado_persona"
          name="id_grado_persona"
          value={formData.id_grado_persona}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Seleccione un grado</option>
          {grados.map(grado => (
            <option key={grado.id_grado_persona} value={grado.id_grado_persona}>
              {grado.acronimo_grado_persona ?
                `${grado.acronimo_grado_persona} - ${grado.nombre_grado_persona}` :
                grado.nombre_grado_persona
              }
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="id_tipo_persona" className="form-label">
          Tipo de Persona
        </label>
        <select
          id="id_tipo_persona"
          name="id_tipo_persona"
          value={formData.id_tipo_persona}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Seleccione un tipo</option>
          {tiposPersona.map(tipo => (
            <option key={tipo.id_tipo_persona} value={tipo.id_tipo_persona}>
              {tipo.nombre_tipo_persona}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="imagen_perfil_url_persona" className="form-label">
          URL de Imagen de Perfil
        </label>
        <input
          type="url"
          id="imagen_perfil_url_persona"
          name="imagen_perfil_url_persona"
          value={formData.imagen_perfil_url_persona}
          onChange={handleChange}
          className={`form-input ${errors.imagen_perfil_url_persona ? 'form-input--error' : ''}`}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.imagen_perfil_url_persona && (
          <span className="form-error">{errors.imagen_perfil_url_persona}</span>
        )}
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
        >
          {persona ? 'Actualizar' : 'Crear'} Persona
        </Button>
      </div>
    </form>
  );
};

export default PersonaForm;
