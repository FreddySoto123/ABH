import React from 'react';
import { useParams } from 'react-router-dom';
import PersonCard from '../components/PersonCard.jsx';
import GeneralBanner from '../components/MainBanner.jsx';
import Pagination from '../components/pagination.jsx';
import './ListAcademicsPage.css';

const allAcademicsData = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Académico #${i + 1}`,
    name: "Dr. Hugo Esteban Rivero Camacho",
    image: "https://inkscape.app/wp-content/uploads/imagen-vectorial.webp"
}));

const ListAcademics = () => {
    const { pageNumber } = useParams();
    const currentPage = parseInt(pageNumber, 10) || 1;
    const itemsPerPage = 6;
    const totalPages = Math.ceil(allAcademicsData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = allAcademicsData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <div>
                <GeneralBanner
                    page="Directiva"
                    title="Academicos Honorarios"
                    description="Explora la colección del Museo y una seleccion de objetos de manera virtual con toda la informacion disponible. En los recorridos tematicos vituales se ofrece adicionalmente visitas guiadas con tours de audio."
                    height="400px"
                    minHeight="400px"
                    backgroundImageUrl="/img/fondo-recuadro-general.png"
                />
            </div>
            <div className="page-container">
                <div className="cards-container">
                    {currentItems.map(person => (
                        <PersonCard
                            key={person.id}
                            title={person.title}
                            name={person.name}
                            image={person.image}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/section-direccion__academica" 
                />
            </div>
        </div>
    );
};

export default ListAcademics;