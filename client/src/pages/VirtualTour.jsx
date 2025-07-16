import React, { useEffect } from 'react'
import Tour from '../components/Tour';

const VirtualTour = () => {
    useEffect(() => {
        console.log('VirtualTour mounted - Using Three.js basic geometries');
    }, []);

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Recorridos Virtuales</h1>

            <Tour
                title="Salon Goitia"
                image="https://www.eldiario.net/noticias/2016/2016_05/nt160517/f_2016-05-17_1.jpg"
                description="Este elegante salón de estilo clásico conserva retratos de presidentes bolivianos, destacando la evolución política del país. Sirve también como escenario para actos protocolares y académicos dentro de la Academia Militar de Historia."
                roomType="library"
            />

            <Tour
                title="Salon Guerra del Chaco"
                image="https://www.eldiario.net/noticias/2016/2016_05/nt160517/f_2016-05-17_1.jpg"
                description="Dedicado a la Guerra del Chaco (1932-1935), este salón expone armas, uniformes, trincheras y documentos que narran el conflicto bélico entre Bolivia y Paraguay. Es una de las salas más impactantes por su ambientación realista y su carga histórica."
                roomType="classroom"
            />

            <Tour
                title="Salon Tres Pasos al Frente"
                image="https://www.eldiario.net/noticias/2016/2016_05/nt160517/f_2016-05-17_1.jpg"
                description="Este pasillo histórico rinde homenaje a la formación militar y la disciplina de los cadetes bolivianos. A través de uniformes históricos alineados a ambos lados, se representa la evolución del ejército boliviano. La luz natural del tragaluz resalta el solemne ambiente que caracteriza esta galería."
                roomType="lab"
            />
        </div>
    );
};

export default VirtualTour
