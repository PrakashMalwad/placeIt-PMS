import { FaUser, FaBuilding, FaClipboardCheck } from 'react-icons/fa';

const featuredService = () => {
  const services = [
    {
      icon: <FaUser />,
      title: 'Login',
      description: 'Students can login using their credentials.',
      link: '#',
    },
    {
      icon: <FaUser />,
      title: 'Register',
      description: 'Register yourself here.',
      link: '/register-candidates.jsx',
    },
    {
      icon: <FaBuilding />,
      title: 'Look for companies',
      description: 'You can search for companies.',
      link: '#',
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Apply for Drives',
      description: 'Look for eligibility criteria and apply for companies accordingly.',
      link: '#',
    },
  ];

  return (
    <section id="featured-services" className="featured-services py-10 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-item bg-white p-8 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:bg-blue-50"
            >
              <div className="icon mb-4 text-blue-500 text-5xl flex justify-center">
                {typeof service.icon === 'string' ? (
                  <i className={`${service.icon}`}></i>
                ) : (
                  service.icon
                )}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-center">
                <a href={service.link} className="text-blue-700 hover:underline">
                  {service.title}
                </a>
              </h4>
              <p className="text-center text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default featuredService;
