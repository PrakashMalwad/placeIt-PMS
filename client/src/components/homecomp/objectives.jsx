const objectives = () => {
  return (
    <section id="objectives" className="features py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h3 className="text-2xl font-bold text-center mb-4 text-blue-700">Objectives</h3>
        <p className="italic text-center text-gray-600 mb-6">
          Our Placement Portal serves various objectives:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-4">
          <li className="transition-transform transform hover:translate-x-2 hover:text-blue-600">
            Developing the students to meet the Industries recruitment process.
          </li>
          <li className="transition-transform transform hover:translate-x-2 hover:text-blue-600">
            To motivate students to develop Technical knowledge and soft skills in terms of career planning, goal setting.
          </li>
          <li className="transition-transform transform hover:translate-x-2 hover:text-blue-600">
            To produce world-class professionals who have excellent analytical skills, communication skills, team-building spirit and ability to work in a cross-cultural environment.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default objectives;
