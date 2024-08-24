import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <div className="flex justify-center">
      <section id="cta" className="cta  bg-gray-100 p-10 rounded-lg">
        <div className="    ">
          <div className="flex flex-col md:flex-row items-center">
            <div className="text-xl md:w-2/3 order-last md:order-first">
              <h3>
                <em className="text-bold">PlaceIT</em>
              </h3> 
              <p className="py-4">
                The Placement Cell plays a crucial role in locating job
                opportunities for undergraduates and postgraduates.
              </p>
              <Link
                to=""
                className="cta-btn align-self-start mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Get Started
              </Link>
            </div>
            <div className="md:w-1/3 order-first md:order-last mb-4">
              <img
                src="assets/img/feature-7.jpg"
                alt="Feature Image"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
