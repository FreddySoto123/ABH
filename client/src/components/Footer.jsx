import React from "react";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import useAcademia from "../hooks/useAcademia";
import "./Footer.css";

function Footer() {
  const { academiaData, loading, error } = useAcademia();

  if (loading) {
    return (
      <div className="footer-container">
        <div className="footer-loading">
          <div className="loading-spinner"></div>
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="footer-container">
        <div className="footer-error">
          <p>Error al cargar la información: {String(error)}</p>
        </div>
      </div>
    );
  }

  if (!academiaData) {
    return (
      <div className="footer-container">
        <div className="footer-error">
          <p>No se pudo cargar la información de la academia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-section footer-about">
          <div className="footer-logo">
            <div className="footer-logos">
              <img
                src="/img/logo-academia.png"
                alt="Logo Academia"
                className="footer-logo-image-academia"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <img
                src="/img/logo-comando.png"
                alt="Logo Ejército"
                className="footer-logo-image-comando"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>
          <div className="footer-quote">
            <p>
              "Preservando la gloria de nuestros héroes y la grandeza de nuestra
              historia militar boliviana para las generaciones venideras"
            </p>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="social-link" aria-label="YouTube">
              <FaYoutube size={24} />
            </a>
            <a href="#" className="social-link" aria-label="WhatsApp">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        <div className="footer-section footer-branches">
          <h3 className="footer-title">Sucursales</h3>
          <div className="footer-item__container">
            <div className="footer-item">
              <FiMapPin size={18} />
              <span>C. Bolívar 578 - La Paz</span>
            </div>
            <div className="footer-item">
              <FiMapPin size={18} />
              <span>C. Bolívar 402 - Santa Cruz de la Sierra</span>
            </div>
            <div className="footer-item">
              <FiMapPin size={18} />
              <span>C. Santivañez 4373 - Cochabamba</span>
            </div>
          </div>
        </div>

        <div className="footer-section footer-social-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="footer-social-links">
            <a href="#" className="footer-social-item">
              <FaFacebook size={20} />
              <span>Facebook</span>
            </a>
            <a href="#" className="footer-social-item">
              <FaInstagram size={20} />
              <span>Instagram</span>
            </a>
            <a href="#" className="footer-social-item">
              <FaYoutube size={20} />
              <span>YouTube</span>
            </a>
            <a href="#" className="footer-social-item">
              <FaWhatsapp size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="footer-section footer-info">
          <h3 className="footer-title">Información</h3>
          <div className="footer-info-content">
            <div className="footer-item">
              <FiClock size={18} />
              <div className="footer-item-text">
                <span>{academiaData?.horario_academia || "09:00 a 12:00"}</span>
              </div>
            </div>
            <div className="footer-item">
              <FiPhone size={18} />
              <div className="footer-item-text">
                <span>
                  {academiaData?.telefono_academia || "(+591) 65164240"}
                </span>
              </div>
            </div>
            <div className="footer-item">
              <FiMail size={18} />
              <div className="footer-item-text">
                <span>
                  {academiaData?.email_academia ||
                    "info@academiahistoriamilitar.com"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © Copyright 2025,{" "}
          <span className="footer-highlight">
            ACADEMIA BOLIVIANA DE HISTORIA MILITAR
          </span>
          . Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

export default Footer;
