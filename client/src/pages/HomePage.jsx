
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSection from '../components/homecomp/HeroSection';
import Objectives from '../components/homecomp/objectives';
import Statistics from '../components/homecomp/statistics';
import FeaturedServices from '../components/homecomp/featuredService';

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      {/* <Clients /> */}
      <Objectives />
      <Statistics />
      <FeaturedServices />
      <Footer />
    </>
  );
}

export default HomePage;
