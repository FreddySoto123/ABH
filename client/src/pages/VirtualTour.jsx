import React from 'react'
import Tour from '../components/Tour';

const VirtualTour = () => {
    const handlePlayTour = () => {
        console.log('Reproduciendo tour...');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Tour
                title="Recorrido Virtual por la Academia"
                image="https://www.eldiario.net/noticias/2016/2016_05/nt160517/f_2016-05-17_1.jpg"
                description="Explora nuestra institución desde la comodidad de tu hogar. Descubre nuestras instalaciones, aulas, laboratorios y espacios de investigación a través de este recorrido virtual interactivo."
                onPlay={handlePlayTour}
            />
        </div>
    );
};

export default VirtualTour