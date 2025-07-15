import Header from '../components/Header';
import SectionHeader from '../components/ui/SectionHeader.jsx';

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
    </div>
  )
}

export default HomePage;