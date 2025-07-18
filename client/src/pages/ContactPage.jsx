import React from 'react';
import MainBanner from '../components/MainBanner';
import SectionHeader from '../components/ui/SectionHeader';
import InfoItem from '../components/ui/InfoItem';
import InputField from '../components/ui/InputField';
import GoogleMapEmbed from '../components/ui/GoogleMapEmbed';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

import './ContactPage.css';

function ContactPage() {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.421712076097!2d-68.14057868564283!3d-16.5029458886121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f2065873a3889%3A0x1f5a5fe72c84a856!2sEstado%20Mayor%20General%20del%20Ej%C3%A9rcito!5e0!3m2!1ses-419!2sbo!4w600";

  return (
    <div className="contact-page">

      <main>
        <MainBanner 
          page="Contacto"
          title="Referencia"
          description="Explora la colección del Museo y una selección de objetos de manera virtual con toda la información disponible. En los recorridos temáticos virtuales se ofrece adicionalmente visitas guiadas con tours de audio."
        />

        <section className="contact-content-section">
          <div className="contact-grid">
            <div className="contact-left-column">
              <SectionHeader 
                title="Envíanos un mensaje"
                left={true}
                extrabold={true} 
              />
              <div className="contact-info-column">
                <InfoItem 
                  icon={<FiMapPin size={24} />}
                  title="Ubicación"
                  descriptionLines={[
                    'C. Bolívar 578 - La Paz, Bolivia',
                    '500, Bolívar 402, Santa Cruz de la Sierra',
                    'Santivañez 4373, Cochabamba'
                  ]}
                />
                <InfoItem 
                  icon={<FiClock size={24} />}
                  title="Atención"
                  descriptionLines={['Lunes a Viernes: 09:00 a 12:00']}
                />
                <InfoItem 
                  icon={<FiPhone size={24} />}
                  title="Teléfono"
                  descriptionLines={['(+591) 65164240']}
                />
                <InfoItem 
                  icon={<FiMail size={24} />}
                  title="Email"
                  descriptionLines={['info@academiahistoriamilitar.com']}
                />
              </div>
            </div>
             <form className="contact-form">
                <InputField 
                  type="text" 
                  placeholder="Nombre Completo" 
                  required 
                />
                <InputField 
                  type="email" 
                  placeholder="Email" 
                  required 
                />
                <InputField 
                  as="textarea" 
                  placeholder="Mensaje" 
                  rows={8} 
                  required 
                />
                <button type="submit" className="submit-button">Enviar</button>
              </form>
          </div>
        </section>

        <GoogleMapEmbed 
          mapSrc={mapUrl}
          title="Mapa de Ubicación de la Academia"
        />
        
      </main>

    </div>
  );
}

export default ContactPage;