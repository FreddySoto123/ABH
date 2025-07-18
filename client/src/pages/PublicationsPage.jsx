import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import SectionHeader from '../components/ui/SectionHeader';
import CardSlider from '../components/ui/CardSlider'; 
import MainBanner from '../components/MainBanner';

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
  {
    type: 'information',
    props: {
      title: 'Publicación digital del libro "Los 7 Mariscales de Zelaa"',
      description: 'Se realizó en el salón principal con la presencia de académicos e invitados especiales. Se realizó en el salón principal...',
      date: '15 de junio de 2025',
    }
  },
];

const academicGazetteData = [
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

const otherDocumentsData = [
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


function PublicationsPage() {
  return (
    <div className="publications-page">
      <main>
         <MainBanner 
          page="Archivo Histórico"
          title="Publicaciones"
          description="Explora la colección del Museo y una selección de objetos de manera virtual con toda la información disponible. En los recorridos temáticos virtuales se ofrece adicionalmente visitas guiadas con tours de audio."
        />
        <CardSlider title="Publicaciones Oficiales" cards={officialPublicationsData} centerTitle={true} />
        <CardSlider title="Trabajos Históricos" cards={historicalWorksData} centerTitle={true} backgroundImage="https://blog.alfaconcursos.com.br/wp-content/uploads/2016/05/Dicas-concursos-militares-scaled.jpg"/>
        <CardSlider title="Gaceta Académica" cards={academicGazetteData} centerTitle={true} />
        <CardSlider title="Otros Documentos de la Academia" cards={otherDocumentsData} centerTitle={true} backgroundImage="https://blog.alfaconcursos.com.br/wp-content/uploads/2016/05/Dicas-concursos-militares-scaled.jpg"/>
      </main>
    </div>
  );
}

export default PublicationsPage;