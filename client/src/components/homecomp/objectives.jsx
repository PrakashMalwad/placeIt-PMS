

const Objectives = () => {
  return (
    <section id="objectives" className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-blue-800">
          Our Objectives
        </h3>
        <p className="italic text-center text-gray-700 text-lg md:text-xl mb-8">
          The Placement Portal strives to achieve the following:
        </p>
        <ul className="list-none space-y-8 text-lg md:text-xl text-gray-800">
          <li className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:text-blue-600">
            <span className="block font-semibold mb-2">Industry-Ready Development</span>
            Developing the students to meet the recruitment standards of top industries.
          </li>
          <li className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:text-blue-600">
            <span className="block font-semibold mb-2">Soft Skills and Technical Expertise</span>
            Motivating students to enhance both their technical knowledge and soft skills, with a focus on career planning and goal setting.
          </li>
          <li className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-1 hover:shadow-lg hover:text-blue-600">
            <span className="block font-semibold mb-2">World-Class Professionals</span>
            Producing professionals who excel in analytical skills, communication, teamwork, and can thrive in diverse environments.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Objectives;
