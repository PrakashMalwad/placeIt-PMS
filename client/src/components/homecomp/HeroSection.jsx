

const HeroSection = () => {
  return (
    <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://unsplash.com/photos/gray-concrete-bricks-painted-in-blue-QMDap1TAu0g')" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-300 opacity-70"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Launch Your Career with Our Placement Management System
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Empowering students and companies to connect, grow, and succeed together. Start your journey today!
        </p>
        <a href="#get-started" className="px-6 py-3 bg-blue-600 rounded-full text-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
