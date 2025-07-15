import Header from '../components/Header';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import PersonCard from '../components/ui/PersonCard.jsx';
import BooksCard from '../components/ui/BooksCard.jsx';

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

    </div>
  )
}

export default HomePage;