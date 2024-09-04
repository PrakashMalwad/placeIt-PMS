import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex justify-center py-7">
      <section id="cta" className="cta bg-gradient-to-r from-blue-50 to-blue-100 p-10 m-4 rounded-lg shadow-lgc">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-xl md:w-2/3 order-last md:order-first text-center md:text-left">
              <h3 className="text-3xl font-bold text-blue-700 mb-4">
                <strong className="text-blue-900"style={{ fontFamily: "'Istok Web', sans-serif" }}>PlaceIT</strong>
              </h3>
              <p className="py-4 text-gray-700 leading-relaxed">
                The Placement Cell plays a crucial role in locating job
                opportunities for undergraduates and postgraduates, connecting them with top employers.
              </p>
              <Link
                to=""
                className="cta-btn align-self-start mt-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300"
              >
                Get Started
              </Link>
            </div>
            <div className="md:w-1/3 order-first md:order-last mb-4 md:mb-0">
              <img
                src="assets/img/feature-7.jpg"
                alt="Feature Image"
                className="img-fluid rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
