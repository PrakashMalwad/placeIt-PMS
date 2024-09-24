import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center p-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-300 opacity-70"></div>
      <div className="absolute inset-0 flex items-center justify-between m-0">
        <img
          src="clouds.png" // Update path accordingly
          alt="Cloud Left"
          className=" md: w-full h-full opacity-50 "
          style={{ transform: `translateY(${scrollPosition * 0.3}px)` }} // Parallax effect for cloud image
        />
      </div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Launch Your Career with Our Placement Management System
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Empowering students and companies to connect, grow, and succeed together. Start your journey today!
        </p>
        <a href="#get-started" className="px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transition ">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
