import Header from '../components/Header';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import PersonCard from '../components/PersonCard.jsx';
import BooksCard from '../components/BooksCard.jsx';
import InformationCard from '../components/InformationCard.jsx';
import Footer from '../components/Footer.jsx';
import ReferenceImage from '../components/ReferenceImage.jsx';
import Description from '../components/Description.jsx';

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

      <BooksCard
        tittle="El Sitio de Boquerón: Estrategia y Resistencia"
        author="Jorge Abastoflor Frey"
        fecha="21 de junio de 2025"
        image="https://elpotosi.net/img/contents/images_640/2019/07/05/nota78230_imagen69636.jpg"
        cardMode={true}
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

      <ReferenceImage
        image="https://elpotosi.net/img/contents/images_640/2019/07/05/nota78230_imagen69636.jpg"
        autor="López, R."
        title="Tropa boliviana avanzando en el Chaco boreal"
        url="https://elpotosi.net"
        year="1934"
        width={800}
        height={600}
      />

      <Description
        text="<li>Las *FF.AA.*</li> de la Nación tienen una grave responsabilidad ante la *posteridad*, pues no cuenta hasta la fecha, de una Historia Militar de BOLIVIA, oficialmente escrita.
      Lo que se ha escrito hasta ahora en el ámbito nacional, no ha sido la expresión de la verdad, sino el producto de ideas preconcebidas. Con razón se ha dicho: “Esas piezas escritas que llamamos de buena fe documentos históricos, se han encargado de disfrazar la verdad con astucia y mala fe”.
      Existen “historiontar carchivos y especies que configuran la cultura del pueblo y que se transmite mediante procesos de enseñanza y aprendizaje, o lo que es lo mismo, por la difusión y la propaganda. 
Consciente de que toda institución “sin memoria” queda desnuda, es que el Alto Mando Militar, ha visto imperativo la organización de la Academia Boliviana de Historia Militar, en el “Centenario del Litoral Cautivo.”"
        align="justify"
        className="custom-description-class"
      />
      <Footer />
    </div>
  )
}

export default HomePage;