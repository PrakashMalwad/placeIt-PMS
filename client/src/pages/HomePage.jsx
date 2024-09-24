import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import HeroSection from '../components/homecomp/HeroSection';
import Objectives from '../components/homecomp/objectives';
import FeaturedServices from '../components/homecomp/featuredService';
import Statistics from '../components/homecomp/statistics';
// import Client from '../components/homecomp/clients';

function HomePage() {
  
  const [role, setRole] = useState('guest'); // Default to 'guest' for non-logged-in users
  

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setRole(user.role || 'guest'); // Setting role based on user data
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
      }
    }
  }, []);

  return (
    <>
      <Navbar role={role} />
      <HeroSection />
      {/* <Client /> */}
      <Objectives />
      <Statistics />
      <FeaturedServices />
      <Footer />
    </>
  );
}

export default HomePage;
