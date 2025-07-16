import React from 'react'
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Description from '../components/Description.jsx';
import useAcademia from '../hooks/useAcademia.js';
import ReferenceImage from '../components/ReferenceImage.jsx';

const MissionPage = () => {
    const { academiaData, loading, error } = useAcademia();

    if (loading) {
        return (
            <div>
                <SectionHeader
                    title="Misión"
                    extrabold={true}
                />
                <div className="text-center p-8">
                    <p>Cargando misión...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <SectionHeader
                    title="Misión"
                    extrabold={true}
                />
                <div className="text-center p-8">
                    <p className="text-red-600">Error al cargar la misión: {error}</p>
                </div>
            </div>
        );
    }

    if (!academiaData?.mision_academia) {
        return (
            <div>
                <SectionHeader
                    title="Misión"
                    extrabold={true}
                />
                <div className="text-center p-8">
                    <p>No se encontró información sobre la misión.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <SectionHeader
                title="Misión"
                extrabold={true}
            />
            <Description
                text={academiaData.mision_academia}
                align='center'
            />
            <ReferenceImage
                image="https://cdn.correodelsur.com/img/contents/images_980/2021/12/05/0ff5d7d7-eb9e-4abc-9661-1cea1675aef8.jpg"
            />
        </div>
    )
}

export default MissionPage