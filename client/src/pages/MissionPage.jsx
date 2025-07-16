import React from 'react'
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Description from '../components/Description.jsx';
import useAcademia from '../hooks/useAcademia.js';

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
        </div>
    )
}

export default MissionPage