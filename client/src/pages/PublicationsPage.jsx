import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import SectionHeader from '../components/ui/SectionHeader';
import CardSlider from '../components/ui/CardSlider'; 

import './PublicationsPage.css'; 

const officialPublicationsData = [
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
];

const historicalWorksData = [
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
  {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
];

const academicGazetteData = [
    {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
];

const otherDocumentsData = [
   {
    type: 'book',
    props: {
      tittle: "El Sitio de Boquerón: Estrategia y Resistencia",
      author: "Jorge Abastoflor Frey",
      fecha: "21 de junio de 2025",
      image: "https://tse2.mm.bing.net/th/id/OIP.lWG6CVk0iwOj8oASM4nKjAHaLK?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
  },
];

function PublicationsPage() {
  return (
    <div className="publications-page">
      <main>
        <div className="publications-hero">
          <div className="publications-hero__content">
            <span className="publications-hero__eyebrow">Archivo Histórico</span>
            <div className="publications-hero__accent-line"></div>

            <div className="publications-hero__main-content">
              <h1>Publicaciones</h1>
              <p>Explora la colección del Museo y una selección de objetos de manera virtual con toda la información disponible. En los recorridos temáticos virtuales se ofrece adicionalmente visitas guiadas con tours de audio.</p>
            </div>
            
          </div>
        </div>
        <CardSlider title="Publicaciones Oficiales" cards={officialPublicationsData} />
        <CardSlider title="Trabajos Históricos" cards={historicalWorksData} />
        <CardSlider title="Gaceta Académica" cards={academicGazetteData} />
        <CardSlider title="Otros Documentos de la Academia" cards={otherDocumentsData} />
      </main>
    </div>
  );
}

export default PublicationsPage;