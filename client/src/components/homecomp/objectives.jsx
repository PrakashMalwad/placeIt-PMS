import { FaArrowUp } from "react-icons/fa";

const PMSObjectives = () => {
  return (
    <section className="relative h-auto bg-cover bg-center p-0">
     <div className="flex bg-[radial-gradient(circle,_#1d4ed8,_#60a5fa)] opacity-90 py-12">

      

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex justify-center items-center ">
      <FaArrowUp className="text-white text-5xl animate-bounce" />
    </div>
          <h3 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-white">
            Our Objectives
          </h3>
          <p className="italic text-center text-white text-lg md:text-xl mb-8">
            Our system is designed to serve students, companies, and the placement cell with the following goals:
          </p>

          {/* Student Objectives */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-white mb-4">For Students</h4>
            <ul className="list-none space-y-6 text-lg md:text-xl text-gray-800">
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Enhance Career Readiness</span>
                Equip students with the necessary skills and resources to meet industry expectations and excel in job placements.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Streamline Job Application Process</span>
                Provide a user-friendly platform for applying to job openings, tracking applications, and receiving updates.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Facilitate Skill Development</span>
                Encourage students to engage in workshops, training programs, and mock interviews to enhance their technical and soft skills.
              </li>
            </ul>
          </div>

          {/* Company Objectives */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-white mb-4">For Companies</h4>
            <ul className="list-none space-y-6 text-lg md:text-xl text-gray-800">
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Efficient Recruitment Process</span>
                Streamline the process of posting vacancies, reviewing profiles, and scheduling interviews for a smoother hiring experience.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Access to Skilled Talent</span>
                Gain access to a diverse and qualified talent pool, tailored to the specific recruitment needs of the company.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Strengthen Industry Collaboration</span>
                Foster relationships with academic institutions, allowing companies to participate in curriculum development and campus events.
              </li>
            </ul>
          </div>

          {/* Placement Cell Objectives */}
          <div>
            <h4 className="text-2xl font-bold text-white mb-4">For Placement Cell</h4>
            <ul className="list-none space-y-6 text-lg md:text-xl text-gray-800">
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Manage Recruitment Efforts</span>
                Simplify the coordination of placement activities, from scheduling interviews to tracking student progress and company engagement.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Data-Driven Decision Making</span>
                Use analytics to track placement success, identify improvement areas, and make data-driven decisions for future strategies.
              </li>
              <li className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg hover:text-blue-600 transition-transform transform hover:-translate-y-1">
                <span className="block font-semibold mb-2">Enhance Student Support</span>
                Provide personalized career guidance, helping students prepare for interviews, improve resumes, and explore job opportunities.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PMSObjectives;
