import Header from '../components/Header';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import PersonCard from '../components/PersonCard.jsx';
import Card from '../components/Card.jsx';

function HomePage() {
  return (
    <div>
      <Header />
      <SectionHeader title="Direccion Academica" />

      <SectionHeader title="Nuestra Institución" left={true} />

      <SectionHeader title="About Us" left={true} extrabold={true} />

      <SectionHeader title="Services" whiteText={true} />

      <SectionHeader title="Contact" left={true} whiteText={true} />

      <SectionHeader title="Mi título" left />

      <SectionHeader title="Mi título" left marginLeft={200} />

      <SectionHeader title="Mi título" />

      <PersonCard
        title="Director General"
        name="Dr. Hugo Esteban Rivero Camacho"
        image="https://inkscape.app/wp-content/uploads/imagen-vectorial.webp"
      />

      <PersonCard
        name="Dr. Hugo Esteban Rivero Camacho"
        image="https://inkscape.app/wp-content/uploads/imagen-vectorial.webp"
        cardMode={true}
      />

      <Card
        title="Conferencia magistral sobre la historia del Palacio Goitia"
        description="Se realizó en el salón principal con la presencia de académicos e invitados especiales.
Se realizó en el salón principal con la presencia de académicos e invitados especiales, se realizó en el salón principal con la presencia de académicos e invitados especiales.
"
        date="25 de junio de 2025"
      />
      <Card
        title="Actividades"
        description="Participe en eventos oficiales, ceremonias patrias, presentaciones culturales y exposiciones temporales."
        imageUrl="https://tse1.mm.bing.net/th/id/OIP.QvgsV2W5aTxljgwgSExccwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
      />
    </div>
  )
}

export default HomePage;