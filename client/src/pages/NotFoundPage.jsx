import React from 'react'
import { useNavigate } from 'react-router-dom'
import './NotFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <div className="not-found-error-number">404</div>
        <div className="not-found-divider"></div>
        <h1 className="heading-2">
          Página no encontrada
        </h1>
        <p className="body-medium" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <div>
          <button
            onClick={() => navigate('/')}
            className="not-found-btn-primary"
          >
            Ir al inicio
          </button>
          <button
            onClick={() => navigate(-1)}
            className="not-found-btn-secondary"
          >
            Volver atrás
          </button>
        </div>
        <div className="not-found-footer">
          <p className="text-caption">
            Academia Boliviana de Historia Militar
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
