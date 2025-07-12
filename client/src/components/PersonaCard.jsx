import { useState } from 'react';
import { FiEdit2, FiTrash2, FiUser } from 'react-icons/fi';
import Button from './ui/Button';
import './PersonaCard.css';

const PersonaCard = ({ persona, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = () => {
    onDelete(persona.id_persona);
    setShowDeleteConfirm(false);
  };

  const getInitials = (nombre, apellido) => {
    const nombreInitial = nombre ? nombre.charAt(0).toUpperCase() : '';
    const apellidoInitial = apellido ? apellido.charAt(0).toUpperCase() : '';
    return `${nombreInitial}${apellidoInitial}`;
  };

  return (
    <div className="persona-card">
      <div className="persona-card__header">
        <div className="persona-card__avatar">
          {persona.imagen_perfil_url_persona && !imageError ? (
            <img
              src={persona.imagen_perfil_url_persona}
              alt={`${persona.nombre_persona} ${persona.apellido_persona}`}
              onError={handleImageError}
              className="persona-card__image"
            />
          ) : (
            <div className="persona-card__initials">
              {persona.nombre_persona && persona.apellido_persona ? (
                getInitials(persona.nombre_persona, persona.apellido_persona)
              ) : (
                <FiUser size={24} />
              )}
            </div>
          )}
        </div>
        
        <div className="persona-card__actions">
          <Button
            variant="outline"
            size="small"
            onClick={() => onEdit(persona)}
            className="persona-card__action-btn"
          >
            <FiEdit2 size={16} />
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => setShowDeleteConfirm(true)}
            className="persona-card__action-btn"
          >
            <FiTrash2 size={16} />
          </Button>
        </div>
      </div>

      <div className="persona-card__content">
        <h3 className="persona-card__name">
          {persona.nombre_persona} {persona.apellido_persona}
        </h3>
        
        <div className="persona-card__details">
          {persona.acronimo_grado_persona && (
            <span className="persona-card__badge persona-card__badge--grado">
              {persona.acronimo_grado_persona}
            </span>
          )}
          
          {persona.nombre_tipo_persona && (
            <span className="persona-card__badge persona-card__badge--tipo">
              {persona.nombre_tipo_persona}
            </span>
          )}
        </div>

        {persona.nombre_grado_persona && (
          <p className="persona-card__grado">
            {persona.nombre_grado_persona}
          </p>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="persona-card__confirm-overlay">
          <div className="persona-card__confirm">
            <p>¿Estás seguro de que deseas eliminar a esta persona?</p>
            <div className="persona-card__confirm-actions">
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaCard;
