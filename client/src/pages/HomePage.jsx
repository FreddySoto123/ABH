import SectionHeader from "../components/ui/SectionHeader.jsx";
import PersonCard from "../components/PersonCard.jsx";
import BooksCard from "../components/BooksCard.jsx";
import InformationCard from "../components/InformationCard.jsx";
import ReferenceImage from "../components/ReferenceImage.jsx";
import Description from "../components/Description.jsx";
import NavigationButton from "../components/ui/NavigationButton.jsx";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <section className="main-box-container">
        <div className="main-box__group">
          <div className="main-box__title">
            <p>Inicio</p>
            <h1>
              custodios de
              <br />
              la memoria
              <br />
              patria
            </h1>
          </div>

          <div className="main-box__buttons">
            <p>
              "Preservando la gloria de nuestros héroes y la grandeza de nuestra
              historia
              <br />
              militar boliviana para las generaciones venideras"
            </p>

            <div className="buttons-container">
              <NavigationButton
                title="visitar museo virtual"
                link="#"
                buttonColor= "var(--color-accent)"
                borderColor="var(--color-accent)"
                textColor="var(--color-primary)"
              />

              <NavigationButton
                title="explorar archivo histórico"
                link="#"
                buttonColor="transparent"
                borderColor="var(--color-white)"
                textColor="var(--color-white)"
              />
            </div>
          </div>
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
