import SectionHeader from "../components/ui/SectionHeader.jsx";
import PersonCard from "../components/PersonCard.jsx";
import BooksCard from "../components/BooksCard.jsx";
import InformationCard from "../components/InformationCard.jsx";
import ReferenceImage from "../components/ReferenceImage.jsx";
import Description from "../components/Description.jsx";
import MainBanner from "../components/MainBanner.jsx";
import NavigationButton from "../components/ui/NavigationButton.jsx";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <MainBanner
        page="Inicio"
        title="custodios de la memoria patria"
        description="Preservando la gloria de nuestros héroes y la grandeza de nuestra historia militar boliviana para las generaciones venideras"
        primaryButton={{
          title: "visitar museo virtual",
          link: "#",
        }}
        secondaryButton={{
          title: "explorar archivo histórico",
          link: "#",
        }}
      />

      <section className="about-us-container">
        <div className="about-us__image">
          <ReferenceImage
            image="/img/quienes-somos.png"
            autor="López, R."
            title="Tropa boliviana avanzando en el Chaco boreal"
            url="https://elpotosi.net"
            year="1934"
            width={650}
            height={400}
          />
        </div>
        <div className="about-us__text">
          <SectionHeader
            title="Nuestra Institución"
            whiteText={false}
            left={true}
          />

          <h1 className="about-us__title">¿Quiénes Somos?</h1>

          <p>
            <span>La Academia Boliviana de Historia Militar</span> es un
            organismo oficial de investigación y difusión histórica y cultural
            de las FFAA, fue creada mediante Decreto Supremo Nº 16469 del 17 de
            mayo de 1979. En el año 1981 se comienza a editar y publicar la
            gaceta académica de la Academia Boliviana de Historia Militar, hubo
            una paralización de casi dos décadas en las publicaciones de la
            gaceta y en junio del año 2000 se logra reeditar esta acogida
            publicación en su segunda época.
          </p>

          <NavigationButton
            title="conoce más"
            link="#"
            buttonColor="transparent"
            borderColor="var(--color-accent)"
            textColor="var(--color-accent)"
            borderRadius="25px"
            hasIcon={true}
          />
        </div>
      </section>

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
        text="*La Academia Boliviana de Historia Militar* es un organismo oficial de investigación y difusión histórica y cultural de las FFAA, fue creada mediante Decreto Supremo Nº 16469 del 17 de mayo de 1979. En el año 1981 se comienza a editar y publicar la gaceta académica de la Academia Boliviana de Historia Militar, hubo una paralización de casi dos décadas en las publicaciones de la gaceta y en junio del año 2000 se logra reeditar esta acogida publicación en su segunda época."
        align="justify"
      />
    </div>
  );
}

export default HomePage;
