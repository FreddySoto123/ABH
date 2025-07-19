import SectionHeader from "../components/ui/SectionHeader.jsx";
import ReferenceImage from "../components/ReferenceImage.jsx";
import MainBanner from "../components/MainBanner.jsx";
import NavigationButton from "../components/ui/NavigationButton.jsx";
import ScrollToTop from "../components/ui/ScrollToTop.jsx";
import CardSlider from "../components/ui/CardSlider.jsx";
import "./HomePage.css";

const resolutionsData = [
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
  {
    type: "information",
    props: {
      title: "Edición N°01 - Enero 2024: Resumen Anual y Retos",
      description:
        "Se realizó en el salón principal con la presencia de académicos, quienes revisaron los logros del año anterior y plantearon los nuevos desafíos...",
      date: "15 de Enero de 2025",
    },
  },
];

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
            size="full"
            aspectRatio="3/2"
            className="about-us__reference-image"
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

      <CardSlider
        title="Resoluciones"
        cards={resolutionsData}
        centerTitle={true}
        backgroundImage="/img/fondo-card-slider.png"
        viewMoreLink="/"
      />
      <ScrollToTop />
    </div>
  );
}

export default HomePage;
