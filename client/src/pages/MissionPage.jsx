import React from 'react'
import SectionHeader from '../components/ui/SectionHeader.jsx';
import Description from '../components/Description.jsx';

const MissionPage = () => {
    return (
        <div>
            <SectionHeader
                title="Misión"
                extrabold={true}
            />
            <Description
                text="“La Academia Boliviana de Historia Militar coordina y fomenta la investigación historiográfica en las FF.AA. con rigor documental y bases científicas, durante todo el proceso de formación, capacitación y especialización militar, para crear la cultura histórica, cívica y patriótica en el personal militar, a fin de formar ciudadanos con identificación y conciencia nacional y alto compromiso con la Patria, aptos para defenderla y apoyar activa  y decididamente a su desarrollo”."
                align='center'
            />
        </div>
    )
}

export default MissionPage