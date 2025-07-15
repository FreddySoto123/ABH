import Header from '../components/Header';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import PersonCard from '../components/PersonCard.jsx';
import BooksCard from '../components/ui/BooksCard.jsx';
import InformationCard from '../components/InformationCard.jsx';
import Footer from '../components/Footer.jsx';

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

      <BooksCard
        tittle="El Sitio de Boquerón: Estrategia y Resistencia"
        author="Jorge Abastoflor Frey"
        fecha="21 de junio de 2025"
        image="https://elpotosi.net/img/contents/images_640/2019/07/05/nota78230_imagen69636.jpg"
      />

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

      <InformationCard
        title="Conferencia magistral sobre la historia del Palacio Goitia"
        description="Se realizó en el salón principal con la presencia de académicos e invitados especiales.
Se realizó en el salón principal con la presencia de académicos e invitados especiales, se realizó en el salón principal con la presencia de académicos e invitados especiales.
"
        date="25 de junio de 2025"
      />
      <InformationCard
        title="Actividades"
        description="Participe en eventos oficiales, ceremonias patrias, presentaciones culturales y exposiciones temporales."
        imageUrl="https://tse1.mm.bing.net/th/id/OIP.QvgsV2W5aTxljgwgSExccwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
      />
      <InformationCard
        title="Actividades"
        description="Participe en eventos oficiales, ceremonias patrias, presentaciones culturales y exposiciones temporales."
        imageUrl="https://tse1.mm.bing.net/th/id/OIP.QvgsV2W5aTxljgwgSExccwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
        cardMode={true}
      />
      <Footer />
    </div>
  )
}

export default HomePage;