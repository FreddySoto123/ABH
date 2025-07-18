import React from 'react';
import MainBanner from '../components/MainBanner';
import DynamicCalendar from '../components/ui/DynamicCalendar'; 
import CardSlider from '../components/ui/CardSlider';

const resolutionsData = [
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
];

const culturalActivitiesData = [
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
 {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
];

const officialEventsData = [
    {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
  {
    type: 'information',
    props: {
      title: 'Edición N°01 - Enero 2024: Resumen Anual y Retos',
      description: 'Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...',
      date: '15 de Enero de 2025',
    }
  },
];


function ActivitiesPage() {
  return (
    <div className="activities-page">

      <main>
        <MainBanner 
          page="Actividades"
          title="Novedades"
          description="Explora la colección del Museo y una selección de objetos de manera virtual con toda la información disponible. En los recorridos temáticos virtuales se ofrece adicionalmente visitas guiadas con tours de audio."
        />

        <DynamicCalendar 
          title="Calendario de Actividades"
        />
        
        <CardSlider 
          title="Resoluciones" 
          cards={resolutionsData} 
          centerTitle={true}
          backgroundImage="https://blog.alfaconcursos.com.br/wp-content/uploads/2016/05/Dicas-concursos-militares-scaled.jpg"
        />
        
        <CardSlider 
          title="Actividades Culturales" 
          cards={culturalActivitiesData} 
          centerTitle={true} 
        />
        
        <CardSlider 
          title="Eventos Oficiales" 
          cards={officialEventsData} 
          centerTitle={true} 
          backgroundImage="https://blog.alfaconcursos.com.br/wp-content/uploads/2016/05/Dicas-concursos-militares-scaled.jpg" 
        />
      </main>
    </div>
  );
}

export default ActivitiesPage;