  import React, { useState } from "react";
  import { FiPhone, FiMail, FiClock, FiMenu, FiX, FiChevronUp, FiChevronDown } from "react-icons/fi";
  import useAcademia from "../hooks/useAcademia";
  import Button from "./ui/Button";
  import "./Header.css";

  function Header() {
    const { academiaData, loading, error } = useAcademia();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);

    const navigationItems = [
      { label: "INICIO", href: "/", hasDropdown: true, dropdownItems: [{ label: "MISION", href: "/mision" }, { label: "VISION", href: "/vision" }] },
      { label: "HISTORIA", href: "/historia", hasDropdown: true, dropdownItems: [{label: "CREACION", href: "#section-creacion"}, {label: "FUNDADMENTOS", href: "#section-fundamentos"}, {label: "ANTECEDENTES", href: "#section-antecedentes"}, {label: "EMBLEMAS", href: "#section-emblemas"}, {label: "DISTINCIONES OBTENIDAS", href: "#section-distinciones"}] },
      { label: "DIRECTIVA", href: "/directiva", hasDropdown: true, dropdownItems: [{label: "DIRECCIÓN ACADÉMICA", href: "#section-direccion__academica"}, {label: "FILIALES REGIONALES", href: "#section-filiales__regionales"}, {label: "ACADÉMICOS HONORARIOS", href: "#section-academicos__honarios"}, {label: "ACADÉMICOS DE NÚMERO", href: "#section-academicos__numero"}, {label: "ACADÉMICOS CONSULTORES", href: "#section-academicos__consultores"}, {label: "POSTULANTES ACADÉMICOS", href: "#section-postulantes__academicos"}, {label: "ASPIRANTES ACADÉMICOS", href: "#section-aspirantes__academicos"}, {label: "GALERIA HISTÓRICA", href: "#section-galeria__historica"}]},
      { label: "RECORRIDO", href: "/recorrido", hasDropdown: true, dropdownItems: [{label: "PLANOS", href: "#section-planos"}, {label: "SALONES", href: "#section-salones"}] },
      { label: "INVESTIGACIÓN HISTÓRICA", href: "/investigacion", hasDropdown: true, dropdownItems:[{label: "PUBLICACIONES OFICIALES", href: "#section-publicaciones__oficiales"}, {label: "TRABAJOS HISTÓRICOS", href: "#section-trabajos__historicos"}, {label: "GACETA ACADÉMICA", href: "#section-gaceta__academica"}, {label: "OTROS DOCUMENTOS", href: "#section-otros__documentos"}]},
      { label: "BIBLIOTECA", href: "/biblioteca" },
      { label: "ACTIVIDADES", href: "/actividades", hasDropdown: true, dropdownItems: [{label: "EVENTOS OFICIALES", href: "#section-eventos__oficiales"}, {label: "RESOLUCIONES", href: "#section-resoluciones"}, {label: "ACTIVIDADES CULTURALES", href: "#section-actividades__culturales"}, {label: "CALENDARIO ACADÉMICO", href: "#section-calendario__academico"}]},
      { label: "CONTACTO", href: "/contacto" },
    ];

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    if (loading) {
      return (
        <div className="header-container">
          <div className="header-loading">
            <div className="loading-spinner"></div>
            <p>Cargando información...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="header-container">
          <div className="header-error">
            <p>Error al cargar la información: {error}</p>
          </div>
        </div>
      );
    }

    if (!academiaData) {
      return (
        <div className="header-container">
          <div className="header-error">
            <p>No se pudo cargar la información de la academia</p>
          </div>
        </div>
      );
    }

    return (
      <header className="header-container">
        {/* Sección principal del header */}
        <div className="header-main">
          <div className="logo-container">
            <div className="logo-emblem">
              <img
                src="/img/logo-academia.png"
                alt="Logo Academia"
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="logo-title__container">
              <h1 className="academy-title">
                ACADEMIA BOLIVIANA DE<br/>HISTORIA MILITAR
              </h1>
            </div>
          </div>

          <div className="header-top">
            <div className="header-top__content">
              <div className="contact-info">
                <FiPhone size={18} />
                <div className="contact-item">
                  <span className="contact-item__title">
                    Llamanos: {academiaData.telefono_academia}
                  </span>
                  <span>E-mail: {academiaData.email_academia}</span>
                </div>
              </div>
              <div className="schedule-info">
                <FiClock size={18} />
                <div className="schedule-item">
                  <span className="contact-item__title">
                    Horario de atención:
                  </span>
                  <span>{academiaData.horario_academia}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Button>
        </div>
        
        <nav
          className={`navbar-container ${
            mobileMenuOpen ? "navbar-container--mobile-open" : ""
          }`}
        >
          <ul className="navbar-list">
            {navigationItems.map((item, index) => (
              <li key={index} className="navbar-item" onMouseEnter={() => setDropdownOpen(item.label)} onMouseLeave={() => setDropdownOpen(null)}>
                <a
                  href={item.href}
                  className="navbar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <span className="dropdown-arrow">
                      {dropdownOpen === item.label ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                    </span>
                  )}
                </a>
                {item.hasDropdown && dropdownOpen === item.label && (
                  <ul className="dropdown-menu">
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <li key={dropdownIndex}>
                        <a
                          href={dropdownItem.href}
                          className="dropdown-link"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {dropdownItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {mobileMenuOpen && (
              <div className="header-top--mobile">
                <div className="contact-info">
                  <FiPhone size={18} />
                  <div className="contact-item">
                    <span className="contact-item__title">
                      Llamanos: {academiaData.telefono_academia}
                    </span>
                    <span>E-mail: {academiaData.email_academia}</span>
                  </div>
                </div>
                <div className="schedule-info">
                  <FiClock size={18} />
                  <div className="schedule-item">
                    <span className="contact-item__title">
                      Horario de atención:
                    </span>
                    <span>{academiaData.horario_academia}</span>
                  </div>
                </div>
              </div>
            )}
          </ul>
        </nav>
      </header>
    );
  }

  export default Header;